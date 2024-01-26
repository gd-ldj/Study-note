<div class="markdown-body"><p>这一节，我们来讲解 TypeScript 与 ECMAScript 之间的关系。</p>
<p>首先，我们来理清经常看到的 ES / ECMAScript / TC39 等等概念到底是个啥。然后，一起看看 TypeScript 都提前实现了哪些 ECMAScript 语法，它们怎么用，到底有多好用。最后，在扩展阅读中，我们会聊到更多有趣的、正在进行中的 TC39 提案。要相信，未来的 JavaScript 一定会变得越来越好。</p>
<blockquote>
<p>本节代码见：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flinbudu599%2FTypeScript-Tiny-Book%2Ftree%2Fmain%2Fpackages%2F20-ecmascript" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/linbudu599/TypeScript-Tiny-Book/tree/main/packages/20-ecmascript" ref="nofollow noopener noreferrer">ECMAScript</a></p>
</blockquote>
<h2 data-id="heading-0">ECMAScript 与 TC39</h2>
<p>首先是 ECMAScript 这个单词，虽然 JavaScript 和 Java 没有关系，但 ECMAScript 和 ECMA （正确发音近似于<strong>诶可码</strong>（Script））确实是有关系的。ECMA 的全称是 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.ecma-international.org%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://www.ecma-international.org/" ref="nofollow noopener noreferrer">European Computer Manufacturers Association</a>，即<strong>欧洲计算机制造商协会</strong>。它并不是为了卖货而生的，这一国际组织的存在主要是维护各种计算机的相关标准，从硬件到软件到编程语言等等。</p>
<p>最初创建 JavaScript 这门语言的公司是网景（Netscape），主推产品即为网景浏览器。由于在和微软 IE 的竞争中落得下风，为了避免从此 Web 脚本的主导权从此落入微软手中，在 1996 年，网景将 JavaScript 的标准制定权交给了 ECMA 协会，因此有了 ECMAScript —— 也就是 JavaScript 的语言规范。<strong>而 ECMAScript 并不是一门语言，而是一门规范。</strong> 我们说的 ES5 / ES6 / ESNext 等等概念，实际上指的都是 JavaScript 这门语言规范的新版本。</p>
<p>ECMA 维护着数百条规范，这些规范的领域差异非常大。因此 ECMA 采用技术小组（<strong>Technical Committee，也称为技术委员会</strong>）的方式来管理这个规范，ECMAScript 对应的技术小组即是 TC39。目前 TC39 委员会的绝大部分成员来自于浏览器引擎厂商、互联网巨头公司等等，并且定期召开会议来讨论各个提案的进展。</p>
<p>那么，提案又是什么？首先，ECMAScript 中的新语法并不是委员会成员坐下来开个简单的会就决定引入到 JavaScript 中的。一个新语法必须先从草稿，也就是从提案开始。你可以把新语法想象成一条新法律，得要有人首先提出这条法律能解决目前的某一问题，然后法律专家、法院、国家都要通过，它才能最终被写到法律条文中。在 ECMAScript 中，一个提案被纳入规范要经历 5 个阶段。</p>
<ul>
<li>
<p>stage 0（<strong>strawman</strong>）：任何 TC39 的成员都可以提交。</p>
</li>
<li>
<p>stage 1（<strong>proposal</strong>）：进入此阶段就意味着这一提案被认为是<strong>正式</strong>的了，需要对此提案的场景与API进行详尽描述。要想进入 Stage 1，需要一位 TC39 成员作为负责人（champion）对这个提案具体的<strong>语法、语义和现有语法的冲突风险</strong>都进行详细讨论分析。</p>
</li>
<li>
<p>stage 2（<strong>draft</strong>）：要进入 Stage 2，需要完成<strong>包含提案所有内容的标准文本的初稿</strong>。理论上来说，这一阶段的提案，如果能最终被纳入规范，这之后的阶段中就不会被大改了，只接受增量修改。因为如果要大改，往往需要废弃掉整个提案，让 V2 版本从 Stage 0 开始重新来一遍（有点像删号重开）。</p>
</li>
<li>
<p>stage 3（<strong>candidate</strong>）：这一阶段的提案只有在遇到了重大问题才会修改，需要撰写非常完善的规范文档。进入 Stage 3 的前提条件是在规范文档的基础上，ECMAScript 官方的编辑以及指定 TC39 委员会成员签署了同意意见。通常来说提案进入这一阶段后，我们就能通过 Babel 插件或者各种 Polyfill 等提前试用上。</p>
</li>
<li>
<p>stage 4（<strong>finished</strong>）：这一阶段的提案将会被纳入到 ES 每年发布的规范之中，正式与大家见面。想要完成这最后一步，需要完成所有对应到提案内容的测试用例（用来给引擎产商们检查实现的兼容程度），以及官方编辑同意将其合并到 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fecma262" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/tc39/ecma262" ref="nofollow noopener noreferrer">tc39/ecma262</a> 仓库。</p>
</li>
</ul>
<p>目前 TC39 会议的频率大概是两月一次，并且由于疫情的原因也从线上、线下结合改成了完全线上的模式。上面我们提到的 ecma262，这里的 262 意为 ECMAScript 是 ECMA 维护的第 262 条标准，目前它的最新版本是 2022 年发布的<a href="https://link.juejin.cn?target=https%3A%2F%2F262.ecma-international.org%2F13.0%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://262.ecma-international.org/13.0/" ref="nofollow noopener noreferrer">第 13 版</a>，即 ES2022 或 ES13。当然，各位同学最熟悉的肯定还是 2015 年发布的 ES2015，即 ES6 这一版本。网上很多说法是将 ES2015 后的版本统称为 ES6，我不太认同的原因也就在于此。</p>
<p>说了这么多，想必你现在至少对 ECMAScript 和 TC39 到底是什么、它们的存在意义以及工作方式等等都有了一个大致了解。如果你想了解更多历史故事，我推荐阅读雪碧老师的作品： <a href="https://link.juejin.cn?target=https%3A%2F%2Fcn.history.js.org%2Fpart-1.html" target="_blank" rel="nofollow noopener noreferrer" title="https://cn.history.js.org/part-1.html" ref="nofollow noopener noreferrer">JavaScript 二十年</a>。</p>
<p>那么，ECMAScript 和 TypeScript 的关系又是啥？知道了 ECMAScript 的具体意义就比较好懂了。上面说到一个新语法从提出到最终成为 ECMAScript 的一部分，需要走完漫长的 Stage 0-4，如果这个语法真的究极无敌好用（比如我们下面要说的可选链、空值合并以及装饰器），实在是等不及想用怎么办？</p>
<p>聪明的你一定会想到 Babel，它能够将 ECMAScript 未纳入标准的语法进行降级（或将标准语法按照运行时环境降级），这样我们就可以放心使用未来的新语法，Babel 会帮我们编译好的。而 TypeScript 也支持这么个功能，或者说这就是它的核心功能之一。正如我们在开篇说的那样，TypeScript 其实就是类型能力加上一些新语法，而这些新语法绝大部分都来自于 ECMAScript，并且是在这些语法提案还没正式进入标准时，TypeScript 就对其进行了支持。在编译时，类型标注会直接被抹除，而这些新语法也会按照我们在 <code>tsconfig</code> 中的 <code>target</code> 配置进行对应降级。</p>
<p>那么，有哪些语法享受到了这一待遇？下面我们就来聊一聊 TypeScriptESMAScript 语法，感受一下它们是不是真的如此好用。</p>
<h2 data-id="heading-1">TypeScript 中的 ECMAScript 语法</h2>
<p>目前在 TypeScript 中，已经合入的 ECMAScript 语法主要有这么几个：</p>
<ul>
<li>可选链 Optional Chainning，即 <code>?.</code> 语法。</li>
<li>空值合并 Nullish Coalescing，即 <code>??</code> 语法。</li>
<li>逻辑赋值 Logical Assignment，即 <code>&amp;&amp;=</code>, <code>??=</code> 这一类语法。</li>
<li>装饰器，我们会用两节专门来讲解。</li>
<li>一些新增的方法，如 replaceAll 等。</li>
<li>Class 相关，如基于 <code>#</code> 的私有成员标注等。</li>
</ul>
<p>这篇文章中我们并不关注新增的方法以及 Class 相关语法，因为它们真的就是看一下文档的事。对于这些新增的方法，TypeScript 中可以通过在 <code>tsconfig</code> 的 <code>compilerOptions.lib</code> 配置中新增 <code>es2021</code>（对应的 es 版本）/<code>esnext</code> 来启用这些新的语法，而在 JavaScript 中想要使用则需要运行时支持或者使用 Polyfill（CoreJs，ES-Shims 等）。</p>
<p>对于可选链、空值合并以及逻辑赋值，前两者在 TS 3.7 版本引入，逻辑赋值则在 4.0 版本被引入，它们早在 ECMAScript 2021 就被正式吸收，你现在甚至可以在浏览器控制台使用这几个语法。而装饰器就是比较特殊的一位了，我们会在下一节装饰器一章详细地聊聊它的演进历史。</p>
<p>接下来，我们就来讲一讲可选链、空值合并以及逻辑赋值这三个语法，感受一下这些语法糖到底有多甜。</p>
<h3 data-id="heading-2">可选链 Optional Chainning</h3>
<p>在 JavaScript 中，如果访问一个嵌套多层的属性，为了避免出现 <code>Cannot read property of undefined</code> 这样的错误，我们通常会使用<strong>逻辑与</strong> <code>&amp;&amp;</code> 语法来确保在某一层出现空值时及时短路掉访问：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> inner = obj &amp;&amp; obj.<span class="hljs-property">data</span> &amp;&amp; obj.<span class="hljs-property">data</span>.<span class="hljs-property">innerProperty</span>;</span>
</code></pre>
<p>这种写法虽然丑陋，但它确实能在一定程度上避免对空值的读取，但也只是一定程度上，为什么这么说？</p>
<p>上面的代码看起来很安全，但在某一步访问出现空值时，它返回的是上一步的值，而在属性的读取过程中，我们通常希望的是如果某一环节短路了，那返回一个 undefined 给我就好。否则，如果下面还存在对 <code>inner</code> 进行真值假值判断（<code>if(inner)</code>）的话，反而容易引发 Bug。</p>
<p>另外，逻辑与短路在属性嵌套过深时简直就是噩梦，使用可选链的 <code>?.</code> 语法，我们可以把它改写成这样：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> inner = obj?.<span class="hljs-property">data</span>?.<span class="hljs-property">innerProperty</span>;</span>
</code></pre>
<p>除了更简洁的写法以外，可选链也更符合我们的预期：<strong>它会在短路时返回一个 undefined</strong>。可选链不仅能应用在属性访问，也可以用在计算属性访问以及方法调用上：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">obj?.[expr];</span>
<span class="code-block-extension-codeLine" data-line-num="2">obj?.[++a];</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-comment">// 对应到 obj.func &amp;&amp; obj.func()</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">obj?.<span class="hljs-title function_">func</span>();</span>
</code></pre>
<p>在所有情况下，如果 <code>?.</code> 的左侧发生了短路，那么就会直接停止后续操作，比如不会去运行并计算表达式 <code>expr</code> 以及 <code>++a</code> 。通常可选链和空值合并搭配有奇效，我们继续往下看。</p>
<h3 data-id="heading-3">空值合并 Nullish Coalescing</h3>
<p>如果说可选链是为了取代<strong>逻辑与</strong>（<code>&amp;&amp;</code>），那么空值合并就是为了取代<strong>逻辑或</strong>（<code>||</code>）。而逻辑或的主要使用场景之一就是提供默认值，如：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> foo = someValue || fallbackValue;</span>
</code></pre>
<p>逻辑或会在 <code>||</code> 左边被判断为 false 时，执行右边的逻辑，在这里即是赋值行为。看起来一切好像都很美好，但别忘了，由于 JavaScript 中无处不在的隐式转换，如果 <code>||</code> 左边是 <code>""</code>/ <code>0</code> / <code>false</code>，都会被视为 false（false 虽然是 false，但它也是个值！），而我们希望的是<strong>仅在左边为 undefined 或 null 时，才去应用默认值</strong>。</p>
<p>大部分情况下我们可以直接使用 <code>??</code> 代替 <code>||</code>：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> foo = someValue ?? fallbackValue;</span>
</code></pre>
<p>配合可选链：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> bar = obj?.<span class="hljs-property">a</span>?.<span class="hljs-property">b</span>?.<span class="hljs-title function_">c</span>() ?? fallbackValue;</span>
</code></pre>
<p>空值合并就如它的名字一样，只会对真正意义上的空值（null 与 undefined）进行处理。</p>
<p>而空值合并的语法如此近似于逻辑操作（<code>||</code>, <code>&amp;&amp;</code>），会不会有些基于逻辑操作的语法也能直接套用空值合并？当然可以，不然我们怎么介绍下面的逻辑赋值。</p>
<h3 data-id="heading-4">逻辑赋值 Logical Assignment</h3>
<p>实际上，逻辑赋值是在复合赋值的基础上演进而来（或者说关系一致）的，都是将一个操作符和赋值符号结合在一起。比如我们最常见的复合赋值：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">a = a + b;</span>
<span class="code-block-extension-codeLine" data-line-num="2">a += b;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4">a = a - b;</span>
<span class="code-block-extension-codeLine" data-line-num="5">a -= b;</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7">a = a * b;</span>
<span class="code-block-extension-codeLine" data-line-num="8">a *= b;</span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-comment">// 还有除法运算，就不演示了</span></span>
</code></pre>
<p>复合赋值其实就是先执行操作，再将操作结果赋值给左边的变量。如 <code>a += b</code> 就是执行 <code>a + b</code>，然后将结果赋值给 <code>a</code>。</p>
<p>而逻辑赋值也是一样：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">a = a || b;</span>
<span class="code-block-extension-codeLine" data-line-num="2">a ||= b;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4">a = a &amp;&amp; b;</span>
<span class="code-block-extension-codeLine" data-line-num="5">a &amp;&amp;= b;</span>
</code></pre>
<p>类比一下，逻辑赋值就是<strong>先执行逻辑操作，然后将结果赋值给左边的变量</strong>。这一语法其实在实际开发中有奇效，如 <code>a ||= b</code> 其实可以替代掉以下这段代码：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">if</span>(!a) a = b;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-comment">// 或者</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">a = a ? a : b;</span>
</code></pre>
<p>既然逻辑操作符可以，那没道理我空值合并不行，毕竟我们长得这么像：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">a = a ?? b;</span>
<span class="code-block-extension-codeLine" data-line-num="2">a ??=b;</span>
</code></pre>
<p>这个时候为了区分逻辑赋值，我们可以称其为<strong>短路赋值</strong>。短路赋值在一些需要懒初始化的场景中非常好用，比如：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">let</span> <span class="hljs-attr">arr</span>: <span class="hljs-built_in">string</span>[];</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3">(arr ??= []).<span class="hljs-title function_">push</span>(<span class="hljs-string">"linbudu"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-comment">// 等价于以下这段</span></span>
<span class="code-block-extension-codeLine" data-line-num="6">arr = arr ?? []; <span class="hljs-comment">// 假设 arr 有可能在多处被初始化</span></span>
<span class="code-block-extension-codeLine" data-line-num="7">arr.<span class="hljs-title function_">push</span>(<span class="hljs-string">"linbudu"</span>);</span>
</code></pre>
<p>同样，秉持着“一点一点精通 TypeScript ”的思路，我仍然推荐你在学习完本节后，使用可选链、空值合并以及短路赋值来替换部分老项目中的代码，并且在未来遇到短路与默认值场景时首先考虑这三位新同学。</p>
<h2 data-id="heading-5">总结与预告</h2>
<p>这一节，我们了解了让人傻傻分不清楚的 ECMAScript、TypeScript、TC39 等概念之间的联系与实际意义，认识了三位对你来说或许是首次见面的新朋友：可选链、空值合并以及短路赋值。从现在开始，你可以在接下来的项目开发中不断提醒自己去使用它们，毕竟，兼得更简洁的语法以及更安全的逻辑，有谁会拒绝呢？</p>
<p>在下一节，我们会用很长的篇幅来聊聊 TypeScript 中的装饰器，从演进到了解、从原理到熟悉，最后来写一个你自己的依赖注入容器，让这些高大上的概念彻底为你所用。</p>
<h2 data-id="heading-6">扩展阅读</h2>
<h3 data-id="heading-7">演进中的 TC39 提案</h3>
<p>除了我们上面讲到的可选链、空值合并，以及大家都至少听说过的装饰器以外，还有许多演进中的 TC39 提案，我们可以简单归类为语法糖、新的内置方法、新的 API等。在了解完本篇的核心内容以后，我们不妨来瞅几个有意思的提案，看看未来的 JavaScript 可能会是什么样的？</p>
<blockquote>
<p>以下介绍的提案状态均以本文写作时（2022-06-29，最近一次 TC39 会议为 2022 年 6 月召开）为准。另外，如果你想了解更多提案，可以阅读我此前的文章：<a href="https://juejin.cn/post/6974330720994983950" target="_blank" title="https://juejin.cn/post/6974330720994983950">聊一聊进行中的TC39提案（stage1/2/3）</a>。</p>
</blockquote>
<h4 data-id="heading-8">Record 和 Tuple：内置的不可变数据类型（Stage 2）</h4>
<p>Record 与 Tuple 为 JavaScript 中引入了两个新的<strong>原始</strong>数据类型，分别对应到对象与数组（差异仅仅是声明时多了个 <code>#</code>）：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// Record</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">const</span> proposal = #{</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-attr">id</span>: <span class="hljs-number">1234</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">title</span>: <span class="hljs-string">"Record &amp; Tuple proposal"</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-attr">contents</span>: <span class="hljs-string">`...`</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-attr">keywords</span>: #[<span class="hljs-string">"ecma"</span>, <span class="hljs-string">"tc39"</span>, <span class="hljs-string">"proposal"</span>, <span class="hljs-string">"record"</span>, <span class="hljs-string">"tuple"</span>],</span>
<span class="code-block-extension-codeLine" data-line-num="7">};</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-comment">// Tuple</span></span>
<span class="code-block-extension-codeLine" data-line-num="11"><span class="hljs-keyword">const</span> measures = #[<span class="hljs-number">42</span>, <span class="hljs-number">12</span>, <span class="hljs-number">67</span>, <span class="hljs-string">"measure error: foo happened"</span>];</span>
</code></pre>
<p>注意，它们是原始类型，也就是说是按值比较而非对象那样按引用地址比较的。即 <code>#[1,2,3] === #[1,2,3]</code>，<code>#{ foo: "bar" } === #{ foo: "bar" }</code> 都是成立的。</p>
<p>这一提案自从在 2020 年 7 月会议上进入到 Stage 2 后，在后续直到最近的会议中，都一直没有取得进一步进展。原因之一即是这是两个全新的数据类型，它们的实现成本对于浏览器引擎产商来说是较高的。</p>
<h4 data-id="heading-9">面向表达式的 Do Expression 与 Throw Expression（Stage 1）</h4>
<p>在 TC39 中，有相当一部分提案实际上有着函数式编程的理念背景，很难说这对 JavaScript 开发者来说是否是刚需，但它们确实能带给你另一种截然不同的编程范式。</p>
<p>这一提案的理念背景是函数式编程中的面向表达式（Expression-Oriented）语法，它长这个样子：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment">// do expression</span></span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">let</span> x = <span class="hljs-keyword">do</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-keyword">let</span> tmp = <span class="hljs-title function_">f</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="4">  tmp * tmp + <span class="hljs-number">1</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">};</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">let</span> y = <span class="hljs-keyword">do</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">foo</span>()) { <span class="hljs-title function_">f</span>() }</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-title function_">bar</span>()) { <span class="hljs-title function_">g</span>() }</span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-keyword">else</span> { <span class="hljs-title function_">h</span>() }</span>
<span class="code-block-extension-codeLine" data-line-num="11">};</span>
<span class="code-block-extension-codeLine" data-line-num="12"></span>
<span class="code-block-extension-codeLine" data-line-num="13"><span class="hljs-comment">// async do expression</span></span>
<span class="code-block-extension-codeLine" data-line-num="14"><span class="hljs-keyword">async</span> <span class="hljs-keyword">do</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="15">  <span class="hljs-keyword">await</span> <span class="hljs-title function_">readFile</span>(<span class="hljs-string">'in.txt'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="16">  <span class="hljs-keyword">let</span> query = <span class="hljs-keyword">await</span> <span class="hljs-title function_">ask</span>(<span class="hljs-string">'???'</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="17">  <span class="hljs-comment">// etc</span></span>
<span class="code-block-extension-codeLine" data-line-num="18">}</span>
<span class="code-block-extension-codeLine" data-line-num="19"></span>
<span class="code-block-extension-codeLine" data-line-num="20"></span>
<span class="code-block-extension-codeLine" data-line-num="21"><span class="hljs-comment">// throw expression</span></span>
<span class="code-block-extension-codeLine" data-line-num="22"><span class="hljs-keyword">function</span> <span class="hljs-title function_">getEncoder</span>(<span class="hljs-params">encoding</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="23">  <span class="hljs-keyword">const</span> encoder = encoding === <span class="hljs-string">"utf8"</span> ? <span class="hljs-keyword">new</span> <span class="hljs-title class_">UTF8Encoder</span>() </span>
<span class="code-block-extension-codeLine" data-line-num="24">                : encoding === <span class="hljs-string">"utf16le"</span> ? <span class="hljs-keyword">new</span> <span class="hljs-title class_">UTF16Encoder</span>(<span class="hljs-literal">false</span>) </span>
<span class="code-block-extension-codeLine" data-line-num="25">                : encoding === <span class="hljs-string">"utf16be"</span> ? <span class="hljs-keyword">new</span> <span class="hljs-title class_">UTF16Encoder</span>(<span class="hljs-literal">true</span>) </span>
<span class="code-block-extension-codeLine" data-line-num="26">                : <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">"Unsupported encoding"</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="27">}</span>
</code></pre>
<p>很明显，这种语法能够帮助我们更好地组织代码与逻辑块的结构。但由于其毕竟带来了新的编程理念与语法，目前提案进度感人（其异步版本 async do expression 甚至还没有开始推进）。</p>
<h4 data-id="heading-10">响应式编程与Observable（Stage 1）</h4>
<p>如果你了解过 RxJs，那么肯定马上就 get 到了这个提案想要干啥。<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-observable" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/tc39/proposal-observable" ref="nofollow noopener noreferrer">proposal-observable</a> 这一提案尝试引入原生的 Observable 支持，你可以简单理解为这是用于处理较复杂异步场景的神器。但是，如果不是工作中确实需要处理复杂的异步场景，我个人并不推荐去深入学习 Observable 与 RxJs 相关的概念，简单了解即可。原因则是如果你没有实战场景，那么基本上对于 RxJs 的海量 API 只能抓瞎，或者学完之后很快就忘干净了（就像我一样）。</p>
<p>回到这个提案，它引入了部分 RxJs 中的核心概念，除 Observable 外还有 Observer、Subscriber 以及部分 Operators（目前只有 of、from 等基础的操作符）。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">listen</span>(<span class="hljs-params">element, eventName</span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="2">    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Observable</span>(<span class="hljs-function"><span class="hljs-params">observer</span> =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="3">        <span class="hljs-keyword">let</span> <span class="hljs-title function_">handler</span> = event =&gt; observer.<span class="hljs-title function_">next</span>(event);</span>
<span class="code-block-extension-codeLine" data-line-num="4">        element.<span class="hljs-title function_">addEventListener</span>(eventName, handler, <span class="hljs-literal">true</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="5">        <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">            element.<span class="hljs-title function_">removeEventListener</span>(eventName, handler, <span class="hljs-literal">true</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="7">        };</span>
<span class="code-block-extension-codeLine" data-line-num="8">    });</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
</code></pre>
<h4 data-id="heading-11">函数式理念的进一步发展</h4>
<p>如果你对面向表达式的语法感到兴趣，那么我想下面这几个函数式操作符相关的提案也会引起你的关注。如果你想详细了解它们的使用与差异，可以阅读笔者此前的文章：<a href="https://link.juejin.cn?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FFQiHCs0o8dJF3PSIJVwcXQ" target="_blank" rel="nofollow noopener noreferrer" title="https://mp.weixin.qq.com/s/FQiHCs0o8dJF3PSIJVwcXQ" ref="nofollow noopener noreferrer">你应该了解的 ECMAScript 函数操作符相关提案的最新进展</a>。</p>
<p>首先是 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-pipeline-operator" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/tc39/proposal-pipeline-operator" ref="nofollow noopener noreferrer">Pipeline Operator, proposal-pipeline-operator</a>，它引入了 <code>|&gt;</code> 语法来实现数据流编程的范式，如以下的 JavaScript 代码：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">function</span> <span class="hljs-title function_">one</span> () { <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; }</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">function</span> <span class="hljs-title function_">double</span> (x) { <span class="hljs-keyword">return</span> x * <span class="hljs-number">2</span>; }</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">let</span> _;</span>
<span class="code-block-extension-codeLine" data-line-num="5">_ = <span class="hljs-title function_">one</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="6">_ = <span class="hljs-title function_">double</span>(_);</span>
<span class="code-block-extension-codeLine" data-line-num="7">_ = <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>().<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(_));</span>
</code></pre>
<p>使用 Pipeline Operator ，我们能将以上代码改写为这样：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">let</span> _;</span>
<span class="code-block-extension-codeLine" data-line-num="2">_ = <span class="hljs-title function_">one</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="3">  |&gt; <span class="hljs-title function_">double</span>(%)</span>
<span class="code-block-extension-codeLine" data-line-num="4">  |&gt; <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>().<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span></span>
<span class="code-block-extension-codeLine" data-line-num="5">    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(%));</span>
</code></pre>
<p>其中，<code>%</code> 表示上一个操作单元返回的值。</p>
<p>类似于 Pipeline Operator，<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fjs-choi%2Fproposal-function-pipe-flow" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/js-choi/proposal-function-pipe-flow" ref="nofollow noopener noreferrer">Function Pipe/Flow, proposal-function-pipe-flow</a> 提案引入了两个 Function 对象上的系列方法：<code>pipe</code>/<code>pipeAsync</code> 与 <code>flow</code>/<code>flowAsync</code>。</p>
<p>其中，<code>Function.pipe</code> 接受一个输入值与一系列的一元函数，并从第一个一元函数开始，将上一次的调用结果传给下一个一元函数作为参数。<code>Function.pipe</code> 会在原地执行这些一元函数：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> { pipe } = <span class="hljs-title class_">Function</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-title function_">pipe</span>(<span class="hljs-number">5</span>, f0, f1, f2); <span class="hljs-comment">// 等同于 f2(f1(f0(5)))</span></span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-title function_">pipe</span>(<span class="hljs-number">5</span>); <span class="hljs-comment">// 等同于 5</span></span>
</code></pre>
<p>另一个系列 <code>Function.flow</code>，它接受一系列函数并组合成一个新的高阶函数，同时仍然保持传入的调用顺序。<code>Function.flow</code> 并不会立即执行这些一元函数，而是返回一个新的函数（类似于 <code>Lodash.flow</code>）。</p>
<p>对于首个函数，它可以是任意元函数（有任意个参数），而对于余下的函数都必须是一元函数。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">javascript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-javascript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">const</span> { flow } = <span class="hljs-title class_">Function</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> f = <span class="hljs-title function_">flow</span>(f0, f1, f2);</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-comment">// 等同于 f = (...args) =&gt; f2(f1(f0(...args)))</span></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-title function_">f</span>(<span class="hljs-number">5</span>, <span class="hljs-number">7</span>); </span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">const</span> g = <span class="hljs-title function_">flow</span>(g0);</span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-comment">// 等同于 g = (...args) =&gt; g0(...args)</span></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-title function_">g</span>(<span class="hljs-number">5</span>, <span class="hljs-number">7</span>);</span>
</code></pre>
<p>而 pipeAsync、flowAsync 则分别是它们的异步版本，即应用对象变成了异步函数，这里不再赘述。</p>
<p>这两个提案都代表了数据流编程的理念，<strong>数据流编程（Dataflow Programming）</strong> 将程序拆分为数个独立的操作单元，而数据在操作单元间以有向图的形式流转，程序设计关注的重点在于动态的数据。想象流水线上的玩具，经过一个个工人手中后，一个木头架子依次被装上了四肢、脑袋、眼睛、开关...，这其实就是数据流在一个个独立单元之间的流动。而在数据流编程中，实际上我们关注的也是如何建立这个数据流转关系，包括需要存在的程序单元（函数）与程序执行的先后次序等。</p>
<h3 data-id="heading-12">TC39 中的类型提案</h3>
<p>在 2022 年 3 月会议中，由 TypeScript 团队推进的 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-type-annotations" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/tc39/proposal-type-annotations" ref="nofollow noopener noreferrer">Type Annotations</a> 也成功进入到 Stage1，这一提案的目的是引入和 TypeScript 中一样，会在编译时被擦除的类型标注，其语法也和 TypeScript 基本一致：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Foo</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"foo"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> * <span class="hljs-keyword">as</span> <span class="hljs-title class_">Bar</span> <span class="hljs-keyword">from</span> <span class="hljs-string">"bar"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">let</span> <span class="hljs-attr">x</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="5">x = <span class="hljs-string">"hello"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6">x = <span class="hljs-number">100</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-keyword">function</span> <span class="hljs-title function_">equals</span>(<span class="hljs-params">x: <span class="hljs-built_in">number</span>, y?: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">boolean</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="9">    <span class="hljs-keyword">return</span> x === y;</span>
<span class="code-block-extension-codeLine" data-line-num="10">}</span>
<span class="code-block-extension-codeLine" data-line-num="11"></span>
<span class="code-block-extension-codeLine" data-line-num="12"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Person</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="13">    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="14">    <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="15">}</span>
<span class="code-block-extension-codeLine" data-line-num="16"></span>
<span class="code-block-extension-codeLine" data-line-num="17"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">CoolBool</span> = <span class="hljs-built_in">boolean</span>;</span>
</code></pre>
<p>这一提案其实也支持了泛型，但就目前来看，泛型还是过于激进了，可能会在后续拆分成独立的提案进行独立地迭代。另外，此提案目前不包括涉及到运行时代码（枚举，namespace 等）的功能，因为它真的就<strong>只是想引入编译时擦除类型</strong>。</p>
<p>我个人对于这一提案其实是持支持态度的，因为 TypeScript 其实就包含类型和新的 ECMAScript 语法两个部分，对应到编译时就是类型擦除和语法降级（类似 Babel）。随着浏览器等运行时对 ECMAScript 语法的支持越来越好，语法降级功能不再是刚需，那就只剩下类型擦除了。如果这一提案能够持续推进，成为语法降级的一部分，甚至运行时也直接原生支持此语法，那我觉得简直不要太美丽。当然，类型语法肯定是可选的，所以我们还是随时可以回到无拘无束的 JavaScript。</p></div>
