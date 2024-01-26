<div class="markdown-body"><style>.markdown-body{word-break:break-word;line-height:1.75;font-weight:400;font-size:16px;overflow-x:hidden;color:#252933}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.markdown-body h1{font-size:24px;line-height:38px;margin-bottom:5px}.markdown-body h2{font-size:22px;line-height:34px;padding-bottom:12px;border-bottom:1px solid #ececec}.markdown-body h3{font-size:20px;line-height:28px}.markdown-body h4{font-size:18px;line-height:26px}.markdown-body h5{font-size:17px;line-height:24px}.markdown-body h6{font-size:16px;line-height:24px}.markdown-body p{line-height:inherit;margin-top:22px;margin-bottom:22px}.markdown-body img{max-width:100%}.markdown-body hr{border:none;border-top:1px solid #ddd;margin-top:32px;margin-bottom:32px}.markdown-body code{word-break:break-word;border-radius:2px;overflow-x:auto;background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.markdown-body code,.markdown-body pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.markdown-body pre{overflow:auto;position:relative;line-height:1.75}.markdown-body pre>code{font-size:12px;padding:15px 12px;margin:0;word-break:normal;display:block;overflow-x:auto;color:#333;background:#f8f8f8}.markdown-body a{text-decoration:none;color:#0269c8;border-bottom:1px solid #d1e9ff}.markdown-body a:active,.markdown-body a:hover{color:#275b8c}.markdown-body table{display:inline-block!important;font-size:12px;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.markdown-body thead{background:#f6f6f6;color:#000;text-align:left}.markdown-body tr:nth-child(2n){background-color:#fcfcfc}.markdown-body td,.markdown-body th{padding:12px 7px;line-height:24px}.markdown-body td{min-width:120px}.markdown-body blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.markdown-body blockquote:after{display:block;content:""}.markdown-body blockquote>p{margin:10px 0}.markdown-body ol,.markdown-body ul{padding-left:28px}.markdown-body ol li,.markdown-body ul li{margin-bottom:0;list-style:inherit}.markdown-body ol li .task-list-item,.markdown-body ul li .task-list-item{list-style:none}.markdown-body ol li .task-list-item ol,.markdown-body ol li .task-list-item ul,.markdown-body ul li .task-list-item ol,.markdown-body ul li .task-list-item ul{margin-top:0}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-top:3px}.markdown-body ol li{padding-left:6px}.markdown-body .contains-task-list{padding-left:0}.markdown-body .task-list-item{list-style:none}@media (max-width:720px){.markdown-body h1{font-size:24px}.markdown-body h2{font-size:20px}.markdown-body h3{font-size:18px}}</style><style data-highlight="" data-highlight-key="juejin">.markdown-body pre,.markdown-body pre>code.hljs{color:#333;background:#f8f8f8}.hljs-comment,.hljs-quote{color:#998;font-style:italic}.hljs-keyword,.hljs-selector-tag,.hljs-subst{color:#333;font-weight:700}.hljs-literal,.hljs-number,.hljs-tag .hljs-attr,.hljs-template-variable,.hljs-variable{color:teal}.hljs-doctag,.hljs-string{color:#d14}.hljs-section,.hljs-selector-id,.hljs-title{color:#900;font-weight:700}.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type{color:#458;font-weight:700}.hljs-attribute,.hljs-name,.hljs-tag{color:navy;font-weight:400}.hljs-link,.hljs-regexp{color:#009926}.hljs-bullet,.hljs-symbol{color:#990073}.hljs-built_in,.hljs-builtin-name{color:#0086b3}.hljs-meta{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}</style><p>在前面两节，我们了解了 TypeScript 在 React 与 ESLint 中的集成，而在实际项目开发时，我们还会接触许多与 TypeScript 相关的工具。如果按照作用场景来进行划分，这些工具大致可以划分为开发、校验、构建、类型四类。在这一节我们将介绍一批 TypeScript 工具库，讲解它们的基本使用，你可以在这里查找是否有符合你需求的工具。</p>
<p>本节的定位类似于 GitHub 上的 awesome-xxx 系列，我们更多是在简单介绍工具的作用与使用场景，不会有深入的讲解与分析。同时，本节的内容会持续更新，如果你还使用过其他好用的工具库，欢迎在评论区留言，我会随着更新不断收录更多的工具库。</p>
<h2 data-id="heading-0">开发阶段</h2>
<p>这一部分的工具主要在项目开发阶段使用。</p>
<h3 data-id="heading-1">项目开发</h3>
<ul>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FTypeStrong%2Fts-node" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/TypeStrong/ts-node" ref="nofollow noopener noreferrer">ts-node</a> 与 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fwclr%2Fts-node-dev" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/wclr/ts-node-dev" ref="nofollow noopener noreferrer">ts-node-dev</a>：我们在环境搭建一节中已经介绍过，用于直接执行 .ts 文件。其中 ts-node-dev 基于 ts-node 和 node-dev（类似于 nodemon）封装，能够实现监听文件改动并重新执行文件的能力。</p>
</li>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fgilamran%2Ftsc-watch" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/gilamran/tsc-watch" ref="nofollow noopener noreferrer">tsc-watch</a>：它类似于 ts-node-dev，主要功能也是监听文件变化然后重新执行，但 tsc-watch 的编译过程更明显，也需要自己执行编译后的文件。你也可以通过 onSuccess 与 onFailure 参数，来在编译过程成功与失效时执行不同的逻辑。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">## 启动 tsc --watch，然后在成功时执行编译产物</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">tsc-watch --onSuccess <span class="hljs-string">"node ./dist/server.js"</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-comment">## 在失败时执行</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">tsc-watch --onFailure <span class="hljs-string">"echo 'Beep! Compilation Failed'"</span></span>
</code></pre>
</li>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fesbuild-kit%2Fesno" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/esbuild-kit/esno" ref="nofollow noopener noreferrer">esno</a>，antfu 的作品。核心能力同样是执行 .ts 文件，但底层是 ESBuild 而非 tsc，因此速度上会明显更快。</p>
</li>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftyped-install" target="_blank" rel="nofollow noopener noreferrer" title="https://www.npmjs.com/package/typed-install" ref="nofollow noopener noreferrer">typed-install</a>，我们知道有些 npm 包的类型定义是单独的 <code>@types/</code> 包，但我们并没办法分辨一个包需不需要额外的类型定义，有时安装了才发现没有还要再安装一次类型也挺烦躁的。typed-install 的功能就是在安装包时自动去判断这个包是否有额外的类型定义包，并为你自动地进行安装。其实我也写过一个类似的：<a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Finstall-with-typing" target="_blank" rel="nofollow noopener noreferrer" title="https://www.npmjs.com/package/install-with-typing" ref="nofollow noopener noreferrer">install-with-typing</a>。</p>
</li>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fkawamataryo%2Fsuppress-ts-errors" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/kawamataryo/suppress-ts-errors" ref="nofollow noopener noreferrer">suppress-ts-error</a>，自动为项目中所有的类型报错添加 <code>@ts-expect-error</code> 或 <code>@ts-ignore</code> 注释，重构项目时很有帮助。</p>
</li>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmattpocock%2Fts-error-translator" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/mattpocock/ts-error-translator" ref="nofollow noopener noreferrer">ts-error-translator</a>，将 TS 报错翻译成更接地气的版本，并且会根据代码所在的上下文来详细说明报错原因，目前只有英文版本，中文版本感觉遥遥无期，因为 TS 的报错实在太多了……</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a32aab7b4974a2e90f4110aab24dbc0~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="image.png" loading="lazy" class="medium-zoom-image"></p>
</li>
</ul>
<h3 data-id="heading-2">代码生成</h3>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FJoshuaKGoldberg%2FTypeStat" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/JoshuaKGoldberg/TypeStat" ref="nofollow noopener noreferrer">TypeStat</a>，能够将 JavaScript 文件转化为 TypeScript 文件，并在这个过程中去尝试提取类型。同时它也能够修正 TypeScript 中的 <code>--noImplicitAny</code> 以及 <code>--noImplicitThis</code> 错误。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fusabilityhub%2Fts-auto-guard" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/usabilityhub/ts-auto-guard" ref="nofollow noopener noreferrer">ts-auto-guard</a>，还记得我们在类型工具中学习的，基于 is 的类型守卫吗？有时候手动编写能够匹配运行时值类型的类型守卫会比较累人，你可以使用这个工具来自动基于接口生成类型守卫：</li>
</ul>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// my-project/Person.guard.ts</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Person</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./Person'</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">isPerson</span>(<span class="hljs-params">obj: <span class="hljs-built_in">unknown</span></span>): obj is <span class="hljs-title class_">Person</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">const</span> typedObj = obj <span class="hljs-keyword">as</span> <span class="hljs-title class_">Person</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-keyword">return</span> (</span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-keyword">typeof</span> typedObj === <span class="hljs-string">'object'</span> &amp;&amp;</span>
<span class="code-block-extension-codeLine" data-line-num="9">    <span class="hljs-keyword">typeof</span> typedObj[<span class="hljs-string">'name'</span>] === <span class="hljs-string">'string'</span> &amp;&amp;</span>
<span class="code-block-extension-codeLine" data-line-num="10">    (<span class="hljs-keyword">typeof</span> typedObj[<span class="hljs-string">'age'</span>] === <span class="hljs-string">'undefined'</span> ||</span>
<span class="code-block-extension-codeLine" data-line-num="11">      <span class="hljs-keyword">typeof</span> typedObj[<span class="hljs-string">'age'</span>] === <span class="hljs-string">'number'</span>) &amp;&amp;</span>
<span class="code-block-extension-codeLine" data-line-num="12">    <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(typedObj[<span class="hljs-string">'children'</span>]) &amp;&amp;</span>
<span class="code-block-extension-codeLine" data-line-num="13">    typedObj[<span class="hljs-string">'children'</span>].<span class="hljs-title function_">every</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-title function_">isPerson</span>(e))</span>
<span class="code-block-extension-codeLine" data-line-num="14">  )</span>
<span class="code-block-extension-codeLine" data-line-num="15">}</span>
</code></pre>
<ul>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FYousefED%2Ftypescript-json-schema" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/YousefED/typescript-json-schema" ref="nofollow noopener noreferrer">typescript-json-schema</a>，从 TypeScript 代码生成 JSON Schema，如以下代码：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Shape</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">    <span class="hljs-comment">/**</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">     * The size of the shape.</span>
<span class="code-block-extension-codeLine" data-line-num="4">     *</span>
<span class="code-block-extension-codeLine" data-line-num="5">     * <span class="hljs-doctag">@minimum</span> 0</span>
<span class="code-block-extension-codeLine" data-line-num="6">     * <span class="hljs-doctag">@TJS</span>-type integer</span>
<span class="code-block-extension-codeLine" data-line-num="7">     */</span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
</code></pre>
<p>会生成以下的 JSON Schema：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"$ref"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"#/definitions/Shape"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">"$schema"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"http://json-schema.org/draft-07/schema#"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">"definitions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-attr">"Shape"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">      <span class="hljs-attr">"properties"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">        <span class="hljs-attr">"size"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">          <span class="hljs-attr">"description"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"The size of the shape."</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">          <span class="hljs-attr">"minimum"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="10">          <span class="hljs-attr">"type"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"integer"</span></span>
<span class="code-block-extension-codeLine" data-line-num="11">        <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="13">      <span class="hljs-attr">"type"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"object"</span></span>
<span class="code-block-extension-codeLine" data-line-num="14">    <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="15">  <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="16"><span class="hljs-punctuation">}</span></span>
</code></pre>
</li>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbcherny%2Fjson-schema-to-typescript" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/bcherny/json-schema-to-typescript" ref="nofollow noopener noreferrer">json-schema-to-typescript</a>，和上面那位反过来，从 JSON Schema 生成 TypeScript 代码：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"title"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"Example Schema"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">"type"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"object"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">"properties"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-attr">"firstName"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">      <span class="hljs-attr">"type"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"string"</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-attr">"lastName"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">      <span class="hljs-attr">"type"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"string"</span></span>
<span class="code-block-extension-codeLine" data-line-num="10">    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-attr">"age"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">      <span class="hljs-attr">"description"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"Age in years"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="13">      <span class="hljs-attr">"type"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"integer"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="14">      <span class="hljs-attr">"minimum"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span></span>
<span class="code-block-extension-codeLine" data-line-num="15">    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="16">    <span class="hljs-attr">"hairColor"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="17">      <span class="hljs-attr">"enum"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"black"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"brown"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"blue"</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="18">      <span class="hljs-attr">"type"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"string"</span></span>
<span class="code-block-extension-codeLine" data-line-num="19">    <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="20">  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="21">  <span class="hljs-attr">"additionalProperties"</span><span class="hljs-punctuation">:</span> <span class="hljs-keyword">false</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="22">  <span class="hljs-attr">"required"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"firstName"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"lastName"</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="23"><span class="hljs-punctuation">}</span></span>
</code></pre>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ExampleSchema</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">firstName</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">lastName</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-comment">/**</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">   * Age in years</span>
<span class="code-block-extension-codeLine" data-line-num="6">   */</span>
<span class="code-block-extension-codeLine" data-line-num="7">  age?: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8">  hairColor?: <span class="hljs-string">"black"</span> | <span class="hljs-string">"brown"</span> | <span class="hljs-string">"blue"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
</code></pre>
</li>
</ul>
<p>需要注意的是，JSON Schema 并不是我们常见到的。描述实际值的 JSON，它更像是 TS 类型那样的<strong>结构定义</strong>，存在着值类型、可选值、访问性等相关信息的描述，如 required、type、description 等字段，因此它才能够与 TypeScript 之间进行转换。</p>
<h2 data-id="heading-3">类型相关</h2>
<p>以下工具库主要针对类型，包括提供通用工具类型与对工具类型进行测试。</p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fsindresorhus%2Ftype-fest" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/sindresorhus/type-fest" ref="nofollow noopener noreferrer">type-fest</a>，不用多介绍了，目前 star 最多下载量最高的工具类型库，Sindre Sorhus 的作品，同时也是个人认为最接地气的一个工具类型库。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fpiotrwitek%2Futility-types" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/piotrwitek/utility-types" ref="nofollow noopener noreferrer">utility-types</a>，包含的类型较少，但这个库是我类型编程的启蒙课，我们此前对 FunctionKeys、RequiredKeys 等工具类型的实现就来自于这个库。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fts-essentials" target="_blank" rel="nofollow noopener noreferrer" title="https://www.npmjs.com/package/ts-essentials" ref="nofollow noopener noreferrer">ts-essentials</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fpelotom%2Ftype-zoo" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/pelotom/type-zoo" ref="nofollow noopener noreferrer">type-zoo</a></li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmillsp%2Fts-toolbelt" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/millsp/ts-toolbelt" ref="nofollow noopener noreferrer">ts-toolbelt</a>，目前包含工具类型数量最多的一位，基本上能满足你的所有需要。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftsd" target="_blank" rel="nofollow noopener noreferrer" title="https://www.npmjs.com/package/tsd" ref="nofollow noopener noreferrer">tsd</a>，用于进行类型层面的单元测试，即验证工具类型计算结果是否是符合预期的类型，也是 Sindre Sorhus 的作品，同时 type-fest 中工具类型的单元测试就是基于它。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fdsherret%2Fconditional-type-checks" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/dsherret/conditional-type-checks" ref="nofollow noopener noreferrer">conditional-type-checks</a>，类似于 tsd，也是用于对类型进行单元测试。</li>
</ul>
<h2 data-id="heading-4">校验阶段</h2>
<p>以下这些工具通常用于在项目逻辑中进行具有实际逻辑的校验（而不同于 tsd 仅在类型层面）。</p>
<h3 data-id="heading-5">逻辑校验</h3>
<ul>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fcolinhacks%2Fzod" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/colinhacks/zod" ref="nofollow noopener noreferrer">zod</a>，核心优势在于与 TypeScript 的集成，如能从 Schema 中直接提取出类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">"zod"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> <span class="hljs-title class_">User</span> = z.<span class="hljs-title function_">object</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>(),</span>
<span class="code-block-extension-codeLine" data-line-num="5">});</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-title class_">User</span>.<span class="hljs-title function_">parse</span>({ <span class="hljs-attr">username</span>: <span class="hljs-string">"Ludwig"</span> });</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-comment">// extract the inferred type</span></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">type</span> <span class="hljs-title class_">User</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">User</span>&gt;;</span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-comment">// { username: string }</span></span>
</code></pre>
<p>我个人比较看好的一个库，在 tRPC、Blitz 等前后端一体交互的框架中能同时提供类型保障和 Schema 校验，同时和 Prisma 这一类库也有着很好地集成。最重要的是社区生态非常丰富，有许多自动生成的工具（<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Frsinohara%2Fjson-to-zod" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/rsinohara/json-to-zod" ref="nofollow noopener noreferrer">json-to-zod</a>、<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fkbkk%2Fabitia%2Ftree%2Fmaster%2Fpackages%2Fzod-dto" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/kbkk/abitia/tree/master/packages/zod-dto" ref="nofollow noopener noreferrer">zod-nest-dto</a> 等）。</p>
</li>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypestack%2Fclass-validator" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/typestack/class-validator" ref="nofollow noopener noreferrer">class-validator</a>，TypeStack 的作品，基于装饰器来进行校验，我们会在后面的装饰器一节了解如何基于装饰器进行校验。</p>
</li>
</ul>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Post</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-meta">@Length</span>(<span class="hljs-number">10</span>, <span class="hljs-number">20</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-meta">@Contains</span>(<span class="hljs-string">'hello'</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-meta">@IsInt</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-meta">@Min</span>(<span class="hljs-number">0</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-meta">@Max</span>(<span class="hljs-number">10</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-attr">rating</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="12"></span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-meta">@IsEmail</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="15">}</span>
<span class="code-block-extension-codeLine" data-line-num="16"></span>
<span class="code-block-extension-codeLine" data-line-num="17"><span class="hljs-keyword">let</span> post = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Post</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="18">post.<span class="hljs-property">title</span> = <span class="hljs-string">'Hello'</span>; <span class="hljs-comment">// 错误</span></span>
<span class="code-block-extension-codeLine" data-line-num="19">post.<span class="hljs-property">text</span> = <span class="hljs-string">'this is a great post about hell world'</span>; <span class="hljs-comment">// 错误</span></span>
<span class="code-block-extension-codeLine" data-line-num="20">post.<span class="hljs-property">rating</span> = <span class="hljs-number">11</span>; <span class="hljs-comment">// 错误</span></span>
<span class="code-block-extension-codeLine" data-line-num="21">post.<span class="hljs-property">email</span> = <span class="hljs-string">'google.com'</span>; <span class="hljs-comment">// 错误</span></span>
<span class="code-block-extension-codeLine" data-line-num="22"></span>
<span class="code-block-extension-codeLine" data-line-num="23"><span class="hljs-title function_">validate</span>(post).<span class="hljs-title function_">then</span>(<span class="hljs-function"><span class="hljs-params">errors</span> =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="24">  <span class="hljs-comment">// 查看是否返回了错误</span></span>
<span class="code-block-extension-codeLine" data-line-num="25">  <span class="hljs-keyword">if</span> (errors.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="26">    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'校验失败，错误信息: '</span>, errors);</span>
<span class="code-block-extension-codeLine" data-line-num="27">  } <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="28">    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'校验通过！'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="29">  }</span>
<span class="code-block-extension-codeLine" data-line-num="30">});</span>
</code></pre>
<ul>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fianstormtaylor%2Fsuperstruct" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/ianstormtaylor/superstruct" ref="nofollow noopener noreferrer">superstruct</a>，功能与使用方式类似于 zod，更老牌一些。</p>
</li>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fsindresorhus%2Fow" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/sindresorhus/ow" ref="nofollow noopener noreferrer">ow</a>，用于函数参数的校验，我通常在 CLI 工具里大量使用。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> ow <span class="hljs-keyword">from</span> <span class="hljs-string">'ow'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> <span class="hljs-title function_">unicorn</span> = input =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="4">	<span class="hljs-title function_">ow</span>(input, ow.<span class="hljs-property">string</span>.<span class="hljs-title function_">minLength</span>(<span class="hljs-number">5</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6">	<span class="hljs-comment">// …</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">};</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-title function_">unicorn</span>(<span class="hljs-number">3</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-comment">//=&gt; ArgumentError: Expected `input` to be of type `string` but received type `number`</span></span>
<span class="code-block-extension-codeLine" data-line-num="11"></span>
<span class="code-block-extension-codeLine" data-line-num="12"><span class="hljs-title function_">unicorn</span>(<span class="hljs-string">'yo'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="13"><span class="hljs-comment">//=&gt; ArgumentError: Expected string `input` to have a minimum length of `5`, got `yo`</span></span>
</code></pre>
</li>
<li>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fpelotom%2Fruntypes" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/pelotom/runtypes" ref="nofollow noopener noreferrer">runtypes</a>，类似于 Zod，也是运行时的类型与 Schema 校验。</p>
</li>
</ul>
<h3 data-id="heading-6">类型覆盖检查</h3>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Falexcanessa%2Ftypescript-coverage-report" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/alexcanessa/typescript-coverage-report" ref="nofollow noopener noreferrer">typescript-coverage-report</a>，检查你的项目中类型的覆盖率，如果你希望项目的代码质量更高，可以使用这个工具来检查类型的覆盖程度，从我个人使用经验来看，大概 95% 左右就是一个比较平衡的程度了。类似于 Lint 工具，如果使用这一工具来约束项目代码质量，也可以放在 pre-commit 中进行。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fplantain-00%2Ftype-coverage" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/plantain-00/type-coverage" ref="nofollow noopener noreferrer">type-coverage</a>，前者的底层依赖，可以用来定制更复杂的场景。</li>
</ul>
<h2 data-id="heading-7">构建阶段</h2>
<p>以下工具主要在构建阶段起作用。</p>
<ul>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fesbuild.github.io%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://esbuild.github.io/" ref="nofollow noopener noreferrer">ESBuild</a>，应该无需过多介绍。需要注意的是 ESBuild 和 TypeScript Compiler 还是存在一些构建层面的差异，比如 ESBuild 无法编译装饰器（但可以使用插件，对含有装饰器的文件回退到 tsc 编译）。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fswc.rs%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://swc.rs/" ref="nofollow noopener noreferrer">swc</a>，也无需过多介绍。SWC 的目的是替代 Babel，因此它是可以直接支持装饰器等特性的。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffork-ts-checker-webpack-plugin" target="_blank" rel="nofollow noopener noreferrer" title="https://www.npmjs.com/package/fork-ts-checker-webpack-plugin" ref="nofollow noopener noreferrer">fork-ts-checker-webpack-plugin</a>，Webpack 插件，使用额外的子进程来进行 TypeScript 的类型检查（需要禁用掉 ts-loader 自带的类型检查）。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fprivatenumber%2Fesbuild-loader" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/privatenumber/esbuild-loader" ref="nofollow noopener noreferrer">esbuild-loader</a>，基于 ESBuild 的 Webpack Loader，放在这里是因为它基本可以完全替代 ts-loader 来编译 ts 文件。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Frollup-plugin-dts" target="_blank" rel="nofollow noopener noreferrer" title="https://www.npmjs.com/package/rollup-plugin-dts" ref="nofollow noopener noreferrer">rollup-plugin-dts</a>，能够将你项目内定义与编译生成的类型声明文件重新进行打包。</li>
<li><a href="https://link.juejin.cn?target=https%3A%2F%2Fparceljs.org%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://parceljs.org/" ref="nofollow noopener noreferrer">Parcel</a>，一个 Bundler，与 Webpack、Rollup 的核心差异是零配置，不需要任何 loader 或者 plugin 配置就能对常见基本所有的样式方案、语言方案、框架方案进行打包。我在之前搭过一个基于 Parcel 的项目起手式：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FLinbuduLab%2FParcel-Tsx-Template" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/LinbuduLab/Parcel-Tsx-Template" ref="nofollow noopener noreferrer">Parcel-Tsx-Template</a>，可以来感受一下<strong>零配置</strong>是什么体验。</li>
</ul>
<h2 data-id="heading-8">总结与预告</h2>
<p>这一节我们汇总了各个场景下的 TypeScript 工具库，就像开头所说，本节的内容会持续更新，如果你还使用过其它让你赞不绝口的工具库，欢迎在评论区或答疑群提交给我。</p>
<p>下一节，我们会来了解一个对你来说可能熟悉又陌生的名词：ECMAScript，包括它到底代表了什么，和 TypeScript 的关系如何，TypeScript 中的 ECMAScript 语法如何使用，以及未来的 ECMAScript 怎么样。</p></div>
