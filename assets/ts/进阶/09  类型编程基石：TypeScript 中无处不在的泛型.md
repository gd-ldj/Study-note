<div class="markdown-body"><p>从这一节开始，我们正式进入到「类型编程进阶篇」的学习。能来到这里意味着你已经对 TypeScript 比较熟悉，甚至开始爱不释手了。但也意味着课程难度有所提升，知识变得更加复杂了。不过，你也不必担心，我会和你一起将思维调整到类型的频道，去认识这些类型世界的新朋友们！</p>
<p>如果说 TypeScript 是一门对类型进行编程的语言，那么泛型就是这门语言里的（函数）参数。这一节，我们就来了解 TypeScript 中无处不在的泛型，以及它在类型别名、对象类型、函数与 Class 中的使用方式。</p>
<blockquote>
<p>本节代码见：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flinbudu599%2FTypeScript-Tiny-Book%2Ftree%2Fmain%2Fpackages%2F06-generic-types" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/linbudu599/TypeScript-Tiny-Book/tree/main/packages/06-generic-types" ref="nofollow noopener noreferrer">Generic Types</a></p>
</blockquote>
<h2 data-id="heading-0">类型别名中的泛型</h2>
<p>在类型工具学习中，我们已经接触过类型别名中的泛型，比如类型别名如果声明了泛型坑位，那其实就等价于一个接受参数的函数：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Factory</span>&lt;T&gt; = T | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span>;</span>
</code></pre>
<p>上面这个类型别名的本质就是一个函数，T 就是它的变量，返回值则是一个包含 T 的联合类型，我们可以写段伪代码来加深一下记忆：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Factory</span>(<span class="hljs-params">typeArg</span>){</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> [typeArg, <span class="hljs-built_in">number</span>, <span class="hljs-built_in">string</span>]</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
</code></pre>
<p>类型别名中的泛型大多是用来进行工具类型封装，比如我们在上一节的映射类型中学习的工具类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Stringify</span>&lt;T&gt; = {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  [K <span class="hljs-keyword">in</span> keyof T]: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Clone</span>&lt;T&gt; = {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  [K <span class="hljs-keyword">in</span> keyof T]: T[K];</span>
<span class="code-block-extension-codeLine" data-line-num="7">};</span>
</code></pre>
<p>Stringify 会将一个对象类型的所有属性类型置为 string ，而 Clone 则会进行类型的完全复制。我们可以提前看一个 TypeScript 的内置工具类型实现：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Partial</span>&lt;T&gt; = {</span>
<span class="code-block-extension-codeLine" data-line-num="2">    [P <span class="hljs-keyword">in</span> keyof T]?: T[P];</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
</code></pre>
<p>工具类型 Partial 会将传入的对象类型复制一份，但会额外添加一个<code>?</code>，还记得这代表什么吗？可选，也就是说现在我们获得了一个属性均为可选的山寨版：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IFoo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">prop1</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">prop2</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">prop3</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">prop4</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PartialIFoo</span> = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">IFoo</span>&gt;;</span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-comment">// 等价于</span></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">PartialIFoo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="12">  prop1?: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">  prop2?: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="14">  prop3?: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="15">  prop4?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="16">}</span>
</code></pre>
<blockquote>
<p>关于内置工具类型地解析、扩展、进阶，在后面我们会一路升级打怪，完全地掌握它们。</p>
</blockquote>
<p>类型别名与泛型的结合中，除了映射类型、索引类型等类型工具以外，还有一个非常重要的工具：条件类型。我们先来简单了解一下：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">IsEqual</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span> ? <span class="hljs-number">1</span> : <span class="hljs-number">2</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">type</span> A = <span class="hljs-title class_">IsEqual</span>&lt;<span class="hljs-literal">true</span>&gt;; <span class="hljs-comment">// 1</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">type</span> B = <span class="hljs-title class_">IsEqual</span>&lt;<span class="hljs-literal">false</span>&gt;; <span class="hljs-comment">// 2</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">type</span> C = <span class="hljs-title class_">IsEqual</span>&lt;<span class="hljs-string">'linbudu'</span>&gt;; <span class="hljs-comment">// 2</span></span>
</code></pre>
<p>在条件类型参与的情况下，通常泛型会被作为条件类型中的判断条件（<code>T extends Condition</code>，或者 <code>Type extends T</code>）以及返回值（即 <code>:</code> 两端的值），这也是我们筛选类型需要依赖的能力之一。</p>
<h3 data-id="heading-1">泛型约束与默认值</h3>
<p>像函数可以声明一个参数的默认值一样，泛型同样有着默认值的设定，比如：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Factory</span>&lt;T = <span class="hljs-built_in">boolean</span>&gt; = T | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span>;</span>
</code></pre>
<p>这样在你调用时就可以不带任何参数了，默认会使用我们声明的默认值来填充。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-attr">foo</span>: <span class="hljs-title class_">Factory</span> = <span class="hljs-literal">false</span>;</span>
</code></pre>
<p>再看个伪代码帮助理解：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Factory</span>(<span class="hljs-params">typeArg = <span class="hljs-built_in">boolean</span></span>){</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> [typeArg, <span class="hljs-built_in">number</span>, <span class="hljs-built_in">string</span>]</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
</code></pre>
<p>除了声明默认值以外，泛型还能做到一样函数参数做不到的事：<strong>泛型约束</strong>。也就是说，你可以要求传入这个工具类型的泛型必须符合某些条件，否则你就拒绝进行后面的逻辑。在函数中，我们只能在逻辑中处理：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">source: <span class="hljs-built_in">number</span>, add: <span class="hljs-built_in">number</span></span>){</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> source !== <span class="hljs-string">'number'</span> || <span class="hljs-keyword">typeof</span> add !== <span class="hljs-string">'number'</span>){</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">"Invalid arguments!"</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="4">  }</span>
<span class="code-block-extension-codeLine" data-line-num="5">  </span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">return</span> source + add;</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
</code></pre>
<p>而在泛型中，我们可以使用 <code>extends</code> 关键字来约束传入的泛型参数必须符合要求。关于 extends，<code>A extends B</code> 意味着 <strong>A 是 B 的子类型</strong>，这里我们暂时只需要了解非常简单的判断逻辑，也就是说 A 比 B 的类型更精确，或者说更复杂。具体来说，可以分为以下几类。</p>
<ul>
<li>更精确，如<strong>字面量类型是对应原始类型的子类型</strong>，即 <code>'linbudu' extends string</code>，<code>599 extends number</code> 成立。类似的，<strong>联合类型子集均为联合类型的子类型</strong>，即 <code>1</code>、 <code>1 | 2</code> 是 <code>1 | 2 | 3 | 4</code> 的子类型。</li>
<li>更复杂，如 <code>{ name: string }</code> 是 <code>{}</code> 的子类型，因为在 <code>{}</code> 的基础上增加了额外的类型，基类与派生类（父类与子类）同理。</li>
</ul>
<blockquote>
<p>关于 TypeScript 完整的类型层级，我们会在后面一节进行非常详细地说明。</p>
</blockquote>
<p>我们来看下面这个例子：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ResStatus</span>&lt;<span class="hljs-title class_">ResCode</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>&gt; = <span class="hljs-title class_">ResCode</span> <span class="hljs-keyword">extends</span> <span class="hljs-number">10000</span> | <span class="hljs-number">10001</span> | <span class="hljs-number">10002</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  ? <span class="hljs-string">'success'</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  : <span class="hljs-string">'failure'</span>;</span>
</code></pre>
<p>这个例子会根据传入的请求码判断请求是否成功，这意味着它只能处理数字字面量类型的参数，因此这里我们通过 <code>extends number</code> 来标明其类型约束，如果传入一个不合法的值，就会出现类型错误：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ResStatus</span>&lt;<span class="hljs-title class_">ResCode</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>&gt; = <span class="hljs-title class_">ResCode</span> <span class="hljs-keyword">extends</span> <span class="hljs-number">10000</span> | <span class="hljs-number">10001</span> | <span class="hljs-number">10002</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  ? <span class="hljs-string">'success'</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  : <span class="hljs-string">'failure'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Res1</span> = <span class="hljs-title class_">ResStatus</span>&lt;<span class="hljs-number">10000</span>&gt;; <span class="hljs-comment">// "success"</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Res2</span> = <span class="hljs-title class_">ResStatus</span>&lt;<span class="hljs-number">20000</span>&gt;; <span class="hljs-comment">// "failure"</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Res3</span> = <span class="hljs-title class_">ResStatus</span>&lt;<span class="hljs-string">'10000'</span>&gt;; <span class="hljs-comment">// 类型“string”不满足约束“number”。</span></span>
</code></pre>
<p>与此同时，如果我们想让这个类型别名可以无需显式传入泛型参数也能调用，并且默认情况下是成功地，这样就可以为这个泛型参数声明一个默认值：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ResStatus</span>&lt;<span class="hljs-title class_">ResCode</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span> = <span class="hljs-number">10000</span>&gt; = <span class="hljs-title class_">ResCode</span> <span class="hljs-keyword">extends</span> <span class="hljs-number">10000</span> | <span class="hljs-number">10001</span> | <span class="hljs-number">10002</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  ? <span class="hljs-string">'success'</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  : <span class="hljs-string">'failure'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Res4</span> = <span class="hljs-title class_">ResStatus</span>; <span class="hljs-comment">// "success"</span></span>
</code></pre>
<p>在 TypeScript 中，泛型参数存在默认约束（在下面的函数泛型、Class 泛型中也是）。这个默认约束值在 TS 3.9 版本以前是 any，而在 3.9 版本以后则为 unknown。在 TypeScript ESLint 中，你可以使用 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint%2Fblob%2Fmain%2Fpackages%2Feslint-plugin%2Fdocs%2Frules%2Fno-unnecessary-type-constraint.md" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-type-constraint.md" ref="nofollow noopener noreferrer"><strong>no-unnecessary-type-constraint</strong></a> 规则，来避免代码中声明了与默认约束相同的泛型约束。</p>
<h3 data-id="heading-2">多泛型关联</h3>
<p>我们不仅可以同时传入多个泛型参数，还可以让这几个泛型参数之间也存在联系。我们可以先看一个简单的场景，条件类型下的多泛型参数：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Conditional</span>&lt;<span class="hljs-title class_">Type</span>, <span class="hljs-title class_">Condition</span>, <span class="hljs-title class_">TruthyResult</span>, <span class="hljs-title class_">FalsyResult</span>&gt; =</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-title class_">Type</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Condition</span> ? <span class="hljs-title class_">TruthyResult</span> : <span class="hljs-title class_">FalsyResult</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-comment">//  "passed!"</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Result1</span> = <span class="hljs-title class_">Conditional</span>&lt;<span class="hljs-string">'linbudu'</span>, <span class="hljs-built_in">string</span>, <span class="hljs-string">'passed!'</span>, <span class="hljs-string">'rejected!'</span>&gt;;</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-comment">// "rejected!"</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Result2</span> = <span class="hljs-title class_">Conditional</span>&lt;<span class="hljs-string">'linbudu'</span>, <span class="hljs-built_in">boolean</span>, <span class="hljs-string">'passed!'</span>, <span class="hljs-string">'rejected!'</span>&gt;;</span>
</code></pre>
<p>这个例子表明，<strong>多泛型参数其实就像接受更多参数的函数，其内部的运行逻辑（类型操作）会更加抽象，表现在参数（泛型参数）需要进行的逻辑运算（类型操作）会更加复杂。</strong></p>
<p>上面我们说，多个泛型参数之间的依赖，其实指的即是在后续泛型参数中，使用前面的泛型参数作为约束或默认值：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ProcessInput</span>&lt;</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-title class_">Input</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-title class_">SecondInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Input</span> = <span class="hljs-title class_">Input</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-title class_">ThirdInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Input</span> = <span class="hljs-title class_">SecondInput</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">&gt; = <span class="hljs-built_in">number</span>;</span>
</code></pre>
<p>这里的内部类型操作并不是重点，我们直接忽略即可。从这个类型别名中你能获得哪些信息？</p>
<ul>
<li>这个工具类型接受 1-3 个泛型参数。</li>
<li>第二、三个泛型参数的类型需要是<strong>首个泛型参数的子类型</strong>。</li>
<li>当只传入一个泛型参数时，其第二个泛型参数会被赋值为此参数，而第三个则会赋值为第二个泛型参数，相当于<strong>均使用了这唯一传入的泛型参数</strong>。</li>
<li>当传入两个泛型参数时，第三个泛型参数<strong>会默认赋值为第二个泛型参数的值</strong>。</li>
</ul>
<p>多泛型关联在一些复杂的工具类型中非常常见，我们会在后续的内置类型讲解、内置类型进阶等章节中再实战，这里先了解即可。</p>
<h2 data-id="heading-3">对象类型中的泛型</h2>
<p>由于泛型提供了对类型结构的复用能力，我们也经常在对象类型结构中使用泛型。最常见的一个例子应该还是响应类型结构的泛型处理：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IRes</span>&lt;<span class="hljs-title class_">TData</span> = <span class="hljs-built_in">unknown</span>&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">code</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  error?: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">data</span>: <span class="hljs-title class_">TData</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>这个接口描述了一个通用的响应类型结构，预留出了实际响应数据的泛型坑位，然后在你的请求函数中就可以传入特定的响应类型了：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IUserProfileRes</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">homepage</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">avatar</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUserProfile</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">IRes</span>&lt;<span class="hljs-title class_">IUserProfileRes</span>&gt;&gt; {}</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">type</span> <span class="hljs-title class_">StatusSucceed</span> = <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handleOperation</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">IRes</span>&lt;<span class="hljs-title class_">StatusSucceed</span>&gt;&gt; {}</span>
</code></pre>
<p>而泛型嵌套的场景也非常常用，比如对存在分页结构的数据，我们也可以将其分页的响应结构抽离出来：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IPaginationRes</span>&lt;<span class="hljs-title class_">TItem</span> = <span class="hljs-built_in">unknown</span>&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">data</span>: <span class="hljs-title class_">TItem</span>[];</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">page</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">totalCount</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">hasNextPage</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUserProfileList</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">IRes</span>&lt;<span class="hljs-title class_">IPaginationRes</span>&lt;<span class="hljs-title class_">IUserProfileRes</span>&gt;&gt;&gt; {}</span>
</code></pre>
<p>这些结构看起来很复杂，但其实就是<strong>简单的泛型参数填充</strong>而已。就像我们会封装请求库、请求响应拦截器一样，对请求中的参数、响应中的数据的类型的封装其实也不应该落下。甚至在理想情况下，这些结构体封装应该在请求库封装一层中就被处理掉。</p>
<p>直到目前为止，我们了解的泛型似乎就是一个类型别名的参数，它需要手动传入，可以设置类型层面约束和默认值，看起来似乎没有特别神奇的地方？</p>
<p>接下来，我们要来看看泛型的另一面，也是你实际上会打交道最频繁的一面：<strong>类型的自动提取</strong>。</p>
<h2 data-id="heading-4">函数中的泛型</h2>
<p>假设我们有这么一个函数，它可以接受多个类型的参数并进行对应处理，比如：</p>
<ul>
<li>对于字符串，返回部分截取；</li>
<li>对于数字，返回它的 n 倍；</li>
<li>对于对象，修改它的属性并返回。</li>
</ul>
<p>这个时候，我们要如何对函数进行类型声明？是 any 大法好？</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">input: <span class="hljs-built_in">any</span></span>): <span class="hljs-built_in">any</span> {}</span>
</code></pre>
<p>还是用联合类型来包括所有可能类型？</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">input: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | {}</span>): <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | {} {}</span>
</code></pre>
<p>第一种我们肯定要直接 pass，第二种虽然麻烦了一点，但似乎可以满足需要？但如果我们真的调用一下就知道不合适了。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> shouldBeString = <span class="hljs-title function_">handle</span>(<span class="hljs-string">"linbudu"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">const</span> shouldBeNumber = <span class="hljs-title function_">handle</span>(<span class="hljs-number">599</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> shouldBeObject = <span class="hljs-title function_">handle</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">"linbudu"</span> });</span>
</code></pre>
<p>虽然我们约束了入参的类型，但返回值的类型并没有像我们预期的那样和入参关联起来，上面三个调用结果的类型仍然是一个宽泛的联合类型 <code>string | number | {}</code>。难道要用重载一个个声明可能的关联关系？</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">input: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">input: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">input: {}</span>): {}</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">input: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | {}</span>): <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | {} { }</span>
</code></pre>
<p>天，如果再多一些复杂的情况，别说你愿不愿意补充每一种关联了，同事看到这样的代码都会质疑你的水平。这个时候，我们就该请出泛型了：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> handle&lt;T&gt;(<span class="hljs-attr">input</span>: T): T {}</span>
</code></pre>
<p>我们为函数声明了一个泛型参数 T，并将参数的类型与返回值类型指向这个泛型参数。这样，在这个函数接收到参数时，<strong>T 会自动地被填充为这个参数的类型</strong>。这也就意味着你不再需要预先确定参数的可能类型了，而<strong>在返回值与参数类型关联的情况下，也可以通过泛型参数来进行运算</strong>。</p>
<p>在基于参数类型进行填充泛型时，其类型信息会被推断到尽可能精确的程度，如这里会<strong>推导到字面量类型而不是基础类型</strong>。这是因为在直接传入一个值时，这个值是不会再被修改的，因此可以推导到最精确的程度。而如果你使用一个变量作为参数，那么只会使用这个变量标注的类型（在没有标注时，会使用推导出的类型）。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> handle&lt;T&gt;(<span class="hljs-attr">input</span>: T): T {}</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> author = <span class="hljs-string">"linbudu"</span>; <span class="hljs-comment">// 使用 const 声明，被推导为 "linbudu"</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">let</span> authorAge = <span class="hljs-number">18</span>; <span class="hljs-comment">// 使用 let 声明，被推导为 number</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-title function_">handle</span>(author); <span class="hljs-comment">// 填充为字面量类型 "linbudu"</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-title function_">handle</span>(authorAge); <span class="hljs-comment">// 填充为基础类型 number</span></span>
</code></pre>
<p>你也可以将鼠标悬浮在表达式上，来查看填充的泛型信息：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0ee934c84ce4e8ab600bb47c22d29d5~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<p>再看一个例子：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> swap&lt;T, U&gt;([start, end]: [T, U]): [U, T] {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> [end, start];</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> swapped1 = <span class="hljs-title function_">swap</span>([<span class="hljs-string">"linbudu"</span>, <span class="hljs-number">599</span>]);</span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">const</span> swapped2 = <span class="hljs-title function_">swap</span>([<span class="hljs-literal">null</span>, <span class="hljs-number">599</span>]);</span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">const</span> swapped3 = <span class="hljs-title function_">swap</span>([{ <span class="hljs-attr">name</span>: <span class="hljs-string">"linbudu"</span> }, {}]);</span>
</code></pre>
<p>在这里返回值类型对泛型参数进行了一些操作，而同样你可以看到其调用信息符合预期：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/251765b69571411eb607680aff6f7c5a~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<p>函数中的泛型同样存在约束与默认值，比如上面的 handle 函数，现在我们希望做一些代码拆分，不再处理对象类型的情况了：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> handle&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt;(<span class="hljs-attr">input</span>: T): T {}</span>
</code></pre>
<p>而 swap 函数，现在我们只想处理数字元组的情况：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> swap&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>, U <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>&gt;([start, end]: [T, U]): [U, T] {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> [end, start];</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
</code></pre>
<p>而多泛型关联也是如此，比如 lodash 的 pick 函数，这个函数首先接受一个对象，然后接受一个对象属性名组成的数组，并从这个对象中截取选择的属性部分：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-built_in">object</span> = { <span class="hljs-string">'a'</span>: <span class="hljs-number">1</span>, <span class="hljs-string">'b'</span>: <span class="hljs-string">'2'</span>, <span class="hljs-string">'c'</span>: <span class="hljs-number">3</span> };</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3">_.<span class="hljs-title function_">pick</span>(<span class="hljs-built_in">object</span>, [<span class="hljs-string">'a'</span>, <span class="hljs-string">'c'</span>]);</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-comment">// =&gt; { 'a': 1, 'c': 3 }</span></span>
</code></pre>
<p>这个函数很明显需要在泛型层面声明关联，即数组中的元素只能来自于对象的属性名（组成的字面量联合类型！），因此我们可以这么写（部分简化）：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">pick&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span>, U <span class="hljs-keyword">extends</span> keyof T&gt;(<span class="hljs-attr">object</span>: T, ...<span class="hljs-attr">props</span>: <span class="hljs-title class_">Array</span>&lt;U&gt;): <span class="hljs-title class_">Pick</span>&lt;T, U&gt;;</span>
</code></pre>
<p>这里 T 声明约束为对象类型，而 U 声明约束为 <code>keyof T</code>。同时对应的，其返回值类型中使用了 <code>Pick&lt;T, U&gt;</code> 这一工具类型，它与 pick 函数的作用一致，对一个对象结构进行裁剪，我们会在后面内置工具类型一节讲到。</p>
<p>函数的泛型参数也会被内部的逻辑消费，如：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> handle&lt;T&gt;(<span class="hljs-attr">payload</span>: T): <span class="hljs-title class_">Promise</span>&lt;[T]&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>&lt;[T]&gt;(<span class="hljs-function">(<span class="hljs-params">res, rej</span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-title function_">res</span>([payload]);</span>
<span class="code-block-extension-codeLine" data-line-num="4">  });</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>对于箭头函数的泛型，其书写方式是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> handle = &lt;T&gt;(<span class="hljs-attr">input</span>: T): <span class="hljs-function"><span class="hljs-params">T</span> =&gt;</span> {}</span>
</code></pre>
<p>需要注意的是在 tsx 文件中泛型的尖括号可能会造成报错，编译器无法识别这是一个组件还是一个泛型，此时你可以让它长得更像泛型一些：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> handle = &lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">any</span>&gt;(<span class="hljs-attr">input</span>: T): <span class="hljs-function"><span class="hljs-params">T</span> =&gt;</span> {}</span>
</code></pre>
<p>函数的泛型是日常使用较多的一部分，更明显地体现了<strong>泛型在调用时被填充</strong>这一特性，而类型别名中，我们更多是手动传入泛型。这一差异的缘由其实就是它们的场景不同，我们通常使用类型别名来<strong>对已经确定的类型结构进行类型操作</strong>，比如将一组确定的类型放置在一起。而在函数这种场景中，我们并不能确定泛型在实际运行时会被什么样的类型填充。</p>
<p>需要注意的是，不要为了用泛型而用泛型，就像这样：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> handle&lt;T&gt;(<span class="hljs-attr">arg</span>: T): <span class="hljs-built_in">void</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(arg);</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
</code></pre>
<p>在这个函数中，泛型参数 T <strong>没有被返回值消费，也没有被内部的逻辑消费</strong>，这种情况下即使随着调用填充了泛型参数，也是没有意义的。因此这里你就完全可以用 any 来进行类型标注。</p>
<h2 data-id="heading-5">Class 中的泛型</h2>
<p>Class 中的泛型和函数中的泛型非常类似，只不过函数中泛型参数的消费方是参数和返回值类型，Class 中的泛型消费方则是属性、方法、乃至装饰器等。同时 Class 内的方法还可以再声明自己独有的泛型参数。我们直接来看完整的示例：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Queue</span>&lt;<span class="hljs-title class_">TElementType</span>&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">private</span> <span class="hljs-attr">_list</span>: <span class="hljs-title class_">TElementType</span>[];</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">initial: TElementType[]</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-variable language_">this</span>.<span class="hljs-property">_list</span> = initial;</span>
<span class="code-block-extension-codeLine" data-line-num="6">  }</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-comment">// 入队一个队列泛型子类型的元素</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">  enqueue&lt;<span class="hljs-title class_">TType</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">TElementType</span>&gt;(<span class="hljs-attr">ele</span>: <span class="hljs-title class_">TType</span>): <span class="hljs-title class_">TElementType</span>[] {</span>
<span class="code-block-extension-codeLine" data-line-num="10">    <span class="hljs-variable language_">this</span>.<span class="hljs-property">_list</span>.<span class="hljs-title function_">push</span>(ele);</span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_list</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="12">  }</span>
<span class="code-block-extension-codeLine" data-line-num="13"></span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-comment">// 入队一个任意类型元素（无需为队列泛型子类型）</span></span>
<span class="code-block-extension-codeLine" data-line-num="15">  enqueueWithUnknownType&lt;<span class="hljs-title class_">TType</span>&gt;(<span class="hljs-attr">element</span>: <span class="hljs-title class_">TType</span>): (<span class="hljs-title class_">TElementType</span> | <span class="hljs-title class_">TType</span>)[] {</span>
<span class="code-block-extension-codeLine" data-line-num="16">    <span class="hljs-keyword">return</span> [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">_list</span>, element];</span>
<span class="code-block-extension-codeLine" data-line-num="17">  }</span>
<span class="code-block-extension-codeLine" data-line-num="18"></span>
<span class="code-block-extension-codeLine" data-line-num="19">  <span class="hljs-comment">// 出队</span></span>
<span class="code-block-extension-codeLine" data-line-num="20">  <span class="hljs-title function_">dequeue</span>(): <span class="hljs-title class_">TElementType</span>[] {</span>
<span class="code-block-extension-codeLine" data-line-num="21">    <span class="hljs-variable language_">this</span>.<span class="hljs-property">_list</span>.<span class="hljs-title function_">shift</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="22">    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_list</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="23">  }</span>
<span class="code-block-extension-codeLine" data-line-num="24">}</span>
</code></pre>
<p>其中，enqueue 方法的入参类型 TType 被约束为队列类型的子类型，而 enqueueWithUnknownType 方法中的 TType 类型参数则不会受此约束，它会在其被调用时再对应地填充，同时也会在返回值类型中被使用。</p>
<h3 data-id="heading-6">内置方法中的泛型</h3>
<p>TypeScript 中为非常多的内置对象都预留了泛型坑位，如 Promise 中</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">p</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">boolean</span>&gt;(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-title function_">resolve</span>(<span class="hljs-literal">true</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="4">  });</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>在你填充 Promise 的泛型以后，其内部的 resolve 方法也自动填充了泛型，而在 TypeScript 内部的 Promise 类型声明中同样是通过泛型实现：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">PromiseConstructor</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">    resolve&lt;T&gt;(<span class="hljs-attr">value</span>: T | <span class="hljs-title class_">PromiseLike</span>&lt;T&gt;): <span class="hljs-title class_">Promise</span>&lt;T&gt;;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">declare</span> <span class="hljs-keyword">var</span> <span class="hljs-title class_">Promise</span>: <span class="hljs-title class_">PromiseConstructor</span>;</span>
</code></pre>
<p>还有数组 <code>Array&lt;T&gt;</code> 当中，其泛型参数代表数组的元素类型，几乎贯穿所有的数组方法：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-attr">arr</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-built_in">number</span>&gt; = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-comment">// 类型“string”的参数不能赋给类型“number”的参数。</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">arr.<span class="hljs-title function_">push</span>(<span class="hljs-string">'linbudu'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-comment">// 类型“string”的参数不能赋给类型“number”的参数。</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">arr.<span class="hljs-title function_">includes</span>(<span class="hljs-string">'linbudu'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-comment">// number | undefined</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">arr.<span class="hljs-title function_">find</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-literal">false</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-comment">// 第一种 reduce</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">arr.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">prev, curr, idx, arr</span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-keyword">return</span> prev;</span>
<span class="code-block-extension-codeLine" data-line-num="14">}, <span class="hljs-number">1</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="15"></span>
<span class="code-block-extension-codeLine" data-line-num="16"><span class="hljs-comment">// 第二种 reduce</span></span>
<span class="code-block-extension-codeLine" data-line-num="17"><span class="hljs-comment">// 报错：不能将 number 类型的值赋值给 never 类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="18">arr.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">prev, curr, idx, arr</span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="19">  <span class="hljs-keyword">return</span> [...prev, curr]</span>
<span class="code-block-extension-codeLine" data-line-num="20">}, []);</span>
</code></pre>
<p>reduce 方法是相对特殊的一个，它的类型声明存在几种不同的重载：</p>
<ul>
<li>当你不传入初始值时，泛型参数会从数组的元素类型中进行填充。</li>
<li>当你传入初始值时，如果初始值的类型与数组元素类型一致，则使用数组的元素类型进行填充。即这里第一个 reduce 调用。</li>
<li>当你传入一个数组类型的初始值，比如这里的第二个 reduce 调用，reduce 的泛型参数会默认从这个初始值推导出的类型进行填充，如这里是 <code>never[]</code>。</li>
</ul>
<p>其中第三种情况也就意味着<strong>信息不足，无法推导出正确的类型</strong>，我们可以手动传入泛型参数来解决：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">arr.<span class="hljs-property">reduce</span>&lt;<span class="hljs-built_in">number</span>[]&gt;(<span class="hljs-function">(<span class="hljs-params">prev, curr, idx, arr</span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> prev;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}, []);</span>
</code></pre>
<p>在 React 中，我们同样可以找到无处不在的泛型坑位：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-built_in">number</span>[]&gt;([]);</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-comment">// 不传入默认值，则类型为 number[] | undefined</span></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-built_in">number</span>[]&gt;();</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-comment">// 体现在 ref.current 上</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">const</span> ref = useRef&lt;<span class="hljs-built_in">number</span>&gt;();</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">const</span> context =  createContext&lt;<span class="hljs-title class_">ContextType</span>&gt;({});</span>
</code></pre>
<p>关于 React 中的更多泛型坑位以及 TypeScript 结合使用，我们会在后面的实战一节进行详细讲解。</p>
<h2 data-id="heading-7">总结与预告</h2>
<p>在这一节，我们学习了类型编程中的“函数参数”，感受到了泛型与类型别名一同使用时，真的就像一个接收输入再输出结果的函数一样，这样来看是不是泛型就好理解多了？但还没完，我们紧接着了解了泛型的本质：基于调用时类型推导来自动填充类型参数，从而让多个位置上的类型存在约束或关联，实现更严格的类型保护。</p>
<p>在下一节，我们会开始探秘 TypeScript 类型系统核心特性之一：结构化类型系统。你可能此前听说过它的别名“鸭子类型”，但还未深入地了解过，那么下一节我们就来学习这个有趣的类型特性。</p></div>
