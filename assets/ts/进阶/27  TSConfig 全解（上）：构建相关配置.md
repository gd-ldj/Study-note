<div class="markdown-body"><p>在前面的内容中，我们已经学习了 TypeScript 在工程中的许多实践，包括类型声明、TypeScript 与 React、ESLint 的结合使用以及装饰器等。这些实践更像是上层建筑，默认是在一个已经基本配置完环境的 TypeScript 项目中进行的。这一节，我们深入下层基础，来了解 TypeScript 工程中最基础的一部分：TSConfig 配置。</p>
<p>为什么选择现在才讲配置呢？因为在前面的工程实践中，我们并不需要自己去修改 TSConfig，脚手架已经帮我们处理好了。有了实践经验，再来讲解讲解这些配置效果会更好。</p>
<p>为了避免罗列配置这种填鸭式教学，我将 TSConfig 分为三个大类：<strong>构建相关</strong>、<strong>类型检查相关</strong>以及<strong>工程相关</strong>。这其实也对应着我们的开发流程：使用工程能力进行项目开发，检查源码是否符合配置约束，然后才是输出产物。每一个大类又可以划分为几个小类，比如构建相关又可以分为<strong>构建源码相关</strong>与<strong>构建产物相关</strong>等等，我们会按照这些分类的方式进行聚合地讲解。</p>
<p>最后，正如我对这本小册的定位也包括工具书一样，当你在实际项目开发遗忘了某一项具体配置的作用，或者发现某一配置表现不符合预期，都可以回到这里来寻找答案。</p>
<p>这一节我们主要介绍构建相关的配置。</p>
<h2 data-id="heading-0">构建相关</h2>
<h3 data-id="heading-1">构建源码相关</h3>
<h4 data-id="heading-2">特殊语法相关</h4>
<h5 data-id="heading-3">experimentalDecorators 与 emitDecoratorMetadata</h5>
<p>这两个选项都和装饰器有关，其中 experimentalDecorators 选项用于启用装饰器的 <code>@</code> 语法，而 emitDecoratorMetadata 配置则影响装饰器实际运行时的元数据相关逻辑，我们在装饰器一节中已经了解了此选项对实际编译代码的作用：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">var</span>&nbsp;__metadata&nbsp;=&nbsp;(<span class="hljs-variable language_">this</span>&nbsp;&amp;&amp;&nbsp;<span class="hljs-variable language_">this</span>.<span class="hljs-property">__metadata</span>)&nbsp;||&nbsp;<span class="hljs-keyword">function</span>&nbsp;(<span class="hljs-params">k,&nbsp;v</span>)&nbsp;{</span>
<span class="code-block-extension-codeLine" data-line-num="2">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-keyword">if</span>&nbsp;(<span class="hljs-keyword">typeof</span>&nbsp;<span class="hljs-title class_">Reflect</span>&nbsp;===&nbsp;<span class="hljs-string">"object"</span>&nbsp;&amp;&amp;&nbsp;<span class="hljs-keyword">typeof</span>&nbsp;<span class="hljs-title class_">Reflect</span>.<span class="hljs-property">metadata</span>&nbsp;===&nbsp;<span class="hljs-string">"function"</span>)&nbsp;<span class="hljs-keyword">return</span>&nbsp;<span class="hljs-title class_">Reflect</span>.<span class="hljs-title function_">metadata</span>(k,&nbsp;v);</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-title function_">__decorate</span>([</span>
<span class="code-block-extension-codeLine" data-line-num="6">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-title class_">Prop</span>(),</span>
<span class="code-block-extension-codeLine" data-line-num="7">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-title function_">__metadata</span>(<span class="hljs-string">"design:type"</span>,&nbsp;<span class="hljs-title class_">String</span>) <span class="hljs-comment">// 来自于 emitDecoratorMetadata 配置，其它 __metadata 方法同</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">],&nbsp;<span class="hljs-title class_">Foo</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>,&nbsp;<span class="hljs-string">"prop"</span>,&nbsp;<span class="hljs-keyword">void</span>&nbsp;<span class="hljs-number">0</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-title function_">__decorate</span>([</span>
<span class="code-block-extension-codeLine" data-line-num="11">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-title class_">Method</span>(),</span>
<span class="code-block-extension-codeLine" data-line-num="12">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-title function_">__param</span>(<span class="hljs-number">0</span>,&nbsp;<span class="hljs-title class_">Param</span>()),</span>
<span class="code-block-extension-codeLine" data-line-num="13">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-title function_">__metadata</span>(<span class="hljs-string">"design:type"</span>,&nbsp;<span class="hljs-title class_">Function</span>),</span>
<span class="code-block-extension-codeLine" data-line-num="14">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-title function_">__metadata</span>(<span class="hljs-string">"design:paramtypes"</span>,&nbsp;[<span class="hljs-title class_">String</span>]),</span>
<span class="code-block-extension-codeLine" data-line-num="15">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-title function_">__metadata</span>(<span class="hljs-string">"design:returntype"</span>,&nbsp;<span class="hljs-keyword">void</span>&nbsp;<span class="hljs-number">0</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="16">],&nbsp;<span class="hljs-title class_">Foo</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>,&nbsp;<span class="hljs-string">"handler"</span>,&nbsp;<span class="hljs-literal">null</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="17"></span>
<span class="code-block-extension-codeLine" data-line-num="18"><span class="hljs-title class_">Foo</span>&nbsp;=&nbsp;<span class="hljs-title function_">__decorate</span>([</span>
<span class="code-block-extension-codeLine" data-line-num="19">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-title class_">Cls</span>(),</span>
<span class="code-block-extension-codeLine" data-line-num="20">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-title function_">__param</span>(<span class="hljs-number">0</span>,&nbsp;<span class="hljs-title class_">Param</span>()),</span>
<span class="code-block-extension-codeLine" data-line-num="21">&nbsp;&nbsp;&nbsp;&nbsp;<span class="hljs-title function_">__metadata</span>(<span class="hljs-string">"design:paramtypes"</span>,&nbsp;[<span class="hljs-title class_">String</span>])</span>
<span class="code-block-extension-codeLine" data-line-num="22">],&nbsp;<span class="hljs-title class_">Foo</span>);</span>
</code></pre>
<h5 data-id="heading-4">jsx、jsxFactory、jsxFragmentFactory 与 jsxImportSource</h5>
<p>这部分配置主要涉及 jsx(tsx) 相关的语法特性。其中，jsx 配置将直接影响 JSX 组件的构建表现，常见的主要有 <code>react</code> （将 JSX 组件转换为对 <code>React.createElement</code> 调用，生成 <code>.js</code> 文件）、<code>preserve</code>（原样保留 JSX 组件，生成 <code>.jsx</code> 文件，你可以接着让其他的编译器进行处理）、<code>react-native</code> （类似于 preserve，但会生成 <code>.js</code> 文件）。</p>
<p>如果你希望使用特殊的 jsx 转换，也可以将其配置为 <code>react-jsx</code> / <code>react-jsxdev</code>，这样 JSX 组件会被转换为对 <code>__jsx</code> 方法的调用与生成 <code>.js</code> 文件，此方法来自于 <code>react/jsx-runtime</code>。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">jsx</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-jsx code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// react</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">helloWorld</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title class_">React</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">"h1"</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">"Hello world"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-comment">// preserve / react-native</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">helloWorld</span> = (<span class="hljs-params"></span>) =&gt; <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-comment">// react-jsx</span></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">import</span> { jsx <span class="hljs-keyword">as</span> _jsx } <span class="hljs-keyword">from</span> <span class="hljs-string">"react/jsx-runtime"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="12"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">helloWorld</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">_jsx</span>(<span class="hljs-string">"h1"</span>, { <span class="hljs-attr">children</span>: <span class="hljs-string">"Hello world"</span> });</span>
<span class="code-block-extension-codeLine" data-line-num="13"> </span>
<span class="code-block-extension-codeLine" data-line-num="14"><span class="hljs-comment">// react-jsxdev</span></span>
<span class="code-block-extension-codeLine" data-line-num="15"><span class="hljs-keyword">import</span> { jsxDEV <span class="hljs-keyword">as</span> _jsxDEV } <span class="hljs-keyword">from</span> <span class="hljs-string">"react/jsx-dev-runtime"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="16"><span class="hljs-keyword">const</span> _jsxFileName = <span class="hljs-string">"/home/runner/work/TypeScript-Website/TypeScript-Website/index.tsx"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="17"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="18"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">helloWorld</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">_jsxDEV</span>(<span class="hljs-string">"h1"</span>, { <span class="hljs-attr">children</span>: <span class="hljs-string">"Hello world"</span> }, <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>, <span class="hljs-literal">false</span>, { <span class="hljs-attr">fileName</span>: _jsxFileName, <span class="hljs-attr">lineNumber</span>: <span class="hljs-number">9</span>, <span class="hljs-attr">columnNumber</span>: <span class="hljs-number">32</span> }, <span class="hljs-variable language_">this</span>);</span>
</code></pre>
<p>除了 jsx 以外，其它 jsx 相关配置使用较少，我们简单了解即可。</p>
<ul>
<li>
<p>jsxFactory，影响负责最终处理转换完毕 JSX 组件的方法，默认即为 <code>React.createElement</code>。如果你想使用 <code>preact.h</code> 作为处理方法，可以将其配置为 <code>h</code>。</p>
</li>
<li>
<p>jsxFragmentFactory，类似 jsxFactory，只不过它影响的是 Fragment 组件（<code>&lt;&gt;&lt;/&gt;</code>）的提供方。jsxFactory 与 jsxFragmentFactory 均是 TS 4.1 版本以前用于实现自定义 JSX 转换的配置项，举例来说，当设置了 <code>"jsx": "react"</code>，此时将 jsxFragmentFactory 设置为 <code>Fragment</code> ，同时将 jsxFactory 设置为 <code>h</code>：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">jsx</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-jsx code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { h, <span class="hljs-title class_">Fragment</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"preact"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">const</span> <span class="hljs-title function_">HelloWorld</span> = (<span class="hljs-params"></span>) =&gt; (</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="xml"><span class="hljs-tag">&lt;&gt;</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-tag">&lt;/&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">);</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-comment">// 转换为以下代码</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">const</span> preact_1 = <span class="hljs-built_in">require</span>(<span class="hljs-string">"preact"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">const</span> <span class="hljs-title function_">HelloWorld</span> = (<span class="hljs-params"></span>) =&gt; ((<span class="hljs-number">0</span>, preact_1.<span class="hljs-property">h</span>)(preact_1.<span class="hljs-property">Fragment</span>, <span class="hljs-literal">null</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="11">    (<span class="hljs-number">0</span>, preact_1.<span class="hljs-property">h</span>)(<span class="hljs-string">"div"</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">"Hello"</span>)));</span>
</code></pre>
<p>为了简化自定义 JSX 转换的配置，4.1 版本以后 TS 支持使用 jsxImportSource 属性快速地调整。</p>
</li>
<li>
<p>jsxImportSource，当你的 jsx 设置为 <code>react-jsx</code> / <code>react-jsxdev</code> 时，指定你的 <code>jsx-runtime</code> / <code>jsx-dev-runtime</code>  从何处导入。如设置为 <code>preact</code> 时，会从 <code>preact/jsx-runtime</code> 导入 <code>_jsx</code> 函数，用于进行 JSX 组件的转换。类似的，在另一个类 React 框架 Solid 中，也将此配置修改为了自己的实现： <code>"jsxImportSource": "solid-js"</code>。</p>
</li>
</ul>
<p>这也是 React 17 中的变化之一，在 17 版本前后的构建后代码如下：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// v17 前</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-keyword">return</span> <span class="hljs-title class_">React</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">'h1'</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'Hello world'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-comment">// v17 后</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">import</span> {jsx <span class="hljs-keyword">as</span> _jsx} <span class="hljs-keyword">from</span> <span class="hljs-string">'react/jsx-runtime'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-keyword">return</span> <span class="hljs-title function_">_jsx</span>(<span class="hljs-string">'h1'</span>, { <span class="hljs-attr">children</span>: <span class="hljs-string">'Hello world'</span> });</span>
<span class="code-block-extension-codeLine" data-line-num="13">}</span>
</code></pre>
<p>这也是在 17 版本以后，不需要再确保代码中导入了 React 就能使用 JSX 的原因。</p>
<h5 data-id="heading-5">target 与 lib、noLib</h5>
<p>target 配置决定了你的构建代码使用的语法，常用值包括 es5、es6、es2018、es2021、esnext（基于目前的 TypeScript 版本所支持的最新版本） 等等。某些来自于更高版本 ECMAScript 的语法，会在编译到更低版本时进行语法的降级，常见的如异步函数、箭头函数、bigint 数据类型等。</p>
<p>类似的，在 Babel 中也有 targets 的概念。但这里的 targets 通常指的是预期运行的浏览器，如 chrome 89，然后基于 browserlist 获取浏览器信息，基于 <a href="https://link.juejin.cn?target=https%3A%2F%2Fcaniuse.com%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://caniuse.com/" ref="nofollow noopener noreferrer">caniuse</a> 或者 compat-table 获取各个浏览器版本支持的特性，最后再进行语法的降级。</p>
<p>如果没有特殊需要，推荐将 target 设置为 <code>"es2018"</code>，一个对常用语法支持较为全面的版本。</p>
<p>更改 target 配置也会同时影响你的 lib 配置默认值，而它决定了你是否能使用某些来自于更新版本的 ECMAScript 语法，以 replaceAll 为例，如果你直接在项目中使用：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-string">'linbudu'</span>.<span class="hljs-title function_">replaceAll</span>(<span class="hljs-string">'d'</span>, <span class="hljs-string">'dd'</span>);</span>
</code></pre>
<p>此时，如果你的 lib 配置中不包含 <code>"es2021"</code> 或者 <code>"es2021.String"</code>，上面的代码就会给出一个错误提示：<em><strong>属性“replaceAll”在类型“"linbudu"”上不存在。是否需要更改目标库? 请尝试将 “lib” 编译器选项更改为“es2021”或更高版本</strong></em>。</p>
<p>正如我们在类型声明一节中了解的，TypeScript 会自动加载内置的 <code>lib.d.ts</code> 等声明文件，而加载哪些文件则和 lib 配置有关。当我们配置了 <code>"es2021"</code> 或者 <code>"es2021.String"</code>，replaceAll 方法对应的声明文件 <code>lib.es2021.string.d.ts</code> 就会被加载，然后我们的 String 类型上才有了 lib 方法。</p>
<p>除了高版本语法以外，lib 其实也和你的实际运行环境有关。比如，当你的代码仅在 Node 环境下运行时，你的 lib 中不应当包含 <code>"DOM"</code> 这个值。对应的，代码中无法使用 window 、document 等全局变量。</p>
<p>而 target 对 lib 的影响在于，当你的 target 为更高的版本时，它会自动地将这个版本新语法对应的 lib 声明加载进来，以上面的代码为例， target 为 <code>"es2021"</code> 时，你不需要添加 <code>"es2021"</code> 到 lib 中也能使用 ECMAScript2021 的新方法 replaceAll。这是因为既然你的编译产物都到这个版本了，那你当然可以直接使用这个方法啦。</p>
<p>如果你希望使用自己提供的 lib 声明定义，可以启用 noLib 配置，这样 TypeScript 将不会去加载内置的类型定义，但你需要为所有内置对象提供类型定义（String，Function，Object 等）才能进行编译。如果你的运行环境中存在大量的定制方法，甚至对原本的内置方法做了覆盖，就可以使用此配置来加载自己的类型声明。</p>
<p>最后，target 与 lib 配置会随着 TS 的版本更新而新增可用的值，如在 4.6 版本新增了 <code>es2022</code>这一选项，支持了 <code>Array.at()</code>、<code>Error Cause</code> 等新的语言特性。</p>
<h3 data-id="heading-6">构建解析相关</h3>
<p>这部分配置主要控制源码解析，包括从何处开始收集要构建的文件，如何解析别名路径等等。</p>
<h4 data-id="heading-7">files、include 与 exclude</h4>
<p>这三个选项决定了将被包括到本次编译的代码文件。使用 files 我们可以描述本次包含的所有文件，但不能使用 <code>src</code> 或者 <code>src/*</code> 这种方式，每个值都需要是完整的文件路径，适合在小型项目时使用：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">"files"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-string">"src/index.ts"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-string">"src/handler.ts"</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>如果你的文件数量较多，或者分散在各个文件夹，此时可以使用 include 和 exclude 进行配置，在这里可以传入文件夹或者 <code>src/*</code> 这样的 glob pattern，也可以传入完整的文件路径。</p>
<p>include 配置方式参考：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"include"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"src/**/*"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"generated/*.ts"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"internal/*"</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>其中，<code>src/**/*</code> 表示匹配 src下所有的合法文件，而无视目录层级。而 <code>internal/*</code> 则只会匹配 internal 下的文件，不会匹配 <code>internal/utils/</code> 下的文件。这里的合法文件指的是，在不包括文件扩展名（<code>*.ts</code>）的情况下只会匹配 <code>.ts</code> /  <code>.tsx</code> /  <code>.d.ts</code>  / <code>.js</code> / <code>.jsx</code> 文件（js 和 jsx 文件需要启用 allowJs 配置时才会被包括）。</p>
<p>由于我们会在 include 中大量使用 glob pattern 来一次性匹配许多文件，如果存在某些非预期的文件也符合这一匹配模式，比如 <code>src/handler.test.ts</code> <code>src/file-excluded/</code> 这样，此时专门为需要匹配的文件书写精确的匹配模式就太麻烦了。因此，我们可以使用 exclude 配置，来从被 include 匹配到的文件中再移除一部分，如：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"include"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"src/**/*"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"generated/*.ts"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"internal/*"</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">"exclude"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"src/file-excluded"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"/**/*.test.ts"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"/**/*.e2e.ts"</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>需要注意的是，<strong>exclude 只能剔除已经被 include 包含的文件</strong>。</p>
<h4 data-id="heading-8">baseUrl</h4>
<p>这一配置可以定义文件进行解析的根目录，它通常会是一个相对路径，然后配合 tsconfig.json 所在的路径来确定根目录的位置。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">project</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── out.ts</span>
<span class="code-block-extension-codeLine" data-line-num="3">├── src</span>
<span class="code-block-extension-codeLine" data-line-num="4">├──── core.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">└── tsconfig.json</span>
</code></pre>
<p>在这个结构下，如果配置为 <code>"baseUrl": "./"</code>，根目录就会被确定为 project。</p>
<p>你也可以通过这一配置，在导入语句中使用相对 baseUrl 的解析路径。如在上面根目录已经确定为 project，在 <code>out.ts</code> 中，你就可以直接使用基于根目录的绝对路径导入文件：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> <span class="hljs-string">"src/core"</span>; <span class="hljs-comment">// TS 会自动解析到对应的文件，即 "./src/core.ts"</span></span>
</code></pre>
<h4 data-id="heading-9">rootDir</h4>
<p>rootDir 配置决定了项目文件的根目录，默认情况下它是项目内<strong>包括</strong>的所有 .ts 文件的最长公共路径，这里有几处需要注意：</p>
<ul>
<li><strong>包括</strong>指的是 include 或 files 中包括的 <code>.ts</code> 文件，这些文件一般来说不会和 tsconfig.json 位于同一目录层级；</li>
<li>不包括 <code>.d.ts</code> 文件，因为声明文件可能会和 tsconfig.json 位于同一层级。</li>
</ul>
<p>最长公共路径又是什么？简单地说，它就是某一个<strong>包含了所有被包括的 <code>.ts</code> 文件的文件夹</strong>，TypeScript 会找到这么一个文件夹，默认将其作为 rootDir。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">PROJECT</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── src</span>
<span class="code-block-extension-codeLine" data-line-num="3">│   ├── index.ts</span>
<span class="code-block-extension-codeLine" data-line-num="4">│   ├── app.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">│   ├── utils</span>
<span class="code-block-extension-codeLine" data-line-num="6">│   │   ├── helpers.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">├── declare.d.ts</span>
<span class="code-block-extension-codeLine" data-line-num="8">├── tsconfig.json</span>
</code></pre>
<p>在这个例子中，rootDir 会被推断为 src。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">PROJECT</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── env</span>
<span class="code-block-extension-codeLine" data-line-num="3">│   ├── env.dev.ts</span>
<span class="code-block-extension-codeLine" data-line-num="4">│   ├── env.prod.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">├── app</span>
<span class="code-block-extension-codeLine" data-line-num="6">│   ├── index.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">├── declare.d.ts</span>
<span class="code-block-extension-codeLine" data-line-num="8">├── tsconfig.json</span>
</code></pre>
<p>在这个例子中，rootDir 会被推断为 <code>.</code>，即 <code>tsconfig.json</code> 所在的目录。</p>
<p>构建产物的目录结构会受到这一配置的影响，假设 outDir 被配置为 <code>dist</code>，在上面的第一种情况下，最终的产物会被全部放置在 dist 目录下，保持它们在 <code>src</code>（也就是 rootDir） 内的目录结构：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">PROJECT</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── dist</span>
<span class="code-block-extension-codeLine" data-line-num="3">│   ├── index.js</span>
<span class="code-block-extension-codeLine" data-line-num="4">│   ├── index.d.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">│   ├── app.js</span>
<span class="code-block-extension-codeLine" data-line-num="6">│   ├── app.d.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">│   ├── utils</span>
<span class="code-block-extension-codeLine" data-line-num="8">│   │   ├── helpers.js</span>
<span class="code-block-extension-codeLine" data-line-num="9">│   │   ├── helpers.d.ts</span>
</code></pre>
<p>如果你将 rootDir 更改为推导得到的 rootDir 的父级目录，比如在这里把它更改到了项目根目录 <code>.</code>。此时 <code>src</code> 会被视为 rootDir 的一部分，因此最终构建目录结构中会多出 <code>src</code> 这一级：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">PROJECT</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── dist</span>
<span class="code-block-extension-codeLine" data-line-num="3">├── ├──src</span>
<span class="code-block-extension-codeLine" data-line-num="4">│      ├── index.js</span>
<span class="code-block-extension-codeLine" data-line-num="5">│      ├── index.d.ts</span>
<span class="code-block-extension-codeLine" data-line-num="6">│      ├── app.js</span>
<span class="code-block-extension-codeLine" data-line-num="7">│      ├── app.d.ts</span>
<span class="code-block-extension-codeLine" data-line-num="8">│      ├── utils</span>
<span class="code-block-extension-codeLine" data-line-num="9">│      │   ├── helpers.js</span>
<span class="code-block-extension-codeLine" data-line-num="10">│      │   ├── helpers.d.ts</span>
</code></pre>
<p>需要注意的是，如果你显式指定 rootDir ，需要确保其包含了所有 <strong>“被包括”</strong> 的文件，因为 TypeScript 需要确保这所有的文件都被生成在 outDir 内。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">PROJECT</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── src</span>
<span class="code-block-extension-codeLine" data-line-num="3">│   ├── index.ts</span>
<span class="code-block-extension-codeLine" data-line-num="4">│   ├── app.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">│   ├── utils</span>
<span class="code-block-extension-codeLine" data-line-num="6">│   │   ├── helpers.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">├── env.ts</span>
<span class="code-block-extension-codeLine" data-line-num="8">├── tsconfig.json</span>
</code></pre>
<p>在这个例子中，如果你指定 rootDir 为 <code>src</code> ，会导致 <code>env.ts</code> 被生成到 <code>&lt;project&gt;/env.js</code> 而非 <code>&lt;project&gt;/dist/env.js</code> 。</p>
<h4 data-id="heading-10">rootDirs</h4>
<p>rootDirs 就是复数版本的 rootDir，它接收一组值，并且会将这些值均视为平级的根目录：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-attr">"rootDirs"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"src/zh"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"src/en"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"src/jp"</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-punctuation">}</span></span>
</code></pre>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">PROJECT</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── src</span>
<span class="code-block-extension-codeLine" data-line-num="3">│   ├── zh</span>
<span class="code-block-extension-codeLine" data-line-num="4">│   │   ├── locale.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">│   ├── en</span>
<span class="code-block-extension-codeLine" data-line-num="6">│   │   ├── locale.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">│   ├── jp</span>
<span class="code-block-extension-codeLine" data-line-num="8">│   │   ├── locale.ts</span>
<span class="code-block-extension-codeLine" data-line-num="9">│   ├── index.ts</span>
<span class="code-block-extension-codeLine" data-line-num="10">├── tsconfig.json</span>
</code></pre>
<p>使用 rootDirs，TypeScript 还是会隐式地推导 rootDir，此时它的值为 rootDirs 中所有文件夹最近的公共父文件夹，在这里即是 <code>src</code>。你肯定会想，那 rootDirs 还有什么用？实际上它主要用于实现<strong>多个虚拟目录的合并解析</strong>。还是以上面的例子为例，假设我们的目录结构是现在这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">PROJECT</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── src</span>
<span class="code-block-extension-codeLine" data-line-num="3">│   ├── locales</span>
<span class="code-block-extension-codeLine" data-line-num="4">│   │   ├── zh.locale.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">│   │   ├── en.locale.ts</span>
<span class="code-block-extension-codeLine" data-line-num="6">│   │   ├── jp.locale.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">│   ├── index.ts</span>
<span class="code-block-extension-codeLine" data-line-num="8">│── generated</span>
<span class="code-block-extension-codeLine" data-line-num="9">│   ├── messages</span>
<span class="code-block-extension-codeLine" data-line-num="10">│   │   ├── main.mapper.ts</span>
<span class="code-block-extension-codeLine" data-line-num="11">│   │   ├── info.mapper.ts</span>
<span class="code-block-extension-codeLine" data-line-num="12">├── tsconfig.json</span>
</code></pre>
<p>在这个目录结构中，<code>locales</code> 下存放我们定义的每个语言的对应翻译，<code>generated/messages</code> 则是通过扫描项目获得所有需要进行代码替换位置后生成的映射关系，我们在 <code>.locale.ts</code> 文件中会导入其中的 mapper 文件来生成对应的导出。</p>
<p>虽然现在 locale 文件和 mapper 文件被定义在不同的目录下，但在构建产物中它们实际上是位于同一层级的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">│── dist</span>
<span class="code-block-extension-codeLine" data-line-num="2">│   ├── zh.locale.js</span>
<span class="code-block-extension-codeLine" data-line-num="3">│   ├── en.locale.js</span>
<span class="code-block-extension-codeLine" data-line-num="4">│   ├── jp.locale.js</span>
<span class="code-block-extension-codeLine" data-line-num="5">│   ├── main.mapper.js</span>
<span class="code-block-extension-codeLine" data-line-num="6">│   ├── info.mapper.js</span>
</code></pre>
<p>这也就意味着，我们应当是在 locale 文件中直接通过 <code>./main.mapper</code> 的路径来引用 mapper 文件的，而不是 <code>../../generated/messages/main.mapper.ts</code> 这样。</p>
<p>此时，我们就可以利用 rootDirs 配置来让 TS 将这两个相隔甚远的文件夹视为处于同一目录下：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-attr">"rootDirs"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"src/locales"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"generated/messages"</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>这一配置并不会影响实际的产物生成，它只会告诉 TS 将这两个模块视为同一层级下（类型定义层面）。</p>
<h4 data-id="heading-11">types 与 typeRoots</h4>
<p>默认情况下，TypeScript 会加载 <code>node_modules/@types/</code> 下的所有声明文件，包括嵌套的 <code>../../node_modules/@types</code> 路径，这么做可以让你更方便地使用第三方库的类型。但如果你希望只加载实际使用的类型定义包，就可以通过 types 配置：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-attr">"types"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"node"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"jest"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"react"</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>在这种情况下，只有 <code>@types/node</code>、<code>@types/jest</code> 以及 <code>@types/react</code> 会被加载。</p>
<p>即使其他 <code>@types/</code> 包没有被包含，它们也仍然能拥有完整的类型，但其中的全局声明（如 <code>process</code>，<code>expect</code>，<code>describe</code> 等全局变量）将不会被包含，同时也无法再享受到基于类型的提示。</p>
<p>如果你甚至希望改变加载 <code>@types/</code> 下文件的行为，可以使用 typeRoots 选项，其默认为 <code>@types</code>，即指定 <code>node_modules/@types</code> 下的所有文件（仍然包括嵌套的）。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-attr">"typeRoots"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"./node_modules/@types"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"./node_modules/@team-types"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"./typings"</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-attr">"types"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"react"</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-attr">"skipLibCheck"</span><span class="hljs-punctuation">:</span> <span class="hljs-keyword">true</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>以上配置会尝试加载 <code>node_modules/@types/react</code> 以及 <code>./node_modules/@team-types/react</code> 、<code>./typings/react</code> 中的声明文件，注意我们需要使用<strong>相对于 baseUrl 的相对路径</strong>。</p>
<p>加载多个声明文件可能会导致内部的声明冲突，所以你可能会需要 skipLibCheck 配置来禁用掉对加载的类型声明的检查。</p>
<h4 data-id="heading-12">moduleResolution</h4>
<p>这一配置指定了模块的解析策略，可以配置为 node 或者 classic ，其中 node 为默认值，而 classic 主要作向后兼容用，基本不推荐使用。</p>
<p>首先来看 node 解析模式，从名字也能看出来它其实就是与 node 一致的解析模式。假设我们有个 <code>src/index.js</code>，其中存在基于相对路径 <code>const foo = require("./foo")</code> 的导入，则会依次按照以下顺序解析：</p>
<ul>
<li><code>/&lt;root&gt;/&lt;project&gt;/src/foo.js</code> 文件是否存在？</li>
<li><code>/&lt;root&gt;/&lt;project&gt;/src/foo</code> 是否是一个文件夹？
<ul>
<li>此文件夹内部是否包含 <code>package.json</code>，且其中使用 <code>main</code> 属性描述了这个文件夹的入口文件？</li>
<li>假设 <code>main</code> 指向 <code>dist/index.js</code>，那这里会尝试寻找 <code>/&lt;root&gt;/&lt;project&gt;/src/foo/dist/index.js</code> 文件</li>
<li>否则的话，说明这个文件不是一个模块或者没有定义模块入口，我们走默认的 <code>/foo/index.js</code> 。</li>
</ul>
</li>
</ul>
<p>而对于绝对路径，即 <code>const foo = require("foo")</code>，其只会在 <code>node_modules</code> 中寻找，从 <code>/&lt;root&gt;/&lt;project&gt;/src/node_modules</code> 开始，到 <code>/&lt;root&gt;/&lt;project&gt;/node_modules</code> ，再逐级向上直到根目录。</p>
<p>TypeScript 在这基础上增加了对 <code>.ts</code> <code>.tsx</code> 和 <code>.d.ts</code> （优先级按照这一顺序）扩展名的文件解析，以及对 <code>package.json</code> 中 <code>types</code> 字段的加载。</p>
<p>而对于 classic 模式，其解析逻辑可能不太符合直觉，其相对路径导入与绝对路径导入均不会解析 <code>node_modules</code> 中的文件。对于相对路径导入 <code>import foo from "./foo"</code>，它只会尝试 <code>/&lt;root&gt;/&lt;project&gt;/src/foo.ts</code> 和 <code>/&lt;root&gt;/&lt;project&gt;/src/foo.d.ts</code>。</p>
<p>而对于绝对路径导入 <code>import foo from "foo"</code>，它会按照以下顺序来解析：</p>
<ul>
<li><code>/&lt;root&gt;/&lt;project&gt;/src/foo.ts(.d.ts)</code></li>
<li><code>/&lt;root&gt;/&lt;project&gt;/foo.ts(.d.ts)</code></li>
<li><code>/&lt;root&gt;/foo.ts(.d.ts)</code></li>
<li><code>/foo.ts(.d.ts)</code></li>
</ul>
<p>绝大部分情况下你不会需要 classic 作为配置值，这里仅做了解即可。</p>
<h4 data-id="heading-13">moduleSuffixes</h4>
<p>此配置在 4.7 版本被引入，类似于 moduleResolution ，它同样影响对模块的解析策略，但仅影响模块的后缀名部分。如以下配置：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">    <span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">        <span class="hljs-attr">"moduleSuffixes"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">".ios"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">".native"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">""</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>此配置在解析文件时，会首先尝试查找 <code>foo.ios.ts</code>，然后是 <code>foo.native.ts</code>，最后才是 <code>foo.ts</code>（注意，需要最后的空字符串<code>""</code>配置）。很明显，这一配置主要是为了 React Native 配置中的多平台构建配置。但你可以用它在 Angular 项目中，确保所有文件都使用了一个额外的后缀名，如 <code>user.service.ts</code>、<code>user.module.ts</code> 等。</p>
<h4 data-id="heading-14">noResolve</h4>
<p>默认情况下， TypeScript 会将你代码中导入的文件也解析为程序的一部分，包括 import 导入和三斜线指令的导入，你可以通过禁用这一配置来阻止这个解析过程。</p>
<p>需要注意的是，虽然导入过程被禁用了，但你仍然需要确保导入的模块是一个合法的模块。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// 开启此配置后，这个指令指向的声明文件将不会被加载！</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-comment">/// &lt;reference path="./other.d.ts" /&gt;</span></span>
</code></pre>
<h4 data-id="heading-15">paths</h4>
<p>paths 类似于 Webpack 中的 alias，允许你通过 <code>@/utils</code> 或类似的方式来简化导入路径，它的配置方式是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"compilerOptions"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-attr">"baseUrl"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"./"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-attr">"paths"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">      <span class="hljs-attr">"@/utils/*"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">"src/utils/*"</span><span class="hljs-punctuation">,</span> <span class="hljs-string">"src/other/utils/*"</span><span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">    <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>需要注意的是，paths 的解析是基于 baseUrl 作为相对路径的，因此需要确保指定了 baseUrl 。在填写别名路径时，我们可以传入一个数组，TypeScript 会依次解析这些路径，直到找到一个确实存在的路径。</p>
<h4 data-id="heading-16">resolveJsonModule</h4>
<p>启用了这一配置后，你就可以直接导入 Json 文件，并对导入内容获得完整的基于实际 Json 内容的类型推导。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">    <span class="hljs-attr">"repo"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"TypeScript"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-attr">"dry"</span><span class="hljs-punctuation">:</span> <span class="hljs-keyword">false</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-attr">"debug"</span><span class="hljs-punctuation">:</span> <span class="hljs-keyword">false</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-punctuation">}</span></span>
</code></pre>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> settings <span class="hljs-keyword">from</span> <span class="hljs-string">"./settings.json"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"> </span>
<span class="code-block-extension-codeLine" data-line-num="3">settings.<span class="hljs-property">debug</span> === <span class="hljs-literal">true</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-comment">// 对应的类型报错</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">settings.<span class="hljs-property">dry</span> === <span class="hljs-number">2</span>;</span>
</code></pre>
<h3 data-id="heading-17">构建产物相关</h3>
<h4 data-id="heading-18">构建输出相关</h4>
<h5 data-id="heading-19">outDir 与 outFile</h5>
<p>这两个选项决定了构建产物的输出文件。其中 outDir 配置的值将包括所有的构建产物，通常情况下会按照原本的目录结构存放：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">src</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── core</span>
<span class="code-block-extension-codeLine" data-line-num="3">├──── handler.ts</span>
<span class="code-block-extension-codeLine" data-line-num="4">└── index.ts</span>
</code></pre>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">dist</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── core</span>
<span class="code-block-extension-codeLine" data-line-num="3">├──── handler.js</span>
<span class="code-block-extension-codeLine" data-line-num="4">├──── handler.d.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">├── index.js</span>
<span class="code-block-extension-codeLine" data-line-num="6">├── index.d.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">src</span>
<span class="code-block-extension-codeLine" data-line-num="8">├── core</span>
<span class="code-block-extension-codeLine" data-line-num="9">├──── handler.ts</span>
<span class="code-block-extension-codeLine" data-line-num="10">└── index.ts</span>
</code></pre>
<p>而 outFile 类似于 Rollup 或 ESBuild 中的 bundle 选项，它会将所有的产物（其中非模块的文件）打包为单个文件，但仅能在 module 选项为 None / System / AMD 时使用。</p>
<h5 data-id="heading-20">preserveConstEnums</h5>
<p>在字面量类型与枚举一节中了解过，常量枚举会在编译时被抹除，对其成员的引用会直接使用原本的值来替换。这一配置项可以改变此行为，让常量枚举也像普通枚举那样被编译为一个运行时存在的对象。</p>
<h5 data-id="heading-21">noEmit 与 noEmitOnError</h5>
<p>这两个选项主要控制最终是否将构建产物实际写入文件系统中，其中 noEmit 开启时将不会写入，但仍然会执行构建过程，因此也就包括了类型检查、语法检查与实际构建过程。而 noEmitOnError 则仅会在构建过程中有错误产生才会阻止写入。</p>
<p>一个常见的实践是，使用 ESBuild / SWC  等工具进行实际构建，使用 <code>tsc --noEmit</code> 进行类型检查过程。</p>
<h5 data-id="heading-22">module</h5>
<p>这一配置控制最终 JavaScript 产物使用的模块标准，常见的包括 CommonJs、ES6、ESNext 以及 NodeNext 等（实际的值也可以是全小写的形式）。另外也支持 AMD、UMD、System 等模块标准。</p>
<p>TypeScript 会随着版本更新新增可用的 module 选项，如在 4.5 版本新增了 <code>es2022</code> 配置，支持了 Top-Level Await 语法。在 4.7 版本还新增了 <code>node16</code> 和 <code>nodenext</code> 两个 module 配置，使用这两个配置意味着你构建的 npm 包或者代码仅在 node 环境下运行，因此 TypeScript 会对应地启用对 Node ESM 的支持。</p>
<h5 data-id="heading-23">importHelpers 与 noEmitHelpers</h5>
<p>由于 TypeScript 在编译时除了抹除类型，还需要基于 target 进行语法降级，这一功能往往需要一些辅助函数，将新语法转换为旧语法的实现， 如 async 函数。</p>
<p>在同样能实现语法降级的 Babel 中，这些辅助函数来自于 core-js （原<code>@babel/polyfill</code>） 实现的。在 TypeScript 中这些辅助函数被统一封装在了 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftslib" target="_blank" rel="nofollow noopener noreferrer" title="https://www.npmjs.com/package/tslib" ref="nofollow noopener noreferrer">tslib</a> 中，通过启用 importHelpers 配置，这些辅助函数就将从 tslib 中导出而不是在源码中定义，能够有效地帮助减少构建产物体系。</p>
<p>举例来说，ES 6 中引入的 rest 操作符，在降低情况下会编译为这样的产物：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fn</span>(<span class="hljs-params">arr: number[]</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">const</span> arr2 = [<span class="hljs-number">1</span>, ...arr];</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
</code></pre>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">var</span> __read = (<span class="hljs-variable language_">this</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">__read</span>) || <span class="hljs-keyword">function</span> (<span class="hljs-params">o, n</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">   <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">var</span> __spreadArray = (<span class="hljs-variable language_">this</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">__spreadArray</span>) || <span class="hljs-keyword">function</span> (<span class="hljs-params">to, <span class="hljs-keyword">from</span>, pack</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">};</span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fn</span>(<span class="hljs-params">arr</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-keyword">var</span> arr2 = <span class="hljs-title function_">__spreadArray</span>([<span class="hljs-number">1</span>], <span class="hljs-title function_">__read</span>(arr), <span class="hljs-literal">false</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
</code></pre>
<p>在启用 importHelpers 后，辅助函数 <code>__read</code> 和 <code>__spreadArray</code> 都将从 tslib 中导出：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { __read, __spreadArray } <span class="hljs-keyword">from</span> <span class="hljs-string">"tslib"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fn</span>(<span class="hljs-params">arr</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-keyword">var</span> arr2 = <span class="hljs-title function_">__spreadArray</span>([<span class="hljs-number">1</span>], <span class="hljs-title function_">__read</span>(arr), <span class="hljs-literal">false</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
</code></pre>
<p>如果你希望使用自己的实现，而非完全从 tslib 中导出，就可以使用 noEmitHelpers 配置，在开启时源码中仍然会使用这些辅助函数，不会存在从 tslib 中导入的过程。因此，此时需要你在全局命名空间下来提供同名的实现。</p>
<h5 data-id="heading-24">downlevelIteration</h5>
<p>ES6 新增了 <code>for...of</code> 循环，它可以用于循环遍历所有部署了 <code>[Symbol.iterator]</code> 接口的数据结构，如数组、Set、Map，甚至还包括字符串。</p>
<p>在默认情况下，如果 target 为 ES5 或更低，<code>for...of</code> 循环会被降级为普通的基于索引的 for 循环：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// 源代码</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">const</span> str = <span class="hljs-string">"Hello!"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> s <span class="hljs-keyword">of</span> str) {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(s);</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-comment">// 降级</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-meta">"use strict"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"Hello!"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> _i = <span class="hljs-number">0</span>, str_1 = str; _i &lt; str_1.<span class="hljs-property">length</span>; _i++) {</span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-keyword">var</span> s = str_1[_i];</span>
<span class="code-block-extension-codeLine" data-line-num="12">    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(s);</span>
<span class="code-block-extension-codeLine" data-line-num="13">}</span>
</code></pre>
<p>然而在某些情况下，降级到普通的 for 循环可能造成运行结果不一致，比如一个 emoji 字符在 <code>for...of</code> 循环中只会被遍历一次，而其实际 length 为 2，因此在 for 循环中会被拆开来分别遍历 2 次。</p>
<p>这种情况下我们的预期应当是仍然保留为 <code>for...of</code> 循环，此时就可以启用 downlevelIteration 配置，同时在运行环境中确保 <code>[Symbol.iterator]</code> 接口的存在（如通过 polyfill），这样就可以保留 <code>for...of</code> 循环的实现。</p>
<p>需要注意的是，启用这一配置只是意味着 TS 会在构建产物中引入辅助函数，判断在 <code>[Symbol.iterator]</code> 接口存在时保留 <code>for...of</code> 循环，否则降级为普通的基于索引的 for 循环，因此你仍然需要自己引入 polyfill。</p>
<h5 data-id="heading-25">importsNotUsedAsValues 与 preserveValueImports</h5>
<p>默认情况下，TypeScript 就在编译时去抹除仅类型导入（import type），但如果你希望保留这些类型导入语句，可以通过更改 importsNotUsedAsValues 配置的值来改变其行为。默认情况下，此配置的值为 remove，即对仅类型导入进行抹除。你也可以将其更改为 preserve，这样所有的导入语句都会被导入（但是类型变量仍然会被抹除）。或者是 error，在这种情况下首先所有导入语句仍然会被保留，但会在值导入仅被用于类型时产生一个错误。</p>
<p>举例来说，以下代码中的仅类型导入会在 preserve 或 error 时保留：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// foo.ts</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">FooType</span> = <span class="hljs-built_in">any</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-title function_">init</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-comment">// index.ts</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">FooType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./foo"</span>;</span>
</code></pre>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> {} <span class="hljs-keyword">from</span> <span class="hljs-string">"./foo"</span>;</span>
</code></pre>
<p>这样 foo 文件中的 <code>init()</code>也就是副作用，仍然能够得到执行。</p>
<p>类似的，还有一个控制导入语句构建产物的配置，preserveValueImports。它主要针对的是值导入（即非类型导入或混合导入），这是因为在某些时候我们的值导入可能是通过一些奇怪的方式使用的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">js</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-js code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Animal</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./animal"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-built_in">eval</span>(<span class="hljs-string">"console.log(new Animal().isDangerous())"</span>);</span>
</code></pre>
<p>preserveValueImports 配置会将所有的值导入都保留下来，</p>
<p>如果你使用 Babel 等无法处理类型的编译器来构建 TS 代码（即启用了 isolatedModules 配置），由于它们并不知道这里到底是值导入还是类型导入，所以此时你必须将类型导入显式标记出来：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Animal</span>, <span class="hljs-keyword">type</span> <span class="hljs-title class_">AnimalKind</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./animal;</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3">// 或使用两条导入</span>
<span class="code-block-extension-codeLine" data-line-num="4">import { Animal } from "./animal;</span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">AnimalKind</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./animal;</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
</code></pre>
<p>当你同时启用了 <code>isolatedModules</code> 与 <code>preserveValueImports</code> 配置时，编辑器会严格约束你必须这么做。</p>
<h4 data-id="heading-26">声明文件相关</h4>
<h5 data-id="heading-27">declaration、declarationDir</h5>
<p>这两个选项主要控制声明文件的输出，其中 declaration 接受一个布尔值，即是否产生声明文件。而 declarationDir 控制写入声明文件的路径，默认情况下声明文件会和构建代码文件在一个位置，比如 <code>src/index.ts</code> 会构建出 <code>dist/index.js</code> 与 <code>dist/index.d.ts</code>，但使用 declarationDir 你可以将这些类型声明文件输出到一个独立的文件夹下，如 <code>dist/types/index.d.ts</code> <code>dist/types/utils.d.ts</code> 这样。</p>
<h5 data-id="heading-28">declarationMap</h5>
<p>declarationMap 选项会为声明文件也生成 source map，这样你就可以从 <code>.d.ts</code> 直接映射回原本的 <code>.ts</code> 文件了。</p>
<p>在使用第三方库时，如果你点击一个来自第三方库的变量，会发现跳转的是其声明文件。如果这些库提供了 declarationMap 与原本的 .ts 文件，那就可以直接跳转到变量对应的原始 ts 文件。当然一般发布 npm 包时并不会携带这些文件，但在 Monorepo 等场景下却有着奇效。</p>
<h5 data-id="heading-29">emitDeclarationOnly</h5>
<p>此配置会让最终构建结果只包含构建出的声明文件（<code>.d.ts</code>），而不会包含 <code>.js</code> 文件。类似于 noEmit 选项，你可以使用其他构建器比如 swc 来构建代码文件，而只使用 tsc 来生成类型文件。</p>
<h4 data-id="heading-30">Source Map 相关</h4>
<p>以下配置均和 Source Map 有关，我们就放在一起介绍了。</p>
<ul>
<li>sourceMap 与 inlineSourceMap 有些类似于 Webpack 中的 devtool 配置，控制是生成 <code>.map.js</code> 这样独立的 source map 文件，还是直接将其附加在生成的 <code>.js</code> 文件中。这两个选项当然是互斥的。</li>
<li>inlineSources 这一选项类似于 source map，只不过它是映射到原本的 .ts 文件，也就是你可以从压缩过的代码直接定位到原本的 .ts 文件。</li>
<li>sourceRoot 与 mapRoot，这两个选项通常供 debugger 消费，分别用于定义我们的源文件与 source map 文件的根目录。</li>
</ul>
<h3 data-id="heading-31">构建产物代码格式化配置</h3>
<p>以下选项主要控制产物代码中的代码格式化，或者说代码风格相关，我们就放在一起介绍了。</p>
<ul>
<li>
<p>newLine，指定文件的结尾使用 CRLF 还是 LF 换行风格。其中 CRLF 其实就是 Carriage Return Line Feed ，是 Windows（DOS）系统下的换行符（相当于 <code>\r\n</code>），而 LF 则是 Line Feed，为 Unix 下的换行符（相当于 <code>\n</code>）。</p>
</li>
<li>
<p>removeComments，移除所有 TS 文件的注释，默认启用。</p>
</li>
<li>
<p>stripInternal 这一选项会阻止为被标记为 internal 的代码语句生成对应的类型，即被 JSDoc 标记为 <code>@internal</code>。推荐的做法是为仅在内部使用而没有导出的变量或方法进行标记，来减少生成代码的体积。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">  <span class="hljs-comment">/**</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">   * <span class="hljs-doctag">@internal</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">   */</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-keyword">const</span> <span class="hljs-variable constant_">SECRET_KEY</span> = <span class="hljs-string">"LINBUDU"</span>;</span>
</code></pre>
<p>以上这段代码不会生成对应的类型声明。</p>
</li>
</ul>
<h2 data-id="heading-32">总结与预告</h2>
<p>这一节我们介绍了构建相关的配置，其中主要的概念包括如何配置你的输入与输出，以及如何启用特殊的语法等。这些配置通常通常不会频繁发生变化（除了 lib 可能会需要动态调整），而是在有特殊的需要时再对应地进行配置。</p>
<p>在下一节，我们会介绍检查相关与工程相关的配置项，其中检查部分包括了类型检查、逻辑检查等，而工程配置则包括了一系列兼容性与工程能力的配置。</p></div>
