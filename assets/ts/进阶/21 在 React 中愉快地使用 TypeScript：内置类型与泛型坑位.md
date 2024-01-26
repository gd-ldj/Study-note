<div class="markdown-body"><p>这一节我们要介绍的是 React 项目中的 TypeScript 集成，React 和 TypeScript 能进行非常紧密而自然的协作，毕竟 tsx 文件本质上也是一个 ts 文件，因此可以直接享受到 TypeScript 的类型检查能力。也因此，在 React 中使用 TypeScript 并没有非常复杂的地方，我们主要关注三个方面：<strong>组件声明</strong>、<strong>泛型坑位</strong>与<strong>内置类型定义</strong>，对于 React + TypeScript 的工程规范，我们也会简要介绍。</p>
<p>组件声明指的是我们声明一个 React 组件的方式。如何结合 TypeScript 来进行组件属性、返回元素的有效性检查？这些组件声明方式都存在哪些特殊用法？需要注意的是，我们只会介绍函数式组件相关，而不会有 Class 组件出现。</p>
<p>泛型坑位即 React API 中预留出的泛型坑位，就像我们在前面学习的一样，这些泛型可以通过输入一个值来隐式推导，也可以直接显式声明来约束后续的值输入。而内置类型定义则主要是事件信息的类型定义以及内置工具类型两个部分，比如，在你的 onClick 函数中应当如何为参数声明类型？onChange 函数呢？</p>
<p>当然，我们会首先从项目搭建开始，但我们的关注点<strong>并非代码的实际运行</strong>，而只是结合 TypeScript 的 tsx 代码书写，因此你也可以直接阅读仓库中的代码，本节的内容主要在 components 与 types 两个文件夹中。</p>
<blockquote>
<p>本节代码见：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flinbudu599%2FTypeScript-Tiny-Book%2Ftree%2Fmain%2Fpackages%2F18-react-ts" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/linbudu599/TypeScript-Tiny-Book/tree/main/packages/18-react-ts" ref="nofollow noopener noreferrer">React TypeScript</a></p>
</blockquote>
<h2 data-id="heading-0">项目初始化</h2>
<p>这里我们使用 Vite 来进行项目搭建，在终端输入以下代码：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">npx create-vite</span>
</code></pre>
<p>输入项目名，选择 <code>react-ts</code> 模板即可。最终的项目结构是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">├── index.html</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── package.json</span>
<span class="code-block-extension-codeLine" data-line-num="3">├── src</span>
<span class="code-block-extension-codeLine" data-line-num="4">│&nbsp;&nbsp; ├── App.css</span>
<span class="code-block-extension-codeLine" data-line-num="5">│&nbsp;&nbsp; ├── App.tsx</span>
<span class="code-block-extension-codeLine" data-line-num="6">│&nbsp;&nbsp; ├── favicon.svg</span>
<span class="code-block-extension-codeLine" data-line-num="7">│&nbsp;&nbsp; ├── index.css</span>
<span class="code-block-extension-codeLine" data-line-num="8">│&nbsp;&nbsp; ├── logo.svg</span>
<span class="code-block-extension-codeLine" data-line-num="9">│&nbsp;&nbsp; ├── main.tsx</span>
<span class="code-block-extension-codeLine" data-line-num="10">│&nbsp;&nbsp; └── vite-env.d.ts</span>
<span class="code-block-extension-codeLine" data-line-num="11">├── tsconfig.json</span>
<span class="code-block-extension-codeLine" data-line-num="12">├── tsconfig.node.json</span>
<span class="code-block-extension-codeLine" data-line-num="13">└── vite.config.ts</span>
</code></pre>
<p>当然，你也可以使用 Create-React-App、Parcel 等工具进行项目搭建，对于 Create-React-App 运行：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">npm i create-react-app -g</span>
<span class="code-block-extension-codeLine" data-line-num="2">create-react-app your-project --template=typescript</span>
</code></pre>
<p>对于基于 Parcel 的搭建，参考我的这个 demo：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FLinbuduLab%2FParcel-Tsx-Template" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/LinbuduLab/Parcel-Tsx-Template" ref="nofollow noopener noreferrer">Parcel-Tsx-Template</a>。</p>
<blockquote>
<p>本质上，Vite、Create-React-App、Parcel 代表了三种不同思路的 Bundler，分别是基于浏览器 ESM 支持的 Bundleless 、大而全的 Webpack 以及零配置的 Parcel ，我们会在扩展阅读一节了解更多。</p>
</blockquote>
<h2 data-id="heading-1">项目配置</h2>
<p>先不急着开始，我们先观察基于 Vite 创建的初始项目里都包含了哪些配置。</p>
<p>首先是依赖，可以看到在 devDependencies 中包含了 <code>@types/react</code> 与 <code>@types/react-dom</code> 。对于 <code>@types</code> 包的作用我们在前面一节已经了解过，TypeScript 会自动加载 <code>node_modules/@types</code> 下的类型定义来在全局使用。而除了这一点，当我们从 react 中导出一个类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-variable constant_">FC</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-variable constant_">FC</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;</span>
</code></pre>
<p>实际上这个类型也来自于 <code>@types/react</code> 。接着是项目内的 <code>vite-env.d.ts</code> 声明文件，我们会发现它只有短短的一行：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">/// &lt;reference types="vite/client" /&gt;</span></span>
</code></pre>
<p>三斜线指令的作用我们在前面一节了解过，现在我们就看看 <code>vite/client</code> 中都包含了什么：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">/// &lt;reference lib="dom" /&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-comment">/// &lt;reference path="./types/importMeta.d.ts" /&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-comment">// CSS modules</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">type</span> <span class="hljs-title class_">CSSModuleClasses</span> = { <span class="hljs-keyword">readonly</span> [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> }</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">'*.module.css'</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-keyword">const</span> <span class="hljs-attr">classes</span>: <span class="hljs-title class_">CSSModuleClasses</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> classes</span>
<span class="code-block-extension-codeLine" data-line-num="10">}</span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">'*.module.scss'</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-keyword">const</span> <span class="hljs-attr">classes</span>: <span class="hljs-title class_">CSSModuleClasses</span></span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> classes</span>
<span class="code-block-extension-codeLine" data-line-num="14">}</span>
<span class="code-block-extension-codeLine" data-line-num="15"><span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="16"></span>
<span class="code-block-extension-codeLine" data-line-num="17"><span class="hljs-comment">// CSS</span></span>
<span class="code-block-extension-codeLine" data-line-num="18"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">'*.css'</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="19">  <span class="hljs-keyword">const</span> <span class="hljs-attr">css</span>: <span class="hljs-built_in">string</span></span>
<span class="code-block-extension-codeLine" data-line-num="20">  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> css</span>
<span class="code-block-extension-codeLine" data-line-num="21">}</span>
<span class="code-block-extension-codeLine" data-line-num="22"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">'*.scss'</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="23">  <span class="hljs-keyword">const</span> <span class="hljs-attr">css</span>: <span class="hljs-built_in">string</span></span>
<span class="code-block-extension-codeLine" data-line-num="24">  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> css</span>
<span class="code-block-extension-codeLine" data-line-num="25">}</span>
<span class="code-block-extension-codeLine" data-line-num="26"><span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="27"></span>
<span class="code-block-extension-codeLine" data-line-num="28"></span>
<span class="code-block-extension-codeLine" data-line-num="29"><span class="hljs-comment">// Built-in asset types</span></span>
<span class="code-block-extension-codeLine" data-line-num="30"><span class="hljs-comment">// see `src/constants.ts`</span></span>
<span class="code-block-extension-codeLine" data-line-num="31"></span>
<span class="code-block-extension-codeLine" data-line-num="32"><span class="hljs-comment">// images</span></span>
<span class="code-block-extension-codeLine" data-line-num="33"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">'*.jpg'</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="34">  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>
<span class="code-block-extension-codeLine" data-line-num="35">  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src</span>
<span class="code-block-extension-codeLine" data-line-num="36">}</span>
<span class="code-block-extension-codeLine" data-line-num="37"><span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="38"></span>
<span class="code-block-extension-codeLine" data-line-num="39"><span class="hljs-comment">// fonts</span></span>
<span class="code-block-extension-codeLine" data-line-num="40"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">'*.woff'</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="41">  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>
<span class="code-block-extension-codeLine" data-line-num="42">  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src</span>
<span class="code-block-extension-codeLine" data-line-num="43">}</span>
<span class="code-block-extension-codeLine" data-line-num="44"></span>
<span class="code-block-extension-codeLine" data-line-num="45"><span class="hljs-comment">// ...</span></span>
</code></pre>
<p>你会发现，其实这里面包含的就是对于非实际代码文件导入的类型定义，包括了 CSS Modules、图片、视频等类型，通过这里的类型封装，在你导入这些文件时就也能获得基本的类型保障。</p>
<p>三斜线指令并不是导入类型的唯一方式，我们前面也提到了，可以使用 import 的方式来导入类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// vite-env.d.ts</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> <span class="hljs-title class_">ViteClientEnv</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'vite/client'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-comment">// 或使用 import type</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> * <span class="hljs-keyword">as</span> <span class="hljs-title class_">ViteClientEnv</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'vite/client'</span>;</span>
</code></pre>
<p>类型定义包与类型声明其实就是这个脚手架所进行的额外工作，也是在日常开发中我们会重度依赖的部分。而除了这两者以外还有 tsconfig.json 相关配置，我们会在后面有专门的一节进行分析。</p>
<p>接下来，我们就开始学习如何在 React 中优雅地使用 TypeScript 。</p>
<h2 data-id="heading-2">组件声明</h2>
<p>首先我们来想想，在 React 中如何声明一个（函数）组件。最简单的方式肯定是直接声明一个函数：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">tsx</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-tsx code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Container</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>林不渡！<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
</code></pre>
<p>对于组件的 props 类型，我们可以就像在函数中标注参数类型一样：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IContainerProps</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">visible</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">controller</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Container</span> = (<span class="hljs-params">props: IContainerProps</span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>林不渡！<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8">};</span>
</code></pre>
<p>属性默认值（defaultProps）也可以通过参数默认值的形式非常自然地进行声明：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Container</span> = (<span class="hljs-params">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  visible = <span class="hljs-literal">false</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="3">  controller = () =&gt; {},</span>
<span class="code-block-extension-codeLine" data-line-num="4">}: IContainerProps) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>林不渡！<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">};</span>
</code></pre>
<p>这么做看起来很朴素，但 TypeScript 仍然能把返回值类型推导出来，以上函数的类型可以被正确地推导为 <code>() =&gt; JSX.Element</code>。</p>
<p>但这样只能说明它是一个函数，并不能从类型层面上标明它是一个 React 组件，也无法约束它必须返回一个合法的组件。我们可以加上显式的类型标注来确保它返回一个有效组件：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title class_">Container</span> = (): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span> =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>林不渡！<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
</code></pre>
<blockquote>
<p>JSX  是一个命名空间，来自于 <code>@types/react</code>。</p>
</blockquote>
<p>除了这种方式， React 中还提供了 FC 这一类型来支持更精确的类型声明：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">tsx</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-tsx code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IContainerProps</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">visible</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">controller</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">const</span> <span class="hljs-title class_">Container</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">IContainerProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="9">  visible = <span class="hljs-literal">false</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="10">  controller = () =&gt; {},</span>
<span class="code-block-extension-codeLine" data-line-num="11">}: IContainerProps) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>林不渡！<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">};</span>
</code></pre>
<p>FC 是 FunctionComponent 的缩写，而 FunctionComponent 同样被作为一个类型导出，其使用方式是一致的，接受的唯一泛型参数即为这个组件的属性类型。</p>
<blockquote>
<p>其实还存在 StatelessComponent 、SFC 这两个同样指函数组件，使用方式也和 FC 一致的类型，但已经不推荐使用。</p>
</blockquote>
<p>我们来看 FC 的声明是什么样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FunctionComponent</span>&lt;P = {}&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  (<span class="hljs-attr">props</span>: <span class="hljs-title class_">PropsWithChildren</span>&lt;P&gt;, context?: <span class="hljs-built_in">any</span>): <span class="hljs-title class_">ReactElement</span>&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt; | <span class="hljs-literal">null</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  propTypes?: <span class="hljs-title class_">WeakValidationMap</span>&lt;P&gt; | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  contextTypes?: <span class="hljs-title class_">ValidationMap</span>&lt;<span class="hljs-built_in">any</span>&gt; | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  defaultProps?: <span class="hljs-title class_">Partial</span>&lt;P&gt; | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">  displayName?: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
</code></pre>
<p>可以看到，代表着属性类型的泛型参数 P 实际上就是直接传给了类型别名 PropsWithChildren ，而它其实就是为 Props 新增了一个 children 属性：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropsWithChildren</span>&lt;P&gt; = P &amp; { children?: <span class="hljs-title class_">ReactNode</span> | <span class="hljs-literal">undefined</span> };</span>
</code></pre>
<p>也就是说我们连这个组件的 children 都约束了：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">tsx</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-tsx code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title function_">App</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> (</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Container</span> <span class="hljs-attr">visible</span> <span class="hljs-attr">controller</span>=<span class="hljs-string">{()</span> =&gt;</span> {}}&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>TypeScript + React!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-tag">&lt;/<span class="hljs-name">Container</span>&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">  );</span>
<span class="code-block-extension-codeLine" data-line-num="7">};</span>
</code></pre>
<p>但如果我们并不想这个组件接受 children，正如上面这个组件并没有消费 <code>props.children</code> ，此时应该怎么做？这就要说到，为什么在更严格的场景下其实不推荐使用 FC 了，请参考扩展阅读部分。</p>
<h3 data-id="heading-3">组件泛型</h3>
<p>使用简单函数和使用 FC 的重要差异之一就在于，使用 FC 时你无法再使用组件泛型。组件泛型即指，为你的组件属性再次添加一个泛型，比如这样：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">tsx</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-tsx code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PropsWithChildren</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ICellProps</span>&lt;<span class="hljs-title class_">TData</span>&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-comment">// </span></span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">field</span>: keyof <span class="hljs-title class_">TData</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">const</span> <span class="hljs-title class_">Cell</span> = &lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;&gt;<span class="hljs-function">(<span class="hljs-params"></span></span></span>
<span class="code-block-extension-codeLine" data-line-num="9">  props: PropsWithChildren&lt;ICellProps&lt;T&gt;&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="10">) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="12">};</span>
<span class="code-block-extension-codeLine" data-line-num="13"></span>
<span class="code-block-extension-codeLine" data-line-num="14"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IDataStruct</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="15">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="16">  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="17">}</span>
<span class="code-block-extension-codeLine" data-line-num="18"></span>
<span class="code-block-extension-codeLine" data-line-num="19"><span class="hljs-keyword">const</span> <span class="hljs-title function_">App</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="20">  <span class="hljs-keyword">return</span> (</span>
<span class="code-block-extension-codeLine" data-line-num="21">    &lt;&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="22">      &lt;Cell&lt;IDataStruct&gt; field='name'&gt;&lt;/Cell&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="23">      &lt;Cell&lt;IDataStruct&gt; field='age'&gt;&lt;/Cell&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="24">    &lt;/&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="25">  );</span>
<span class="code-block-extension-codeLine" data-line-num="26">};</span>
</code></pre>
<p>在 Cell 组件中，其 field 属性在接口结构中约束为 <code>keyof TData</code>，如在 App 中使用时我们基于 IDataStruct 进行约束，此时 Cell 组件的 field 属性就<strong>只能传入 name 与 age 两个值</strong>。也就是说，我们可以为这个组件显式声明泛型参数，来获得填充属性时的类型提示与检查。</p>
<p>但很明显，使用 FC 我们并不能做到这一点。</p>
<blockquote>
<p>以上示例代码来自于 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgeist-ui.dev%2Fzh-cn%2Fcomponents%2Ftable%23typescript-%25E7%25A4%25BA%25E4%25BE%258B" target="_blank" rel="nofollow noopener noreferrer" title="https://geist-ui.dev/zh-cn/components/table#typescript-%E7%A4%BA%E4%BE%8B" ref="nofollow noopener noreferrer">Geist-UI</a>，一个我认为最符合自己审美的 UI 组件库。</p>
</blockquote>
<p>关于更多简单函数声明与 FC 的差异，我们会在扩展阅读中了解。另外，Class Component 不在本节要介绍的范围中。</p>
<p>现在我们进入下一个部分，看看 React 中都有哪些泛型坑位？</p>
<h2 data-id="heading-4">泛型坑位</h2>
<p>常见的泛型坑位主要还是来自于日常使用最多的 Hooks，我们一个个来看。</p>
<h3 data-id="heading-5">useState</h3>
<p>首先是 useState，可以由输入值隐式推导或者显式传入泛型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">tsx</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-tsx code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Container</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-comment">// 推导为 string 类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-keyword">const</span> [state1, setState1] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">'linbudu'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-comment">// 此时类型为 string | undefined</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-keyword">const</span> [state2, setState2] = useState&lt;<span class="hljs-built_in">string</span>&gt;();</span>
<span class="code-block-extension-codeLine" data-line-num="6">};</span>
</code></pre>
<p>需要注意的是在显式传入泛型时，如果像上面的例子一样没有提供初始值，那么 state2 的类型实际上会是 <code>string | undefined</code>，这是因为在 useState 声明中对是否提供初始值的两种情况做了区分重载：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// 提供了默认值</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">function</span> useState&lt;S&gt;(<span class="hljs-attr">initialState</span>: S | (<span class="hljs-function">() =&gt;</span> S)): [S, <span class="hljs-title class_">Dispatch</span>&lt;<span class="hljs-title class_">SetStateAction</span>&lt;S&gt;&gt;];</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-comment">// 没有提供默认值</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">function</span> useState&lt;S = <span class="hljs-literal">undefined</span>&gt;(): [S | <span class="hljs-literal">undefined</span>, <span class="hljs-title class_">Dispatch</span>&lt;<span class="hljs-title class_">SetStateAction</span>&lt;S | <span class="hljs-literal">undefined</span>&gt;&gt;];</span>
</code></pre>
<p>另外一个常见的场景是对于在初始阶段是一个空对象的状态，你可能会使用断言来这么做：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-title class_">IData</span>&gt;({} <span class="hljs-keyword">as</span> <span class="hljs-title class_">IData</span>);</span>
</code></pre>
<p>这么做的坏处在于，后续的调用方中会认为这是一个完整实现了 IData 结构的对象，可能会出现遗漏的未赋值属性，此时你也可以使用 Partial 类型标记它为可选：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">IData</span>&gt;&gt;({});</span>
</code></pre>
<p>如果你需要消费 useState 返回值的类型，可以搭配 ReturnType：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// 相当于 useState(0) 的返回值类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">type</span> <span class="hljs-title class_">State</span> = <span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-keyword">typeof</span> useState&lt;<span class="hljs-built_in">number</span>&gt;&gt;;</span>
</code></pre>
<h3 data-id="heading-6">useCallback 与 useMemo</h3>
<p>然后是 useCallback 与 useMemo，它们的泛型参数分别表示包裹的函数和计算产物，使用方式类似，也分为<strong>隐式推导</strong>与<strong>显式提供</strong>两种：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Container</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-comment">// 泛型推导为 (input: number) =&gt; boolean</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-keyword">const</span> handler1 = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params">input: <span class="hljs-built_in">number</span></span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-keyword">return</span> input &gt; <span class="hljs-number">599</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  }, []);</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-comment">// 显式提供为 (input: number, compare: boolean) =&gt; boolean</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-keyword">const</span> handler2 = useCallback&lt;<span class="hljs-function">(<span class="hljs-params">input: <span class="hljs-built_in">number</span>, compare: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span>&gt;(</span>
<span class="code-block-extension-codeLine" data-line-num="9">    <span class="hljs-function">(<span class="hljs-params">input: <span class="hljs-built_in">number</span></span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="10">      <span class="hljs-keyword">return</span> input &gt; <span class="hljs-number">599</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="11">    },</span>
<span class="code-block-extension-codeLine" data-line-num="12">    []</span>
<span class="code-block-extension-codeLine" data-line-num="13">  );</span>
<span class="code-block-extension-codeLine" data-line-num="14">  </span>
<span class="code-block-extension-codeLine" data-line-num="15">  <span class="hljs-comment">// 推导为 string</span></span>
<span class="code-block-extension-codeLine" data-line-num="16">  <span class="hljs-keyword">const</span> result1 = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="17">    <span class="hljs-keyword">return</span> <span class="hljs-string">'some-expensive-process'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="18">  }, []);</span>
<span class="code-block-extension-codeLine" data-line-num="19"></span>
<span class="code-block-extension-codeLine" data-line-num="20">  <span class="hljs-comment">// 显式提供</span></span>
<span class="code-block-extension-codeLine" data-line-num="21">  <span class="hljs-keyword">const</span> result2 = useMemo&lt;{ name?: <span class="hljs-built_in">string</span> }&gt;(<span class="hljs-function">() =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="22">    <span class="hljs-keyword">return</span> {};</span>
<span class="code-block-extension-codeLine" data-line-num="23">  }, []);</span>
<span class="code-block-extension-codeLine" data-line-num="24">};</span>
</code></pre>
<p>通常情况下，我们不会主动为 useCallback 提供泛型参数，因为其传入的函数往往已经确定。而为 useMemo 提供泛型参数则要常见一些，因为我们可能希望通过这种方式来约束 useMemo 最后的返回值。</p>
<h3 data-id="heading-7">useReducer</h3>
<p>useReducer 可以被视为更复杂一些的 useState，它们关注的都是数据的变化。不同的是 useReducer 中只能由 reducer 按照特定的 action 来修改数据，但 useState 则可以随意修改。useReducer 有三个泛型坑位，分别为 reducer 函数的类型签名、数据的结构以及初始值的计算函数，我们直接看实际使用即可：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { useReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> initialState = { <span class="hljs-attr">count</span>: <span class="hljs-number">0</span> };</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Actions</span> =</span>
<span class="code-block-extension-codeLine" data-line-num="6">  | {</span>
<span class="code-block-extension-codeLine" data-line-num="7">      <span class="hljs-attr">type</span>: <span class="hljs-string">'inc'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8">      <span class="hljs-attr">payload</span>: {</span>
<span class="code-block-extension-codeLine" data-line-num="9">        <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10">        max?: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="11">      };</span>
<span class="code-block-extension-codeLine" data-line-num="12">    }</span>
<span class="code-block-extension-codeLine" data-line-num="13">  | {</span>
<span class="code-block-extension-codeLine" data-line-num="14">      <span class="hljs-attr">type</span>: <span class="hljs-string">'dec'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="15">      <span class="hljs-attr">payload</span>: {</span>
<span class="code-block-extension-codeLine" data-line-num="16">        <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="17">        min?: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="18">      };</span>
<span class="code-block-extension-codeLine" data-line-num="19">    };</span>
<span class="code-block-extension-codeLine" data-line-num="20"></span>
<span class="code-block-extension-codeLine" data-line-num="21"><span class="hljs-keyword">function</span> <span class="hljs-title function_">reducer</span>(<span class="hljs-params">state: <span class="hljs-keyword">typeof</span> initialState, action: Actions</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="22">  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="23">    <span class="hljs-keyword">case</span> <span class="hljs-string">'inc'</span>:</span>
<span class="code-block-extension-codeLine" data-line-num="24">      <span class="hljs-keyword">return</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="25">        <span class="hljs-attr">count</span>: action.<span class="hljs-property">payload</span>.<span class="hljs-property">max</span></span>
<span class="code-block-extension-codeLine" data-line-num="26">          ? <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(state.<span class="hljs-property">count</span> + action.<span class="hljs-property">payload</span>.<span class="hljs-property">count</span>, action.<span class="hljs-property">payload</span>.<span class="hljs-property">max</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="27">          : state.<span class="hljs-property">count</span> + action.<span class="hljs-property">payload</span>.<span class="hljs-property">count</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="28">      };</span>
<span class="code-block-extension-codeLine" data-line-num="29">    <span class="hljs-keyword">case</span> <span class="hljs-string">'dec'</span>:</span>
<span class="code-block-extension-codeLine" data-line-num="30">      <span class="hljs-keyword">return</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="31">        <span class="hljs-attr">count</span>: action.<span class="hljs-property">payload</span>.<span class="hljs-property">min</span></span>
<span class="code-block-extension-codeLine" data-line-num="32">          ? <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(state.<span class="hljs-property">count</span> + action.<span class="hljs-property">payload</span>.<span class="hljs-property">count</span>, action.<span class="hljs-property">payload</span>.<span class="hljs-property">min</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="33">          : state.<span class="hljs-property">count</span> - action.<span class="hljs-property">payload</span>.<span class="hljs-property">count</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="34">      };</span>
<span class="code-block-extension-codeLine" data-line-num="35">    <span class="hljs-attr">default</span>:</span>
<span class="code-block-extension-codeLine" data-line-num="36">      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'Unexpected Action Received.'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="37">  }</span>
<span class="code-block-extension-codeLine" data-line-num="38">}</span>
<span class="code-block-extension-codeLine" data-line-num="39"></span>
<span class="code-block-extension-codeLine" data-line-num="40"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Counter</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="41">  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(reducer, initialState);</span>
<span class="code-block-extension-codeLine" data-line-num="42">  </span>
<span class="code-block-extension-codeLine" data-line-num="43">  <span class="hljs-keyword">return</span> (</span>
<span class="code-block-extension-codeLine" data-line-num="44">    <span class="xml"><span class="hljs-tag">&lt;&gt;</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="45">      Count: {state.count}</span>
<span class="code-block-extension-codeLine" data-line-num="46">      <span class="hljs-tag">&lt;<span class="hljs-name">button</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="47">        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="48">          dispatch({ type: 'dec', payload: { count: 599, min: 0 } })</span>
<span class="code-block-extension-codeLine" data-line-num="49">        }</span>
<span class="code-block-extension-codeLine" data-line-num="50">      &gt;</span>
<span class="code-block-extension-codeLine" data-line-num="51">        -(min: 0)</span>
<span class="code-block-extension-codeLine" data-line-num="52">      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="53">      <span class="hljs-tag">&lt;<span class="hljs-name">button</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="54">        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="55">          dispatch({</span>
<span class="code-block-extension-codeLine" data-line-num="56">            type: 'inc',</span>
<span class="code-block-extension-codeLine" data-line-num="57">            payload: {</span>
<span class="code-block-extension-codeLine" data-line-num="58">              count: 599,</span>
<span class="code-block-extension-codeLine" data-line-num="59">              max: 599,</span>
<span class="code-block-extension-codeLine" data-line-num="60">            },</span>
<span class="code-block-extension-codeLine" data-line-num="61">          })</span>
<span class="code-block-extension-codeLine" data-line-num="62">        }</span>
<span class="code-block-extension-codeLine" data-line-num="63">      &gt;</span>
<span class="code-block-extension-codeLine" data-line-num="64">        +(max: 599)</span>
<span class="code-block-extension-codeLine" data-line-num="65">      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="66">    <span class="hljs-tag">&lt;/&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="67">  );</span>
<span class="code-block-extension-codeLine" data-line-num="68">}</span>
</code></pre>
<p>在上面的例子中，useReducer 的泛型参数分别被填充为 reducer 函数的类型签名，以及其初始状态：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Reducer</span>&lt;S, A&gt; = <span class="hljs-function">(<span class="hljs-params">prevState: S, action: A</span>) =&gt;</span> S;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ReducerState</span>&lt;R <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Reducer</span>&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt;&gt; = R <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Reducer</span>&lt;infer S, <span class="hljs-built_in">any</span>&gt; ? S : <span class="hljs-built_in">never</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">function</span> useReducer&lt;R <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Reducer</span>&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt;&gt;(</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">reducer</span>: R,</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-attr">initialState</span>: <span class="hljs-title class_">ReducerState</span>&lt;R&gt;,</span>
<span class="code-block-extension-codeLine" data-line-num="7">): [<span class="hljs-title class_">ReducerState</span>&lt;R&gt;, <span class="hljs-title class_">Dispatch</span>&lt;<span class="hljs-title class_">ReducerAction</span>&lt;R&gt;&gt;];</span>
</code></pre>
<p>分析一下这里的填充：R 被填充为了一整个函数类型，而 <code>ReducerState&lt;R&gt;</code> 实际上就是提取了 reducer 中代表 state 的参数，即状态的类型，在这里即是 <code>{ count: number }</code> 这么一个结构。</p>
<p>需要注意的是，在 reducer 中其实也应用了我们此前提到过的<strong>可辨识联合类型概念</strong>，这里的 <code>action.type</code> 即为可辨识属性，通过 type 判断，我们就能在每一个 case 语句中获得联合类型对应分支的类型。</p>
<h3 data-id="heading-8">useRef 与 useImperativeHandle</h3>
<p>useRef 的常见使用场景主要包括两种，存储一个 DOM 元素引用和持久化保存一个值。这两者情况对应的类型其实也是不同的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Container</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">const</span> domRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-keyword">const</span> valueRef = useRef&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">599</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-keyword">const</span> <span class="hljs-title function_">operateRef</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="6">    domRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">getBoundingClientRect</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="7">    valueRef.<span class="hljs-property">current</span> += <span class="hljs-number">1</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8">  };</span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-keyword">return</span> (</span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{domRef}</span>&gt;</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="12">      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>林不渡<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="13">    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="14">  );</span>
<span class="code-block-extension-codeLine" data-line-num="15">};</span>
<span class="code-block-extension-codeLine" data-line-num="16"></span>
</code></pre>
<p>对于 domRef，此时其类型（current）会被推断为 <code>RefObject&lt;HTMLDivElement&gt;</code>，而 valueRef 的值类型则为 <code>MutableRefObject&lt;number&gt;</code>，这是完全符合预期的。因为我们并不会去修改挂载了 DOM 引用的 ref，而确实会修改值引用的 ref ，所以后者会是 Mutable 的。</p>
<p>然而实际上，这一差异并不是通过判断是否被应用在了 DOM 引用来实现的（也不需要做到如此智能），从 useRef 的类型定义可以看出，对于初始值为 null 的 useRef，其类型均会被推导为 RefObject：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> useRef&lt;T&gt;(<span class="hljs-attr">initialValue</span>: T): <span class="hljs-title class_">MutableRefObject</span>&lt;T&gt;;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">function</span> useRef&lt;T&gt;(<span class="hljs-attr">initialValue</span>: T | <span class="hljs-literal">null</span>): <span class="hljs-title class_">RefObject</span>&lt;T&gt;;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">function</span> useRef&lt;T = <span class="hljs-literal">undefined</span>&gt;(): <span class="hljs-title class_">MutableRefObject</span>&lt;T | <span class="hljs-literal">undefined</span>&gt;;</span>
</code></pre>
<blockquote>
<p>HTMLDivElement 这一类型来自于 TypeScript 内置，在使用 ref 来引用 DOM 元素时，你应当使用尽可能精确的元素类型，如 HTMLInputElement、HTMLIFrameElement 等，而不是 HTMLElement 这样宽泛的定义，因为这些精确元素定义的内部封装了更加具体的类型定义，包括 HTML 属性、事件入参等。</p>
</blockquote>
<p>对于 useImperativeHandle ，可能很多同学并不熟悉，可以参考 <a href="https://juejin.cn/post/6888616874171432973" target="_blank" title="https://juejin.cn/post/6888616874171432973">useRef 三兄弟</a> 这篇文章来了解具体使用。简单地说，这个 hook 接受一个 ref 、一个函数、一个依赖数组。这个函数的返回值会被挂载到 ref 上，常见的使用方式是用于实现<strong>父组件调用子组件方法</strong>：子组件将自己的方法挂载到 ref 后，父组件就可以通过 ref 来调用此方法。</p>
<p>我们来看具体的例子而后依次讲解：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  useRef,</span>
<span class="code-block-extension-codeLine" data-line-num="3">  useImperativeHandle,</span>
<span class="code-block-extension-codeLine" data-line-num="4">  forwardRef,</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-title class_">ForwardRefRenderFunction</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="6">} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IRefPayload</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-attr">controller</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10">}</span>
<span class="code-block-extension-codeLine" data-line-num="11"></span>
<span class="code-block-extension-codeLine" data-line-num="12"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Parent</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-keyword">const</span> childRef = useRef&lt;<span class="hljs-title class_">IRefPayload</span>&gt;(<span class="hljs-literal">null</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="14"></span>
<span class="code-block-extension-codeLine" data-line-num="15">  <span class="hljs-keyword">const</span> <span class="hljs-title function_">invokeController</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="16">    childRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">controller</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="17">  };</span>
<span class="code-block-extension-codeLine" data-line-num="18"></span>
<span class="code-block-extension-codeLine" data-line-num="19">  <span class="hljs-keyword">return</span> (</span>
<span class="code-block-extension-codeLine" data-line-num="20">    <span class="xml"><span class="hljs-tag">&lt;&gt;</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="21">      <span class="hljs-tag">&lt;<span class="hljs-name">Child</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{childRef}</span> /&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="22">      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{invokeController}</span>&gt;</span>invoke controller!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="23">    <span class="hljs-tag">&lt;/&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="24">  );</span>
<span class="code-block-extension-codeLine" data-line-num="25">};</span>
<span class="code-block-extension-codeLine" data-line-num="26"></span>
<span class="code-block-extension-codeLine" data-line-num="27"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IChildPropStruct</span> {}</span>
<span class="code-block-extension-codeLine" data-line-num="28"></span>
<span class="code-block-extension-codeLine" data-line-num="29"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IExtendedRefPayload</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">IRefPayload</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="30">  <span class="hljs-attr">disposer</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="31">}</span>
<span class="code-block-extension-codeLine" data-line-num="32"></span>
<span class="code-block-extension-codeLine" data-line-num="33"><span class="hljs-keyword">const</span> <span class="hljs-title class_">Child</span> = forwardRef&lt;<span class="hljs-title class_">IRefPayload</span>, <span class="hljs-title class_">IChildPropStruct</span>&gt;(<span class="hljs-function">(<span class="hljs-params">props, ref</span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="34">  <span class="hljs-keyword">const</span> <span class="hljs-title function_">internalController</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="35">    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'Internal Controller!'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="36">  };</span>
<span class="code-block-extension-codeLine" data-line-num="37"></span>
<span class="code-block-extension-codeLine" data-line-num="38">  useImperativeHandle&lt;<span class="hljs-title class_">IRefPayload</span>, <span class="hljs-title class_">IExtendedRefPayload</span>&gt;(</span>
<span class="code-block-extension-codeLine" data-line-num="39">    ref,</span>
<span class="code-block-extension-codeLine" data-line-num="40">    <span class="hljs-function">() =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="41">      <span class="hljs-keyword">return</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="42">        <span class="hljs-attr">controller</span>: internalController,</span>
<span class="code-block-extension-codeLine" data-line-num="43">        <span class="hljs-attr">disposer</span>: <span class="hljs-function">() =&gt;</span> {},</span>
<span class="code-block-extension-codeLine" data-line-num="44">      };</span>
<span class="code-block-extension-codeLine" data-line-num="45">    },</span>
<span class="code-block-extension-codeLine" data-line-num="46">    []</span>
<span class="code-block-extension-codeLine" data-line-num="47">  );</span>
<span class="code-block-extension-codeLine" data-line-num="48"></span>
<span class="code-block-extension-codeLine" data-line-num="49">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="50">});</span>
</code></pre>
<ul>
<li>IRefPayload 描述了我们将会在 ref 上挂载的对象结构。</li>
<li>在函数组件中，接受 ref 的函数组件（子组件）需要被 forwardRef 包裹才能正确接收到 ref 对象，其接受两个泛型参数，分别为 ref 的类型与此组件的属性类型。</li>
<li>useImperativeHandle 中传入了 ref 以及一个返回两个方法的函数，它具有两个泛型参数，分别从传入的 ref 以及函数的返回值类型中进行类型推导。在这里我们显式传入了与推导不一致的第二个泛型参数，以此提供了额外的返回值类型检查。</li>
</ul>
<p>useImperativeHandle 并非常用的 hook，但在某些场景下也确实有奇效。</p>
<p>除了以上介绍的这些 hooks 以外，还有 useContext、useEffect 等常用的 hooks，但它们或是过于简单或是不存在泛型坑位。这里我们就不做介绍，如果你有兴趣，直接阅读其类型源码即可。</p>
<h2 data-id="heading-9">内置类型定义</h2>
<p>除了上面介绍的泛型坑位以外，在 React 中想要用好 TypeScript 的另一个关键因素就是使用 <code>@types/react</code> 提供的类型定义，最常见的就是事件类型，比如输入框值变化时的 ChangeEvent 和鼠标事件通用的 MouseEvent：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ChangeEvent</span>, <span class="hljs-title class_">MouseEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Container</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-keyword">const</span> [v, setV] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">'linbudu'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChange</span> = (<span class="hljs-params">event: ChangeEvent&lt;HTMLInputElement&gt;</span>) =&gt; {};</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params">event: MouseEvent&lt;HTMLButtonElement&gt;</span>) =&gt; {};</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-keyword">return</span> (</span>
<span class="code-block-extension-codeLine" data-line-num="12">    <span class="xml"><span class="hljs-tag">&lt;&gt;</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="13">      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{v}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleChange}</span> /&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="14">      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>Click me!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="15">    <span class="hljs-tag">&lt;/&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="16">  );</span>
<span class="code-block-extension-codeLine" data-line-num="17">};</span>
</code></pre>
<p>需要注意的是，ChangeEvent 和 MouseEvent 上还具有一个泛型坑位，用于指定发生此事件的元素类型，我们可以在这里进一步传入 <strong>HTMLButtonElement</strong> 这样更精确的元素类型获得更严格的类型检查。</p>
<p>除了使用 ChangeEvent 作为参数类型，React 还提供了整个函数的类型签名，如 ChangeEventHandler：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-attr">handleChange</span>: <span class="hljs-title class_">ChangeEventHandler</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt; = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {};</span>
</code></pre>
<p>由于上下文类型的存在，此时就无需再为 e 声明类型了，它会自动被推导为 <code>ChangeEvent&lt;HTMLInputElement&gt;</code> 。</p>
<p>类似的事件定义还有非常多，如 FormEvent、TouchEvent、DragEvent 等，但无需对所有定义都了解，在实际用到时再去导入即可。需要注意的是，由于 InputEvent <a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FInputEvent" target="_blank" rel="nofollow noopener noreferrer" title="https://developer.mozilla.org/en-US/docs/Web/API/InputEvent" ref="nofollow noopener noreferrer">并非在所有浏览器都得到了支持</a>，因此并不存在对应的类型定义，你可以使用 KeyboardEvent 来代替。</p>
<p>除了这些事件类型以外，还有一个常见的类型是在你声明组件属性中的样式时会用到的，那就是 CSSProperties ，它描述了所有的 CSS 属性及对应的属性值类型，你也可以直接用它来检查 CSS 样式时的值：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">CSSProperties</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IContainerProps</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">style</span>: <span class="hljs-title class_">CSSProperties</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">const</span> <span class="hljs-attr">css</span>: <span class="hljs-title class_">CSSProperties</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-attr">display</span>: <span class="hljs-string">'flex'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-attr">alignContent</span>: <span class="hljs-string">'center'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'center'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="11">};</span>
<span class="code-block-extension-codeLine" data-line-num="12"></span>
<span class="code-block-extension-codeLine" data-line-num="13"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Container</span> = (<span class="hljs-params">{ style }: IContainerProps</span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span>林不渡！<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="15">};</span>
</code></pre>
<h3 data-id="heading-10">其他内置类型</h3>
<p>还有一部分内置类型并不是日常开发中常用的，而是仅在组件库开发等场景时才会使用到，这里我们也做简单地介绍。</p>
<h4 data-id="heading-11">ComponentProps</h4>
<p>当你基于原生 HTML 元素去封装组件时，通常会需要将这个原生元素的所有 HTML 属性都保留下来作为组件的属性，此时你肯定不能一个个声明所有属性，那么就可以使用 ComponentProps 来提取出一个元素上所有的属性：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ComponentProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentProps</span>&lt;'button'&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  size?: <span class="hljs-string">'small'</span> | <span class="hljs-string">'large'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  link?: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params">props: IButtonProps</span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> {<span class="hljs-attr">...props</span>} &gt;</span>{props.children}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9">};</span>
</code></pre>
<p>除了对原生 DOM 元素使用以外，这一用法在使用组件库时也有奇效，比如组件库只导出了这个组件而没有导出这个组件的属性类型定义，而我们又需要基于这个组件进行定制封装，此时就可以使用 ComponentProps 去提取它的属性类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"ui-lib"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ComponentProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-title class_">Button</span>&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">display</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">const</span> <span class="hljs-title function_">EnhancedButton</span> = (<span class="hljs-params">props: IButtonProps</span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> {<span class="hljs-attr">...props</span>} &gt;</span>{props.children}<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9">};</span>
</code></pre>
<blockquote>
<p>由于 React 中 ref 的存在，有些时候我们会希望区分组件使用 ref 和没使用 ref 的情况，此时可以使用内置类型 ComponentPropsWithRef 或 ComponentPropsWithoutRef ，其使用方式与 ComponentProps 一致。</p>
</blockquote>
<p>ComponentProps 也可以用来提取一个 React 组件的属性类型，其内部实现对 HTML 元素和 React 组件这两种情况也做了区分：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ComponentProps</span>&lt;</span>
<span class="code-block-extension-codeLine" data-line-num="2">  T <span class="hljs-keyword">extends</span> keyof <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span> | <span class="hljs-title class_">JSXElementConstructor</span>&lt;<span class="hljs-built_in">any</span>&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="3">&gt; =</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-comment">// React 组件</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">  T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">JSXElementConstructor</span>&lt;infer P&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="6">    ? P</span>
<span class="code-block-extension-codeLine" data-line-num="7">    : <span class="hljs-comment">// HTML 元素</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">    T <span class="hljs-keyword">extends</span> keyof <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">    ? <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[T]</span>
<span class="code-block-extension-codeLine" data-line-num="10">    : {};</span>
</code></pre>
<h4 data-id="heading-12">ReactElement 与 ReactNode</h4>
<p>在前面的例子中你可能注意到了 ReactElement 与 ReactNode 这两个类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropsWithChildren</span>&lt;P&gt; = P &amp; { children?: <span class="hljs-title class_">ReactNode</span> | <span class="hljs-literal">undefined</span> };</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FunctionComponent</span>&lt;P = {}&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  (<span class="hljs-attr">props</span>: <span class="hljs-title class_">PropsWithChildren</span>&lt;P&gt;, context?: <span class="hljs-built_in">any</span>): <span class="hljs-title class_">ReactElement</span>&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt; | <span class="hljs-literal">null</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>ReactElement 是 createElement、cloneElement 等 factory 方法的返回值类型，它本质上指的是一个有效的 JSX 元素，即 <code>JSX.Element</code>。而 ReactNode 可以认为包含了 ReactElement ，它还包含 null、undefined 以及 ReactFragment 等一些特殊的部分，其类型定义如下：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ReactText</span> = <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ReactChild</span> = <span class="hljs-title class_">ReactElement</span> | <span class="hljs-title class_">ReactText</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ReactNode</span> = <span class="hljs-title class_">ReactChild</span> | <span class="hljs-title class_">ReactFragment</span> | <span class="hljs-title class_">ReactPortal</span> | <span class="hljs-built_in">boolean</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>;</span>
</code></pre>
<h2 data-id="heading-13">其他工程实践</h2>
<p>介绍了上面的项目配置与组件声明、泛型坑位相关内容以后，我们其实已经基本了解了 React 项目中使用 TypeScript 的注意事项。然而，还有一些概念涉及到项目的规范部分，我们在这里统一进行讲解。</p>
<p>需要注意的是，这些项目规范具有强烈的个人偏好风格，它们并不是必须严格遵守的规则，只是我个人在项目开发中习惯使用的一套规范，你可以按照自己的喜好来调整这些规范。</p>
<h3 data-id="heading-14">项目中的类型声明文件</h3>
<p>在实际应用中使用 TypeScript 进行开发时，我们往往需要大量的类型代码，而如何存放这些类型代码，其实就需要预先有一个明确的规范。目前我使用的方式是，在项目中使用一个专门的文件夹存放类型代码，其中又按照这些类型的作用进行了划分，其分布大致是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">PROJECT</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── src</span>
<span class="code-block-extension-codeLine" data-line-num="3">│   ├── types</span>
<span class="code-block-extension-codeLine" data-line-num="4">│   │   ├── shared.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">│   │   ├── [biz].ts</span>
<span class="code-block-extension-codeLine" data-line-num="6">│   │   ├── request.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">│   │   ├── tool.ts</span>
<span class="code-block-extension-codeLine" data-line-num="8">│   ├── typings.d.ts</span>
<span class="code-block-extension-codeLine" data-line-num="9">└── tsconfig.json</span>
</code></pre>
<p>我们来依次讲解下这些类型声明文件的作用：</p>
<ul>
<li>
<p><code>shared.ts</code>，被其他类型定义所使用的类型，如简单的联合类型封装、简单的结构工具类型等。</p>
</li>
<li>
<p><code>[biz].ts</code>，与业务逻辑对应的类型定义，比如 <code>user.ts</code> <code>module.ts</code> 等，推荐的方式是在中大型项目中尽可能按照业务模型来进行细粒度的拆分。</p>
</li>
<li>
<p><code>request.ts</code>，请求相关的类型定义，推荐的方式是定义响应结构体，然后使用 biz 中的业务逻辑类型定义进行填充：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Status</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./shared"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IRequestStruct</span>&lt;<span class="hljs-title class_">TData</span> = <span class="hljs-built_in">never</span>&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-attr">status</span>: <span class="hljs-title class_">Status</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-attr">code</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">    <span class="hljs-attr">data</span>: <span class="hljs-title class_">TData</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IPaginationRequestStruct</span>&lt;<span class="hljs-title class_">TData</span> = <span class="hljs-built_in">never</span>&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="10">    <span class="hljs-attr">status</span>: <span class="hljs-title class_">Status</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-attr">curPage</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="12">    <span class="hljs-attr">totalCount</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">    <span class="hljs-attr">hasNextPage</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="14">    <span class="hljs-attr">data</span>: <span class="hljs-title class_">TData</span>[];</span>
<span class="code-block-extension-codeLine" data-line-num="15">}</span>
</code></pre>
<p>实际使用时：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">IPaginationRequestStruct</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"@/types/request"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">IUserProfile</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"@/types/user"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-attr">fetchUserList</span>: <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">IPaginationRequestStruct</span>&lt;<span class="hljs-title class_">IUserProfile</span>&gt;&gt; {}</span>
</code></pre>
<p>通过这种方式，你的类型代定义之间就能够建立起清晰的、和业务逻辑一致的引用关系。</p>
</li>
<li>
<p><code>tool.ts</code>，工具类型定义，一般是推荐把比较通用的工具类型抽离到专门的工具类型库中，这里只存放使用场景特殊的部分。</p>
</li>
<li>
<p><code>typings.d.ts</code>，全局的类型声明，包括非代码文件的导入、无类型 npm 包的类型声明、全局变量的类型定义等等，你也可以进一步拆分为 <code>env.d.ts</code> <code>runtime.d.ts</code> <code>module.d.ts</code> 等数个各司其职的声明文件。</p>
</li>
</ul>
<p>在实际场景中，这一规范的粒度并不一定能够满足你的需要，但你仍然可以按照这一思路进行类型定义的梳理和妥善放置。另外，我们并不需要将所有的类型定义都专门放到这个文件夹里，比如仅被组件自身消费的类型就应该使用就近原则，直接和组件代码一起即可。</p>
<h3 data-id="heading-15">组件与组件类型</h3>
<p>在 React 父子组件中一个常见的场景是，父组件导入各个子组件，传递属性时会进行额外的数据处理，其结果的类型被这多个子组件共享，而这个类型又仅被父子组件消费，不应当放在全局的类型定义中。此时我推荐的方式是，将这个类型定义在父组件中，子组件使用仅类型导入去导入这个类型，由于值空间与类型空间是隔离的，因此我们并不需要担心循环引用：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// Parent.tsx</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ChildA</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./ChildA"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ChildB</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./ChildB"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ChildC</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./ChildC"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-comment">//  被多个子组件消费的类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ISpecialDataStruct</span> {}</span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Parent</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">ISpecialDataStruct</span> = {};</span>
<span class="code-block-extension-codeLine" data-line-num="12"></span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-keyword">return</span> (</span>
<span class="code-block-extension-codeLine" data-line-num="14">    <span class="xml"><span class="hljs-tag">&lt;&gt;</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="15">    <span class="hljs-tag">&lt;<span class="hljs-name">ChildA</span> <span class="hljs-attr">inputA</span>=<span class="hljs-string">{data}</span> /&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="16">    <span class="hljs-tag">&lt;<span class="hljs-name">ChildB</span> <span class="hljs-attr">inputB</span>=<span class="hljs-string">{data}</span> /&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="17">    <span class="hljs-tag">&lt;<span class="hljs-name">ChildC</span> <span class="hljs-attr">inputC</span>=<span class="hljs-string">{data}</span> /&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="18">    <span class="hljs-tag">&lt;/&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="19">  )</span>
<span class="code-block-extension-codeLine" data-line-num="20">}</span>
<span class="code-block-extension-codeLine" data-line-num="21"></span>
<span class="code-block-extension-codeLine" data-line-num="22"><span class="hljs-comment">// ChildA.tsx</span></span>
<span class="code-block-extension-codeLine" data-line-num="23"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ISpecialDataStruct</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./parent"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="24"></span>
<span class="code-block-extension-codeLine" data-line-num="25"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IAProp</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="26">  <span class="hljs-attr">inputA</span>: <span class="hljs-title class_">ISpecialDataStruct</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="27">}</span>
<span class="code-block-extension-codeLine" data-line-num="28"></span>
<span class="code-block-extension-codeLine" data-line-num="29"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">ChildA</span>: <span class="hljs-variable constant_">FC</span>&lt;<span class="hljs-title class_">IAProp</span>&gt; = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="30">  <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="31">}</span>
</code></pre>
<h2 data-id="heading-16">总结与预告</h2>
<p>在这一节中，我们了解了 React 与 TypeScript 结合使用的方式，包括了项目的基础配置、组件声明方式及其优劣、Hooks 中的泛型坑位以及内置类型等等。这些概念其实本质上还是来自于 TypeScript 提供的能力，因此在你学习完毕小册前半部分的类型工具与类型编程概念后，这些对你来说已经不是特别复杂的知识，你需要的依旧只是在实践中去熟悉这些工具。因此，本着“渐进式学习”的理念，不妨再次找出你的 React 项目开始改造，看看是否有什么地方可以写得更优雅健壮一些。</p>
<h2 data-id="heading-17">扩展阅读</h2>
<h3 data-id="heading-18">FC 并不是完美的</h3>
<p>在前面组件声明部分我们已经了解了使用函数声明组件，以及使用 FC 声明组件的两种形式，也明确了主要差异：</p>
<ul>
<li>函数声明组件需要额外的返回值类型标注（<code>JSX.Element</code>）才能校验组件合法，并且可以再使用组件泛型来进一步确保类型安全。</li>
<li>FC 可以简化函数的声明，但是无法使用组件泛型。</li>
</ul>
<p>在这一部分，我们再来了解下这两者更多的差异，以及为什么说 FC 并不是完美的 （举例来说，在 Create-React-App 的最新模板代码里，已经不再使用 FC 了）。</p>
<p>我们再来看一看 FC 的类型定义：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropsWithChildren</span>&lt;P&gt; = P &amp; { children?: <span class="hljs-title class_">ReactNode</span> | <span class="hljs-literal">undefined</span> };</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FunctionComponent</span>&lt;P = {}&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  (<span class="hljs-attr">props</span>: <span class="hljs-title class_">PropsWithChildren</span>&lt;P&gt;, context?: <span class="hljs-built_in">any</span>): <span class="hljs-title class_">ReactElement</span>&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt; | <span class="hljs-literal">null</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>你会发现 FC 的属性中是默认包含了 children 这一属性的（对应到 Vue 中则是插槽 slot 的概念），但并不是所有时候我们的组件都会包含一个 children：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title function_">App</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> (</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="xml"><span class="hljs-tag">&lt;&gt;</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="4">      <span class="hljs-tag">&lt;<span class="hljs-name">ContainerWithoutChildren</span> /&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">      <span class="hljs-tag">&lt;<span class="hljs-name">ContainerWithChildren</span>&gt;</span>linbudu<span class="hljs-tag">&lt;/<span class="hljs-name">ContainerWithChildren</span>&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">    <span class="hljs-tag">&lt;/&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">  );</span>
<span class="code-block-extension-codeLine" data-line-num="8">};</span>
</code></pre>
<p>如果你为 ContainerWithoutChildren 也传入了 children，虽然不会报错，但这个 children 实际上并不会渲染出来。</p>
<p>如果想让代码尽可能精准，实际上我们应该区分这两种情况，即组件是否会接受 children 并消费。而在 FC 中并没有进行区分，因此 React 中又提供了 VFC，即 VoidFunctionComponent ，它和 FC 的区别就在于属性中不包含 children：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-variable constant_">VFC</span>&lt;P = {}&gt; = <span class="hljs-title class_">VoidFunctionComponent</span>&lt;P&gt;;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">VoidFunctionComponent</span>&lt;P = {}&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  (<span class="hljs-attr">props</span>: P, context?: <span class="hljs-built_in">any</span>): <span class="hljs-title class_">ReactElement</span>&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt; | <span class="hljs-literal">null</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  propTypes?: <span class="hljs-title class_">WeakValidationMap</span>&lt;P&gt; | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">  contextTypes?: <span class="hljs-title class_">ValidationMap</span>&lt;<span class="hljs-built_in">any</span>&gt; | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">  defaultProps?: <span class="hljs-title class_">Partial</span>&lt;P&gt; | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8">  displayName?: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
</code></pre>
<blockquote>
<p>在 <code>@types/react</code> 18 版本后， FC 内部不再隐式包含 children 属性，因此 VFC 也就不再推荐使用。</p>
</blockquote>
<p>在组件库中还有一个常见场景，即我们使用组件同时作为命名空间，如 <code>Table.Column</code>，<code>Form.Item</code> 这样，如果使用 FC，你需要使用交叉类型补充上这些命名空间内的子组件：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> <span class="hljs-title class_">Table</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{}&gt; &amp; {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-title class_">Column</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">IColumnProps</span>&gt;;</span>
<span class="code-block-extension-codeLine" data-line-num="5">} = <span class="hljs-function">() =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;&gt;</span><span class="hljs-tag">&lt;/&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">};</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IColumnProps</span> {}</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">const</span> <span class="hljs-title class_">Column</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">IColumnProps</span>&gt; = <span class="hljs-function">() =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;&gt;</span><span class="hljs-tag">&lt;/&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">};</span>
<span class="code-block-extension-codeLine" data-line-num="14"></span>
<span class="code-block-extension-codeLine" data-line-num="15"><span class="hljs-title class_">Table</span>.<span class="hljs-property">Column</span> = <span class="hljs-title class_">Column</span>;</span>
</code></pre>
<p>但对于简单函数来说就不需要如此：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title class_">Table</span> = (): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span> =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;&gt;</span><span class="hljs-tag">&lt;/&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IColumnProps</span> {}</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">const</span> <span class="hljs-title class_">Column</span> = (<span class="hljs-attr">props</span>: <span class="hljs-title class_">IColumnProps</span>): <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span> =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;&gt;</span><span class="hljs-tag">&lt;/&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9">};</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-title class_">Table</span>.<span class="hljs-property">Column</span> = <span class="hljs-title class_">Column</span>;</span>
</code></pre>
<p>在这种情况下我们并不需要通过额外的类型标注，因为我们就只是简单地把一个组件挂到这个组件的属性上。</p>
<p>总的来说，FC 并不是在所有场景都能完美胜任的，当然除了上面提到的缺点以外，FC 也是有着一定优点的，如它还提供了 defaultProps、displayName 等一系列合法的 React 属性声明。而我的意见则是不使用 FC，直接使用简单函数和返回值标注的方式，这样一来你的函数组件就能够完全享受到作为一个函数的额外能力，包括但不限于泛型等等。</p></div>
