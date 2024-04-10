// 微前端方案，直接嵌入三方iframe，node代理层处理三方页面的登录，菜单问题
const express = require('express');
const fs = require(`fs`)
let contentWindow = fs.readFileSync(`./node_modules/iframe-resizer/js/iframeResizer.contentWindow.js`, `utf8`)

const { createProxyMiddleware, responseInterceptor  } = require('http-proxy-middleware');

const app = express();

// create the proxy
/** @type {import('http-proxy-middleware/dist/types').RequestHandler<express.Request, express.Response>} */
const exampleProxy = createProxyMiddleware({
  target: 'http://httpbin.org', // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites,
  selfHandleResponse: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('test', 'a');
  },
  onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
    res.setHeader('test', 'b');
    const cookie = `cookiecookie`
    res.setHeader('set-cookie', `auth=${cookie}; SameSite=None; Secure `);
    res.setHeader('X-Frame-Options', `AllowAll`);
    const exchange = `[DEBUG] ${req.method} ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
    console.log(exchange);
    if ((proxyRes.headers['content-type'] || ``).includes(`text/html`)) {
      const response = responseBuffer.toString('utf8').replace(`</script>`, `
        </script>
        <script>
          function injectCSS(css) {
            const style = document.createElement('style');
            style.innerHTML = css;
            document.head.appendChild(style);
          }
          
          function loadScript(url) {
            return new Promise((resolve, reject) => {
              var script = document.createElement('script');
              script.src = url;
            
              // 脚本加载完成后执行回调函数
              script.onload = resolve;
            
              document.head.appendChild(script);
            })
          }
          ;console.log("加载了")
          ;window.iFrameResizer = {
            onMessage(js) {
              console.log("js", js)
              eval(js)
            },
            onReady() {
              window.parentIFrame.sendMessage("onReady")
              console.log("onReady")
            }
          }
          ;${contentWindow}
        </script>
      `).replace(/<aside([\s\S]*?)\/aside>/, '')
      return response
    }

    return responseBuffer;
  }),
});

// 示例: /auto/zabbix?name=Admin&password=zabbix&action=map.view
// 注意：若依会把点换成斜杠, 例如 map.view 换成 map/view
// 注意：若依相同的 path 会被视为同一路由，在菜单中会出错，否则出现两个菜单同时在选择状态
// 注意：若依只内链只支持一级路径，例如只能 http://127.0.0.1/path 不能 http://127.0.0.1/path/path ，否则报错找不了页面
// 解决方案：把 data 转换为 json 字符串转换为 base64 放到 /auto/:base64 中的相应位置，如果 base64 有等号时删除
// 注意：宿主页面与此页面应在同一 host 下（包括访问），否则 set-cookie 无法跨域工作
app.use(`/auto/:base64`, async (req, res, next) => {
  let data = {
    "path": "/",
    "name": "name",
    "password": "password",
  }
  const url = data.path
  console.log(`req.data`, data)
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <script>
        fetch("/post", {
          "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "upgrade-insecure-requests": "1"
          },
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "name=${data.name}&password=${data.password}&autologin=1&enter=%E7%99%BB%E5%BD%95",
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
        }).then(res => {
          window.location.href = '${url}';
        })
      </script>
    </head>
    <body>
      <center><a href="url">${url} 加载中...</a></center>
    </body>
    <style>
        html, body {
          width: 100%;
          // height: 100vh;
        }
    </style>
    </html>
  `;
  res.status(200).end(html);
})
app.use(exampleProxy);
app.listen(9700);

const app2 = express();
app2.use((req, res, next) => {
  const html = fs.readFileSync(`./index.html`, `utf8`)
  res.end(html)
});
app2.listen(9000);
