<div class="markdown-body"><p>上一节我们主要了解了类型别名、联合类型与交叉类型、索引类型与映射类型这几样类型工具。在大部分时候，这些类型工具的作用是<strong>基于已有的类型去创建出新的类型</strong>，即类型工具的重要作用之一。</p>
<p>而除了类型的创建以外，<strong>类型的安全保</strong>障同样属于类型工具的能力之一，我们本节要介绍的就是两个主要用于类型安全的类型工具：<strong>类型查询操作符</strong>与<strong>类型守卫</strong>。</p>
<blockquote>
<p>本节代码见：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flinbudu599%2FTypeScript-Tiny-Book%2Ftree%2Fmain%2Fpackages%2F05_2-internal-type-tools" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/linbudu599/TypeScript-Tiny-Book/tree/main/packages/05_2-internal-type-tools" ref="nofollow noopener noreferrer">Internal Type Tools</a></p>
</blockquote>
<h2 data-id="heading-0">类型查询操作符：熟悉又陌生的 typeof</h2>
<p>TypeScript 存在两种功能不同的 typeof 操作符。我们最常见的一种 typeof 操作符就是 JavaScript 中，用于检查变量类型的 typeof ，它会返回 <code>"string"</code> / <code>"number"</code> / <code>"object"</code> / <code>"undefined"</code> 等值。而除此以外， TypeScript 还新增了用于类型查询的 typeof ，即 <strong>Type Query Operator</strong>，这个 typeof 返回的是一个 TypeScript 类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> str = <span class="hljs-string">"linbudu"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> obj = { <span class="hljs-attr">name</span>: <span class="hljs-string">"linbudu"</span> };</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> nullVar = <span class="hljs-literal">null</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">const</span> undefinedVar = <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">const</span> <span class="hljs-title function_">func</span> = (<span class="hljs-params">input: <span class="hljs-built_in">string</span></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-keyword">return</span> input.<span class="hljs-property">length</span> &gt; <span class="hljs-number">10</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10">}</span>
<span class="code-block-extension-codeLine" data-line-num="11"></span>
<span class="code-block-extension-codeLine" data-line-num="12"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Str</span> = <span class="hljs-keyword">typeof</span> str; <span class="hljs-comment">// "linbudu"</span></span>
<span class="code-block-extension-codeLine" data-line-num="13"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Obj</span> = <span class="hljs-keyword">typeof</span> obj; <span class="hljs-comment">// { name: string; }</span></span>
<span class="code-block-extension-codeLine" data-line-num="14"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Null</span> = <span class="hljs-keyword">typeof</span> nullVar; <span class="hljs-comment">// null</span></span>
<span class="code-block-extension-codeLine" data-line-num="15"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Undefined</span> = <span class="hljs-keyword">typeof</span> <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// undefined</span></span>
<span class="code-block-extension-codeLine" data-line-num="16"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Func</span> = <span class="hljs-keyword">typeof</span> func; <span class="hljs-comment">// (input: string) =&gt; boolean</span></span>
</code></pre>
<p>你不仅可以直接在类型标注中使用 typeof，还能在工具类型中使用 typeof。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title function_">func</span> = (<span class="hljs-params">input: <span class="hljs-built_in">string</span></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> input.<span class="hljs-property">length</span> &gt; <span class="hljs-number">10</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> <span class="hljs-attr">func2</span>: <span class="hljs-keyword">typeof</span> func = <span class="hljs-function">(<span class="hljs-params">name: <span class="hljs-built_in">string</span></span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">return</span> name === <span class="hljs-string">'linbudu'</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
</code></pre>
<p>这里我们暂时不用深入了解 ReturnType 这个工具类型，只需要知道它会返回一个函数类型中返回值位置的类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title function_">func</span> = (<span class="hljs-params">input: <span class="hljs-built_in">string</span></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> input.<span class="hljs-property">length</span> &gt; <span class="hljs-number">10</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-comment">// boolean</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FuncReturnType</span> = <span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-keyword">typeof</span> func&gt;;</span>
</code></pre>
<p>绝大部分情况下，typeof 返回的类型就是当你把鼠标悬浮在变量名上时出现的推导后的类型，并且是<strong>最窄的推导程度（即到字面量类型的级别）</strong>。你也不必担心混用了这两种 typeof，在逻辑代码中使用的 typeof 一定会是 JavaScript 中的 typeof，而类型代码（如类型标注、类型别名中等）中的一定是类型查询的 typeof 。同时，为了更好地避免这种情况，也就是隔离类型层和逻辑层，类型查询操作符后是不允许使用表达式的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> <span class="hljs-title function_">isInputValid</span> = (<span class="hljs-params">input: <span class="hljs-built_in">string</span></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> input.<span class="hljs-property">length</span> &gt; <span class="hljs-number">10</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-comment">// 不允许表达式</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">let</span> <span class="hljs-attr">isValid</span>: <span class="hljs-keyword">typeof</span> <span class="hljs-title function_">isInputValid</span>(<span class="hljs-string">"linbudu"</span>);</span>
</code></pre>
<h2 data-id="heading-1">类型守卫</h2>
<p>TypeScript 中提供了非常强大的类型推导能力，它会随着你的代码逻辑不断尝试收窄类型，这一能力称之为<strong>类型的控制流分析</strong>（也可以简单理解为类型推导）。</p>
<p>这么说有点抽象，我们可以想象有一条河流，它从上而下流过你的程序，随着代码的分支分出一条条支流，在最后重新合并为一条完整的河流。在河流流动的过程中，如果遇到了有特定条件才能进入的河道（比如 if else 语句、switch case 语句等），那河流流过这里就会收集对应的信息，等到最后合并时，它们就会嚷着交流：<strong>“我刚刚流过了一个只有字符串类型才能进入的代码分支！”</strong> <strong>“我刚刚流过了一个只有函数类型才能进入的代码分支！”</strong>……就这样，它会把整个程序的类型信息都收集完毕。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">foo</span> (<span class="hljs-attr">input</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> input === <span class="hljs-string">'string'</span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> input === <span class="hljs-string">'number'</span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>我们在 never 类型一节中学到的也是如此。在类型控制流分析下，每流过一个 if 分支，后续联合类型的分支就少了一个，因为这个类型已经在这个分支处理过了，不会进入下一个分支：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">strOrNumOrBool</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> strOrNumOrBool === <span class="hljs-string">"string"</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-comment">// 一定是字符串！</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">  strOrNumOrBool.<span class="hljs-title function_">charAt</span>(<span class="hljs-number">1</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6">} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> strOrNumOrBool === <span class="hljs-string">"number"</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-comment">// 一定是数字！</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">  strOrNumOrBool.<span class="hljs-title function_">toFixed</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="9">} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> strOrNumOrBool === <span class="hljs-string">"boolean"</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-comment">// 一定是布尔值！</span></span>
<span class="code-block-extension-codeLine" data-line-num="11">  strOrNumOrBool === <span class="hljs-literal">true</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="12">} <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-comment">// 要是走到这里就说明有问题！</span></span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-keyword">const</span> <span class="hljs-attr">_exhaustiveCheck</span>: <span class="hljs-built_in">never</span> = strOrNumOrBool;</span>
<span class="code-block-extension-codeLine" data-line-num="15">  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">`Unknown input type: <span class="hljs-subst">${_exhaustiveCheck}</span>`</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="16">}</span>
</code></pre>
<p>在这里，我们实际上通过 if 条件中的表达式进行了类型保护，即告知了流过这里的分析程序每个 if 语句代码块中变量会是何类型。这即是编程语言的类型能力中最重要的一部分：<strong>与实际逻辑紧密关联的类型</strong>。我们从逻辑中进行类型地推导，再反过来让类型为逻辑保驾护航。</p>
<p>前面我们说到，类型控制流分析就像一条河流一样流过，那 if 条件中的表达式要是现在被提取出来了怎么办？</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">isString</span>(<span class="hljs-params">input: <span class="hljs-built_in">unknown</span></span>): <span class="hljs-built_in">boolean</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> input === <span class="hljs-string">"string"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">function</span> <span class="hljs-title function_">foo</span>(<span class="hljs-params">input: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isString</span>(input)) {</span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-comment">// 类型“string | number”上不存在属性“replace”。</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">    (input).<span class="hljs-title function_">replace</span>(<span class="hljs-string">"linbudu"</span>, <span class="hljs-string">"linbudu599"</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="9">  }</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> input === <span class="hljs-string">'number'</span>) { }</span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">}</span>
</code></pre>
<p>奇怪的事情发生了，我们只是把逻辑提取到了外面而已，如果 isString 返回了 true，那 input 肯定也是 string 类型啊？</p>
<p>想象类型控制流分析这条河流，刚流进 <code>if (isString(input))</code> 就戛然而止了。因为 isString 这个函数在另外一个地方，内部的判断逻辑并不在函数 foo 中。这里的类型控制流分析做不到跨函数上下文来进行类型的信息收集（但别的类型语言中可能是支持的）。</p>
<p>实际上，将判断逻辑封装起来提取到函数外部进行复用非常常见。为了解决这一类型控制流分析的能力不足， TypeScript 引入了 <strong>is 关键字</strong>来显式地提供类型信息：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">isString</span>(<span class="hljs-params">input: <span class="hljs-built_in">unknown</span></span>): input is <span class="hljs-built_in">string</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> input === <span class="hljs-string">"string"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">function</span> <span class="hljs-title function_">foo</span>(<span class="hljs-params">input: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isString</span>(input)) {</span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-comment">// 正确了</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">    (input).<span class="hljs-title function_">replace</span>(<span class="hljs-string">"linbudu"</span>, <span class="hljs-string">"linbudu599"</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="9">  }</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> input === <span class="hljs-string">'number'</span>) { }</span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">}</span>
</code></pre>
<p>isString 函数称为类型守卫，在它的返回值中，我们不再使用 boolean 作为类型标注，而是使用 <code>input is string</code> 这么个奇怪的搭配，拆开来看它是这样的：</p>
<ul>
<li>input 函数的某个参数；</li>
<li><code>is string</code>，即 <strong>is 关键字 + 预期类型</strong>，即如果这个函数成功返回为 true，那么 is 关键字前这个入参的类型，就会<strong>被这个类型守卫调用方后续的类型控制流分析收集到</strong>。</li>
</ul>
<p>需要注意的是，类型守卫函数中并不会对判断逻辑和实际类型的关联进行检查：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">isString</span>(<span class="hljs-params">input: <span class="hljs-built_in">unknown</span></span>): input is <span class="hljs-built_in">number</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> input === <span class="hljs-string">"string"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">function</span> <span class="hljs-title function_">foo</span>(<span class="hljs-params">input: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isString</span>(input)) {</span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-comment">// 报错，在这里变成了 number 类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">    (input).<span class="hljs-title function_">replace</span>(<span class="hljs-string">"linbudu"</span>, <span class="hljs-string">"linbudu599"</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="9">  }</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> input === <span class="hljs-string">'number'</span>) { }</span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">}</span>
</code></pre>
<p><strong>从这个角度来看，其实类型守卫有些类似于类型断言，但类型守卫更宽容，也更信任你一些。你指定什么类型，它就是什么类型。</strong> 除了使用简单的原始类型以外，我们还可以在类型守卫中使用对象类型、联合类型等，比如下面我开发时常用的两个守卫：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">Falsy</span> = <span class="hljs-literal">false</span> | <span class="hljs-string">""</span> | <span class="hljs-number">0</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> isFalsy = (<span class="hljs-attr">val</span>: <span class="hljs-built_in">unknown</span>): val is <span class="hljs-title class_">Falsy</span> =&gt; !val;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-comment">// 不包括不常用的 symbol 和 bigint</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">Primitive</span> = <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">boolean</span> | <span class="hljs-literal">undefined</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> isPrimitive = (<span class="hljs-attr">val</span>: <span class="hljs-built_in">unknown</span>): val is <span class="hljs-title class_">Primitive</span> =&gt; [<span class="hljs-string">'string'</span>, <span class="hljs-string">'number'</span>, <span class="hljs-string">'boolean'</span> , <span class="hljs-string">'undefined'</span>].<span class="hljs-title function_">includes</span>(<span class="hljs-keyword">typeof</span> val);</span>
</code></pre>
<p>除了使用 typeof 以外，我们还可以使用许多类似的方式来进行类型保护，只要它能够在联合类型的类型成员中起到筛选作用。</p>
<h3 data-id="heading-2">基于 in 与 instanceof 的类型保护</h3>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Fin" target="_blank" rel="nofollow noopener noreferrer" title="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in" ref="nofollow noopener noreferrer"><code>in</code> 操作符</a> 并不是 TypeScript 中新增的概念，而是 JavaScript 中已有的部分，它可以通过 <code>key in object</code> 的方式来判断 key 是否存在于 object 或其原型链上（返回 true 说明存在）。</p>
<p>既然能起到区分作用，那么 TypeScript 中自然也可以用它来保护类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Foo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">foo</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">fooOnly</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">shared</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Bar</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-attr">bar</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-attr">barOnly</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-attr">shared</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="11">}</span>
<span class="code-block-extension-codeLine" data-line-num="12"></span>
<span class="code-block-extension-codeLine" data-line-num="13"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">input: Foo | Bar</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-keyword">if</span> (<span class="hljs-string">'foo'</span> <span class="hljs-keyword">in</span> input) {</span>
<span class="code-block-extension-codeLine" data-line-num="15">    input.<span class="hljs-property">fooOnly</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="16">  } <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="17">    input.<span class="hljs-property">barOnly</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="18">  }</span>
<span class="code-block-extension-codeLine" data-line-num="19">}</span>
</code></pre>
<p>这里的 foo / bar、fooOnly / barOnly、shared 属性们其实有着不同的意义。我们使用 foo 和 bar 来区分 input 联合类型，然后就可以在对应的分支代码块中正确访问到 Foo 和 Bar 独有的类型 fooOnly / barOnly。但是，如果用 shared 来区分，就会发现在分支代码块中 input 仍然是初始的联合类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">input: Foo | Bar</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">if</span> (<span class="hljs-string">'shared'</span> <span class="hljs-keyword">in</span> input) {</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-comment">// 类型“Foo | Bar”上不存在属性“fooOnly”。类型“Bar”上不存在属性“fooOnly”。</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">    input.<span class="hljs-property">fooOnly</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  } <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">    <span class="hljs-comment">// 类型“never”上不存在属性“barOnly”。</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">    input.<span class="hljs-property">barOnly</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8">  }</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
</code></pre>
<p>这里需要注意的是，Foo 与 Bar 都满足 <code>'shared' in input</code> 这个条件。因此在 if 分支中， Foo 与 Bar 都会被保留，那在 else 分支中就只剩下 never 类型。</p>
<p>这个时候肯定有人想问，为什么 shared 不能用来区分？答案很明显，因为它同时存在两个类型中不具有辨识度。而 foo / bar 和 fooOnly / barOnly 是各个类型独有的属性，因此可以作为<strong>可辨识属性（Discriminant Property 或 Tagged Property）</strong>。Foo 与 Bar 又因为存在这样具有区分能力的辨识属性，可以称为<strong>可辨识联合类型（Discriminated Unions 或 Tagged Union）</strong>。虽然它们是一堆类型的联合体，但其中每一个类型都具有一个独一无二的，能让它鹤立鸡群的属性。</p>
<p>这个可辨识属性可以是结构层面的，比如结构 A 的属性 prop 是数组，而结构 B 的属性 prop 是对象，或者结构 A 中存在属性 prop 而结构 B 中不存在。</p>
<p>它甚至可以是共同属性的字面量类型差异：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ensureArray</span>(<span class="hljs-params">input: <span class="hljs-built_in">number</span> | <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">number</span>[] {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(input)) {</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-keyword">return</span> input;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  } <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-keyword">return</span> [input];</span>
<span class="code-block-extension-codeLine" data-line-num="6">  }</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Foo</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-attr">kind</span>: <span class="hljs-string">'foo'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-attr">diffType</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-attr">fooOnly</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-attr">shared</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="14">}</span>
<span class="code-block-extension-codeLine" data-line-num="15"></span>
<span class="code-block-extension-codeLine" data-line-num="16"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Bar</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="17">  <span class="hljs-attr">kind</span>: <span class="hljs-string">'bar'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="18">  <span class="hljs-attr">diffType</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="19">  <span class="hljs-attr">barOnly</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="20">  <span class="hljs-attr">shared</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="21">}</span>
<span class="code-block-extension-codeLine" data-line-num="22"></span>
<span class="code-block-extension-codeLine" data-line-num="23"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle1</span>(<span class="hljs-params">input: Foo | Bar</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="24">  <span class="hljs-keyword">if</span> (input.<span class="hljs-property">kind</span> === <span class="hljs-string">'foo'</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="25">    input.<span class="hljs-property">fooOnly</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="26">  } <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="27">    input.<span class="hljs-property">barOnly</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="28">  }</span>
<span class="code-block-extension-codeLine" data-line-num="29">}</span>
</code></pre>
<p>如上例所示，对于同名但不同类型的属性，我们需要使用字面量类型的区分，并不能使用简单的 typeof：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle2</span>(<span class="hljs-params">input: Foo | Bar</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-comment">// 报错，并没有起到区分的作用，在两个代码块中都是 Foo | Bar</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> input.<span class="hljs-property">diffType</span> === <span class="hljs-string">'string'</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="4">    input.<span class="hljs-property">fooOnly</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  } <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">    input.<span class="hljs-property">barOnly</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">  }</span>
<span class="code-block-extension-codeLine" data-line-num="8">}</span>
</code></pre>
<p>除此之外，JavaScript 中还存在一个功能类似于 typeof 与 in 的操作符：<a href="https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Finstanceof" target="_blank" rel="nofollow noopener noreferrer" title="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof" ref="nofollow noopener noreferrer">instanceof</a>，它判断的是原型级别的关系，如 <code>foo instanceof Base</code> 会沿着 foo 的原型链查找 <code>Base.prototype</code> 是否存在其上。当然，在 ES6 已经无处不在的今天，我们也可以简单地认为这是判断 foo 是否是 Base 类的实例。同样的，instanceof 也可以用来进行类型保护：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">class</span> <span class="hljs-title class_">FooBase</span> {}</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BarBase</span> {}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Foo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">FooBase</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-title function_">fooOnly</span>(<span class="hljs-params"></span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Bar</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">BarBase</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-title function_">barOnly</span>(<span class="hljs-params"></span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="10">}</span>
<span class="code-block-extension-codeLine" data-line-num="11"></span>
<span class="code-block-extension-codeLine" data-line-num="12"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params">input: Foo | Bar</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-keyword">if</span> (input <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">FooBase</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="14">    input.<span class="hljs-title function_">fooOnly</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="15">  } <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="16">    input.<span class="hljs-title function_">barOnly</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="17">  }</span>
<span class="code-block-extension-codeLine" data-line-num="18">}</span>
</code></pre>
<p>除了使用 is 关键字的类型守卫以外，其实还存在使用 asserts 关键字的类型断言守卫。</p>
<h3 data-id="heading-3">类型断言守卫</h3>
<p>如果你写过测试用例或者使用过 NodeJs 的 assert 模块，那对断言这个概念应该不陌生：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> assert <span class="hljs-keyword">from</span> <span class="hljs-string">'assert'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">let</span> <span class="hljs-attr">name</span>: <span class="hljs-built_in">any</span> = <span class="hljs-string">'linbudu'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-title function_">assert</span>(<span class="hljs-keyword">typeof</span> name === <span class="hljs-string">'number'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-comment">// number 类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">name.<span class="hljs-title function_">toFixed</span>();</span>
</code></pre>
<p>上面这段代码在运行时会抛出一个错误，因为 assert 接收到的表达式执行结果为 false。这其实也类似类型守卫的场景：如果断言<strong>不成立</strong>，比如在这里意味着值的类型不为 number，那么在断言下方的代码就执行不到（相当于 Dead Code）。如果断言通过了，不管你最开始是什么类型，断言后的代码中就<strong>一定是符合断言的类型</strong>，比如在这里就是 number。</p>
<p><strong>但断言守卫和类型守卫最大的不同点在于，在判断条件不通过时，断言守卫需要抛出一个错误，类型守卫只需要剔除掉预期的类型。</strong> 这里的抛出错误可能让你想到了 never 类型，但实际情况要更复杂一些，断言守卫并不会始终都抛出错误，所以它的返回值类型并不能简单地使用 never 类型。为此，TypeScript 3.7 版本专门引入了 asserts 关键字来进行断言场景下的类型守卫，比如前面 assert 方法的签名可以是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">assert</span>(<span class="hljs-params">condition: <span class="hljs-built_in">any</span>, msg?: <span class="hljs-built_in">string</span></span>): asserts condition {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">if</span> (!condition) {</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(msg);</span>
<span class="code-block-extension-codeLine" data-line-num="4">  }</span>
<span class="code-block-extension-codeLine" data-line-num="5">}</span>
</code></pre>
<p>这里使用的是 <code>asserts condition</code> ，而 condition 来自于实际逻辑！这也意味着，我们<strong>将 condition 这一逻辑层面的代码，作为了类型层面的判断依据</strong>，相当于在返回值类型中使用一个逻辑表达式进行了类型标注。</p>
<p>举例来说，对于 <code>assert(typeof name === 'number');</code> 这么一个断言，如果函数成功返回，就说明其后续的代码中 condition 均成立，也就是 name 神奇地变成了一个 number 类型。</p>
<p>这里的 condition 甚至还可以结合使用 is 关键字来提供进一步的类型守卫能力：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">let</span> <span class="hljs-attr">name</span>: <span class="hljs-built_in">any</span> = <span class="hljs-string">'linbudu'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">function</span> <span class="hljs-title function_">assertIsNumber</span>(<span class="hljs-params">val: <span class="hljs-built_in">any</span></span>): asserts val is <span class="hljs-built_in">number</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> val !== <span class="hljs-string">'number'</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'Not a number!'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6">  }</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-title function_">assertIsNumber</span>(name);</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-comment">// number 类型！</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">name.<span class="hljs-title function_">toFixed</span>();</span>
</code></pre>
<p>在这种情况下，你无需再为断言守卫传入一个表达式，而是可以将这个判断用的表达式放进断言守卫的内部，来获得更独立地代码逻辑。</p>
<h2 data-id="heading-4">总结与预告</h2>
<p>在这一节，我们学习了一批新的类型工具，包括操作符 keyof、typeof，属于类型语法的交叉类型、索引类型（的三个部分）、映射类型、类型守卫等等。对这些工具的学习能够更好的帮助你更好的理解“类型编程”这个概念，即，原来对类型也是有这么多花样的！<strong>原来类型编程真是对类型进行编程</strong>！</p>
<p>在类型守卫部分，我们初次了解到了类型控制流分析的存在，以及使用类型保护、类型守卫来进行类型控制流的分析纠正等。同时，我们还学习了可辨识联合类型与可辨识属性的概念，想必以后你对如何处理联合类型会更有思路。</p>
<p>在下一节，我们就将开始学习泛型，它在许多语言中都是相当重要的类型能力。我们会了解泛型和类型别名的结合，以及它在接口、函数与 Class 中的作用，再到泛型约束、泛型默认值等概念，让你从此不再看到泛型就脑壳痛。</p>
<h2 data-id="heading-5">扩展阅读</h2>
<h3 data-id="heading-6">接口的合并</h3>
<p>在交叉类型一节中，你可能会注意到，接口和类型别名都能直接使用交叉类型。但除此以外，接口还能够使用继承进行合并，在继承时子接口可以声明同名属性，但并不能覆盖掉父接口中的此属性。<strong>子接口中的属性类型需要能够兼容（extends）父接口中的属性类型</strong>：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Struct1</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">primitiveProp</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">objectProp</span>: {</span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  };</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-attr">unionProp</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-comment">// 接口“Struct2”错误扩展接口“Struct1”。</span></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Struct2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Struct1</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-comment">// “primitiveProp”的类型不兼容。不能将类型“number”分配给类型“string”。</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-attr">primitiveProp</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-comment">// 属性“objectProp”的类型不兼容。</span></span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-attr">objectProp</span>: {</span>
<span class="code-block-extension-codeLine" data-line-num="15">    <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="16">  };</span>
<span class="code-block-extension-codeLine" data-line-num="17">  <span class="hljs-comment">// 属性“unionProp”的类型不兼容。</span></span>
<span class="code-block-extension-codeLine" data-line-num="18">  <span class="hljs-comment">// 不能将类型“boolean”分配给类型“string | number”。</span></span>
<span class="code-block-extension-codeLine" data-line-num="19">  <span class="hljs-attr">unionProp</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="20">}</span>
</code></pre>
<p>类似的，如果你直接声明多个同名接口，虽然接口会进行合并，但这些同名属性的类型仍然需要兼容，此时的表现其实和显式扩展接口基本一致：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Struct1</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">primitiveProp</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Struct1</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-comment">// 后续属性声明必须属于同一类型。</span></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-comment">// 属性“primitiveProp”的类型必须为“string”，但此处却为类型“number”。</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-attr">primitiveProp</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
</code></pre>
<p>这也是接口和类型别名的重要差异之一。</p>
<p>那么接口和类型别名之间的合并呢？其实规则一致，如接口<strong>继承</strong>类型别名，和类型别名使用交叉类型<strong>合并</strong>接口：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Base</span> = {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">};</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IDerived</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Base</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-comment">// 报错！就像继承接口一样需要类型兼容</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">IBase</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">}</span>
<span class="code-block-extension-codeLine" data-line-num="14"></span>
<span class="code-block-extension-codeLine" data-line-num="15"><span class="hljs-comment">// 合并后的 name 同样是 never 类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="16"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Derived</span> = <span class="hljs-title class_">IBase</span> &amp; {</span>
<span class="code-block-extension-codeLine" data-line-num="17">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="18">};</span>
</code></pre>
<h3 data-id="heading-7">更强大的可辨识联合类型分析</h3>
<p>类型控制流分析其实是一直在不断增强的，在 4.5、4.6、4.7 版本中都有或多或少的场景增强。而这里说的增强，其实就包括了<strong>对可辨识联合类型的分析能力</strong>。比如下面这个例子在此前（4.6 版本以前）的 TypeScript 代码中会报错：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Args</span> = [<span class="hljs-string">'a'</span>, <span class="hljs-built_in">number</span>] | [<span class="hljs-string">'b'</span>, <span class="hljs-built_in">string</span>];</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Func</span> = <span class="hljs-function">(<span class="hljs-params">...args: [<span class="hljs-string">"a"</span>, <span class="hljs-built_in">number</span>] | [<span class="hljs-string">"b"</span>, <span class="hljs-built_in">string</span>]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> <span class="hljs-attr">f1</span>: <span class="hljs-title class_">Func</span> = <span class="hljs-function">(<span class="hljs-params">kind, payload</span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">if</span> (kind === <span class="hljs-string">"a"</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-comment">// 仍然是 string | number</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">    payload.<span class="hljs-title function_">toFixed</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="9">  }</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-keyword">if</span> (kind === <span class="hljs-string">"b"</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-comment">// 仍然是 string | number</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">    payload.<span class="hljs-title function_">toUpperCase</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="13">  }</span>
<span class="code-block-extension-codeLine" data-line-num="14">};</span>
</code></pre>
<p>而在 4.6 版本中则对这一情况下的 <strong>联合类型辨识（即元组）</strong> 做了支持。</p>
<p>如果你有兴趣了解 TypeScript 中的类型控制流分析以及更多可辨识联合类型的场景，可以阅读：<a href="https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F461842201" target="_blank" rel="nofollow noopener noreferrer" title="https://zhuanlan.zhihu.com/p/461842201" ref="nofollow noopener noreferrer">TypeScript 中的类型控制流分析演进</a>。</p></div>
