<div class="markdown-body"><h2 data-id="heading-0">前置知识：Babel 的基本工作流程</h2>
<p>在本节的最开始，我有必要郑重说明下，我本身并不是科班出身，没有系统学习过编译原理，以下涉及编译原理的概念大部分来自于在社区的学习所得，也欢迎你指出其中的错误，我将认真对待并修正。</p>
<blockquote>
<p>本节原本是被作为短小精悍的漫谈篇呈现的，但有部分同学反馈对这部分知识确实有刚需，因此进行了大量内容扩充后加入到正文篇中。</p>
</blockquote>
<p>对大部分前端同学来说，提到编译原理第一时间想到的就是 Babel，即使你没有直接使用过它，也一定间接地接触过，不论是已经搭建好的项目还是更底层的 Webpack 与 Babel Loader 。</p>
<p>而 Babel 的作用你应该也至少了解过一些，其实它的核心功能就是<strong>语法降级</strong>。是的，就是 TypeScript 在编译时会进行的类型擦除与语法降级中的那个语法降级，Babel 的曾用名是 6to5，意为将 ES6 代码转换为 ES5 代码。这是因为，当时 ES6 已经算是时代的弄潮儿了，很多浏览器还无法完全支持其中的特性，这就需要 Babel 将其转换为能够在更低版本的浏览器上运行的代码。而它现在的这个名字，意为巴别塔，是圣经中记载的一座通天之塔，当时的人们只有一种语言，彼此之间精诚合作，尝试联合起来建立起通往天堂的高塔，而上帝为了阻止这一行动，让人类之间使用不同的语言，彼此之间无法沟通，而计划最终自然失败。Babel 使用这一名字，正是为了更好地宣告自己的使命：<strong>让所有各不相同的 JavaScript 语法，最终都能转换为能在相同环境下直接运行的代码</strong>。</p>
<p>可你是否了解 Babel 的工作流程？</p>
<p>从功能角度，Babel 的<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/babel/babel" ref="nofollow noopener noreferrer">源码</a>大致可以分为这么几个部分：</p>
<ul>
<li>
<p>核心部分，包括 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Fblob%2Fmain%2Fpackages%2Fbabel-parser%2FREADME.md" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/babel/babel/blob/main/packages/babel-parser/README.md" ref="nofollow noopener noreferrer">Parser</a>、<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Ftree%2Fmain%2Fpackages%2Fbabel-traverse" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/babel/babel/tree/main/packages/babel-traverse" ref="nofollow noopener noreferrer">Transformer</a> 以及 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Ftree%2Fmain%2Fpackages%2Fbabel-generator" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/babel/babel/tree/main/packages/babel-generator" ref="nofollow noopener noreferrer">Generator</a>，它们主要负责对源码的解析、转换以及生成等工作。一份源码首先会被 Parser 通过词法分析与语法分析，转换为 AST，也就是抽象语法树的形式，然后由 Transformer 对这棵语法树上的 AST 结点进行遍历处理，比如将所有的函数声明转换为函数表达式，最后由 Generator 基于处理完毕的 AST 结点转换出新的代码，就实现了语法的降级。</p>
<p>AST其实就是将代码的每个部分进行拆分，得到一棵树形的结构表示，你可以在 <a href="https://link.juejin.cn?target=https%3A%2F%2Fastexplorer.net%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://astexplorer.net/" ref="nofollow noopener noreferrer">AST Explorer</a> 上，实时查看一段代码转换完毕的 AST 结构。</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8edd8090919144b19d9c2fd605cdfc2d~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
</li>
<li>
<p>插件相关，如 <code>babel-plugin-syntax-jsx</code> <code>babel-plugin-transform-for-of</code> 以及 <code>babel-plugin-proposal-decorators</code> 等，上面的核心部分只包括最简单的处理逻辑，如果你想转换 JSX 代码，想将 for...of 降级为 for 循环，想使用装饰器等语法，就需要这些插件来支持，这些插件其实就是遍历 AST 时，对目标的 AST 结点注册处理逻辑。一般来说一个插件只会关注一种特定的语法。当然，每个浏览器支持的语法版本都是差异巨大的，因此我们需要 <code>babel-preset-env</code>，自动地基于浏览器版本去确定需要使用的插件。</p>
</li>
</ul>
<p>除了依赖 Babel Loader 这样的工具来进行源码的转换以外，其实你也可以使用 <code>@babel/core</code>，来编程式地调用 Babel 的 Compiler API ，并对应地配置插件、预设等等。</p>
<p>可以看到，在工作流程中其实有一样东西贯穿了整个过程，那就是 AST 。而这也是我们本节所关注的：如何玩转 TypeScript 的 AST。</p>
<h2 data-id="heading-1">使用 TypeScript Compiler API</h2>
<p>编译处理 TypeScript 代码，我们其实仍然可以使用 Babel，但实际上 TypeScript 本身就将几乎所有 Compiler API 都暴露了出来，也就是说如果你希望更贴近 tsc 的行为，其实更应该使用 TypeScript Compiler API 。</p>
<p>然而相比 Babel，TS Compiler API 的使用成本要高一些。我们直接看一个官方例子的精简版本，大致感受下其使用方式即可：</p>
<blockquote>
<p>由于本节的重点并不是详细介绍 Compiler API 的使用，因此并不会对其进行非常详细介绍。</p>
</blockquote>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> ts <span class="hljs-keyword">from</span> <span class="hljs-string">'typescript'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">function</span> <span class="hljs-title function_">makeFactorialFunction</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-comment">// 创建代表函数名 factorial 的 Identifier 结点</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-keyword">const</span> functionName = ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createIdentifier</span>(<span class="hljs-string">'factorial'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-comment">// 创建代表参数名 n 的 Identifier 结点</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-keyword">const</span> paramName = ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createIdentifier</span>(<span class="hljs-string">'n'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-comment">// 创建参数类型结点</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-keyword">const</span> paramType = ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createKeywordTypeNode</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="10">    ts.<span class="hljs-property">SyntaxKind</span>.<span class="hljs-property">NumberKeyword</span></span>
<span class="code-block-extension-codeLine" data-line-num="11">  );</span>
<span class="code-block-extension-codeLine" data-line-num="12"></span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-comment">// 创建参数的声明</span></span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-keyword">const</span> parameter = ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createParameterDeclaration</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="15">    <span class="hljs-literal">undefined</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="16">    [],</span>
<span class="code-block-extension-codeLine" data-line-num="17">    <span class="hljs-literal">undefined</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="18">    paramName,</span>
<span class="code-block-extension-codeLine" data-line-num="19">    <span class="hljs-literal">undefined</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="20">    paramType</span>
<span class="code-block-extension-codeLine" data-line-num="21">  );</span>
<span class="code-block-extension-codeLine" data-line-num="22"></span>
<span class="code-block-extension-codeLine" data-line-num="23">  <span class="hljs-comment">// 创建表达式 n ≤ 1</span></span>
<span class="code-block-extension-codeLine" data-line-num="24">  <span class="hljs-keyword">const</span> condition = ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createBinaryExpression</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="25">    <span class="hljs-comment">// n</span></span>
<span class="code-block-extension-codeLine" data-line-num="26">    paramName,</span>
<span class="code-block-extension-codeLine" data-line-num="27">    <span class="hljs-comment">// ≤</span></span>
<span class="code-block-extension-codeLine" data-line-num="28">    ts.<span class="hljs-property">SyntaxKind</span>.<span class="hljs-property">LessThanEqualsToken</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="29">    <span class="hljs-comment">// 1</span></span>
<span class="code-block-extension-codeLine" data-line-num="30">    ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createNumericLiteral</span>(<span class="hljs-number">1</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="31">  );</span>
<span class="code-block-extension-codeLine" data-line-num="32"></span>
<span class="code-block-extension-codeLine" data-line-num="33">  <span class="hljs-comment">// 创建代码块</span></span>
<span class="code-block-extension-codeLine" data-line-num="34">  <span class="hljs-keyword">const</span> ifBody = ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createBlock</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="35">    <span class="hljs-comment">// 创建代码块内的返回语句</span></span>
<span class="code-block-extension-codeLine" data-line-num="36">    [ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createReturnStatement</span>(ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createNumericLiteral</span>(<span class="hljs-number">1</span>))],</span>
<span class="code-block-extension-codeLine" data-line-num="37">    <span class="hljs-literal">true</span></span>
<span class="code-block-extension-codeLine" data-line-num="38">  );</span>
<span class="code-block-extension-codeLine" data-line-num="39"></span>
<span class="code-block-extension-codeLine" data-line-num="40">  <span class="hljs-comment">// 创建表达式 n - 1</span></span>
<span class="code-block-extension-codeLine" data-line-num="41">  <span class="hljs-keyword">const</span> decrementedArg = ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createBinaryExpression</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="42">    paramName,</span>
<span class="code-block-extension-codeLine" data-line-num="43">    ts.<span class="hljs-property">SyntaxKind</span>.<span class="hljs-property">MinusToken</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="44">    ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createNumericLiteral</span>(<span class="hljs-number">1</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="45">  );</span>
<span class="code-block-extension-codeLine" data-line-num="46"></span>
<span class="code-block-extension-codeLine" data-line-num="47">  <span class="hljs-comment">// 创建表达式 n * factorial(n - 1)</span></span>
<span class="code-block-extension-codeLine" data-line-num="48">  <span class="hljs-keyword">const</span> recurse = ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createBinaryExpression</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="49">    paramName,</span>
<span class="code-block-extension-codeLine" data-line-num="50">    ts.<span class="hljs-property">SyntaxKind</span>.<span class="hljs-property">AsteriskToken</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="51">    <span class="hljs-comment">// 创建函数调用表达式</span></span>
<span class="code-block-extension-codeLine" data-line-num="52">    ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createCallExpression</span>(functionName, <span class="hljs-literal">undefined</span>, [decrementedArg])</span>
<span class="code-block-extension-codeLine" data-line-num="53">  );</span>
<span class="code-block-extension-codeLine" data-line-num="54"></span>
<span class="code-block-extension-codeLine" data-line-num="55">  <span class="hljs-keyword">const</span> statements = [</span>
<span class="code-block-extension-codeLine" data-line-num="56">    <span class="hljs-comment">// 创建 IF 语句</span></span>
<span class="code-block-extension-codeLine" data-line-num="57">    ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createIfStatement</span>(condition, ifBody),</span>
<span class="code-block-extension-codeLine" data-line-num="58">    <span class="hljs-comment">// 创建 return 语句</span></span>
<span class="code-block-extension-codeLine" data-line-num="59">    ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createReturnStatement</span>(recurse),</span>
<span class="code-block-extension-codeLine" data-line-num="60">  ];</span>
<span class="code-block-extension-codeLine" data-line-num="61"></span>
<span class="code-block-extension-codeLine" data-line-num="62">  <span class="hljs-comment">// 创建函数声明</span></span>
<span class="code-block-extension-codeLine" data-line-num="63">  <span class="hljs-keyword">return</span> ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createFunctionDeclaration</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="64">    <span class="hljs-literal">undefined</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="65">    [ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createToken</span>(ts.<span class="hljs-property">SyntaxKind</span>.<span class="hljs-property">ExportKeyword</span>)],</span>
<span class="code-block-extension-codeLine" data-line-num="66">    <span class="hljs-literal">undefined</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="67">    functionName,</span>
<span class="code-block-extension-codeLine" data-line-num="68">    <span class="hljs-literal">undefined</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="69">    [parameter],</span>
<span class="code-block-extension-codeLine" data-line-num="70">    <span class="hljs-comment">// 函数返回值类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="71">    ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createKeywordTypeNode</span>(ts.<span class="hljs-property">SyntaxKind</span>.<span class="hljs-property">NumberKeyword</span>),</span>
<span class="code-block-extension-codeLine" data-line-num="72">    <span class="hljs-comment">// 函数体</span></span>
<span class="code-block-extension-codeLine" data-line-num="73">    ts.<span class="hljs-property">factory</span>.<span class="hljs-title function_">createBlock</span>(statements, <span class="hljs-literal">true</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="74">  );</span>
<span class="code-block-extension-codeLine" data-line-num="75">}</span>
<span class="code-block-extension-codeLine" data-line-num="76"></span>
<span class="code-block-extension-codeLine" data-line-num="77"><span class="hljs-comment">// 创建一个虚拟的源文件</span></span>
<span class="code-block-extension-codeLine" data-line-num="78"><span class="hljs-keyword">const</span> resultFile = ts.<span class="hljs-title function_">createSourceFile</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="79">  <span class="hljs-string">'./source.ts'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="80">  <span class="hljs-string">''</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="81">  ts.<span class="hljs-property">ScriptTarget</span>.<span class="hljs-property">Latest</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="82">  <span class="hljs-literal">false</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="83">  ts.<span class="hljs-property">ScriptKind</span>.<span class="hljs-property">TS</span></span>
<span class="code-block-extension-codeLine" data-line-num="84">);</span>
<span class="code-block-extension-codeLine" data-line-num="85"></span>
<span class="code-block-extension-codeLine" data-line-num="86"><span class="hljs-keyword">const</span> printer = ts.<span class="hljs-title function_">createPrinter</span>({ <span class="hljs-attr">newLine</span>: ts.<span class="hljs-property">NewLineKind</span>.<span class="hljs-property">LineFeed</span> });</span>
<span class="code-block-extension-codeLine" data-line-num="87"></span>
<span class="code-block-extension-codeLine" data-line-num="88"><span class="hljs-keyword">const</span> result = printer.<span class="hljs-title function_">printNode</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="89">  ts.<span class="hljs-property">EmitHint</span>.<span class="hljs-property">Unspecified</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="90">  <span class="hljs-title function_">makeFactorialFunction</span>(),</span>
<span class="code-block-extension-codeLine" data-line-num="91">  resultFile</span>
<span class="code-block-extension-codeLine" data-line-num="92">);</span>
<span class="code-block-extension-codeLine" data-line-num="93"></span>
<span class="code-block-extension-codeLine" data-line-num="94"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(result);</span>
</code></pre>
<p>这么一长串代码，最后会生成这样的一段函数声明：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">factorial</span>(<span class="hljs-params">n: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">if</span> (n &lt;= <span class="hljs-number">1</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">  }</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-keyword">return</span> n * <span class="hljs-title function_">factorial</span>(n - <span class="hljs-number">1</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6">}</span>
</code></pre>
<p>在这个例子中，我们从最基础的 identifier （代表变量名的结点）开始创建，组装参数、if 语句条件与代码块、函数的返回语句，最后通过 <code>createFunctionDeclaration</code> 完成组装。要想流畅地使用，你需要对 Expression、Declaration、Statement 等 AST 的结点类型有比较清晰地了解，比如上面的 If 语句需要使用哪些 token 来组装，还需要了解 TypeScript 的 AST，如 interface、类型别名、装饰器等实际的 AST 结构。</p>
<p>TypeScript Compiler API 和 Babel、JSCodeShift 等工具的使用方式都不同，Babel 是声明式的 Visitor 模式，我们声明对哪一部分语句做哪些处理，然后 Babel 在遍历 AST 时（<code>@babel/traverse</code>），发现这些语句被注册了操作，就进行对应地执行：</p>
<blockquote>
<p>以下示例来自于神光的文章分享，也推荐各位有兴趣进一步学习编译原理的同学关注神光老师的社区分享。</p>
</blockquote>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> { <span class="hljs-keyword">declare</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">"@babel/helper-plugin-utils"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-comment">// 不允许函数类型的赋值</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">const</span> noFuncAssignLint = <span class="hljs-title function_">declare</span>(<span class="hljs-function">(<span class="hljs-params">api, options, dirname</span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  api.<span class="hljs-title function_">assertVersion</span>(<span class="hljs-number">7</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-keyword">return</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-title function_">pre</span>(<span class="hljs-params">file</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="9">      file.<span class="hljs-title function_">set</span>(<span class="hljs-string">"errors"</span>, []);</span>
<span class="code-block-extension-codeLine" data-line-num="10">    },</span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-attr">visitor</span>: {</span>
<span class="code-block-extension-codeLine" data-line-num="12">      <span class="hljs-title class_">AssignmentExpression</span>(path, state) {</span>
<span class="code-block-extension-codeLine" data-line-num="13">        <span class="hljs-keyword">const</span> errors = state.<span class="hljs-property">file</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">"errors"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="14">        <span class="hljs-keyword">const</span> assignTarget = path.<span class="hljs-title function_">get</span>(<span class="hljs-string">"left"</span>).<span class="hljs-title function_">toString</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="15">        <span class="hljs-keyword">const</span> binding = path.<span class="hljs-property">scope</span>.<span class="hljs-title function_">getBinding</span>(assignTarget);</span>
<span class="code-block-extension-codeLine" data-line-num="16">        <span class="hljs-keyword">if</span> (binding) {</span>
<span class="code-block-extension-codeLine" data-line-num="17">          <span class="hljs-keyword">if</span> (</span>
<span class="code-block-extension-codeLine" data-line-num="18">            binding.<span class="hljs-property">path</span>.<span class="hljs-title function_">isFunctionDeclaration</span>() ||</span>
<span class="code-block-extension-codeLine" data-line-num="19">            binding.<span class="hljs-property">path</span>.<span class="hljs-title function_">isFunctionExpression</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="20">          ) {</span>
<span class="code-block-extension-codeLine" data-line-num="21">            <span class="hljs-keyword">const</span> tmp = <span class="hljs-title class_">Error</span>.<span class="hljs-property">stackTraceLimit</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="22">            <span class="hljs-title class_">Error</span>.<span class="hljs-property">stackTraceLimit</span> = <span class="hljs-number">0</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="23">            errors.<span class="hljs-title function_">push</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="24">              path.<span class="hljs-title function_">buildCodeFrameError</span>(<span class="hljs-string">"can not reassign to function"</span>, <span class="hljs-title class_">Error</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="25">            );</span>
<span class="code-block-extension-codeLine" data-line-num="26">            <span class="hljs-title class_">Error</span>.<span class="hljs-property">stackTraceLimit</span> = tmp;</span>
<span class="code-block-extension-codeLine" data-line-num="27">          }</span>
<span class="code-block-extension-codeLine" data-line-num="28">        }</span>
<span class="code-block-extension-codeLine" data-line-num="29">      },</span>
<span class="code-block-extension-codeLine" data-line-num="30">    },</span>
<span class="code-block-extension-codeLine" data-line-num="31">    <span class="hljs-title function_">post</span>(<span class="hljs-params">file</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="32">      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(file.<span class="hljs-title function_">get</span>(<span class="hljs-string">"errors"</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="33">    },</span>
<span class="code-block-extension-codeLine" data-line-num="34">  };</span>
<span class="code-block-extension-codeLine" data-line-num="35">});</span>
</code></pre>
<p>而 jscodeshift 则提供的是命令式的 API：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = <span class="hljs-keyword">function</span> (<span class="hljs-params">fileInfo, api</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">return</span> api</span>
<span class="code-block-extension-codeLine" data-line-num="3">    .<span class="hljs-title function_">jscodeshift</span>(fileInfo.<span class="hljs-property">source</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="4">    .<span class="hljs-title function_">findVariableDeclarators</span>(<span class="hljs-string">"foo"</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="5">    .<span class="hljs-title function_">renameTo</span>(<span class="hljs-string">"bar"</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="6">    .<span class="hljs-title function_">toSource</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="7">};</span>
</code></pre>
<p>虽然命令式看起来很简单，但却可能导致对 AST 节点的遗漏（如果底层封装没有完全覆盖掉边界情况），就像鱼和熊掌不可兼得一样。而 TypeScript Compiler API 同样属于命令式，只不过它的使用风格并非链式，而更像是组合式。</p>
<p>铺垫了这么多，是时候请出我们本节的主角了。</p>
<h2 data-id="heading-2">使用 ts-morph</h2>
<p>上面的例子看下来，可能有部分同学已经被劝退了，这一堆眼花缭乱的 API，我咋知道啥时候该用哪个，难道还要先从头学一遍编译原理？</p>
<p>当然不，你可以永远相信 JavaScript 社区。为了简化 TypeScript AST 的操作，我们本节的主角 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fts-morph" target="_blank" rel="nofollow noopener noreferrer" title="https://www.npmjs.com/package/ts-morph" ref="nofollow noopener noreferrer">ts-morph</a> 诞生了，它的原名为 <code>ts-simple-ast</code>，从这两个名字你都能感受到它的目的：<strong>让 AST 操作更简单一些</strong>（morph 意为变形）。</p>
<p>我们直接来看它的使用方式，直观地感受下它是如何实现更简单的 AST 操作的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> chalk <span class="hljs-keyword">from</span> <span class="hljs-string">'chalk'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Project</span>, <span class="hljs-title class_">SyntaxKind</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'ts-morph'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-comment">// 实例化一个“项目实例”</span></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Project</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-comment">// 将某个路径的文件添加到这个项目内</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">const</span> source = p.<span class="hljs-title function_">addSourceFileAtPath</span>(path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">'./source.ts'</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-comment">/**</span></span>
<span class="code-block-extension-codeLine" data-line-num="12"> * 创建一个接口</span>
<span class="code-block-extension-codeLine" data-line-num="13"> *</span>
<span class="code-block-extension-codeLine" data-line-num="14"> * interface IUser { }</span>
<span class="code-block-extension-codeLine" data-line-num="15"> */</span>
<span class="code-block-extension-codeLine" data-line-num="16"><span class="hljs-keyword">const</span> interfaceDec = source.<span class="hljs-title function_">addInterface</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="17">  <span class="hljs-attr">name</span>: <span class="hljs-string">'IUser'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="18">  <span class="hljs-attr">properties</span>: [],</span>
<span class="code-block-extension-codeLine" data-line-num="19">});</span>
<span class="code-block-extension-codeLine" data-line-num="20"></span>
<span class="code-block-extension-codeLine" data-line-num="21"><span class="hljs-comment">// 新增属性</span></span>
<span class="code-block-extension-codeLine" data-line-num="22">interfaceDec.<span class="hljs-title function_">addProperties</span>([</span>
<span class="code-block-extension-codeLine" data-line-num="23">  {</span>
<span class="code-block-extension-codeLine" data-line-num="24">    <span class="hljs-attr">name</span>: <span class="hljs-string">'name'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="25">    <span class="hljs-attr">type</span>: <span class="hljs-string">'string'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="26">  },</span>
<span class="code-block-extension-codeLine" data-line-num="27">  {</span>
<span class="code-block-extension-codeLine" data-line-num="28">    <span class="hljs-attr">name</span>: <span class="hljs-string">'age'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="29">    <span class="hljs-attr">type</span>: <span class="hljs-string">'number'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="30">  },</span>
<span class="code-block-extension-codeLine" data-line-num="31">]);</span>
<span class="code-block-extension-codeLine" data-line-num="32"></span>
<span class="code-block-extension-codeLine" data-line-num="33"><span class="hljs-comment">// 添加 JSDoc 注释 @author Linbudu</span></span>
<span class="code-block-extension-codeLine" data-line-num="34">interfaceDec.<span class="hljs-title function_">addJsDoc</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="35">  <span class="hljs-attr">tags</span>: [</span>
<span class="code-block-extension-codeLine" data-line-num="36">    {</span>
<span class="code-block-extension-codeLine" data-line-num="37">      <span class="hljs-attr">tagName</span>: <span class="hljs-string">'author'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="38">      <span class="hljs-attr">text</span>: <span class="hljs-string">'Linbudu'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="39">    },</span>
<span class="code-block-extension-codeLine" data-line-num="40">  ],</span>
<span class="code-block-extension-codeLine" data-line-num="41">});</span>
<span class="code-block-extension-codeLine" data-line-num="42"></span>
<span class="code-block-extension-codeLine" data-line-num="43"><span class="hljs-comment">// 添加泛型 T extends Record&lt;string, any&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="44">interfaceDec.<span class="hljs-title function_">addTypeParameter</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="45">  <span class="hljs-attr">name</span>: <span class="hljs-string">'T'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="46">  <span class="hljs-attr">constraint</span>: <span class="hljs-string">'Record&lt;string, any&gt;'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="47">});</span>
<span class="code-block-extension-codeLine" data-line-num="48"></span>
<span class="code-block-extension-codeLine" data-line-num="49"><span class="hljs-comment">// 获取接口名称</span></span>
<span class="code-block-extension-codeLine" data-line-num="50">interfaceDec.<span class="hljs-title function_">getName</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="51"></span>
<span class="code-block-extension-codeLine" data-line-num="52"><span class="hljs-comment">// 删除这个接口声明</span></span>
<span class="code-block-extension-codeLine" data-line-num="53">interfaceDec.<span class="hljs-title function_">remove</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="54"></span>
<span class="code-block-extension-codeLine" data-line-num="55"><span class="hljs-comment">// 创建一条导入：import { readFile, rmSync } from 'fs';</span></span>
<span class="code-block-extension-codeLine" data-line-num="56"><span class="hljs-keyword">const</span> importDec = source.<span class="hljs-title function_">addImportDeclaration</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="57">  <span class="hljs-attr">namedImports</span>: [<span class="hljs-string">'readFile'</span>, <span class="hljs-string">'rmSync'</span>],</span>
<span class="code-block-extension-codeLine" data-line-num="58">  <span class="hljs-attr">moduleSpecifier</span>: <span class="hljs-string">'fs'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="59">});</span>
<span class="code-block-extension-codeLine" data-line-num="60"></span>
<span class="code-block-extension-codeLine" data-line-num="61"><span class="hljs-comment">// 新增具名导入 appendFile</span></span>
<span class="code-block-extension-codeLine" data-line-num="62">importDec.<span class="hljs-title function_">addNamedImport</span>(<span class="hljs-string">'appendFile'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="63"><span class="hljs-comment">// 设置默认导入 fs</span></span>
<span class="code-block-extension-codeLine" data-line-num="64">importDec.<span class="hljs-title function_">setDefaultImport</span>(<span class="hljs-string">'fs'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="65"></span>
<span class="code-block-extension-codeLine" data-line-num="66"><span class="hljs-comment">// 删除默认导入</span></span>
<span class="code-block-extension-codeLine" data-line-num="67">importDec.<span class="hljs-title function_">removeDefaultImport</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="68"><span class="hljs-comment">// 删除命名空间导入</span></span>
<span class="code-block-extension-codeLine" data-line-num="69">importDec.<span class="hljs-title function_">removeNamespaceImport</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="70"></span>
<span class="code-block-extension-codeLine" data-line-num="71"><span class="hljs-comment">// 删除这条导入声明</span></span>
<span class="code-block-extension-codeLine" data-line-num="72">importDec.<span class="hljs-title function_">remove</span>();</span>
</code></pre>
<p>可以看到，ts-morph 提供了一系列直观的封装方法，只要调用这些方法就可以完成对 AST 的各种操作，包括新增、更新、删除、读取等等！</p>
<p>通过使用 ts-morph，你可以使用非常简便的方式来完成各种有趣好玩的操作，比如我们下面会讲到的为 React 组件添加 memo、检查并更新导入语句、从 JSON 文件转换到 TypeScript 类型等等。而实际实现中，当然也是基于 Compiler API 的封装，但是它屏蔽了 Statement、Expression、Declaration、Token 等等概念，直接提供给你应用层的实现：创建一个接口，添加泛型参数，添加属性，添加继承，将其设置为导出，完成！在这个过程中，你并不需要理解底层发生了哪些 AST 结点的变化和操作。</p>
<p>光是这样，其实还是具有一定使用成本，毕竟要对 AST 进行操作，还是需要分析出整个 AST 结构，以及定位到需要操作的目标 AST 结点。如果是和我一样没有学习过编译原理的同学，这一步仍然是天堑。</p>
<p>感谢万能的社区，我们可以使用 <a href="https://link.juejin.cn?target=https%3A%2F%2Fts-ast-viewer.com%2F%23" target="_blank" rel="nofollow noopener noreferrer" title="https://ts-ast-viewer.com/#" ref="nofollow noopener noreferrer">TS-AST-Viewer</a> 这个在线网页来直观地检查一段代码的 AST 结构：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ccee9c0586f4623b1b4eda66b8e17c3~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<p>从左到右依次是输入的源码（左上）与对应的 Compiler API 代码（左下）、AST 结构以及其在 TypeScript 内部的编译产物。</p>
<p>你可以通过右上角的配置来调整 TS 版本等功能：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7eedb2f9376d452d9ce71bb6895f24a7~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<blockquote>
<p>除了 TS AST Viewer 以外，此前你可能也使用过支持数十种语言或 SDL，以及其对应的 parser 的 <a href="https://link.juejin.cn?target=https%3A%2F%2Fastexplorer.net%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://astexplorer.net/" ref="nofollow noopener noreferrer">AST Explorer</a>，它们的功能是类似的，但 AST Explorer 目前并不支持使用 TypeScript Compiler API 来解析 TS 代码：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1b10bd2e6a14930a044a680878597c5~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
</blockquote>
<p>有了 TS AST Viewer，我们的操作流程就会变得非常流畅了。首先一级级向下找到目标 AST 结点，这一步我们可以使用 ts-morph 提供的 getFirstChildByKind 方法来获取一个 AST 结点内我们需要的子结点，“ByKind” 的 Kind 指的是  TypeScript Compiler API 内的 SyntaxKind 枚举，它描述了所有可能的 AST 结点类型。</p>
<p>拿到目标 AST 结点后，我们就可以调用上面已经提供好的方法（如导入声明的 <code>getModuleSpecifierValue</code> 方法可以直接获得此导入的模块名），最后保存即可。</p>
<p>最后，ts-morph 其实也并不能完全替代原生 Compiler API，它并没有对 Block 内的 AST 操作进行封装，比如最开始我们使用 Compiler API 创建函数的例子，如果换成 ts-morph ，那么对于函数体内的逻辑它是无能为力的，你要么直接写入字符串，要么将这部分仍然使用原生的 Compiler API 实现。</p>
<h2 data-id="heading-3">AST Checker 与 CodeMod</h2>
<p>了解了 ts-morph 的基本使用，接下来我们就通过几个具有实际意义的示例进一步掌握它。这些示例基本都是我遇见过的实际场景，如果不通过 AST 操作，就需要自己手动一个个处理。</p>
<p>这些操作其实可以分为两大类：AST Checker 与 CodeMod。其中 AST Checker 指的是完全不进行新增/更新/删除操作，只是通过 AST + 预设的条件检查源码是否符合要求，比如不允许调用某个方法、不允许默认导出、要求某个导入必须存在，都属于 AST Checker 的范畴。</p>
<blockquote>
<p>关于 AST Checker 与 ESLint 的区别，请参考扩展阅读部分。</p>
</blockquote>
<p>而 CodeMod 你此前可能已经使用过，它通常会在基础框架发生大版本更新时出现，用来降低使用者的迁移成本，比如 Antd Design 的 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40ant-design%2Fcodemod-v4" target="_blank" rel="nofollow noopener noreferrer" title="https://www.npmjs.com/package/@ant-design/codemod-v4" ref="nofollow noopener noreferrer">codemod</a>，Material UI 的 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40mui%2Fcodemod" target="_blank" rel="nofollow noopener noreferrer" title="https://www.npmjs.com/package/@mui/codemod" ref="nofollow noopener noreferrer">codemod</a> 等，这些 codemod 会进行依赖升级、配置文件更新以及源码更新等操作，这里我们指的 codemod，其实就只是源码更新这一部分。它需要对源码进行新增、更新以及删除等等操作。</p>
<p>接下来我们会使用 ts-morph 来实现数个示例，它们没有什么难度，毕竟我们的目的在于熟悉“分析-定位-处理-保存”这个工作流程嘛。而且有了 ts-morph 的加持，很多 AST 操作的难度都会下降几个级别。</p>
<h3 data-id="heading-4">示例：导入语句</h3>
<p>许多场景的 AST 操作中，其实都会涉及对导入语句的处理。比如 CodeMod 会将你旧版本的导入更新为新版本的导入，或者更换导入语句的导入路径（模块名），而在某些工程场景下，AST Checker 也会检查代码中是否进行了必需的 polyfill 导入。</p>
<p>我们的源码如下：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { readFileSync } <span class="hljs-keyword">from</span> <span class="hljs-string">'fs'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> <span class="hljs-string">'some_required_polyfill'</span>;</span>
</code></pre>
<p>操作后的代码如下：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> <span class="hljs-string">'some_required_polyfill'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> { readFile } <span class="hljs-keyword">from</span> <span class="hljs-string">"fs/promises"</span>;</span>
</code></pre>
<p>在这个例子中，我们希望进行两种操作：</p>
<ul>
<li>将来自于 fs 的 sync api 导入，更换为来自 <code>fs/promise</code> 的 async api，如 <code>import { readFile } from 'fs/promises'</code></li>
<li>检查是否存在对 <code>some_required_polyfill</code> 的导入</li>
</ul>
<p>首先第一步，一定是分析源代码的 AST 结构：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c21521468d74cf2af32280bf84a131f~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<p>整理一下思路：</p>
<ul>
<li>将 fs 更改为 fs/promises</li>
<li>将来自 fs 的，以 Sync 结尾的导入进行更改</li>
<li>检查是否存在以 <code>some_required_polyfill</code> 为导入名的导入声明</li>
</ul>
<p>直接看具体实现：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Project</span>, <span class="hljs-title class_">SyntaxKind</span>, <span class="hljs-title class_">SourceFile</span>, <span class="hljs-title class_">ImportDeclaration</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'ts-morph'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">import</span> { uniq } <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Project</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">const</span> source = p.<span class="hljs-title function_">addSourceFileAtPath</span>(path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">'./source.ts'</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-comment">// 获取所有导入声明中的模块名</span></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getImportModuleSpecifiers</span>(<span class="hljs-params">source: SourceFile</span>): <span class="hljs-built_in">string</span>[] {</span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-keyword">return</span> <span class="hljs-title function_">uniq</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="12">    source.<span class="hljs-title function_">getImportDeclarations</span>().<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-title function_">getModuleSpecifierValue</span>())</span>
<span class="code-block-extension-codeLine" data-line-num="13">  );</span>
<span class="code-block-extension-codeLine" data-line-num="14">}</span>
<span class="code-block-extension-codeLine" data-line-num="15"></span>
<span class="code-block-extension-codeLine" data-line-num="16"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">REQUIRED</span> = [<span class="hljs-string">'some_required_polyfill'</span>];</span>
<span class="code-block-extension-codeLine" data-line-num="17"></span>
<span class="code-block-extension-codeLine" data-line-num="18"><span class="hljs-keyword">const</span> allDeclarations = source.<span class="hljs-title function_">getImportDeclarations</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="19"></span>
<span class="code-block-extension-codeLine" data-line-num="20"><span class="hljs-keyword">const</span> allSpecifiers = <span class="hljs-title function_">getImportModuleSpecifiers</span>(source);</span>
<span class="code-block-extension-codeLine" data-line-num="21"></span>
<span class="code-block-extension-codeLine" data-line-num="22"><span class="hljs-keyword">if</span> (!<span class="hljs-variable constant_">REQUIRED</span>.<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> allSpecifiers.<span class="hljs-title function_">includes</span>(i))) {</span>
<span class="code-block-extension-codeLine" data-line-num="23">  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'missing required polyfill'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="24">}</span>
<span class="code-block-extension-codeLine" data-line-num="25"></span>
<span class="code-block-extension-codeLine" data-line-num="26"><span class="hljs-comment">// 设计一个通用的替换模式</span></span>
<span class="code-block-extension-codeLine" data-line-num="27"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">FORBIDDEN</span> = [</span>
<span class="code-block-extension-codeLine" data-line-num="28">  {</span>
<span class="code-block-extension-codeLine" data-line-num="29">    <span class="hljs-comment">// 要被替换的导入路径</span></span>
<span class="code-block-extension-codeLine" data-line-num="30">    <span class="hljs-attr">moduleSpecifier</span>: <span class="hljs-string">'fs'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="31">    <span class="hljs-comment">// 替换为这个值</span></span>
<span class="code-block-extension-codeLine" data-line-num="32">    <span class="hljs-attr">replacement</span>: <span class="hljs-string">'fs/promises'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="33">    <span class="hljs-comment">// 原本的导入如何更新</span></span>
<span class="code-block-extension-codeLine" data-line-num="34">    <span class="hljs-attr">namedImportsReplacement</span>: <span class="hljs-function">(<span class="hljs-params">raw: <span class="hljs-built_in">string</span></span>) =&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="35">      raw.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">'Sync'</span>) ? raw.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, -<span class="hljs-number">4</span>) : raw,</span>
<span class="code-block-extension-codeLine" data-line-num="36">  },</span>
<span class="code-block-extension-codeLine" data-line-num="37">];</span>
<span class="code-block-extension-codeLine" data-line-num="38"></span>
<span class="code-block-extension-codeLine" data-line-num="39"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">FORBIDDEN_SPECIFIERS</span> = <span class="hljs-variable constant_">FORBIDDEN</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">moduleSpecifier</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="40"></span>
<span class="code-block-extension-codeLine" data-line-num="41"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> specifier <span class="hljs-keyword">of</span> allSpecifiers) {</span>
<span class="code-block-extension-codeLine" data-line-num="42">  <span class="hljs-keyword">if</span> (<span class="hljs-variable constant_">FORBIDDEN_SPECIFIERS</span>.<span class="hljs-title function_">includes</span>(specifier)) {</span>
<span class="code-block-extension-codeLine" data-line-num="43">    <span class="hljs-keyword">const</span> target = allDeclarations.<span class="hljs-title function_">find</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="44">      <span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="45">        <span class="hljs-comment">// 检查是否是要被替换的模块</span></span>
<span class="code-block-extension-codeLine" data-line-num="46">        i.<span class="hljs-title function_">getModuleSpecifierValue</span>() === specifier</span>
<span class="code-block-extension-codeLine" data-line-num="47">    );</span>
<span class="code-block-extension-codeLine" data-line-num="48"></span>
<span class="code-block-extension-codeLine" data-line-num="49">    <span class="hljs-comment">// 找到要被替换的导入声明</span></span>
<span class="code-block-extension-codeLine" data-line-num="50">    <span class="hljs-keyword">const</span> replacementMatch = <span class="hljs-variable constant_">FORBIDDEN</span>.<span class="hljs-title function_">find</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="51">      <span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">moduleSpecifier</span> === specifier</span>
<span class="code-block-extension-codeLine" data-line-num="52">    );</span>
<span class="code-block-extension-codeLine" data-line-num="53"></span>
<span class="code-block-extension-codeLine" data-line-num="54">    <span class="hljs-comment">// 收集原本的具名导入</span></span>
<span class="code-block-extension-codeLine" data-line-num="55">    <span class="hljs-keyword">const</span> namedImports = target?.<span class="hljs-title function_">getNamedImports</span>() ?? [];</span>
<span class="code-block-extension-codeLine" data-line-num="56"></span>
<span class="code-block-extension-codeLine" data-line-num="57">    <span class="hljs-comment">// 替换为新的具名导入</span></span>
<span class="code-block-extension-codeLine" data-line-num="58">    <span class="hljs-keyword">const</span> namedImportsReplacement = namedImports.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="59">      replacementMatch?.<span class="hljs-title function_">namedImportsReplacement</span>(i.<span class="hljs-title function_">getText</span>())</span>
<span class="code-block-extension-codeLine" data-line-num="60">    );</span>
<span class="code-block-extension-codeLine" data-line-num="61"></span>
<span class="code-block-extension-codeLine" data-line-num="62">    <span class="hljs-comment">// 移除原本的导入</span></span>
<span class="code-block-extension-codeLine" data-line-num="63">    target?.<span class="hljs-title function_">remove</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="64"></span>
<span class="code-block-extension-codeLine" data-line-num="65">    <span class="hljs-comment">// 增加新的导入</span></span>
<span class="code-block-extension-codeLine" data-line-num="66">    source.<span class="hljs-title function_">addImportDeclaration</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="67">      <span class="hljs-attr">moduleSpecifier</span>: replacementMatch?.<span class="hljs-property">replacement</span>!,</span>
<span class="code-block-extension-codeLine" data-line-num="68">      <span class="hljs-attr">namedImports</span>: namedImportsReplacement.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> ({</span>
<span class="code-block-extension-codeLine" data-line-num="69">        <span class="hljs-attr">name</span>: i!,</span>
<span class="code-block-extension-codeLine" data-line-num="70">      })),</span>
<span class="code-block-extension-codeLine" data-line-num="71">    });</span>
<span class="code-block-extension-codeLine" data-line-num="72">  }</span>
<span class="code-block-extension-codeLine" data-line-num="73">}</span>
<span class="code-block-extension-codeLine" data-line-num="74"></span>
<span class="code-block-extension-codeLine" data-line-num="75"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(source.<span class="hljs-title function_">getText</span>());</span>
</code></pre>
<p>这里我们使用的 API 主要包括：</p>
<ul>
<li><code>source.getImportDeclarations()</code>，获取源码的所有导入声明</li>
<li><code>source.addImportDeclaration</code>，源码新增导入声明语句</li>
<li><code>i.getModuleSpecifierValue</code>，获取导入声明的模块名（或者说导入路径）</li>
<li><code>target?.getNamedImports</code>，获取导入声明的具名导入</li>
</ul>
<p>扩展：如何处理默认导入、命名空间导入的形式？</p>
<h3 data-id="heading-5">示例：添加装饰器</h3>
<p>在装饰器一节我们说到，可以使用方法装饰器来测量一个方法的调用耗时，但一个一个加未免太过麻烦，更好的方式是通过 AST 来批量处理目标 Class 的目标方法：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">abstract</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Handler</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">abstract</span> <span class="hljs-title function_">handle</span>(<span class="hljs-attr">input</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">class</span> <span class="hljs-title class_">NotHandler</span> {}</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">class</span> <span class="hljs-title class_">EventHandler</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">Handler</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-title function_">handle</span>(<span class="hljs-attr">input</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">void</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="9">    <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="10">  }</span>
<span class="code-block-extension-codeLine" data-line-num="11">}</span>
<span class="code-block-extension-codeLine" data-line-num="12"></span>
<span class="code-block-extension-codeLine" data-line-num="13"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MessageHandler</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">Handler</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-title function_">handle</span>(<span class="hljs-attr">input</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">void</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="15">    <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="16">  }</span>
<span class="code-block-extension-codeLine" data-line-num="17">}</span>
</code></pre>
<p>其处理结果应当是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">abstract</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Handler</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-keyword">abstract</span> <span class="hljs-title function_">handle</span>(<span class="hljs-attr">input</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">void</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">class</span> <span class="hljs-title class_">NotHandler</span> {}</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">class</span> <span class="hljs-title class_">EventHandler</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">Handler</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-meta">@PerformanceMark</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="9">    <span class="hljs-title function_">handle</span>(<span class="hljs-attr">input</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">void</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="10">    <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="11">  }</span>
<span class="code-block-extension-codeLine" data-line-num="12">}</span>
<span class="code-block-extension-codeLine" data-line-num="13"></span>
<span class="code-block-extension-codeLine" data-line-num="14"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MessageHandler</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">Handler</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="15">    <span class="hljs-meta">@PerformanceMark</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="16">    <span class="hljs-title function_">handle</span>(<span class="hljs-attr">input</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">void</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="17">    <span class="hljs-comment">// ...</span></span>
<span class="code-block-extension-codeLine" data-line-num="18">  }</span>
<span class="code-block-extension-codeLine" data-line-num="19">}</span>
</code></pre>
<p>这里我们使用抽象类来区分目标 Class，即只有实现了某一抽象类的 Class 才需要进行处理。</p>
<p>首先分析 AST 结构：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20561d4d6440420f8113a333654cd3e0~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<p>整理一下实现思路：</p>
<ul>
<li>拿到所有实现了 Handler 抽象类的 Class 声明</li>
<li>为这些声明内部的 handle 方法添加 <code>@PerformanceMark</code> 装饰器</li>
</ul>
<p>完整实现如下：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Project</span>, <span class="hljs-title class_">ClassDeclaration</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'ts-morph'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Project</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">const</span> source = p.<span class="hljs-title function_">addSourceFileAtPath</span>(path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">'./source.ts'</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">IMPLS</span> = [<span class="hljs-string">'Handler'</span>];</span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-comment">// 获取所有目标 Class 声明</span></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">const</span> <span class="hljs-attr">filteredClassDeclarations</span>: <span class="hljs-title class_">ClassDeclaration</span>[] = source</span>
<span class="code-block-extension-codeLine" data-line-num="12">  .<span class="hljs-title function_">getClasses</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="13">  .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">cls</span>) =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="14">    <span class="hljs-keyword">const</span> impls = cls.<span class="hljs-title function_">getImplements</span>().<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">impl</span>) =&gt;</span> impl.<span class="hljs-title function_">getText</span>());</span>
<span class="code-block-extension-codeLine" data-line-num="15">    <span class="hljs-keyword">return</span> <span class="hljs-variable constant_">IMPLS</span>.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">impl</span>) =&gt;</span> impls.<span class="hljs-title function_">includes</span>(impl));</span>
<span class="code-block-extension-codeLine" data-line-num="16">  });</span>
<span class="code-block-extension-codeLine" data-line-num="17"></span>
<span class="code-block-extension-codeLine" data-line-num="18"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">METHODS</span> = [<span class="hljs-string">'handle'</span>];</span>
<span class="code-block-extension-codeLine" data-line-num="19"></span>
<span class="code-block-extension-codeLine" data-line-num="20"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> cls <span class="hljs-keyword">of</span> filteredClassDeclarations) {</span>
<span class="code-block-extension-codeLine" data-line-num="21">  <span class="hljs-comment">// 拿到所有方法</span></span>
<span class="code-block-extension-codeLine" data-line-num="22">  <span class="hljs-keyword">const</span> methods = cls.<span class="hljs-title function_">getMethods</span>().<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">method</span>) =&gt;</span> method.<span class="hljs-title function_">getName</span>());</span>
<span class="code-block-extension-codeLine" data-line-num="23">  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> method <span class="hljs-keyword">of</span> methods) {</span>
<span class="code-block-extension-codeLine" data-line-num="24">    <span class="hljs-keyword">if</span> (<span class="hljs-variable constant_">METHODS</span>.<span class="hljs-title function_">includes</span>(method)) {</span>
<span class="code-block-extension-codeLine" data-line-num="25">      <span class="hljs-comment">// 拿到目标方法声明</span></span>
<span class="code-block-extension-codeLine" data-line-num="26">      <span class="hljs-keyword">const</span> methodDeclaration = cls.<span class="hljs-title function_">getMethod</span>(method)!;</span>
<span class="code-block-extension-codeLine" data-line-num="27">      methodDeclaration.<span class="hljs-title function_">addDecorator</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="28">        <span class="hljs-attr">name</span>: <span class="hljs-string">'PerformanceMark'</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="29">        <span class="hljs-attr">arguments</span>: [],</span>
<span class="code-block-extension-codeLine" data-line-num="30">      });</span>
<span class="code-block-extension-codeLine" data-line-num="31">    }</span>
<span class="code-block-extension-codeLine" data-line-num="32">  }</span>
<span class="code-block-extension-codeLine" data-line-num="33">}</span>
<span class="code-block-extension-codeLine" data-line-num="34"></span>
<span class="code-block-extension-codeLine" data-line-num="35"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(source.<span class="hljs-title function_">getText</span>());</span>
</code></pre>
<p>我们主要使用了这么几个 API：</p>
<ul>
<li><code>source.getClasses</code>，获取源码中所有的 Class 声明</li>
<li><code>cls.getImplements</code>，获取 Class 声明实现的抽象类</li>
<li><code>cls.getMethods</code> 与 <code>cls.getMethod</code>，获取 Class 声明中的方法声明</li>
<li><code>methodDeclaration.addDecorator</code>，为方法声明新增装饰器</li>
</ul>
<p>扩展：试试给方法的参数也添加方法参数装饰器？</p>
<h3 data-id="heading-6">示例：添加 memo</h3>
<p>为 React 组件添加 memo 是一个常见的优化手段，我们是否可以通过 AST 操作来批量为组件添加 memo ？</p>
<p>我们的源码是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Comp</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;&gt;</span><span class="hljs-tag">&lt;/&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">};</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">Comp</span>;</span>
</code></pre>
<p>处理后的结果则是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { memo, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Comp</span> = (<span class="hljs-params"></span>) =&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;&gt;</span><span class="hljs-tag">&lt;/&gt;</span></span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">};</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">memo</span>(<span class="hljs-title class_">Comp</span>);</span>
</code></pre>
<p>也就是说，我们需要添加具名导入，以及修改默认导出表达式两个步骤。</p>
<p>首先分析 AST 结构：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/776e37d6052c4bf3a703d0bdcf7e146f~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<p>可以看到，我们需要处理的两处分别为 NamedImports 与 ExportAssignment ，接下来就简单了：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Project</span>, <span class="hljs-title class_">SyntaxKind</span>, <span class="hljs-title class_">SourceFile</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'ts-morph'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Project</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">const</span> source = p.<span class="hljs-title function_">addSourceFileAtPath</span>(path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">'./source.tsx'</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-comment">// 获取默认导出</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">const</span> exportDefaultAssignment = source</span>
<span class="code-block-extension-codeLine" data-line-num="10">  .<span class="hljs-title function_">getFirstChildByKind</span>(<span class="hljs-title class_">SyntaxKind</span>.<span class="hljs-property">SyntaxList</span>)!</span>
<span class="code-block-extension-codeLine" data-line-num="11">  .<span class="hljs-title function_">getFirstChildByKind</span>(<span class="hljs-title class_">SyntaxKind</span>.<span class="hljs-property">ExportAssignment</span>)!;</span>
<span class="code-block-extension-codeLine" data-line-num="12"></span>
<span class="code-block-extension-codeLine" data-line-num="13"><span class="hljs-comment">// 获取原本的导出语句的组件名</span></span>
<span class="code-block-extension-codeLine" data-line-num="14"><span class="hljs-keyword">const</span> targetIdentifier = exportDefaultAssignment</span>
<span class="code-block-extension-codeLine" data-line-num="15">  ?.<span class="hljs-title function_">getFirstChildByKind</span>(<span class="hljs-title class_">SyntaxKind</span>.<span class="hljs-property">Identifier</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="16">  ?.<span class="hljs-title function_">getText</span>()!;</span>
<span class="code-block-extension-codeLine" data-line-num="17"></span>
<span class="code-block-extension-codeLine" data-line-num="18"><span class="hljs-comment">// 获取 react 对应的导入声明</span></span>
<span class="code-block-extension-codeLine" data-line-num="19"><span class="hljs-keyword">const</span> reactImport = source.<span class="hljs-title function_">getImportDeclaration</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="20">  <span class="hljs-function">(<span class="hljs-params">imp</span>) =&gt;</span> imp.<span class="hljs-title function_">getModuleSpecifierValue</span>() === <span class="hljs-string">'react'</span></span>
<span class="code-block-extension-codeLine" data-line-num="21">)!;</span>
<span class="code-block-extension-codeLine" data-line-num="22"></span>
<span class="code-block-extension-codeLine" data-line-num="23"><span class="hljs-comment">// 新增一个具名导入</span></span>
<span class="code-block-extension-codeLine" data-line-num="24">reactImport.<span class="hljs-title function_">insertNamedImport</span>(<span class="hljs-number">0</span>, <span class="hljs-string">'memo'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="25"></span>
<span class="code-block-extension-codeLine" data-line-num="26"><span class="hljs-comment">// 新增 memo 包裹</span></span>
<span class="code-block-extension-codeLine" data-line-num="27">!targetIdentifier.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">'memo'</span>) &amp;&amp;</span>
<span class="code-block-extension-codeLine" data-line-num="28"> exportDefaultAssignment.<span class="hljs-title function_">setExpression</span>(<span class="hljs-string">`memo(<span class="hljs-subst">${targetIdentifier}</span>)`</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="29"></span>
<span class="code-block-extension-codeLine" data-line-num="30"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(source.<span class="hljs-title function_">getText</span>());</span>
</code></pre>
<p>我们主要调用了这些 API：</p>
<ul>
<li><code>source.getFirstChildByKind(SyntaxKind.SyntaxList)</code>，获取一个 AST 结点下首个目标类型的子结点，在上面我们都是直接使用 <code>source.getClasses()</code> 形式获取目标类型，而这里则是另外一种方式，<code>source.getFirstChildByKind(SyntaxKind.SyntaxList).getFirstChildByKind(SyntaxKind.ExportAssignment)</code> 即意味着拿到源码中的第一个导出语句。需要注意的是，使用这种方式必须首先拿到 <code>SyntaxKind.SyntaxList</code> 类型的子结点。</li>
<li><code>source.getImportDeclaration</code>，获取源码中所有的导入声明</li>
<li><code>imp.getModuleSpecifierValue</code>，获取导入的模块名</li>
<li><code>import.insertNamedImport</code>，为导入声明插入一个具名导入</li>
<li><code>exportDefaultAssignment.setExpression</code>，修改导出语句的表达式</li>
</ul>
<p>扩展：上面我们直接将默认导出语句作为了组件，然后通过修改它的表达式来实现添加 memo。不妨试试如何支持 <code>export const</code> 形式的组件导出？</p>
<h3 data-id="heading-7">示例：JSON 转类型定义</h3>
<p>这个例子可能是最最刚需的一个了，把后端响应的 JSON 放进去，就得到了 TypeScript 的类型定义。</p>
<p>我们输入的 json 是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">json</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-json code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-attr">"name"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"linbudu"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">"age"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">22</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">"sex"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"male"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">"favors"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">    <span class="hljs-string">"execrise"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-string">"writting"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-number">999</span></span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-attr">"job"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-attr">"name"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"programmer"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">    <span class="hljs-attr">"stack"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"javascript"</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="13">    <span class="hljs-attr">"company"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"alibaba"</span></span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="15">  <span class="hljs-attr">"pets"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="code-block-extension-codeLine" data-line-num="16">    <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="17">      <span class="hljs-attr">"id"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="18">      <span class="hljs-attr">"type"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"dog"</span></span>
<span class="code-block-extension-codeLine" data-line-num="19">    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="20">    <span class="hljs-punctuation">{</span></span>
<span class="code-block-extension-codeLine" data-line-num="21">      <span class="hljs-attr">"id"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span></span>
<span class="code-block-extension-codeLine" data-line-num="22">      <span class="hljs-attr">"type"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"cat"</span></span>
<span class="code-block-extension-codeLine" data-line-num="23">    <span class="hljs-punctuation">}</span></span>
<span class="code-block-extension-codeLine" data-line-num="24">  <span class="hljs-punctuation">]</span></span>
<span class="code-block-extension-codeLine" data-line-num="25"><span class="hljs-punctuation">}</span></span>
</code></pre>
<p>最终输出的类型定义是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IStruct</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3">    <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4">    <span class="hljs-attr">sex</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-attr">favors</span>: (<span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>)[];</span>
<span class="code-block-extension-codeLine" data-line-num="6">    <span class="hljs-title class_">IJob</span>: <span class="hljs-title class_">IJob</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-attr">pets</span>: <span class="hljs-title class_">IStructPets</span>[];</span>
<span class="code-block-extension-codeLine" data-line-num="8">}</span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IJob</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="11">    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="12">    <span class="hljs-attr">stack</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">    <span class="hljs-attr">company</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="14">}</span>
<span class="code-block-extension-codeLine" data-line-num="15"></span>
<span class="code-block-extension-codeLine" data-line-num="16"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">IStructPets</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="17">    <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="18">    <span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="19">}</span>
</code></pre>
<p>具体实现其实并不复杂，由于 JSON 的限制，我们无需处理函数之类的类型，但也无法实现字面量类型与枚举这样精确的定义。然而绝大部分情况下，JSON 中的值类型其实还是字符串、数字、布尔值以及对象与数组这五位。</p>
<p>我们来整理一下思路：</p>
<ul>
<li>遍历 JSON</li>
<li>对于原始类型元素，直接使用 typeof （注意，是 JavaScript 中的 typeof，不是类型查询操作符）的值作为类型，调用 <code>interfaceDeclaration.addProperty</code> 方法新增属性</li>
<li>对于对象类型，遍历此对象类型，将此对象类型生成的接口也调用 <code>source.addInterface</code> 方法添加到源码中，并将其名称调用 <code>interfaceDeclaration.addProperty</code> 添加到顶层的对象中</li>
<li>对于数组类型，如果其中是原始类型，提取所有原始类型值的类型，合并为联合类型，如果其中是对象类型，则遍历其中的对象类型，类似上一步。</li>
</ul>
<p>来看完整的代码：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">'fs-extra'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Project</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'ts-morph'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">import</span> { capitalize, uniq } <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5"></span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">import</span> json <span class="hljs-keyword">from</span> <span class="hljs-string">'./source.json'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Project</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">const</span> filePath = path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">'./source.ts'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="11"></span>
<span class="code-block-extension-codeLine" data-line-num="12">fs.<span class="hljs-title function_">rmSync</span>(filePath);</span>
<span class="code-block-extension-codeLine" data-line-num="13">fs.<span class="hljs-title function_">ensureFileSync</span>(filePath);</span>
<span class="code-block-extension-codeLine" data-line-num="14"></span>
<span class="code-block-extension-codeLine" data-line-num="15"><span class="hljs-keyword">const</span> source = p.<span class="hljs-title function_">addSourceFileAtPath</span>(filePath);</span>
<span class="code-block-extension-codeLine" data-line-num="16"></span>
<span class="code-block-extension-codeLine" data-line-num="17"><span class="hljs-keyword">function</span> <span class="hljs-title function_">objectToInterfaceStruct</span>(<span class="hljs-params"></span></span>
<span class="code-block-extension-codeLine" data-line-num="18">  identifier: <span class="hljs-built_in">string</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="19">  input: Record&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="20">) {</span>
<span class="code-block-extension-codeLine" data-line-num="21">  <span class="hljs-keyword">const</span> interfaceDeclaration = source.<span class="hljs-title function_">addInterface</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="22">    <span class="hljs-attr">name</span>: identifier,</span>
<span class="code-block-extension-codeLine" data-line-num="23">    <span class="hljs-attr">isExported</span>: <span class="hljs-literal">true</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="24">  });</span>
<span class="code-block-extension-codeLine" data-line-num="25"></span>
<span class="code-block-extension-codeLine" data-line-num="26">  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [key, value] <span class="hljs-keyword">of</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(input)) {</span>
<span class="code-block-extension-codeLine" data-line-num="27">    <span class="hljs-comment">// 最简单的情况，直接添加属性</span></span>
<span class="code-block-extension-codeLine" data-line-num="28">    <span class="hljs-keyword">if</span> ([<span class="hljs-string">'string'</span>, <span class="hljs-string">'number'</span>, <span class="hljs-string">'boolean'</span>].<span class="hljs-title function_">includes</span>(<span class="hljs-keyword">typeof</span> value)) {</span>
<span class="code-block-extension-codeLine" data-line-num="29">      interfaceDeclaration.<span class="hljs-title function_">addProperty</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="30">        <span class="hljs-attr">name</span>: key,</span>
<span class="code-block-extension-codeLine" data-line-num="31">        <span class="hljs-attr">type</span>: <span class="hljs-keyword">typeof</span> value,</span>
<span class="code-block-extension-codeLine" data-line-num="32">      });</span>
<span class="code-block-extension-codeLine" data-line-num="33">    }</span>
<span class="code-block-extension-codeLine" data-line-num="34"></span>
<span class="code-block-extension-codeLine" data-line-num="35">    <span class="hljs-comment">// 简单起见，不处理混合或者更复杂的情况</span></span>
<span class="code-block-extension-codeLine" data-line-num="36">    <span class="hljs-keyword">if</span> (<span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(value)) {</span>
<span class="code-block-extension-codeLine" data-line-num="37">      <span class="hljs-comment">// 对象类型元素</span></span>
<span class="code-block-extension-codeLine" data-line-num="38">      <span class="hljs-keyword">const</span> objectElement = value.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-keyword">typeof</span> v === <span class="hljs-string">'object'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="39">      <span class="hljs-comment">// 原始类型元素</span></span>
<span class="code-block-extension-codeLine" data-line-num="40">      <span class="hljs-keyword">const</span> primitiveElement = value.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="41">        [<span class="hljs-string">'string'</span>, <span class="hljs-string">'number'</span>, <span class="hljs-string">'boolean'</span>].<span class="hljs-title function_">includes</span>(<span class="hljs-keyword">typeof</span> v)</span>
<span class="code-block-extension-codeLine" data-line-num="42">      );</span>
<span class="code-block-extension-codeLine" data-line-num="43"></span>
<span class="code-block-extension-codeLine" data-line-num="44">      <span class="hljs-keyword">const</span> primitiveElementTypes = <span class="hljs-title function_">uniq</span>(primitiveElement.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-keyword">typeof</span> v));</span>
<span class="code-block-extension-codeLine" data-line-num="45"></span>
<span class="code-block-extension-codeLine" data-line-num="46">      <span class="hljs-comment">// 对对象类型元素，只取第一个来提取类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="47">      <span class="hljs-keyword">if</span> (objectElement.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="48">        <span class="hljs-comment">// 再次遍历此方法</span></span>
<span class="code-block-extension-codeLine" data-line-num="49">        <span class="hljs-keyword">const</span> objectType = <span class="hljs-title function_">objectToInterfaceStruct</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="50">          <span class="hljs-string">`<span class="hljs-subst">${identifier}</span><span class="hljs-subst">${capitalize(key)}</span>`</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="51">          objectElement[<span class="hljs-number">0</span>]</span>
<span class="code-block-extension-codeLine" data-line-num="52">        );</span>
<span class="code-block-extension-codeLine" data-line-num="53">        interfaceDeclaration.<span class="hljs-title function_">addProperty</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="54">          <span class="hljs-attr">name</span>: key,</span>
<span class="code-block-extension-codeLine" data-line-num="55">          <span class="hljs-attr">type</span>: <span class="hljs-string">`<span class="hljs-subst">${objectType.getName()}</span>[]`</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="56">        });</span>
<span class="code-block-extension-codeLine" data-line-num="57">      } <span class="hljs-keyword">else</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="58">        interfaceDeclaration.<span class="hljs-title function_">addProperty</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="59">          <span class="hljs-attr">name</span>: key,</span>
<span class="code-block-extension-codeLine" data-line-num="60">          <span class="hljs-comment">// 使用联合类型 + 数组作为此属性的类型</span></span>
<span class="code-block-extension-codeLine" data-line-num="61">          <span class="hljs-attr">type</span>: <span class="hljs-string">`(<span class="hljs-subst">${primitiveElementTypes.join(<span class="hljs-string">' | '</span>)}</span>)[]`</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="62">        });</span>
<span class="code-block-extension-codeLine" data-line-num="63">      }</span>
<span class="code-block-extension-codeLine" data-line-num="64"></span>
<span class="code-block-extension-codeLine" data-line-num="65">      <span class="hljs-keyword">continue</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="66">    }</span>
<span class="code-block-extension-codeLine" data-line-num="67"></span>
<span class="code-block-extension-codeLine" data-line-num="68">    <span class="hljs-comment">// 对于对象类型，再次遍历</span></span>
<span class="code-block-extension-codeLine" data-line-num="69">    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">'object'</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="70">      <span class="hljs-keyword">const</span> nestedStruct = <span class="hljs-title function_">objectToInterfaceStruct</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="71">        <span class="hljs-string">`I<span class="hljs-subst">${capitalize(key)}</span>`</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="72">        value <span class="hljs-keyword">as</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;</span>
<span class="code-block-extension-codeLine" data-line-num="73">      );</span>
<span class="code-block-extension-codeLine" data-line-num="74"></span>
<span class="code-block-extension-codeLine" data-line-num="75">      interfaceDeclaration.<span class="hljs-title function_">addProperty</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="76">        <span class="hljs-attr">name</span>: key,</span>
<span class="code-block-extension-codeLine" data-line-num="77">        <span class="hljs-comment">// 使用从接口结构得到的接口名称</span></span>
<span class="code-block-extension-codeLine" data-line-num="78">        <span class="hljs-attr">type</span>: nestedStruct.<span class="hljs-title function_">getName</span>(),</span>
<span class="code-block-extension-codeLine" data-line-num="79">      });</span>
<span class="code-block-extension-codeLine" data-line-num="80">    }</span>
<span class="code-block-extension-codeLine" data-line-num="81">  }</span>
<span class="code-block-extension-codeLine" data-line-num="82"></span>
<span class="code-block-extension-codeLine" data-line-num="83">  <span class="hljs-keyword">return</span> interfaceDeclaration;</span>
<span class="code-block-extension-codeLine" data-line-num="84">}</span>
<span class="code-block-extension-codeLine" data-line-num="85"></span>
<span class="code-block-extension-codeLine" data-line-num="86"><span class="hljs-title function_">objectToInterfaceStruct</span>(<span class="hljs-string">'IStruct'</span>, json);</span>
<span class="code-block-extension-codeLine" data-line-num="87"></span>
<span class="code-block-extension-codeLine" data-line-num="88">source.<span class="hljs-title function_">saveSync</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="89"></span>
<span class="code-block-extension-codeLine" data-line-num="90"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(source.<span class="hljs-title function_">getText</span>());</span>
</code></pre>
<p>在这一部分，我们主要使用两个 API ：</p>
<ul>
<li>
<p><code>source.addInterface</code>，在源码中新增一个接口声明，如：</p>
</li>
<li>
<p><code>interfaceDeclaration.addProperty</code>，为接口声明新增一个属性，如：</p>
</li>
</ul>
<p>扩展：上面的处理逻辑并没有很好地处理掉对象类型与数组类型中的复杂情况，比如数组中既有原始类型也有对象类型，不妨试着完善一下这部分逻辑？</p>
<h3 data-id="heading-8">示例：基于 JSDoc 的任务过期检测</h3>
<p>很多时候，我们可能会写一些存在过期时效的代码，比如紧急更新、临时 bugfix 等，如果在规模较为庞大的代码库中，很可能你写完就忘记这个方法只是临时方法了。这个示例中，我们会使用 JSDoc 的形式来标记一个方法的过期时间，并通过 AST 来检查此方法是否过期：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">/**</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"> * <span class="hljs-doctag">@expires</span> 2022-08-01</span>
<span class="code-block-extension-codeLine" data-line-num="3"> * <span class="hljs-doctag">@author</span> <span class="hljs-variable">linbudu</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"> * <span class="hljs-doctag">@description</span> 这是一个临时的 bugfix，需要在下次更新时删除</span>
<span class="code-block-extension-codeLine" data-line-num="5"> */</span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">function</span> <span class="hljs-title function_">tempFix</span>(<span class="hljs-params"></span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-comment">/**</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"> * <span class="hljs-doctag">@expires</span> 2022-01-01</span>
<span class="code-block-extension-codeLine" data-line-num="10"> * <span class="hljs-doctag">@author</span> <span class="hljs-variable">linbudu</span></span>
<span class="code-block-extension-codeLine" data-line-num="11"> * <span class="hljs-doctag">@description</span> 这是一个临时的兼容</span>
<span class="code-block-extension-codeLine" data-line-num="12"> */</span>
<span class="code-block-extension-codeLine" data-line-num="13"><span class="hljs-keyword">function</span> <span class="hljs-title function_">tempSolution</span>(<span class="hljs-params"></span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="14"></span>
<span class="code-block-extension-codeLine" data-line-num="15"><span class="hljs-comment">/**</span></span>
<span class="code-block-extension-codeLine" data-line-num="16"> * 工具方法</span>
<span class="code-block-extension-codeLine" data-line-num="17"> */</span>
<span class="code-block-extension-codeLine" data-line-num="18"><span class="hljs-keyword">function</span> <span class="hljs-title function_">utils</span>(<span class="hljs-params"></span>) {}</span>
</code></pre>
<p>由于 TS AST Viewer 目前不支持 JSDoc 的解析，这里我们直接来整理一下实现思路：</p>
<ul>
<li>检查所有函数的 JSDoc 区域</li>
<li>如果发现了 <code>@expires</code>，对比其标注的过期时间与当前的时间</li>
<li>如果过期，抛出错误，并指出 <code>@author</code> 标记的作者</li>
</ul>
<p>直接来看实现：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> chalk <span class="hljs-keyword">from</span> <span class="hljs-string">'chalk'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Project</span>, <span class="hljs-title class_">SyntaxKind</span>, <span class="hljs-title class_">SourceFile</span>, <span class="hljs-title class_">FunctionDeclaration</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'ts-morph'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Project</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">const</span> source = p.<span class="hljs-title function_">addSourceFileAtPath</span>(path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">'./source.ts'</span>));</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-comment">// 收集所有的函数声明</span></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getAllFunctionDeclarations</span>(<span class="hljs-params"></span></span>
<span class="code-block-extension-codeLine" data-line-num="11">  source: SourceFile</span>
<span class="code-block-extension-codeLine" data-line-num="12">): <span class="hljs-title class_">FunctionDeclaration</span>[] {</span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-keyword">const</span> functionDeclarationList = source</span>
<span class="code-block-extension-codeLine" data-line-num="14">    .<span class="hljs-title function_">getFirstChildByKind</span>(<span class="hljs-title class_">SyntaxKind</span>.<span class="hljs-property">SyntaxList</span>)!</span>
<span class="code-block-extension-codeLine" data-line-num="15">    .<span class="hljs-title function_">getChildrenOfKind</span>(<span class="hljs-title class_">SyntaxKind</span>.<span class="hljs-property">FunctionDeclaration</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="16"></span>
<span class="code-block-extension-codeLine" data-line-num="17">  <span class="hljs-keyword">return</span> functionDeclarationList;</span>
<span class="code-block-extension-codeLine" data-line-num="18">}</span>
<span class="code-block-extension-codeLine" data-line-num="19"></span>
<span class="code-block-extension-codeLine" data-line-num="20"><span class="hljs-comment">// 收集所有存在 JSDoc 的函数声明</span></span>
<span class="code-block-extension-codeLine" data-line-num="21"><span class="hljs-keyword">const</span> filteredFuncDeclarations = <span class="hljs-title function_">getAllFunctionDeclarations</span>(source).<span class="hljs-title function_">filter</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="22">  <span class="hljs-function">(<span class="hljs-params">func</span>) =&gt;</span> func.<span class="hljs-title function_">getJsDocs</span>().<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span></span>
<span class="code-block-extension-codeLine" data-line-num="23">);</span>
<span class="code-block-extension-codeLine" data-line-num="24"></span>
<span class="code-block-extension-codeLine" data-line-num="25"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> func <span class="hljs-keyword">of</span> filteredFuncDeclarations) {</span>
<span class="code-block-extension-codeLine" data-line-num="26">  <span class="hljs-keyword">const</span> jsdocContent = func.<span class="hljs-title function_">getJsDocs</span>()[<span class="hljs-number">0</span>];</span>
<span class="code-block-extension-codeLine" data-line-num="27"></span>
<span class="code-block-extension-codeLine" data-line-num="28">  <span class="hljs-keyword">const</span> tags = jsdocContent.<span class="hljs-title function_">getTags</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="29"></span>
<span class="code-block-extension-codeLine" data-line-num="30">  <span class="hljs-keyword">const</span> expireTag = tags.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">tag</span>) =&gt;</span> tag.<span class="hljs-title function_">getTagName</span>() === <span class="hljs-string">'expires'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="31"></span>
<span class="code-block-extension-codeLine" data-line-num="32">  <span class="hljs-comment">// 如果不存在 @expires 标签，则跳过</span></span>
<span class="code-block-extension-codeLine" data-line-num="33">  <span class="hljs-keyword">if</span> (!expireTag) <span class="hljs-keyword">continue</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="34"></span>
<span class="code-block-extension-codeLine" data-line-num="35">  <span class="hljs-comment">// 将其值处理为可解析的字符串</span></span>
<span class="code-block-extension-codeLine" data-line-num="36">  <span class="hljs-keyword">const</span> [, expireDesc] = expireTag.<span class="hljs-title function_">getText</span>().<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/\*|\n/g</span>, <span class="hljs-string">''</span>).<span class="hljs-title function_">split</span>(<span class="hljs-string">' '</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="37"></span>
<span class="code-block-extension-codeLine" data-line-num="38">  <span class="hljs-keyword">const</span> expireDate = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(expireDesc).<span class="hljs-title function_">getTime</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="39">  <span class="hljs-keyword">const</span> now = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">getTime</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="40"></span>
<span class="code-block-extension-codeLine" data-line-num="41">  <span class="hljs-comment">// 对比时间</span></span>
<span class="code-block-extension-codeLine" data-line-num="42">  <span class="hljs-keyword">if</span> (expireDate &lt; now) {</span>
<span class="code-block-extension-codeLine" data-line-num="43">    <span class="hljs-keyword">const</span> authorTag = tags.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">tag</span>) =&gt;</span> tag.<span class="hljs-title function_">getTagName</span>() === <span class="hljs-string">'author'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="44">    <span class="hljs-keyword">const</span> [, author] = authorTag</span>
<span class="code-block-extension-codeLine" data-line-num="45">      ? authorTag.<span class="hljs-title function_">getText</span>().<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/\*|\n/g</span>, <span class="hljs-string">''</span>).<span class="hljs-title function_">split</span>(<span class="hljs-string">' '</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="46">      : <span class="hljs-string">'unknown'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="47"></span>
<span class="code-block-extension-codeLine" data-line-num="48">    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="49">      chalk.<span class="hljs-title function_">red</span>(</span>
<span class="code-block-extension-codeLine" data-line-num="50">        <span class="hljs-string">`Function <span class="hljs-subst">${chalk.yellow(</span></span></span>
<span class="code-block-extension-codeLine" data-line-num="51">          func.getName()</span>
<span class="code-block-extension-codeLine" data-line-num="52">        )} is expired, author: <span class="hljs-subst">${chalk.white(author)}</span>`</span>
<span class="code-block-extension-codeLine" data-line-num="53">      )</span>
<span class="code-block-extension-codeLine" data-line-num="54">    );</span>
<span class="code-block-extension-codeLine" data-line-num="55">  }</span>
<span class="code-block-extension-codeLine" data-line-num="56">}</span>
</code></pre>
<p>使用效果是这样的：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/164763d6b99141b9bd6ad40c314b5fe3~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<p>扩展：上面的例子只能基于硬编码的日期进行处理，而另外一种可能的情况是基于版本来做检查，比如某一部分代码应该在 <code>package.json</code> 中的 <code>version</code> 到达 <code>1.0.0</code> 以前被再次优化一遍，不妨来试一下支持这种情况？</p>
<p>以上的示例应该能帮助你领会到，使用 ts-morph 来进行源码检查与操作的窍门。同时你可能注意到了，上面的示例我们封装了不少方法，如 <code>getAllFunctionDeclarations</code>、<code>getClassDeclarations</code>、<code>getImportDeclarations</code> 等，这也是我比较推荐的一种方式：在 ts-morph 上进一步封装 AST 方法，让 AST 操作就像调用 Lodash 方法一样简单。</p>
<h2 data-id="heading-9">总结</h2>
<p>在这一节，我们主要学习了如何使用 TypeScript 的 Compiler API 和 ts-morph 来对 TS 源码进行操作，就像数据库的 CRUD 一样，对源码的常见操作其实也可以被归类为检查、变更、新增这么几类。</p>
<p>对没有系统学习过编译原理的同学，其实更推荐使用 ts-morph 来简化这些 AST 操作。原因上面我们也已经了解到了，ts-morph 通过更符合直觉的 API 封装掉了很多底层的操作，能够大大地简化使用成本与理解负担。</p>
<p>当然，由于封装带来了黑盒的底层实现与各种不确定性，如果你对操作的稳定性要求高，最好的方式还是使用原生的 Compiler API 或 Babel 一点点进行实现。</p>
<p>而通过 TS AST Viewer 的帮助，我们还可以更进一步简化操作。检查 AST 结构、确定目标 AST 结构、执行操作以及保存，就能完成一次处理。</p>
<p>最后，除了本节给到的操作示例，你还可以根据自身的实际需要来探索更多有趣的例子，试着来感受“换一种方式使用 TypeScript”的乐趣吧！</p>
<h2 data-id="heading-10">扩展阅读</h2>
<h3 data-id="heading-11">AST Checker 与 ESLint</h3>
<p>在上面的介绍中，听起来 AST Checker 和 ESLint 很相似，都是检查代码是否符合规则，并且 ESLint 也是通过 AST 来进行检查，如 AST Explorer 中使用 TypeScript ESLint Parser：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81a6a1eea91a40b3ba48dbebc48db056~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<p>然而二者的差异实际上非常大。首先， Lint 不会涉及业务逻辑的检查，比如我们要求对某个 polyfill 的导入必须存在，或者要求必须调用某个全局的顶级方法，此时就应该是 AST Checker 的工作范畴，而非 Lint。Lint 更多关注的是纯粹的、完全不涉及业务逻辑的规则。</p>
<p>另外，Lint 规则的维度通常更高，比如我要求团队内的所有代码库都必须遵守一系列规则。而 AST Checker 的规则通常只是项目维度的，比如只在几个项目内要求遵守这条规则，这也就意味着 AST Checker 的规则不具备或很难具备可推广性。</p></div>
