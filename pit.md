## 项目随笔
+ 1、点击div模拟的假的input，使之展现出真正的input输入框，并且同时获得焦点。
  > 刚开始是设置state展示input与获取焦点this._textArea.focus()同时了，导致还没出现input，就想获取焦点，坑定不会获取到。解决办法
  > this.setState({
        inputFlag: true
       },() => {
        this._textArea.focus()
       })
       
+ 2、animationend 动画结束 使用addEventListener监听，注意兼容性
+ 3、防止xsl攻击，把用户输入的字符转义，后端返回的数据是转义后的字符，如果都被转义了，前端渲染要被反转义过来。这要会很麻烦，而且会有后期风险问题，后端有xsl库更新，前端没有，如果出现新的标签攻击，前反转义过来，就会收到攻击。正确的做法，后端判断转义。把危险的转义，其他字符正常返回，前端直接渲染。
+ 4、钉钉、内外容器内css要加-wekit-前缀，
+ 5、 url有中文会encodeURI()转码 ，相应的使用decodeURI()解码
+ 6、requestAnimationFrame 请求动画帧
