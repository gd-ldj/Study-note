<div class="markdown-body"><p>上一节，我们了解了 TypeScript 中的内置类型 any、unknown 与 never，也提到这些内置类型实际上是最基础的“积木”。那想要利用好这些“积木”，我们还需要一些实用的类型工具。它们就像是锤子、锯子和斧子，有了它们的帮助，我们甚至可以拼装出摩天大楼！</p>
<p>在实际的类型编程中，为了满足各种需求下的类型定义，我们通常会结合使用这些类型工具。因此，我们一定要清楚这些类型工具各自的使用方法和功能。</p>
<p>所以，接下来我们会用两节课的时间来聊聊这些类型工具。类型工具顾名思义，它就是对类型进行处理的工具。如果按照使用方式来划分，类型工具可以分成三类：<strong>操作符、关键字与专用语法</strong>。我们会在这两节中掌握这些不同的使用方式，以及如何去结合地进行使用。</p>
<p>而按照使用目的来划分，类型工具可以分为 <strong>类型创建</strong> 与 <strong>类型安全保护</strong> 两类。这一节我们将学习的类型工具就属于类型创建，它们的作用都是基于已有的类型创建新的类型，这些类型工具包括类型别名、交叉类型、索引类型与映射类型。</p>
<blockquote>
<p>本节代码见：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flinbudu599%2FTypeScript-Tiny-Book%2Ftree%2Fmain%2Fpackages%2F05_1-internal-type-tools" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/linbudu599/TypeScript-Tiny-Book/tree/main/packages/05_1-internal-type-tools" ref="nofollow noopener noreferrer">Internal Type Tools</a></p>
</blockquote>
<h2 data-id="heading-0">类型别名</h2>
<p>类型别名可以说是 TypeScript 类型编程中最重要的一个功能，从一个简单的函数类型别名，到让你眼花缭乱的类型体操，都离不开类型别名。虽然很重要，但它的使用却并不复杂：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> A = <span class="hljs-built_in">string</span>;</span>
</code></pre>
<p>我们通过 <code>type</code> 关键字声明了一个类型别名 A ，同时它的类型等价于 string 类型。类型别名的作用主要是对一组类型或一个特定类型结构进行封装，以便于在其它地方进行复用。</p>
<p>比如抽离一组联合类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">StatusCode</span> = <span class="hljs-number">200</span> | <span class="hljs-number">301</span> | <span class="hljs-number">400</span> | <span class="hljs-number">500</span> | <span class="hljs-number">502</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PossibleDataTypes</span> = <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | (<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">unknown</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">const</span> <span class="hljs-attr">status</span>: <span class="hljs-title class_">StatusCode</span> = <span class="hljs-number">502</span>;</span>
</code></pre>
<p>抽离一个函数类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Handler</span> = <span class="hljs-function">(<span class="hljs-params">e: Event</span>) =&gt;</span> <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> <span class="hljs-attr">clickHandler</span>: <span class="hljs-title class_">Handler</span> = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> { };</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">const</span> <span class="hljs-attr">moveHandler</span>: <span class="hljs-title class_">Handler</span> = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> { };</span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> <span class="hljs-attr">dragHandler</span>: <span class="hljs-title class_">Handler</span> = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> { };</span>
</code></pre>
<p>声明一个对象类型，就像接口那样：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ObjType</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
</code></pre>
<blockquote>
<p>关于接口和类型别名的取舍，请参考原始类型与对象类型一节。</p>
</blockquote>
<p>看起来类型别名真的非常简单，不就是声明了一个变量让类型声明更简洁和易于拆分吗？如果真的只是把它作为类型别名，用来进行特定类型的抽离封装，那的确很简单。然而，类型别名还能作为工具类型。<strong>工具类同样基于类型别名，只是多了个泛型</strong>。</p>
<p>如果你还不了解泛型也无需担心，现阶段我们只要了解它和类型别名相关的使用就可以了。至于更复杂的泛型使用场景，我们后面会详细了解。</p>
<p>在类型别名中，类型别名可以这么声明自己能够接受泛型（我称之为泛型坑位）。一旦接受了泛型，我们就叫它工具类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Factory</span>&lt;T&gt; = T | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span>;</span>
</code></pre>
<p>虽然现在类型别名摇身一变成了工具类型，但它的基本功能仍然是创建类型，只不过工具类型能够接受泛型参数，实现<strong>更灵活的类型创建功能</strong>。从这个角度看，工具类型就像一个函数一样，泛型是入参，内部逻辑基于入参进行某些操作，再返回一个新的类型。比如在上面这个工具类型中，我们就简单接受了一个泛型，然后把它作为联合类型的一个成员，返回了这个联合类型。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-attr">foo</span>: <span class="hljs-title class_">Factory</span>&lt;<span class="hljs-built_in">boolean</span>&gt; = <span class="hljs-literal">true</span>;</span>
</code></pre>
<p>当然，我们一般不会直接使用工具类型来做类型标注，而是再度声明一个新的类型别名：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FactoryWithBool</span> = <span class="hljs-title class_">Factory</span>&lt;<span class="hljs-built_in">boolean</span>&gt;;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> <span class="hljs-attr">foo</span>: <span class="hljs-title class_">FactoryWithBool</span> = <span class="hljs-literal">true</span>;</span>
</code></pre>
<p>同时，泛型参数的名称（上面的 T ）也不是固定的。通常我们使用大写的 T / K / U / V / M / O ...这种形式。如果为了可读性考虑，我们也可以写成大驼峰形式（即在驼峰命名的基础上，首字母也大写）的名称，比如：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Factory</span>&lt;<span class="hljs-title class_">NewType</span>&gt; = <span class="hljs-title class_">NewType</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span>;</span>
</code></pre>
<p>声明一个简单、有实际意义的工具类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">MaybeNull</span>&lt;T&gt; = T | <span class="hljs-literal">null</span>;</span>
</code></pre>
<p>这个工具类型会接受一个类型，并返回一个包括 null 的联合类型。这样一来，在实际使用时就可以确保你处理了可能为空值的属性读取与方法调用：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">MaybeNull</span>&lt;T&gt; = T | <span class="hljs-literal">null</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">function</span> <span class="hljs-title function_">process</span>(<span class="hljs-params">input: MaybeNull&lt;{ handler: () =&gt; {} }&gt;</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  input?.<span class="hljs-title function_">handler</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>类似的还有 MaybePromise、MaybeArray。这也是我在日常开发中最常使用的一类工具类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">MaybeArray</span>&lt;T&gt; = T | T[];</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-comment">// 函数泛型我们会在后面了解~</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">function</span> ensureArray&lt;T&gt;(<span class="hljs-attr">input</span>: <span class="hljs-title class_">MaybeArray</span>&lt;T&gt;): T[] {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(input) ? input : [input];</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
</code></pre>
<p>另外，类型别名中可以接受任意个泛型，以及为泛型指定约束、默认值等，这些内容我们都会在泛型一节深入了解。</p>
<p>总之，对于工具类型来说，它的主要意义是<strong>基于传入的泛型进行各种类型操作</strong>，得到一个新的类型。而这个类型操作的指代就非常非常广泛了，甚至说类型编程的大半难度都在这儿呢，这也是这本小册占据篇幅最多的部分。</p>
<h2 data-id="heading-1">联合类型与交叉类型</h2>
<p>在原始类型与对象类型一节，我们了解了联合类型。但实际上，联合类型还有一个和它有点像的孪生兄弟：<strong>交叉类型</strong>。它和联合类型的使用位置一样，只不过符号是<code>&amp;</code>，即按位与运算符。</p>
<p>实际上，正如联合类型的符号是<code>|</code>，它代表了按位或，即只需要符合联合类型中的一个类型，既可以认为实现了这个联合类型，如<code>A | B</code>，只需要实现 A 或 B 即可。</p>
<p>而代表着按位与的 <code>&amp;</code> 则不同，你需要符合这里的所有类型，才可以说实现了这个交叉类型，即 <code>A &amp; B</code>，<strong>需要同时满足 A 与 B 两个类型</strong>才行。</p>
<p>我们声明一个交叉类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">NameStruct</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AgeStruct</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ProfileStruct</span> = <span class="hljs-title class_">NameStruct</span> &amp; <span class="hljs-title class_">AgeStruct</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">const</span> <span class="hljs-attr">profile</span>: <span class="hljs-title class_">ProfileStruct</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-attr">name</span>: <span class="hljs-string">"linbudu"</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-attr">age</span>: <span class="hljs-number">18</span></span>
<span class="code-block-extension-codeLine" data-line-num="14">}</span>
</code></pre>
<p>很明显这里的 profile 对象需要同时符合这两个对象的结构。从另外一个角度来看，ProfileStruct 其实就是一个新的，同时包含 NameStruct 和 AgeStruct 两个接口所有属性的类型。这里是对于对象类型的合并，那对于原始类型呢？</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">StrAndNum</span> = <span class="hljs-built_in">string</span> &amp; <span class="hljs-built_in">number</span>; <span class="hljs-comment">// never</span></span>
</code></pre>
<p>我们可以看到，它竟然变成 never 了！看起来很奇怪，但想想我们前面给出的定义，新的类型会同时符合交叉类型的所有成员，存在既是 string 又是 number 的类型吗？当然不。实际上，这也是 never 这一 BottomType 的实际意义之一，描述<strong>根本不存在的类型</strong>嘛。</p>
<p>对于对象类型的交叉类型，其内部的同名属性类型同样会按照交叉类型进行合并：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Struct1</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">primitiveProp</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">objectProp</span>: {</span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  }</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Struct2</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-attr">primitiveProp</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-attr">objectProp</span>: {</span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="12">  }</span>
<span class="code-block-extension-codeLine" data-line-num="13">}</span>
<span class="code-block-extension-codeLine" data-line-num="14"></span>
<span class="code-block-extension-codeLine" data-line-num="15"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Composed</span> = <span class="hljs-title class_">Struct1</span> &amp; <span class="hljs-title class_">Struct2</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="16"></span>
<span class="code-block-extension-codeLine" data-line-num="17"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PrimitivePropType</span> = <span class="hljs-title class_">Composed</span>[<span class="hljs-string">'primitiveProp'</span>]; <span class="hljs-comment">// never</span></span>
<span class="code-block-extension-codeLine" data-line-num="18"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ObjectPropType</span> = <span class="hljs-title class_">Composed</span>[<span class="hljs-string">'objectProp'</span>]; <span class="hljs-comment">// { name: string; age: number; }</span></span>
</code></pre>
<p>如果是两个联合类型组成的交叉类型呢？其实还是类似的思路，既然只需要实现一个联合类型成员就能认为是实现了这个联合类型，那么各实现两边联合类型中的一个就行了，也就是两边联合类型的交集：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">UnionIntersection1</span> = (<span class="hljs-number">1</span> | <span class="hljs-number">2</span> | <span class="hljs-number">3</span>) &amp; (<span class="hljs-number">1</span> | <span class="hljs-number">2</span>); <span class="hljs-comment">// 1 | 2</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">type</span> <span class="hljs-title class_">UnionIntersection2</span> = (<span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">symbol</span>) &amp; <span class="hljs-built_in">string</span>; <span class="hljs-comment">// string</span></span>
</code></pre>
<p>总结一下交叉类型和联合类型的区别就是，联合类型只需要符合成员之一即可（<code>||</code>），而交叉类型需要严格符合每一位成员（<code>&amp;&amp;</code>）。</p>
<h2 data-id="heading-2">索引类型</h2>
<p>索引类型指的不是某一个特定的类型工具，它其实包含三个部分：<strong>索引签名类型</strong>、<strong>索引类型查询</strong>与<strong>索引类型访问</strong>。目前很多社区的学习教程并没有这一点进行说明，实际上这三者都是独立的类型工具。唯一共同点是，<strong>它们都通过索引的形式来进行类型操作</strong>，但索引签名类型是<strong>声明</strong>，后两者则是<strong>读取</strong>。接下来，我们来依次介绍三个部分。</p>
<h3 data-id="heading-3">索引签名类型</h3>
<p>索引签名类型主要指的是在接口或类型别名中，通过以下语法来<strong>快速声明一个键值类型一致的类型结构</strong>：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AllStringTypes</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">type</span> <span class="hljs-title class_">AllStringTypes</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
</code></pre>
<p>这时，即使你还没声明具体的属性，对于这些类型结构的属性访问也将全部被视为 string 类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AllStringTypes</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropType1</span> = <span class="hljs-title class_">AllStringTypes</span>[<span class="hljs-string">'linbudu'</span>]; <span class="hljs-comment">// string</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropType2</span> = <span class="hljs-title class_">AllStringTypes</span>[<span class="hljs-string">'599'</span>]; <span class="hljs-comment">// string</span></span>
</code></pre>
<p>在这个例子中我们声明的键的类型为 string（<code>[key: string]</code>），这也意味着在实现这个类型结构的变量中<strong>只能声明字符串类型的键</strong>：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AllStringTypes</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> <span class="hljs-attr">foo</span>: <span class="hljs-title class_">AllStringTypes</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-string">"linbudu"</span>: <span class="hljs-string">"599"</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
</code></pre>
<p>但由于 JavaScript 中，对于 <code>obj[prop]</code> 形式的访问会将<strong>数字索引访问转换为字符串索引访问</strong>，也就是说， <code>obj[599]</code> 和 <code>obj['599']</code> 的效果是一致的。因此，在字符串索引签名类型中我们仍然可以声明数字类型的键。类似的，symbol 类型也是如此：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-attr">foo</span>: <span class="hljs-title class_">AllStringTypes</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-string">"linbudu"</span>: <span class="hljs-string">"599"</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-number">599</span>: <span class="hljs-string">"linbudu"</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="4">  [<span class="hljs-title class_">Symbol</span>(<span class="hljs-string">"ddd"</span>)]: <span class="hljs-string">'symbol'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>索引签名类型也可以和具体的键值对类型声明并存，但这时这些具体的键值类型也需要符合索引签名类型的声明：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AllStringTypes</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-comment">// 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">propA</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>这里的符合即指子类型，因此自然也包括联合类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">StringOrBooleanTypes</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">propA</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">propB</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">number</span> | <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>索引签名类型的一个常见场景是在重构 JavaScript 代码时，为内部属性较多的对象声明一个 any 的索引签名类型，以此来暂时支持<strong>对类型未明确属性的访问</strong>，并在后续一点点补全类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AnyTypeHere</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">any</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> <span class="hljs-attr">foo</span>: <span class="hljs-title class_">AnyTypeHere</span>[<span class="hljs-string">'linbudu'</span>] = <span class="hljs-string">'any value'</span>;</span>
</code></pre>
<h3 data-id="heading-4">索引类型查询</h3>
<p>刚才我们已经提到了索引类型查询，也就是 keyof 操作符。严谨地说，它可以将对象中的所有键转换为对应字面量类型，然后再组合成联合类型。注意，<strong>这里并不会将数字类型的键名转换为字符串类型字面量，而是仍然保持为数字类型字面量</strong>。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Foo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">linbudu</span>: <span class="hljs-number">1</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-number">599</span>: <span class="hljs-number">2</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FooKeys</span> = keyof <span class="hljs-title class_">Foo</span>; <span class="hljs-comment">// "linbudu" | 599</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-comment">// 在 VS Code 中悬浮鼠标只能看到 'keyof Foo'</span></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-comment">// 看不到其中的实际值，你可以这么做：</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FooKeys</span> = keyof <span class="hljs-title class_">Foo</span> &amp; {}; <span class="hljs-comment">// "linbudu" | 599</span></span>
</code></pre>
<p>如果觉得不太好理解，我们可以写段伪代码来模拟 <strong>“从键名到联合类型”</strong> 的过程。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FooKeys</span> = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(<span class="hljs-title class_">Foo</span>).<span class="hljs-title function_">join</span>(<span class="hljs-string">" | "</span>);</span>
</code></pre>
<p>除了应用在已知的对象类型结构上以外，你还可以直接 <code>keyof any</code> 来生产一个联合类型，它会由所有可用作对象键值的类型组成：<code>string | number | symbol</code>。也就是说，它是由无数字面量类型组成的，由此我们可以知道， <strong>keyof 的产物必定是一个联合类型</strong>。</p>
<blockquote>
</blockquote>
<h3 data-id="heading-5">索引类型访问</h3>
<p>在 JavaScript 中我们可以通过 <code>obj[expression]</code> 的方式来动态访问一个对象属性（即计算属性），expression 表达式会先被执行，然后使用返回值来访问属性。而 TypeScript 中我们也可以通过类似的方式，只不过这里的 expression 要换成类型。接下来，我们来看个例子：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">NumberRecord</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropType</span> = <span class="hljs-title class_">NumberRecord</span>[<span class="hljs-built_in">string</span>]; <span class="hljs-comment">// number</span></span>
</code></pre>
<p>这里，我们使用 string 这个类型来访问 NumberRecord。由于其内部声明了数字类型的索引签名，这里访问到的结果即是 number 类型。注意，其访问方式与返回值均是类型。</p>
<p>更直观的例子是通过字面量类型来进行索引类型访问：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Foo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">propA</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">propB</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropAType</span> = <span class="hljs-title class_">Foo</span>[<span class="hljs-string">'propA'</span>]; <span class="hljs-comment">// number</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropBType</span> = <span class="hljs-title class_">Foo</span>[<span class="hljs-string">'propB'</span>]; <span class="hljs-comment">// boolean</span></span>
</code></pre>
<p>看起来这里就是普通的值访问，但实际上这里的<code>'propA'</code>和<code>'propB'</code>都是<strong>字符串字面量类型</strong>，<strong>而不是一个 JavaScript 字符串值</strong>。索引类型查询的本质其实就是，<strong>通过键的字面量类型（<code>'propA'</code>）访问这个键对应的键值类型（<code>number</code>）</strong>。</p>
<p>看到这你肯定会想到，上面的 keyof 操作符能一次性获取这个对象所有的键的字面量类型，是否能用在这里？当然，这可是 TypeScript 啊。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Foo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">propA</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">propB</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">propC</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropTypeUnion</span> = <span class="hljs-title class_">Foo</span>[keyof <span class="hljs-title class_">Foo</span>]; <span class="hljs-comment">// string | number | boolean</span></span>
</code></pre>
<p>使用字面量联合类型进行索引类型访问时，其结果就是将联合类型每个分支对应的类型进行访问后的结果，重新组装成联合类型。<strong>索引类型查询、索引类型访问通常会和映射类型一起搭配使用</strong>，前两者负责访问键，而映射类型在其基础上访问键值类型，我们在下面一个部分就会讲到。</p>
<p>注意，在未声明索引签名类型的情况下，我们不能使用 <code>NumberRecord[string]</code> 这种原始类型的访问方式，而只能通过键名的字面量类型来进行访问。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Foo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">propA</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-comment">// 类型“Foo”没有匹配的类型“string”的索引签名。</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PropAType</span> = <span class="hljs-title class_">Foo</span>[<span class="hljs-built_in">string</span>]; </span>
</code></pre>
<p>索引类型的最佳拍档之一就是映射类型，同时映射类型也是类型编程中常用的一个手段。</p>
<h2 data-id="heading-6">映射类型：类型编程的第一步</h2>
<p>不同于索引类型包含好几个部分，映射类型指的就是一个确切的类型工具。看到映射这个词你应该能联想到 JavaScript 中数组的 map 方法，实际上也是如此，映射类型的主要作用即是<strong>基于键名映射到键值类型</strong>。概念不好理解，我们直接来看例子：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Stringify</span>&lt;T&gt; = {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  [K <span class="hljs-keyword">in</span> keyof T]: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
</code></pre>
<p>这个工具类型会接受一个对象类型（假设我们只会这么用），使用 keyof 获得这个对象类型的键名组成字面量联合类型，然后通过映射类型（即这里的 in 关键字）将这个联合类型的每一个成员映射出来，并将其键值类型设置为 string。</p>
<p>具体使用的表现是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Foo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">prop1</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">prop2</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">prop3</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">prop4</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">type</span> <span class="hljs-title class_">StringifiedFoo</span> = <span class="hljs-title class_">Stringify</span>&lt;<span class="hljs-title class_">Foo</span>&gt;;</span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-comment">// 等价于</span></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">StringifiedFoo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-attr">prop1</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-attr">prop2</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-attr">prop3</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="15">  <span class="hljs-attr">prop4</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="16">}</span>
</code></pre>
<p>我们还是可以用伪代码的形式进行说明：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title class_">StringifiedFoo</span> = {};</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> k <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(<span class="hljs-title class_">Foo</span>)){</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-title class_">StringifiedFoo</span>[k] = <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">}</span>
</code></pre>
<p>看起来好像很奇怪，我们应该很少会需要把一个接口的所有属性类型映射到 string？这有什么意义吗？别忘了，既然拿到了键，那键值类型其实也能拿到：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Clone</span>&lt;T&gt; = {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  [K <span class="hljs-keyword">in</span> keyof T]: T[K];</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
</code></pre>
<p>这里的<code>T[K]</code>其实就是上面说到的索引类型访问，我们使用键的字面量类型访问到了键值的类型，这里就相当于克隆了一个接口。需要注意的是，这里其实只有<code>K in </code>属于映射类型的语法，<code>keyof T </code>属于 keyof 操作符，<code>[K in keyof T]</code>的<code>[]</code>属于索引签名类型，<code>T[K]</code>属于索引类型访问。</p>
<h2 data-id="heading-7">总结与预告</h2>
<p>这一节，我们认识了类型工具中的类型别名、联合类型、索引类型以及映射类型。这些工具代表了类型工具中用于创建新类型的部分，但它们实现创建的方式却五花八门，以下这张表格概括了它们的实现方式与常见搭配</p>























































<table><thead><tr><th>类型工具</th><th>创建新类型的方式</th><th>常见搭配</th></tr></thead><tbody><tr><td>类型别名（Type Alias）</td><td>将一组类型/类型结构封装，作为一个新的类型</td><td>联合类型、映射类型</td></tr><tr><td>工具类型（Tool Type）</td><td>在类型别名的基础上，基于泛型去动态创建新类型</td><td>基本所有类型工具</td></tr><tr><td>联合类型（Union Type）</td><td>创建一组类型集合，满足其中一个类型即满足这个联合类型（||）</td><td>类型别名、工具类型</td></tr><tr><td>交叉类型（Intersection Type）</td><td>创建一组类型集合，满足其中所有类型才满足映射联合类型（&amp;&amp;）</td><td>类型别名、工具类型</td></tr><tr><td>索引签名类型（Index Signature Type）</td><td>声明一个拥有任意属性，键值类型一致的接口结构</td><td>映射类型</td></tr><tr><td>索引类型查询（Indexed Type Query）</td><td>从一个接口结构，创建一个由其键名字符串字面量组成的联合类型</td><td>映射类型</td></tr><tr><td>索引类型访问（Indexed Access Type）</td><td>从一个接口结构，使用键名字符串字面量访问到对应的键值类型</td><td>类型别名、映射类型</td></tr><tr><td>映射类型  （Mapping Type）</td><td>从一个联合类型依次映射到其内部的每一个类型</td><td>工具类型</td></tr><tr><td></td><td></td><td></td></tr></tbody></table>
<p>在下一节，我们会继续来介绍类型工具中的类型查询操作符 typeof 以及类型守卫，如果说这一节我们了解的工具主要是生产新的类型，那类型守卫就像是流水线的质量检查员一样，它可以帮助你的代码进一步提升类型安全性。</p></div>
