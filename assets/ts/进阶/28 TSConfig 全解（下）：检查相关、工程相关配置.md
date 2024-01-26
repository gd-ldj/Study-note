<div class="markdown-body"><p>上一节我们介绍了构建相关的 TSConfig 配置，包括源码相关、解析相关、产物相关等几个部分，这一节我们会接着来介绍类型检查与工程相关的 TSConfig。</p>
<blockquote>
<p>本节代码见：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flinbudu599%2FTypeScript-Tiny-Book%2Ftree%2Fmain%2Fpackages%2F22-project-references%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/linbudu599/TypeScript-Tiny-Book/tree/main/packages/22-project-references/" ref="nofollow noopener noreferrer">Project References</a></p>
</blockquote>
<h2 data-id="heading-0">检查相关</h2>
<p>这部分的配置主要控制对源码中语法与类型检查的严格程度，这也是导致 TypeScript 项目下限与上限差异巨大的主要原因，检查全开与全关下的 TypeScript 简直就是两门不同的语言。但并不是说检查越严格越好，更好的方式是依据实际需要来调整检查的严格程度，比如小小 demo 就不需要太严格检查啦。</p>
<p>对于推荐使用的配置，我也会在介绍时指出。</p>
<h3 data-id="heading-1">允许类</h3>
<p>这一部分的配置关注的语法通常是有害的，且默认情况下为禁用或者给出警告，因此需要显式通过配置来允许这些有害语法，它们的名称均为 allowXXX 这种形式。</p>
<h4 data-id="heading-2">allowUmdGlobalAccess</h4>
<p>这一配置会允许你直接使用 UMD 格式的模块而不需要先导入，比如你通过 CDN 引入或是任何方式来确保全局一定会有这个变量。而 UMD 格式其实就是通用模块规范，兼容了 AMD 与 CommonJs（通过判断当前环境下哪种规范可用就使用哪种规范），示例如下：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// 源码</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">handler</span> = (<span class="hljs-params"></span>) =&gt; { };</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-comment">// UMD 编译结果</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">(<span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-variable language_">global</span>, factory</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="6">    <span class="hljs-comment">// 尝试使用 CommonJs</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">module</span> === <span class="hljs-string">"object"</span> &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> === <span class="hljs-string">"object"</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="8">        <span class="hljs-keyword">var</span> v = <span class="hljs-title function_">factory</span>(<span class="hljs-built_in">require</span>, <span class="hljs-built_in">exports</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="9">        <span class="hljs-keyword">if</span> (v !== <span class="hljs-literal">undefined</span>) <span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = v;</span>
<span class="code-block-extension-codeLine" data-line-num="10">    }</span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-comment">// 尝试使用 AMD</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">"function"</span> &amp;&amp; define.<span class="hljs-property">amd</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="13">        <span class="hljs-title function_">define</span>([<span class="hljs-string">"require"</span>, <span class="hljs-string">"exports"</span>], factory);</span>
<span class="code-block-extension-codeLine" data-line-num="14">    }</span>
<span class="code-block-extension-codeLine" data-line-num="15">    <span class="hljs-comment">// 兜底，使用全局变量挂载</span></span>
<span class="code-block-extension-codeLine" data-line-num="16">    <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="17">      (<span class="hljs-variable language_">global</span> = <span class="hljs-variable language_">global</span> || self, <span class="hljs-variable language_">global</span>.<span class="hljs-property">handle</span> = <span class="hljs-title function_">factory</span>());</span>
<span class="code-block-extension-codeLine" data-line-num="18">    }</span>
<span class="code-block-extension-codeLine" data-line-num="19">})(<span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-built_in">require</span>, <span class="hljs-built_in">exports</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="20">    <span class="hljs-string">"use strict"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="21">    <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">defineProperty</span>(<span class="hljs-built_in">exports</span>, <span class="hljs-string">"__esModule"</span>, { <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> });</span>
<span class="code-block-extension-codeLine" data-line-num="22">    <span class="hljs-built_in">exports</span>.<span class="hljs-property">handler</span> = <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="23">    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handler</span> = (<span class="hljs-params"></span>) =&gt; { };</span>
<span class="code-block-extension-codeLine" data-line-num="24">    <span class="hljs-built_in">exports</span>.<span class="hljs-property">handler</span> = handler;</span>
<span class="code-block-extension-codeLine" data-line-num="25">});</span>
</code></pre>
<p>可以看到，它依次判断了 CommonJS 与 AMD 的情况，并最后使用了全局变量来进行兜底。因此你既可以导入它来使用，也可以直接在全局访问它。</p>
<h4 data-id="heading-3">allowUnreachableCode</h4>
<p>Unreachable Code 通常指的是无法执行到的代码，也称 Dead Code，常见的 Unreachable Code 包括 return 语句、throw 语句以及 <code>process.exit</code> 后的代码：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">foo</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> <span class="hljs-number">599</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Dead Code'</span>); <span class="hljs-comment">// Dead Code</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">function</span> <span class="hljs-title function_">bar</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'Oops!'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Dead Code'</span>); <span class="hljs-comment">// Dead Code</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
</code></pre>
<p>allowUnreachableCode 配置的默认值为 undefined，表现为在编译过程中并不会抛出阻止过程的错误，而只是一个警告。它也可以配置为 true（完全允许）与 false （抛出一个错误）。</p>
<h4 data-id="heading-4">allowUnusedLabels</h4>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Flabel" target="_blank" rel="nofollow noopener noreferrer" title="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label" ref="nofollow noopener noreferrer">Label</a> 并不是我们经常会接触的概念，它的语法大致是这样：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-attr">someLabel</span>:</span>
<span class="code-block-extension-codeLine" data-line-num="2">	statement</span>
</code></pre>
<p>statement 语句会被标记为 someLabel ，然后在别的地方你就可以用 someLabel 来引用这段语句。如标记一个函数（非严格模式下）：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-attr">L</span>: <span class="hljs-keyword">function</span> <span class="hljs-title function_">F</span>(<span class="hljs-params"></span>) {}</span>
</code></pre>
<p>如果在一个代码块中使用 label ，效果和对象字面量非常相似：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">{</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">L</span>: <span class="hljs-keyword">function</span> <span class="hljs-title function_">F</span>(<span class="hljs-params"></span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
</code></pre>
<p>为了区分 label 与对象字面量，这条规则禁止了声明但没有被实际使用的 label 标记：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">verifyAge</span>(<span class="hljs-params">age: <span class="hljs-built_in">number</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">if</span> (age &gt; <span class="hljs-number">18</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-comment">// Unused label.</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-attr">verified</span>: <span class="hljs-literal">true</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  }</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
</code></pre>
<p>这段代码实际上想返回一个对象字面量，但却忘记了 return ，导致这里错误地声明了一个 Label。</p>
<p>类似于 allowUnreachableCode，这条配置也可使用 undefined（默认）、true、false 三个值，且效果也一致。</p>
<h3 data-id="heading-5">禁止类</h3>
<p>这部分配置的关注点其实除了类型，也包括实际的代码逻辑，它们主要关注未被妥善处理的逻辑代码与无类型信息（手动标注与自动推导均无）的部分。另外，部分代码逻辑检查实际上 ESLint 也可以提供。</p>
<p>这部分配置的值通常只有 true 或者 false，因此我们在下面只会对存在额外特殊情况的配置值做讲解。</p>
<h4 data-id="heading-6">类型检查</h4>
<h5 data-id="heading-7">noImplicitAny</h5>
<p>在你没有为变量或参数指定类型，同时 TypeScript 也无法自动推导其类型时，这里变量的类型就会被推导为 any。而推导为 any 类型就意味着丧失了类型检查：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">fn</span>(<span class="hljs-params">s</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(s.<span class="hljs-title function_">includes</span>(<span class="hljs-string">'linbudu'</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-title function_">fn</span>(<span class="hljs-number">42</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-title function_">fn</span>(<span class="hljs-literal">true</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-title function_">fn</span>({});</span>
</code></pre>
<p>在这个例子中函数 fn 的参数 s 没有声明类型，因而被推导为 any，这就导致你可以使用任意类型的值来调用，这无疑是非常危险的。如果你希望禁止这一类行为，可以启用 noImplicitAny 配置，然后这种由于无类型标注导致的隐式 any 类型推导就会抛出一个错误。当然，你仍然可以显式地标记一个类型为 any，但这时就意味着，<strong>你确实希望它是一个 any 类型</strong>。</p>
<h5 data-id="heading-8">useUnknownInCatchVariables</h5>
<p>启用此配置后，try/catch 语句中 catch 的 error 类型会被更改为 unknown （否则是 any 类型）。这样可以在类型层面确保在 catch 语句中对 error 进行更妥当的处理：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">try</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-comment">// 一个自定义的错误类</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">NetworkError</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="5">} <span class="hljs-keyword">catch</span> (err) {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">NetworkError</span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">AuthError</span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">CustomError</span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
</code></pre>
<h4 data-id="heading-9">逻辑检查</h4>
<h5 data-id="heading-10">noFallthroughCasesInSwitch</h5>
<p>这一配置确保在你的 switch case 语句中不会存在连续执行多个 case 语句的情况。注意，连续执行指的是某一个 case 中自己执行了专属逻辑后，由于没有 break / return 语句导致继续向下执行。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-attr">a</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"> </span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">switch</span> (a) {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:</span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"zero"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:</span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"one"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:</span>
<span class="code-block-extension-codeLine" data-line-num="9">    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"two"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="10">    <span class="hljs-keyword">break</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="11">}</span>
</code></pre>
<p>在这个例子中，case 0、case 1、case 2 的语句都会执行！这是因为在 JavaScript 中，当 switch case 语句执行完毕匹配的那个 case 子句后，如果没有 break 或者 return，就会接着往下执行下一个 case，而不论其条件是否匹配。</p>
<h5 data-id="heading-11">noImplicitOverride</h5>
<p>在函数与 Class 一节我们有讲到，在派生类继承于基类时，通常我们<strong>不希望去覆盖基类已有的方法</strong>（SOLID 原则），这样可以确保在任何需要基类的地方，我们都可以放心地传入一个派生类。</p>
<p>在真的需要覆盖基类方法时，推荐的方式是使用 override 关键字，标明此方法覆盖了基类中的方法。而 <code>noImplicitOverride</code> 这一配置的作用，就是避免你在不使用 override 关键字的情况下就覆盖了基类方法。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Base</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-title function_">print</span>(<span class="hljs-params"></span>) { }</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Derived1</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Base</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">override</span> <span class="hljs-title function_">print</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">  }</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Derived2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Base</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-comment">// 错误！没有使用 override 关键字</span></span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-title function_">print</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="14">    <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="15">  }</span>
<span class="code-block-extension-codeLine" data-line-num="16">}</span>
</code></pre>
<h5 data-id="heading-12">noImplicitReturns</h5>
<p>这一配置会确保所有返回值类型中不包含 undefined 的函数，在其内部所有的执行路径上都需要有 return 语句：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// 函数缺少结束 return 语句，返回类型不包括 "undefined"。</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">color: <span class="hljs-string">'blue'</span> | <span class="hljs-string">'black'</span></span>): <span class="hljs-built_in">string</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-keyword">if</span> (color === <span class="hljs-string">'blue'</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-keyword">return</span> <span class="hljs-string">'beats'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  } <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">    (<span class="hljs-string">'bose'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="7">  }</span>
<span class="code-block-extension-codeLine" data-line-num="8">}</span>
</code></pre>
<p>我们在 else 分支忘记了 return，这里立刻就给到了一个报错。这一配置可以确保在存在复杂嵌套路径的函数中，所有路径最后都显式执行了 return 。举例来说，假设我们的函数希望先检查一遍参数，如果不符要求就提前返回，此时如果忘记添加 return，会导致后面的逻辑仍然错误执行。</p>
<h5 data-id="heading-13">noImplicitThis</h5>
<p>JavaScript 代码中，我们其实经常见到 this，this 的指向也一直是一个很烦人的问题。虽然在 ES6 占据主导地位的今天，我们通常只会在 Class 内部使用 this，TypeScript 还是为 this 留了一席之地。比如函数与 Class 的方法中，实际上第一个参数是 this：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">foo</span>(<span class="hljs-params"><span class="hljs-variable language_">this</span>: <span class="hljs-built_in">any</span>, name: <span class="hljs-built_in">string</span></span>) {}</span>
</code></pre>
<p>这个 this 参数实际上就是函数执行时指向的 this，你可以在实际情况中灵活地指定 this 为具体类型。如果你并不声明 this 类型而是直接访问，就会得到一个错误：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">foo</span>(<span class="hljs-params">name: <span class="hljs-built_in">string</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-comment">// "this" 隐式具有类型 "any"，因为它没有类型注释。</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = name;</span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
</code></pre>
<p>这就是 <code>noImplicitThis</code> 配置所关注的内容，它确保你在使用 this 语法时一定能够确定 this 的具体类型，当然，你仍然可以使用 any 。</p>
<h5 data-id="heading-14">noPropertyAccessFromIndexSignature 与 noUncheckedIndexedAccess</h5>
<p>在索引类型一节我们知道，可以通过索引签名类型来声明一个仅确定键值类型而不确定具体属性的接口：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AllStringTypes</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropType1</span> = <span class="hljs-title class_">AllStringTypes</span>[<span class="hljs-string">'unknownProp'</span>]; <span class="hljs-comment">// string</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropType2</span> = <span class="hljs-title class_">AllStringTypes</span>[<span class="hljs-string">'name'</span>]; <span class="hljs-comment">// string</span></span>
</code></pre>
<p>索引类型签名的确可以帮助你快速生成一个随意使用的接口结构，但在某些时候也会带来危险，比如你忘记了检查这个属性是不是真的存在。</p>
<p>这两条配置的功能就是让对基于索引签名类型声明的结构属性访问更安全一些，其中 <code>noPropertyAccessFromIndexSignature</code> 配置禁止了对未知属性（如 <code>'unknownProp'</code>）的访问，即使它们已在索引类型签名中被隐式声明。而对于具体声明的已知属性访问，如 <code>name</code> 则不会有问题。</p>
<p>而 <code>noUncheckedIndexedAccess</code> 配置则宽松一些，它会将一个 undefined 类型附加到对未知属性访问的类型结果上，比如 <code>PropType1</code> 的类型会是 <code>string | undefined</code>，这样能够提醒你在对这个属性进行读写时进行一次空检查。</p>
<h5 data-id="heading-15">noUnusedLocals 与 noUnusedParameters</h5>
<p>是否允许存在<strong>声明但未使用的变量和函数参数</strong>，就像 ESLint 一样，这里就不做介绍了。</p>
<h3 data-id="heading-16">严格检查</h3>
<h4 data-id="heading-17">exactOptionalPropertyTypes</h4>
<p>这一配置会使得 TypeScript 对可选属性（即使用 <code>?</code> 修饰的属性）启用更严格检查，如以下这个例子：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ITheme</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  prefer?: <span class="hljs-string">"dark"</span> | <span class="hljs-string">"light"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
</code></pre>
<p>默认情况下，prefer 属性的类型实际为 <code>"dark" | "light" | undefined</code>，也就是说你可以这么做：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ITheme</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  prefer?: <span class="hljs-string">"dark"</span> | <span class="hljs-string">"light"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">theme</span>: <span class="hljs-title class_">ITheme</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7">theme.<span class="hljs-property">prefer</span> = <span class="hljs-string">"dark"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8">theme.<span class="hljs-property">prefer</span> = <span class="hljs-string">"light"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9">theme.<span class="hljs-property">prefer</span> = <span class="hljs-literal">undefined</span>;</span>
</code></pre>
<p>将这个属性设置为 undefined 其实很容易造成困惑，你是希望这个属性被移除掉呢，还是希望表示这个属性目前没有值（这时难道不应该用 null 吗）？</p>
<p>为了避免这一情况，你可以启用 <code>exactOptionalPropertyTypes</code> 配置，此时 undefined 不会再被允许作为可选属性的值，除非你显式添加一个 undefined 类型。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// 类型 “undefined” 不能分配给“exactOptionalPropertyTypes: true”的类型 “"dark" | "light"”。请考虑将 “undefined” 添加到目标类型。</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">theme.<span class="hljs-property">prefer</span> = <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ITheme</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-comment">// 需要这么做才可以</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">  prefer?: <span class="hljs-string">"dark"</span> | <span class="hljs-string">"light"</span> | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
</code></pre>
<h4 data-id="heading-18">alwaysStrict</h4>
<p>还记得 ES5 中的严格模式吗？这一配置就是它在 TS 中的体现，alwaysStrict 配置会使得 TS 对所有文件使用严格模式进行检查（表现在会禁用掉一部分语法），同时生成的 js 文件开头也会有 <code>'use strict'</code> 标记。</p>
<h4 data-id="heading-19">strict</h4>
<p>strict 其实是一组规则的开关，开启 strict 会默认将这些规则全部启用，包括：</p>
<ul>
<li><code>alwaysStrict</code>、<code>useUnknownInCatchVariables</code></li>
<li><code>noFallthroughCasesInSwitch</code>、<code>noImplicitAny</code>、<code>noImplicitThis</code></li>
<li><code>strictNullChecks</code>、<code>strictBindCallApply</code>、<code>strictFunctionTypes</code>、<code>strictPropertyInitialization</code></li>
</ul>
<p>这些规则我们均会在接下来介绍。</p>
<h4 data-id="heading-20">strictBindCallApply</h4>
<p>JavaScript 中可以通过 bind、call、apply 来改变一个函数的 this 指向，绝大部分情况下即使改变了 this 指向，函数的入参也应当是不变的。这条配置会确保在使用 bind、call、apply 方法时，其第二个入参（即<strong>将用于调用原函数的入参</strong>）需要与原函数入参类型保持一致：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">fn</span>(<span class="hljs-params">x: <span class="hljs-built_in">string</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>(x);</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> n1 = fn.<span class="hljs-title function_">call</span>(<span class="hljs-literal">undefined</span>, <span class="hljs-string">'10'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-comment">// 类型“boolean”的参数不能赋给类型“string”的参数。</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">const</span> n2 = fn.<span class="hljs-title function_">call</span>(<span class="hljs-literal">undefined</span>, <span class="hljs-literal">false</span>);</span>
</code></pre>
<h4 data-id="heading-21">strictFunctionTypes</h4>
<p>对函数类型启用更严格的检查，即我们在函数类型比较一节中讲到的，对参数类型启用逆变检查。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">fn</span>(<span class="hljs-params">x: <span class="hljs-built_in">string</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Hello, '</span> + x.<span class="hljs-title function_">toLowerCase</span>());</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">type</span> <span class="hljs-title class_">StringOrNumberFunc</span> = <span class="hljs-function">(<span class="hljs-params">ns: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-comment">// 不能将类型“string | number”分配给类型“string”。</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">let</span> <span class="hljs-attr">func</span>: <span class="hljs-title class_">StringOrNumberFunc</span> = fn;</span>
</code></pre>
<p>需要注意的是，对于接口中的函数类型，只有通过 property 形式声明才会接受严格检查，即以下代码不会被检查出错误：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Methodish</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-title function_">func</span>(<span class="hljs-attr">x</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
<span class="code-block-extension-codeLine" data-line-num="4"> </span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">function</span> <span class="hljs-title function_">fn</span>(<span class="hljs-params">x: <span class="hljs-built_in">string</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Hello, "</span> + x.<span class="hljs-title function_">toLowerCase</span>());</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
<span class="code-block-extension-codeLine" data-line-num="8"> </span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">const</span> <span class="hljs-attr">m</span>: <span class="hljs-title class_">Methodish</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-comment">// 没有对函数参数类型进行逆变检查</span></span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-attr">func</span>: fn,</span>
<span class="code-block-extension-codeLine" data-line-num="12">};</span>
<span class="code-block-extension-codeLine" data-line-num="13"></span>
<span class="code-block-extension-codeLine" data-line-num="14"><span class="hljs-comment">// 实际运行将会报错</span></span>
<span class="code-block-extension-codeLine" data-line-num="15">m.<span class="hljs-title function_">func</span>(<span class="hljs-number">10</span>);</span>
</code></pre>
<h4 data-id="heading-22">strictNullChecks</h4>
<p><strong>这是在任何规模项目内都应该开启的一条规则</strong>。在这条规则关闭的情况下，null 和 undefined 会被隐式地视为任何类型的子类型，还记得我们前面的例子吗？</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// 以下两个仅在关闭 strictNullChecks 时成立</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">const</span> <span class="hljs-attr">tmp3</span>: <span class="hljs-built_in">string</span> = <span class="hljs-literal">null</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> <span class="hljs-attr">tmp4</span>: <span class="hljs-built_in">string</span> = <span class="hljs-literal">undefined</span>;</span>
</code></pre>
<p>在某些可能产生 <code>string | undefined</code> 类型的方法中，如果关闭了 strictNullChecks 检查，就意味着很可能下面会遇到一个 <em><strong>cannot read property 'xxx' of undefined</strong></em> 的错误：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-attr">matcher</span>: <span class="hljs-built_in">string</span> = <span class="hljs-string">"budu"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> list = [<span class="hljs-string">'linbudu'</span>, <span class="hljs-string">'599'</span>];</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-comment">// 为 string 类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">const</span> target = list.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> u.<span class="hljs-title function_">includes</span>(matcher));</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(target.<span class="hljs-title function_">replace</span>(<span class="hljs-string">'budu'</span>, <span class="hljs-string">'wuhu'</span>));</span>
</code></pre>
<p>在这里，target 的类型应该是 <code>string | undefined</code>，下面的 <code>target.replace</code> 访问并不一定能成功。但关闭了 strictNullChecks 检查之后，我们就不能及时发现这一点了。</p>
<h4 data-id="heading-23">strictPropertyInitialization</h4>
<p>这一配置要求 Class 中的所有属性都需要存在一个初始值，无论是在声明时就提供还是在构造函数中初始化。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Foo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">prop1</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">599</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">prop2</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-comment">// 属性“prop3”没有初始化表达式，且未在构造函数中明确赋值。</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">prop3</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> prop4: <span class="hljs-built_in">number</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-variable language_">this</span>.<span class="hljs-property">prop2</span> = prop4;</span>
<span class="code-block-extension-codeLine" data-line-num="9">  }</span>
<span class="code-block-extension-codeLine" data-line-num="10">}</span>
</code></pre>
<p>这条配置有时候也不完全合理，如我们将初始化逻辑放在一个单独函数中：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Foo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">prop1</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">599</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">prop2</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-comment">// 属性“prop3”没有初始化表达式，且未在构造函数中明确赋值。</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">prop3</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> prop4: <span class="hljs-built_in">number</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-variable language_">this</span>.<span class="hljs-property">prop2</span> = prop4;</span>
<span class="code-block-extension-codeLine" data-line-num="9">    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">init</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="10">  }</span>
<span class="code-block-extension-codeLine" data-line-num="11"></span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-title function_">init</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="13">    <span class="hljs-variable language_">this</span>.<span class="hljs-property">prop3</span> = <span class="hljs-number">599</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="14">  }</span>
<span class="code-block-extension-codeLine" data-line-num="15">}</span>
</code></pre>
<p>此时报错仍然存在，但我们其实已经确保了有初始值的存在。这种情况下可以依据实际需要使用非空断言或可选修饰：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Foo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  prop3!: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  _prop3?: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
</code></pre>
<h3 data-id="heading-24">skipLibCheck 与 skipDefaultLibCheck</h3>
<p>默认情况下，TypeScript 会对加载的类型声明文件也进行检查，包括内置的 <code>lib.d.ts</code> 系列与 <code>@types/</code> 下的声明文件。在某些时候，这些声明文件可能存在冲突，比如两个不同来源的声明文件使用不同的类型声明了一个全局变量。此时，你就可以使用 skipLibCheck 跳过对这些类型声明文件的检查，这也能进一步加快编译速度。</p>
<p><code>skipDefaultLibCheck</code> 类似于 <code>skipLibCheck</code> ，但它只会跳过那些使用了 <code>/// &lt;reference no-default-lib="true"/&gt;</code> 指令的声明文件（如内置的 <code>lib.d.ts</code>），这一三斜线指令的作用即是<strong>将此文件标记为默认库声明</strong>，因此开启这一配置后，编译器在处理其文件时不会再尝试引入默认库声明。</p>
<h2 data-id="heading-25">工程相关</h2>
<h3 data-id="heading-26">Project References</h3>
<p>Project References 这一配置使得你可以将整个工程拆分成多个部分，比如你的 UI 部分、Hooks 部分以及主应用等等。这一功能和 Monorepo 非常相似，但它并不需要各个子项目拥有自己独立的 package.json、独立安装依赖、独立构建等。通过 Project References ，我们可以定义这些部分的引用关系，为它们使用独立的 tsconfig 配置。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">    <span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-attr">"references"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">        <span class="hljs-punctuation">{</span> <span class="hljs-attr">"path"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../ui-components"</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">        <span class="hljs-punctuation">{</span> <span class="hljs-attr">"path"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../hooks"</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">      	<span class="hljs-punctuation">{</span> <span class="hljs-attr">"path"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../utils"</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-punctuation">}</span></span>
</code></pre>
<blockquote>
<p>关于具体项目，请参考我们仓库中的示例。</p>
</blockquote>
<p>这一特性实际上也让 tsc 不再只是一个编译器了，它现在还可以是一个类似于 lerna 那样的 Script Runner，即在多个子项目之间去确定一条顺序正确的构建链路。也因此，在使用 Project References 的项目中，需要使用 <code>tsc --build</code> 而非 <code>tsc</code> 来进行构建，此时 tsc 会首先确定整个引用关系图，然后检查上面作为子结点的项目是否是最新构建的，最后才基于引用顺序去构建这些非最新的项目。</p>
<p>我们可以来实际体验一下，假设要构建的项目结构是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">PROJECT</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── app</span>
<span class="code-block-extension-codeLine" data-line-num="3">│ &nbsp; ├── index.ts</span>
<span class="code-block-extension-codeLine" data-line-num="4">│ &nbsp; ├── tsconfig.json</span>
<span class="code-block-extension-codeLine" data-line-num="5">├── core</span>
<span class="code-block-extension-codeLine" data-line-num="6">│ &nbsp; ├── index.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">│ &nbsp; ├── tsconfig.json</span>
<span class="code-block-extension-codeLine" data-line-num="8">├── ui</span>
<span class="code-block-extension-codeLine" data-line-num="9">│ &nbsp; ├── index.ts</span>
<span class="code-block-extension-codeLine" data-line-num="10">│ &nbsp; ├── tsconfig.json</span>
<span class="code-block-extension-codeLine" data-line-num="11">├── utils</span>
<span class="code-block-extension-codeLine" data-line-num="12">│ &nbsp; ├── index.ts</span>
<span class="code-block-extension-codeLine" data-line-num="13">│ &nbsp; ├── tsconfig.json</span>
<span class="code-block-extension-codeLine" data-line-num="14">├── tsconfig.base.json</span>
</code></pre>
<p>这四个项目的引用关系是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">app -&gt; core, ui, utils</span>
<span class="code-block-extension-codeLine" data-line-num="2">core -&gt; utils</span>
</code></pre>
<p>这四个项目可以使用完全独立的 TSConfig 配置，如 utils 的 target 为 ES5，而 app 的 target 则可以是 ESNext ，那么检查配置、功能配置等自然也可以不同。</p>
<p>首先，在 <code>app/tsconfig.json</code> 中定义引用关系：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"> &nbsp;<span class="hljs-attr">"extends"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../tsconfig.base.json"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"> &nbsp;<span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"> &nbsp; &nbsp;<span class="hljs-attr">"target"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"ESNext"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"> &nbsp; &nbsp;<span class="hljs-attr">"module"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"ESNext"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"> &nbsp; &nbsp;<span class="hljs-attr">"baseUrl"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"."</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"> &nbsp; &nbsp;<span class="hljs-attr">"outDir"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../dist/app"</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"> &nbsp;<span class="hljs-attr">"include"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"./**/*.ts"</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="10"> &nbsp;<span class="hljs-attr">"references"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="code-block-extension-codeLine" data-line-num="11"> &nbsp;  <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="12"> &nbsp; &nbsp; &nbsp;<span class="hljs-attr">"path"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../utils"</span></span>
<span class="code-block-extension-codeLine" data-line-num="13"> &nbsp;  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="14"> &nbsp;  <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="15"> &nbsp; &nbsp; &nbsp;<span class="hljs-attr">"path"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../core"</span></span>
<span class="code-block-extension-codeLine" data-line-num="16"> &nbsp;  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="17"> &nbsp;  <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="18"> &nbsp; &nbsp; &nbsp;<span class="hljs-attr">"path"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../ui"</span></span>
<span class="code-block-extension-codeLine" data-line-num="19"> &nbsp;  <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="20">  <span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="21"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>这里的 outDir 被配置为父级目录，因为我们仍然希望这四个项目的构建产物被放置在同一个文件夹下，你也可以根据自己的实际需要定制。</p>
<p>core 、utils、ui 这三个项目中也是类似：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"> &nbsp;<span class="hljs-attr">"extends"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../tsconfig.base.json"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"> &nbsp;<span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"> &nbsp; &nbsp;<span class="hljs-attr">"composite"</span><span class="hljs-punctuation">:</span> <span class="hljs-keyword">true</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"> &nbsp; &nbsp;<span class="hljs-attr">"baseUrl"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"."</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"> &nbsp; &nbsp;<span class="hljs-attr">"outDir"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../dist/core"</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"> &nbsp;<span class="hljs-attr">"include"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"./**/*.ts"</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"> &nbsp;<span class="hljs-attr">"references"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="code-block-extension-codeLine" data-line-num="10"> &nbsp;  <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="11"> &nbsp; &nbsp; &nbsp;<span class="hljs-attr">"path"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../utils"</span></span>
<span class="code-block-extension-codeLine" data-line-num="12"> &nbsp;  <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="14"><span class="hljs-punctuation">}</span></span>
</code></pre>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"> &nbsp;<span class="hljs-attr">"extends"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../tsconfig.base.json"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"> &nbsp;<span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"> &nbsp; &nbsp;<span class="hljs-attr">"composite"</span><span class="hljs-punctuation">:</span> <span class="hljs-keyword">true</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"> &nbsp; &nbsp;<span class="hljs-attr">"target"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"ES5"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"> &nbsp; &nbsp;<span class="hljs-attr">"module"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"commonjs"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"> &nbsp; &nbsp;<span class="hljs-attr">"baseUrl"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"."</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"> &nbsp; &nbsp;<span class="hljs-attr">"outDir"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../dist/utils"</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="10"> &nbsp;<span class="hljs-attr">"include"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"./**/*.ts"</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-punctuation">}</span></span>
</code></pre>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"> &nbsp;<span class="hljs-attr">"extends"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../tsconfig.base.json"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"> &nbsp;<span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"> &nbsp; &nbsp;<span class="hljs-attr">"composite"</span><span class="hljs-punctuation">:</span> <span class="hljs-keyword">true</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"> &nbsp; &nbsp;<span class="hljs-attr">"baseUrl"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"."</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"> &nbsp; &nbsp;<span class="hljs-attr">"outDir"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../dist/ui"</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"> &nbsp;<span class="hljs-attr">"include"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"./**/*.ts"</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>在 <code>app/index.ts</code> 中去引用其余三个项目：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { util } <span class="hljs-keyword">from</span> <span class="hljs-string">'../utils'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> { core } <span class="hljs-keyword">from</span> <span class="hljs-string">'../core'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">import</span> { ui } <span class="hljs-keyword">from</span> <span class="hljs-string">'../ui'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">​</span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">app</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="6"> &nbsp;<span class="hljs-title function_">ui</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="7"> &nbsp;<span class="hljs-title function_">core</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="8"> &nbsp;<span class="hljs-title function_">util</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="9"> &nbsp;<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'app!'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="10">};</span>
</code></pre>
<p>其他三个项目的导出函数也只是一个简单函数，这里就不展示代码了。</p>
<p>现在来执行构建命令：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">tsc --build app</span>
</code></pre>
<blockquote>
<p><code>tsc --build</code> 命令下无需也不能使用 <code>--project</code> 配置，直接指定文件夹即可。</p>
</blockquote>
<p>构建后的产物是这样的：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad4c509346b84c9e85bc66aaa80af458~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<p>可以看到 app 中声明的子项目引用也被一同构建，同时这些子项目的构建产物中会有 <code>tsconfig.tsbuildinfo</code> 文件来缓存本次的构建信息。</p>
<p>你也可以在 build 模式下启用监听：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">tsc --build --watch app</span>
</code></pre>
<p>此时如果你修改一个子项目，tsc 会自动进行增量构建，跳过没有发生变化的项目，只构建那些发生了更改的部分。</p>
<p>另外，如果你在某个项目内通过 Ctrl /Command + 点击的方式跳转到一个导入的实现，你会发现能够直接跳转到这个实现的源码而非类型定义，这同样能帮助你的开发效率 up up！</p>
<h4 data-id="heading-27">composite</h4>
<p>composite 属于 compilerOptions 内部的配置，在 Project References 的被引用子项目 <code>tsconfig.json</code> 中必须为启用状态，它通过一系列额外的配置项，确保你的子项目能被 Project References 引用，而在子项目中必须启用 declaration ，必须通过 files 或 includes 声明子项目内需要包含的文件等。</p>
<h3 data-id="heading-28">兼容性</h3>
<h4 data-id="heading-29">isolatedModules</h4>
<p>我们常常提到的，构建过程会使用 TypeScript 配合其他构建器，如 ESBuild、SWC、Babel 等。通常在这个过程中，类型相关的检查会完全交由 TypeScript 处理，因为这些构建器只能执行语法降级与打包。</p>
<p>由于这些构建器通常是独立地处理每个文件，这也就意味着如果存在如类型导入、namespace 等特殊语法时，它们无法像 tsc 那样去全面分析这些关系后再进行处理。此时我们可以启用 isolatedModules 配置，它会确保每个文件都能被视为一个独立模块，因此也就能够被这些构建器处理。</p>
<p>启用 isolatedModules 后，所有代码文件（不包括声明文件）都需要至少存在一个导入或导出语句（比如最简单的情况下可以使用 <code>export {}</code>），无法导出类型（ESBuild 并不知道这个值是类型还是值）以及无法使用 namespace 与常量枚举（常量枚举在构建后会被内联到产物中）。</p>
<p>除了这些构建器以外，isolatedModules 配置也适用于使用 TS Compiler API 中的 transpileModule 方法，这个方法类似于 Babel，不会生成声明文件，只会进行单纯的语法降级。</p>
<h4 data-id="heading-30">JavaScript 相关</h4>
<h5 data-id="heading-31">allowJs</h5>
<p>只有在开启此配置后，你才能在 <code>.ts</code> 文件中去导入 <code>.js</code> / <code>.jsx</code> 文件。</p>
<h5 data-id="heading-32">checkJs</h5>
<p>checkJs 通常用于配合 allowJs 使用，为 <code>.js</code> 文件提供尽可能全面的类型检查。我们在类型指令一节学习过 <code>@ts-check</code> 指令，这一配置就相当于为所有 JavaScript 文件标注了 <code>@ts-check</code>。</p>
<p>如果你希望禁用对部分 JavaScript 文件的检查，或者仅对部分 JavaScript 文件进行检查，可以对应地使用 <code>@ts-nocheck</code> 和 <code>@ts-check</code>。</p>
<h4 data-id="heading-33">模块相关</h4>
<h5 data-id="heading-34">esModuleInterop 与 allowSyntheticDefaultImports</h5>
<p>这两个配置主要还是为了解决 ES Module 和 CommonJS 之间的兼容性问题。</p>
<p>通常情况下，ESM 调用 ESM，CJS 调用 CJS，都不会有问题。但如果是 ESM 调用 CJS ，就可能遇到奇怪的问题。比如 React 中的源码中是这样导出的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// react/cjs/react.development.js</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-built_in">exports</span>.<span class="hljs-property">Children</span> = <span class="hljs-title class_">Children</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-built_in">exports</span>.<span class="hljs-property">useState</span> = useState;</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-built_in">exports</span>.<span class="hljs-property">memo</span> = memo;</span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-built_in">exports</span>.<span class="hljs-property">useEffect</span> = useEffect;</span>
</code></pre>
<p>假设我们分别使用具名导入、默认导入和命名空间导入来导入 React：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { useRef } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>; <span class="hljs-comment">// 具名导入（named import）</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>; <span class="hljs-comment">// 默认导入（default import）</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> <span class="hljs-title class_">ReactCopy</span> <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>; <span class="hljs-comment">// 命名空间导入（namespace import）</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(useRef);</span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">React</span>.<span class="hljs-property">useState</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">ReactCopy</span>.<span class="hljs-property">useEffect</span>)</span>
</code></pre>
<p>这样的代码在默认情况下（即没有启用 esModuleInterop）会被编译为：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-meta">"use strict"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-title class_">Object</span>.<span class="hljs-title function_">defineProperty</span>(<span class="hljs-built_in">exports</span>, <span class="hljs-string">"__esModule"</span>, { <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> });</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> react_1 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">const</span> react_2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> <span class="hljs-title class_">ReactCopy</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(react_1.<span class="hljs-property">useRef</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(react_2.<span class="hljs-property">default</span>.<span class="hljs-property">useState</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">ReactCopy</span>.<span class="hljs-property">useEffect</span>);</span>
</code></pre>
<p>可以看到，默认导入的调用被转换为了 <code>react_2.default</code>，而具名导入和命名空间则不变，三种导入语句都被转换为了 CJS。</p>
<p>这是因为 TypeScript 默认将 CommonJs 也视为 ES Module 一样，对于具名导入，可以直接将 <code>module.exports.useRef = useRef</code> 和 <code>export const useRef = useRef </code>等价。但是由于 CommonJs 中并没有这个“默认导出”这个概念，  只能将 ES Module 中的默认导出 <code>export default</code> 强行等价于 <code>module.exports.default</code>，如上面的编译结果中的 <code>react_2.default</code>。这里的 default 就是一个属性名，和 <code>module.exports.foo</code> 是一个概念。</p>
<p>但 CommonJs 下存在着类似“命名空间导出”的概念，即 <code>const react = require("react") </code> 可以等价于 <code>import * as React from "react"</code>。</p>
<p>很明显，对于默认导出的情况，由于 React 中并没有使用 <code>module.exports.default</code> 提供（模拟）一个默认导出，因此 <code>react_2.default</code> 只可能是 undefined。</p>
<p>为了解决这种情况，TypeScript 中支持通过 esModuleInterop 配置来在 ESM 导入 CJS 这种情况时引入额外的辅助函数，进一步对兼容性进行支持，如上面的代码在开启配置后的构建产物会是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">var</span> __createBinding = (<span class="hljs-variable language_">this</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">__createBinding</span>) || (<span class="hljs-title class_">Object</span>.<span class="hljs-property">create</span> ? (<span class="hljs-keyword">function</span>(<span class="hljs-params">o, m, k, k2</span>) { <span class="hljs-comment">//... }));</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">var</span> __setModuleDefault = (<span class="hljs-variable language_">this</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">__setModuleDefault</span>) || (<span class="hljs-title class_">Object</span>.<span class="hljs-property">create</span> ? (<span class="hljs-keyword">function</span>(<span class="hljs-params">o, v</span>) { <span class="hljs-comment">//... });</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">var</span> __importStar = (<span class="hljs-variable language_">this</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">__importStar</span>) || <span class="hljs-keyword">function</span> (<span class="hljs-params">mod</span>) { <span class="hljs-comment">//... };</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">var</span> __importDefault = (<span class="hljs-variable language_">this</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">__importDefault</span>) || <span class="hljs-keyword">function</span> (<span class="hljs-params">mod</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-keyword">return</span> (mod &amp;&amp; mod.<span class="hljs-property">__esModule</span>) ? mod : { <span class="hljs-string">"default"</span>: mod };</span>
<span class="code-block-extension-codeLine" data-line-num="6">};</span>
<span class="code-block-extension-codeLine" data-line-num="7">  </span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-title class_">Object</span>.<span class="hljs-title function_">defineProperty</span>(<span class="hljs-built_in">exports</span>, <span class="hljs-string">"__esModule"</span>, { <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> });</span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">const</span> react_1 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">const</span> react_2 = <span class="hljs-title function_">__importDefault</span>(<span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">const</span> <span class="hljs-title class_">ReactCopy</span> = <span class="hljs-title function_">__importStar</span>(<span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="12"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(react_1.<span class="hljs-property">useRef</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="13"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(react_2.<span class="hljs-property">default</span>.<span class="hljs-property">useState</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="14"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title class_">ReactCopy</span>.<span class="hljs-property">useEffect</span>);</span>
</code></pre>
<p>这些辅助函数会确保 ESM 的默认导入（<code>__importDefault</code>） 与命名空间导入 （<code>__importStar</code>）能正确地对应到 CJS 中的导出，如<code> __importDefault</code> 会检查目标模块的使用规范，对 ESM 模块直接返回，否则将其挂载在一个对象的 default 属性上：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> react_2 = <span class="hljs-title function_">__importDefault</span>(<span class="hljs-built_in">require</span>(<span class="hljs-string">"react"</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-comment">// 转换结果等价于以下</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">const</span> react_2 = { <span class="hljs-attr">default</span>: { <span class="hljs-attr">useState</span>: {} } }</span>
</code></pre>
<p>而 <code>__importStar</code> （即命名空间导入的辅助函数）的实现则要复杂一些：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">var</span> __importStar = (<span class="hljs-variable language_">this</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">__importStar</span>) || <span class="hljs-keyword">function</span> (<span class="hljs-params">mod</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">    <span class="hljs-keyword">if</span> (mod &amp;&amp; mod.<span class="hljs-property">__esModule</span>) <span class="hljs-keyword">return</span> mod;</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-keyword">var</span> result = {};</span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-keyword">if</span> (mod != <span class="hljs-literal">null</span>) <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> mod) <span class="hljs-keyword">if</span> (k !== <span class="hljs-string">"default"</span> &amp;&amp; <span class="hljs-title class_">Object</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">hasOwnProperty</span>.<span class="hljs-title function_">call</span>(mod, k)) <span class="hljs-title function_">__createBinding</span>(result, mod, k);</span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-title function_">__setModuleDefault</span>(result, mod);</span>
<span class="code-block-extension-codeLine" data-line-num="6">    <span class="hljs-keyword">return</span> result;</span>
<span class="code-block-extension-codeLine" data-line-num="7">};</span>
</code></pre>
<p>它会在目标模块不是 ESM 规范时，将模块中除了 default 属性以外的导出都挂载到返回对象上（<code>__createBinding</code>），然后将这个对象的 default 属性设置为原本的模块信息（<code>__setModuleDefault</code>）。这样你既可以 <code>ReactCopy.useEffect</code> 访问某个值，也可以 <code>ReactCopy.default</code> 访问原本的模块。</p>
<p>这些辅助方法也属于 <code>importHelpers</code> 中的 helper，因此你也可以通过启用 <code>importHelpers</code> 配置来从 tslib 导入这些辅助方法。</p>
<p>实际上，由于 React 本身是通过 CommonJs 导出的，在你使用默认导入时， TS 也会提醒你此模块只能在启用了 <code>esModuleInterop</code> 的情况下使用默认导入。</p>
<p>启用 <code>esModuleInterop</code> 配置的同时，也会启用 <code>allowSyntheticDefaultImports</code> 配置，这一配置会为没有默认导出的 CJS 模块“模拟”出默认的导出，以提供更好的类型提示。如以下代码：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// handlers.js</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">errorHandler</span>: <span class="hljs-function">() =&gt;</span> {}</span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-comment">// index.js</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">import</span> handlers <span class="hljs-keyword">from</span> <span class="hljs-string">"./handlers"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-variable language_">window</span>.<span class="hljs-property">onerror</span> = handlers.<span class="hljs-property">errorHandler</span>;</span>
</code></pre>
<p>虽然这段代码转换后的实际逻辑没有问题，但由于这里并不存在 <code>module.exports.default</code> 导出，会导致在类型上出现一个错误。</p>
<p>启用 <code>allowSyntheticDefaultImports</code> 配置会在这种情况下将 handlers 中的代码模拟为以下的形式：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> allHandlers = {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">errorHandler</span>: <span class="hljs-function">() =&gt;</span> {}</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = allHandlers;</span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span>.<span class="hljs-property">default</span> = allHandlers;</span>
</code></pre>
<p>然后在导入方就能够获得正确的类型提示了，实际上这也是 Babel 实际的构建效果，但需要注意的是在 TypeScript 中 <code>allowSyntheticDefaultImports</code> 配置并不会影响最终的代码生成（不像 <code>esModuleInterop</code> 那样），只会对类型检查有帮助。</p>
<h3 data-id="heading-35">编译器相关</h3>
<h4 data-id="heading-36">incremental</h4>
<p>incremental 配置将启用增量构建，在每次编译时首先 diff 出发生变更的文件，仅对这些文件进行构建，然后将新的编译信息通过 <code>.tsbuildinfo</code> 存储起来。你可以使用 tsBuildInfoFile 配置项来控制这些编译信息文件的输出位置。</p>
<h4 data-id="heading-37">watch 相关</h4>
<p>我们可以通过 <code>tsc --watch</code> 来启动一个监听模式的 tsc，它会在代码文件发生变化（同样会对 node_modules 文件夹的变化进行监听，但只到文件夹级别）时重新进行编译。通常我们会搭配 incremental 选项。</p>
<p>你可以通过与 compilerOptions 同级的 watchOptions 来配置监听行为：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-attr">"target"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"es2020"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-attr">"moduleResolution"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"node"</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-attr">"watchOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-comment">// 如何监听文件</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">    <span class="hljs-attr">"watchFile"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"useFsEvents"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="10">    <span class="hljs-comment">// 如何监听目录</span></span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-attr">"watchDirectory"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"useFsEvents"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">    <span class="hljs-attr">"fallbackPolling"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"dynamicPriority"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="13">    <span class="hljs-attr">"synchronousWatchDirectory"</span><span class="hljs-punctuation">:</span> <span class="hljs-keyword">true</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="14">    <span class="hljs-attr">"excludeDirectories"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"**/node_modules"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"_build"</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="15">    <span class="hljs-attr">"excludeFiles"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"build/fileWhichChangesOften.ts"</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="16">  <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="17"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>对于 <code>watchFile</code> 与 <code>watchDirectory</code> 选项，TS 提供了 <code>useFsEvents</code>（使用操作系统的原生事件来进行监听）、<code>fixedPollingInterval</code>（不进行具体监听，而只是在每秒以固定的时间间隔后去检查发生变更的文件）、<code>priorityPollingInterval</code>（类似 fixedPollingInterval ，但对某些特殊类型文件的检查频率会降低）、<code>dynamicPriorityPolling</code>（对变更不频繁的文件，检查频率降低）、<code>useFsEventsOnParentDirectory</code>（对文件/目录的父文件夹使用原生事件监听） 等数个监听方式选择。</p>
<p>其他常用的选项则主要是用于减小监听范围的 <code>excludeDirectories</code> 与 <code>excludeFiles</code> 。</p>
<h4 data-id="heading-38">编译器检查</h4>
<p>这里的配置主要用于检查编译器的工作情况，或者在你需要进行编译器性能优化时使用，它们会生成编译器工作的分析报告，包括本次编译包含了哪些文件，以及各个编译阶段（I/O、Type Checking 等）的耗时。</p>
<ul>
<li>
<p>diagnostics 与 extendedDiagnostics，输出诊断信息，其中 diagnostics 会生成可读性更好的版本。</p>
</li>
<li>
<p>generateCpuProfile，生成 CPU 的耗时报告，用于了解构建缓慢的可能原因。</p>
</li>
<li>
<p>listFiles 与 listEmittedFiles，其中 listFiles 会罗列所有被纳入本次编译过程的文件，可以用于检查是否携带了非预期的文件。而 listEmittedFiles 则会罗列输出的文件，你可以利用这些文件信息进行额外处理，比如拷贝文件。</p>
</li>
<li>
<p>traceResolution，输出一份跟踪模块解析策略与路径的信息，比如这样：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">======== Resolving module 'typescript' from 'src/app.ts'. ========</span>
<span class="code-block-extension-codeLine" data-line-num="2">Module resolution kind is not specified, using 'NodeJs'.</span>
<span class="code-block-extension-codeLine" data-line-num="3">Loading module 'typescript' from 'node_modules' folder.</span>
<span class="code-block-extension-codeLine" data-line-num="4">File 'src/node_modules/typescript.ts' does not exist.</span>
<span class="code-block-extension-codeLine" data-line-num="5">File 'src/node_modules/typescript.tsx' does not exist.</span>
<span class="code-block-extension-codeLine" data-line-num="6">File 'src/node_modules/typescript.d.ts' does not exist.</span>
<span class="code-block-extension-codeLine" data-line-num="7">File 'src/node_modules/typescript/package.json' does not exist.</span>
<span class="code-block-extension-codeLine" data-line-num="8">File 'node_modules/typescript.ts' does not exist.</span>
<span class="code-block-extension-codeLine" data-line-num="9">File 'node_modules/typescript.tsx' does not exist.</span>
<span class="code-block-extension-codeLine" data-line-num="10">File 'node_modules/typescript.d.ts' does not exist.</span>
<span class="code-block-extension-codeLine" data-line-num="11">Found 'package.json' at 'node_modules/typescript/package.json'.</span>
<span class="code-block-extension-codeLine" data-line-num="12">'package.json' has 'types' field './lib/typescript.d.ts' that references 'node_modules/typescript/lib/typescript.d.ts'.</span>
<span class="code-block-extension-codeLine" data-line-num="13">File 'node_modules/typescript/lib/typescript.d.ts' exist - use it as a module resolution result.</span>
<span class="code-block-extension-codeLine" data-line-num="14">======== Module name 'typescript' was successfully resolved to 'node_modules/typescript/lib/typescript.d.ts'. ========</span>
</code></pre>
</li>
</ul>
<h3 data-id="heading-39">其它工程相关</h3>
<h4 data-id="heading-40">extends</h4>
<p>这一配置可以类比到 ESLint 配置中的 extends，作用就是复用已有的文件，在这里即是一个已存在的 TSConfig 配置文件。其作用包括在 Monorepo 下统一各个子项目的基础配置：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// &lt;root&gt;/packages/pkg/tsconfig.json</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">"extends"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"../../tsconfig.base.json"</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-comment">// &lt;root&gt;/tsconfig.base.json</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>或者在团队的所有项目间使用基本统一的配置：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"extends"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"team-config/tsconfig.json"</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>其中 team-config 是一个 npm 包。</p>
<h2 data-id="heading-41">总结与预告</h2>
<p>在这一节，我们了解了检查相关和工程相关的 TSConfig ，其中有些配置涉及前端领域的其他知识，如在 esModuleInterop 中，我们了解了 ESM 与 CJS 之间调用的问题，以及 TypeScript 是如何解决的。在工程部分，我们了解了 Project References 这一工程领域的重磅特性，以及如何通过 isolatedModules 来使其它编译器也能妥善处理 TS 代码。</p>
<p>另外，这两节的内容其实并不包含所有 TSConfig 配置，除了省略了一些纯做兼容性的配置（如 outFile 的前身 <code>out</code> 配置）以外，还有部分没有介绍的配置我们会在后续的漫谈篇中使用专门的一节来进行介绍，如从定义编辑器插件的 <code>plugins</code> 配置到编辑器插件的开发。</p>
<p>在下一节，我们会进入完全的实战环节，使用 TypeScript + NestJs + Prisma 开发一个博客 API，从项目搭建、基本语法、数据库 与 ORM、请求链路到部署，让你拥有一个完整的，属于自己的 API 服务。</p></div>
