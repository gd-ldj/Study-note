<div class="markdown-body"><p>在这一节，我们会使用 TypeScript 来开发一个 Node API，并将它部署在服务器上。技术选型方面，我们使用 <a href="https://link.juejin.cn?target=https%3A%2F%2Fdocs.nestjs.com%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://docs.nestjs.com/" ref="nofollow noopener noreferrer">NestJs</a> 作为框架，<a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.prisma.io%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://www.prisma.io/" ref="nofollow noopener noreferrer">Prisma</a> 作为 ORM，<a href="https://link.juejin.cn?target=https%3A%2F%2Fdashboard.heroku.com%2Fapps" target="_blank" rel="nofollow noopener noreferrer" title="https://dashboard.heroku.com/apps" ref="nofollow noopener noreferrer">Heroku</a> 作为部署平台与数据库提供商。</p>
<p>需要说明的是，我们要开发的 API 并不会十分完善。一方面，过多的 CRUD 代码并没有教学意义。另一方面，如果要完整开发一个生产可用的 API ，可能还需要再写一本小册才行。</p>
<p>那你可能会问，上面说的工具我都不了解怎么办呀？比较友好的一点是，你不需要对这几个工具非常了解，因为我们会分别介绍相应的前置知识。更加友好的是，你也不需要有自己的服务器与数据库，Heroku 已经帮我们准备好了。</p>
<p>但你仍然需要有基本的 NodeJs 使用经验，至少使用 Express / Koa 进行过基本的 API 开发，以及了解数据库、ORM 的基本知识。</p>
<blockquote>
<p>本节代码见：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flinbudu599%2Ftiny-book-blog-api" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/linbudu599/tiny-book-blog-api" ref="nofollow noopener noreferrer">Blog API</a></p>
</blockquote>
<h2 data-id="heading-0">Heroku 环境配置</h2>
<p>在正式开始前，我们不妨提前配置好 Heroku 的环境，因为这一步耗时比较久，我们可以让它在一边安装，先开始下面的学习。</p>
<p>在终端运行以下命令：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-comment"># 适用于 Mac，需要安装 HomeBrew</span></span>
<span class="code-block-extension-codeLine" data-line-num="2">brew tap heroku/brew &amp;&amp; brew install heroku</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-comment"># 或者使用这个命令</span></span>
<span class="code-block-extension-codeLine" data-line-num="4">curl https://cli-assets.heroku.com/install.sh | sh</span>
</code></pre>
<blockquote>
<p>关于其他安装方式，参考 <a href="https://link.juejin.cn?target=https%3A%2F%2Fdevcenter.heroku.com%2Farticles%2Fheroku-cli" target="_blank" rel="nofollow noopener noreferrer" title="https://devcenter.heroku.com/articles/heroku-cli" ref="nofollow noopener noreferrer">Heroku CLI</a> 。</p>
</blockquote>
<h2 data-id="heading-1">NestJS 基础</h2>
<p>接下来，我们来了解 NestJs 的基础概念。</p>
<p>NestJs 是一个 NodeJs 框架，它和 Express、Koa、Egg 的主要区别其实就两点，<strong>应用风格</strong>与<strong>框架能力</strong>。</p>
<p>我们先来说应用风格。NestJs 中大量地使用了装饰器以及依赖注入（IoC &amp; DI）相关的理念，这一点官方团队自谦是受到了 Angular 的启发。而这也就意味着，在开发规模较大的项目时，Nest 也能够很好地保持项目间各个模块的引用关系清晰解耦，而 Express、Koa 其实随着项目规模的不断扩大，会需要开发者更有意识去进行依赖关系的维护。</p>
<p>而框架能力其实也是许多团队与企业在技术选型时的重要参考因素。在这一点上，就像 Angular 内置了路由、请求、表单、校验、SSR 等能力，是一个真正意义上的“全家桶”。Nest 也是如此，官方团队基本上已经把 95% 以上的能力都提供完毕，包括 ORM 的集成（<code>@nestjs/mongoose</code>, <code>@nestjs/typeorm</code>）、消息队列（<code>@nestjs/bull</code>）、Open API（<code>@nestjs/swagger</code>）、鉴权（<code>@nestjs/passport</code>）、GraphQL  （<code>@nestjs/graphql</code>, <code>@nestjs/apollo</code> ）等等。在大部分情况下，这些能力以及附带的详细文档就能很好地满足你的需求。</p>
<p>当然，没有事物是十全十美的。我个人认为 Nest 不友好的地方在于，新手可能需要一些时间才能理解其模块作用域与依赖各种关系，imports、provides、providers、exports 等概念确实不是很好理解。</p>
<p>既然说基础了，那我们还是要介绍一下基本使用代码，这段代码我们在装饰器一节中已经很熟悉了：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Controller</span>, <span class="hljs-title class_">Get</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@nestjs/common'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-meta">@Controller</span>(<span class="hljs-string">'cats'</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">CatsController</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-meta">@Get</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-title function_">findAll</span>(): <span class="hljs-built_in">string</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="7">    <span class="hljs-keyword">return</span> <span class="hljs-string">'This action returns all cats'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8">  }</span>
<span class="code-block-extension-codeLine" data-line-num="9">}</span>
</code></pre>
<p>本质上 Nest 也就是一个 Node API 框架，因此完全没必要在初次接触时就做深入了解，等我们用到的时候再学，才不会被劝退。</p>
<p>我们先新建好项目：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">npm i @nestjs/cli -g</span>
<span class="code-block-extension-codeLine" data-line-num="2">nest new &lt;application&gt;</span>
</code></pre>
<p>初始的目录结构是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">project</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── src</span>
<span class="code-block-extension-codeLine" data-line-num="3">├──── app.controller.ts</span>
<span class="code-block-extension-codeLine" data-line-num="4">├──── app.module.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">├──── app.service.ts</span>
<span class="code-block-extension-codeLine" data-line-num="6">├──── main.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">├── package.json</span>
<span class="code-block-extension-codeLine" data-line-num="8">├── nest-cli.json</span>
<span class="code-block-extension-codeLine" data-line-num="9">└── tsconfig.json</span>
</code></pre>
<p>我们来简单介绍一下重要文件的功能，更好地了解 NestJs 的开发风格。</p>
<ul>
<li>
<p><code>app.controller.ts</code>，即 API 路由的定义文件，我们在这里去定义 <code>GET /user/list</code> <code>POST /user/add</code> 这样的请求处理逻辑。需要注意的是，在 Nest 应用中我们一般不会在 Controller 中去处理业务逻辑，Controller 通常只会处理请求入参的校验、请求响应的包装，具体的业务逻辑来自于 <code>app.service.ts</code>。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Controller</span>, <span class="hljs-title class_">Get</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@nestjs/common'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">AppService</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.service'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-meta">@Controller</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AppController</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> <span class="hljs-keyword">readonly</span> appService: AppService</span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-meta">@Get</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-title function_">getHello</span>(): <span class="hljs-built_in">string</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="10">    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">appService</span>.<span class="hljs-title function_">getHello</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="11">  }</span>
<span class="code-block-extension-codeLine" data-line-num="12">}</span>
</code></pre>
</li>
<li>
<p><code>app.service.ts</code>，我们在 Service 层去处理数据库交互、BFF、日志等等的逻辑，然后供 Controller 层来调用。这并不意味着 Controller 中有一个 UpdateUser 处理方法，那么 Service 层中也要有专门的 UpdateUser 方法。更好的方式是将 Service 拆得更细一些，如 UpdateUser 需要依次调用 QueryUser （检查当前用户是否存在）、CheckUserMutationAvaliable （当前用户是否被允许进行信息更新）、UpdateUser （更新用户）、NoticeUserFollowerUpdate （提醒用户的粉丝发生了资料更新）等等数个细粒度的 Service 。这样一来，在未来新增 Controller 时，你只需要重新按照逻辑组装 Service 即可，而不需要再完全重写一个功能大半相似的。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Injectable</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@nestjs/common'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-meta">@Injectable</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AppService</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-title function_">getHello</span>(): <span class="hljs-built_in">string</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">    <span class="hljs-keyword">return</span> <span class="hljs-string">'Hello World!'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7">  }</span>
<span class="code-block-extension-codeLine" data-line-num="8">}</span>
</code></pre>
</li>
<li>
<p><code>app.module.ts</code>，这一文件是应用的核心文件，我们需要这一模块才能在 <code>main.ts</code> 中去启动应用。在实际开发中，可能会有多个 <code>.module.ts</code> 文件来实现对业务逻辑的模块拆分，如 <code>user.module.ts</code>、<code>upload.module.ts</code> 等。同时，在这个文件内我们会定义属于这一模块的 Controller 与 Service ，别的模块可以通过导入这个模块来使用内部的 Service ，而不是直接导入 Service 造成模块间的混乱引用。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Module</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@nestjs/common'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">AppController</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.controller'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">AppService</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.service'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-meta">@Module</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-attr">imports</span>: [],</span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-attr">controllers</span>: [<span class="hljs-title class_">AppController</span>],</span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-attr">providers</span>: [<span class="hljs-title class_">AppService</span>],</span>
<span class="code-block-extension-codeLine" data-line-num="9">})</span>
<span class="code-block-extension-codeLine" data-line-num="10"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AppModule</span> {}</span>
</code></pre>
</li>
<li>
<p><code>main.ts</code>，最终启动的入口文件，在这里我们定义全局级别的应用配置。</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">NestFactory</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@nestjs/core'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">AppModule</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.module'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">import</span> chalk <span class="hljs-keyword">from</span> <span class="hljs-string">'chalk'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">bootstrap</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">await</span> <span class="hljs-title class_">NestFactory</span>.<span class="hljs-title function_">create</span>(<span class="hljs-title class_">AppModule</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">listen</span>(<span class="hljs-number">3000</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="8">}</span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-title function_">bootstrap</span>();</span>
</code></pre>
</li>
</ul>
<p>项目中文件的基本功能就介绍到这里，在扩展阅读部分，我们还会介绍 NestJs 应用中两种不同的目录结构组织方式，如果你感兴趣可以去读一下。接下来，我们来了解本节应用中的另一个重要部分：Prisma ORM。</p>
<h2 data-id="heading-2">Prisma 基础</h2>
<p><a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.prisma.io%2F" target="_blank" rel="nofollow noopener noreferrer" title="https://www.prisma.io/" ref="nofollow noopener noreferrer">Prisma</a> 是一个“比较特殊”的 ORM，为什么这么说呢？我们知道，ORM 库（Object-Relational Mapping），其实就是编程语言到 SQL 的映射，也就是说，我们无需学习 SQL 的使用，直接用最熟悉的代码调用方法，即可与数据库进行交互。</p>
<p>而 NodeJs 中的 ORM 目前基本都是通过 js / ts 文件进行定义的，比如 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fsequelize%2Fsequelize" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/sequelize/sequelize" ref="nofollow noopener noreferrer">Sequelize</a>、<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypeorm%2Ftypeorm" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/typeorm/typeorm" ref="nofollow noopener noreferrer">TypeORM</a> 等，均是通过面向对象的方式进行数据库实体的定义：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Entity</span>, <span class="hljs-title class_">PrimaryGeneratedColumn</span>, <span class="hljs-title class_">Column</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"typeorm"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-meta">@Entity</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">User</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-meta">@PrimaryGeneratedColumn</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-meta">@Column</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-attr">firstName</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-meta">@Column</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-attr">lastName</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13"></span>
<span class="code-block-extension-codeLine" data-line-num="14">  <span class="hljs-meta">@Column</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="15">  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="16">}</span>
</code></pre>
<p>这就是 Prisma 最特殊的一点，它使用自己的 SDL（Schema Define Language，也可以说是 DSL ，Domain-Specified Language）来声明一个实体：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">// This is your Prisma schema file,</span>
<span class="code-block-extension-codeLine" data-line-num="2">// learn more about it in the docs: https://pris.ly/d/prisma-schema</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4">generator client {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  provider = "prisma-client-js"</span>
<span class="code-block-extension-codeLine" data-line-num="6">  // output   = "./client"</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9">datasource db {</span>
<span class="code-block-extension-codeLine" data-line-num="10">  provider = "postgresql"</span>
<span class="code-block-extension-codeLine" data-line-num="11">  url      = env("DATABASE_URL")</span>
<span class="code-block-extension-codeLine" data-line-num="12">}</span>
<span class="code-block-extension-codeLine" data-line-num="13"></span>
<span class="code-block-extension-codeLine" data-line-num="14">model Article {</span>
<span class="code-block-extension-codeLine" data-line-num="15">  id          Int     @id @default(autoincrement())</span>
<span class="code-block-extension-codeLine" data-line-num="16">  title       String?</span>
<span class="code-block-extension-codeLine" data-line-num="17">  description String  @default("这篇文章还没有介绍...")</span>
<span class="code-block-extension-codeLine" data-line-num="18">  content     String</span>
<span class="code-block-extension-codeLine" data-line-num="19">}</span>
</code></pre>
<p>如在上面的例子中，我们在 <code>schema.prisma</code> 中使用 Prisma 自己定义的语法来进行描述，可以在 VS Code 中安装扩展来获得语法高亮：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b56cff57141f44c49b0143a7dee88043~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="imaged37616c085b20456.png" loading="lazy" class="medium-zoom-image"></p>
<p>而不论是用编程语言还是 SDL 来描述数据库实体，都需要有转换到 SQL 的这一步。在传统 ORM 中这一步实时进行，在你调用 <code>user.find()</code> 时动态地进行转换。而在 Prisma 中，这一步则要特殊一些。</p>
<p>我们在实践中熟悉，首先在项目内初始化 prisma：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">npx prisma init</span>
</code></pre>
<p>它会为你创建 <code>prisma/schema.prisma</code>、<code>.env</code> 文件，我们还需要安装对应的依赖：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">npm i prisma -g</span>
<span class="code-block-extension-codeLine" data-line-num="2">npm i @prisma/client --save-dev</span>
</code></pre>
<p>在这里，prisma 是 Prisma CLI，而 <code>@prisma/client</code> 则是其运行时所需的依赖。</p>
<p>在 <code>.env</code> 文件中定义了我们的数据库地址，Prisma 支持基本上所有的主流数据库。后面我们会使用免费的 Heroku 数据库，现在保持不动即可。</p>
<p>我们先将最终的 Schema 部分填入，然后来解释其中的语法：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">generator client {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  provider = "prisma-client-js"</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5">datasource db {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  provider = "postgresql"</span>
<span class="code-block-extension-codeLine" data-line-num="7">  url      = env("DATABASE_URL")</span>
<span class="code-block-extension-codeLine" data-line-num="8">}</span>
<span class="code-block-extension-codeLine" data-line-num="9"></span>
<span class="code-block-extension-codeLine" data-line-num="10">model Tag {</span>
<span class="code-block-extension-codeLine" data-line-num="11">  id          String    @id @default(cuid())</span>
<span class="code-block-extension-codeLine" data-line-num="12">  name        String</span>
<span class="code-block-extension-codeLine" data-line-num="13">  description String?</span>
<span class="code-block-extension-codeLine" data-line-num="14">  Article     Article[]</span>
<span class="code-block-extension-codeLine" data-line-num="15">}</span>
<span class="code-block-extension-codeLine" data-line-num="16"></span>
<span class="code-block-extension-codeLine" data-line-num="17">model Category {</span>
<span class="code-block-extension-codeLine" data-line-num="18">  id          String    @id @default(cuid())</span>
<span class="code-block-extension-codeLine" data-line-num="19">  name        String</span>
<span class="code-block-extension-codeLine" data-line-num="20">  description String?</span>
<span class="code-block-extension-codeLine" data-line-num="21">  Article     Article[]</span>
<span class="code-block-extension-codeLine" data-line-num="22">}</span>
<span class="code-block-extension-codeLine" data-line-num="23"></span>
<span class="code-block-extension-codeLine" data-line-num="24">model Article {</span>
<span class="code-block-extension-codeLine" data-line-num="25">  id          Int     @id @default(autoincrement())</span>
<span class="code-block-extension-codeLine" data-line-num="26">  title       String?</span>
<span class="code-block-extension-codeLine" data-line-num="27">  description String  @default("这篇文章还没有介绍...")</span>
<span class="code-block-extension-codeLine" data-line-num="28">  content     String</span>
<span class="code-block-extension-codeLine" data-line-num="29"></span>
<span class="code-block-extension-codeLine" data-line-num="30">  visible     Boolean @default(true)</span>
<span class="code-block-extension-codeLine" data-line-num="31"></span>
<span class="code-block-extension-codeLine" data-line-num="32">  tag      Tag[]</span>
<span class="code-block-extension-codeLine" data-line-num="33">  category Category[]</span>
<span class="code-block-extension-codeLine" data-line-num="34"></span>
<span class="code-block-extension-codeLine" data-line-num="35">  createdAt DateTime @default(now())</span>
<span class="code-block-extension-codeLine" data-line-num="36">  updatedAt DateTime @default(now())</span>
<span class="code-block-extension-codeLine" data-line-num="37">}</span>
<span class="code-block-extension-codeLine" data-line-num="38"></span>
<span class="code-block-extension-codeLine" data-line-num="39"></span>
</code></pre>
<p>首先，<code>generator client</code> 这个部分定义了我们的项目类型与一些 Prisma 配置，既然 Prisma 专门搞了新的 SDL 作为实体声明，那它肯定不会只支持 JavaScript。这里我们将 <code>provider</code> 配置为 <code>prisma-client-js</code>，在后面转换一步时，它就会生成 JS 代码，你才能调用它。<code>datasource db</code> 则定义了数据库的类型与地址，这里我们使用 <code>env()</code> 函数从环境变量中注入定义。</p>
<p>下面的 model 部分就是数据库的实体定义了，我们定义了 Article、Tag、Category 三个实体，在 Prisma Schema 中内置了一些特殊语法与函数，如 <code>@id</code> 将这一列标记为主键，<code>@default(autoincrement())</code> 意为使用自增主键作为默认值，<code>@default(now())</code> 意为使用创建/修改时的日期作为默认值。</p>
<p>在 Prisma Schema 中我们可以用非常自然的方式声明关联：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">model Tag {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  Article     Article[]</span>
<span class="code-block-extension-codeLine" data-line-num="3">}</span>
<span class="code-block-extension-codeLine" data-line-num="4"></span>
<span class="code-block-extension-codeLine" data-line-num="5">model Category {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  Article     Article[]</span>
<span class="code-block-extension-codeLine" data-line-num="7">}</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9">model Article {</span>
<span class="code-block-extension-codeLine" data-line-num="10">  tag      Tag[]</span>
<span class="code-block-extension-codeLine" data-line-num="11">  category Category[]</span>
<span class="code-block-extension-codeLine" data-line-num="12">}</span>
</code></pre>
<p>实际上我们就是声明了 Article-Tag、Article-Category 这两对<strong>多对多</strong>的级联关系。接着，我们来体验下转换，执行以下命令：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">bash</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-bash code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">prisma generate</span>
</code></pre>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fde89e7ee8541abbc8695851de1d471~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="imagea1dd0f09cd0c6303.png" loading="lazy" class="medium-zoom-image"></p>
<p>这里的 Prisma Client 会被生成到 <code>node_modules/@prisma/client</code> 下：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce733ab100514fb8ac4bce6f17c3601d~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="image013d3fbf7ddad47c.png" loading="lazy" class="medium-zoom-image"></p>
<p>而在实际使用时，我们就需要导入它并实例化：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PrismaClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@prisma/client'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> prisma = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PrismaClient</span>();</span>
</code></pre>
<p>接下来，你将体验到 Prisma 最大的特色之一：类型安全。我们尝试访问以下 prisma 的属性：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5158276dadf04997bc8553d2405702af~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="image749525dface6a1d2.png" loading="lazy" class="medium-zoom-image"></p>
<p>每一个实体上的每一种方法都有全面覆盖的类型提示，而这背后当然是 prisma generate 命令中由 Prisma Schema 所生成的 TS 类型定义。</p>
<p>你可能会问，TypeORM 的 TS 支持也很好，为什么我单单说 Prisma 是类型安全的？这是因为在这些基于编程的语言中，类型实际上是我们自己书写的，ORM 由这些定义映射到数据库的过程中并不能保证是安全的。如在 TypeORM 中，一个字段是否可能为空是通过额外的选项 <code>@Column({ nullable: true })</code> 的方式来声明的。</p>
<p>而在 Prisma 中，我们通过 Prisma Schema 来描述数据库实体，相比 JavaScript / TypeScript，它无疑更加自然也更贴近 SQL。同时数据库的表结构与 TS 类型定义的生成均基于 Prisma Schema ，这也就保证了表结构与我们实际类型定义的同步。而如果你担心 Prisma 生成的类型不够严谨，可以翻翻看生成的 Prisma Client 代码。如这个例子中我们只有三个实体，共计 16 个字段，Prisma 生成了将近 5000 行的类型定义。</p>
<p>如果你对 Prisma 产生了兴趣，我此前写过系列文章来详细地介绍 Prisma 的使用，参考 <a href="https://juejin.cn/post/6973277530996342798" target="_blank" title="https://juejin.cn/post/6973277530996342798">Prisma：下一代 ORM，不仅仅是 ORM 上篇</a>、<a href="https://juejin.cn/post/6973950142445518884" target="_blank" title="https://juejin.cn/post/6973950142445518884">下篇</a>。</p>
<p>关于 Prisma 的工作流程，你可以参考这张图片：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b92e9f7bc66c4dea82b8b911bba8a96e~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="" loading="lazy" class="medium-zoom-image"></p>
<p>接下来，我们要来了解如何在 Nest 中去集成 Prisma，这一步我们不需要任何的集成包，只有非常自然地导入与调用。</p>
<h3 data-id="heading-3">在 NestJs 中集成 Prisma</h3>
<p>在 NestJs 中集成 Prisma 其实也非常简单，秉持着模块化的理念，我们将 Prisma 相关的逻辑单独放到一个模块中。</p>
<p>新建 <code>prisma.service.ts</code>：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="2">  <span class="hljs-title class_">Injectable</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="3">  <span class="hljs-title class_">OnApplicationShutdown</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-title class_">OnApplicationBootstrap</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="5">} <span class="hljs-keyword">from</span> <span class="hljs-string">'@nestjs/common'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PrismaClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@prisma/client'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8"><span class="hljs-meta">@Injectable</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">PrismaService</span></span>
<span class="code-block-extension-codeLine" data-line-num="10">  <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">PrismaClient</span></span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-keyword">implements</span> <span class="hljs-title class_">OnApplicationBootstrap</span>, <span class="hljs-title class_">OnApplicationShutdown</span></span>
<span class="code-block-extension-codeLine" data-line-num="12">{</span>
<span class="code-block-extension-codeLine" data-line-num="13">  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="14">    <span class="hljs-variable language_">super</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="15">  }</span>
<span class="code-block-extension-codeLine" data-line-num="16"></span>
<span class="code-block-extension-codeLine" data-line-num="17">  <span class="hljs-keyword">async</span> <span class="hljs-title function_">onApplicationBootstrap</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="18">    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.$connect();</span>
<span class="code-block-extension-codeLine" data-line-num="19">  }</span>
<span class="code-block-extension-codeLine" data-line-num="20"></span>
<span class="code-block-extension-codeLine" data-line-num="21">  <span class="hljs-keyword">async</span> <span class="hljs-title function_">onApplicationShutdown</span>(<span class="hljs-params"></span>) {</span>
<span class="code-block-extension-codeLine" data-line-num="22">    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.$disconnect();</span>
<span class="code-block-extension-codeLine" data-line-num="23">  }</span>
<span class="code-block-extension-codeLine" data-line-num="24">}</span>
</code></pre>
<p><code>onApplicationBootstrap</code> 和 <code>onApplicationShutdown</code> 是 NestJs 提供的应用级生命周期，我们继承 PrismaClient，通过 implements 来实现这两个方法，然后分别在启动与停止阶段与数据库连接、断开连接。</p>
<p>在前面我们已经提到，Prisma Client 需要被实例化后才能使用。我们这里的 PrismaService 也是，但是如果某一处代码需要使用它，IoC 容器在交给它这个类时就会进行实例化过程。</p>
<p>然后新建 <code>prisma.module.ts</code>：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Global</span>, <span class="hljs-title class_">Module</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@nestjs/common'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PrismaService</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./prisma.service'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-meta">@Global</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-meta">@Module</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-attr">providers</span>: [<span class="hljs-title class_">PrismaService</span>],</span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-attr">exports</span>: [<span class="hljs-title class_">PrismaService</span>],</span>
<span class="code-block-extension-codeLine" data-line-num="8">})</span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">PrismaModule</span> {}</span>
</code></pre>
<p>通过这种方式，Prisma 相关的所有能力都被归纳在这个模块中，后续你还可以继续添加如 <a href="https://link.juejin.cn?target=https%3A%2F%2Fwww.prisma.io%2Fdocs%2Fconcepts%2Fcomponents%2Fprisma-client%2Fmiddleware" target="_blank" rel="nofollow noopener noreferrer" title="https://www.prisma.io/docs/concepts/components/prisma-client/middleware" ref="nofollow noopener noreferrer">Prisma Middleware</a> 的功能。</p>
<p>接着别忘了将 Prisma Module 也添加到 AppModule 中：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> <span class="hljs-title class_">PrismaModule</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'./data/prisma.module'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-meta">@Module</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="4">  <span class="hljs-attr">imports</span>: [<span class="hljs-title class_">PrismaModule</span>],</span>
<span class="code-block-extension-codeLine" data-line-num="5">})</span>
<span class="code-block-extension-codeLine" data-line-num="6"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AppModule</span> {}</span>
</code></pre>
<p>这样，其他地方的 Service 就可以使用 Prisma Service 了！</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PrismaService</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'../data/prisma.service'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-meta">@Injectable</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ArticleService</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> prisma: PrismaService</span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7">  <span class="hljs-keyword">async</span> <span class="hljs-title function_">query</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Article</span>[]&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="8">    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">prisma</span>.<span class="hljs-property">article</span>.<span class="hljs-title function_">findMany</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="9">    <span class="hljs-keyword">return</span> res;</span>
<span class="code-block-extension-codeLine" data-line-num="10">  }</span>
<span class="code-block-extension-codeLine" data-line-num="11">}</span>
</code></pre>
<p>还记得我们在前面说到，Prisma 的核心优势之一就是它的类型安全，它会基于 Prisma Schema 生成对应的 TypeScript 类型定义，而我们实际上可以直接复用这些类型。</p>
<p>新建 <code>src/types/index.ts</code> ，这里会存放项目中的类型定义，在这个项目中我们只需要使用从 Prisma Client 中导出的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Prisma</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@prisma/client'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">ArticleCreateInput</span> = <span class="hljs-title class_">Prisma</span>.<span class="hljs-property">ArticleCreateInput</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">ArticleUpdateInput</span> = <span class="hljs-title class_">Prisma</span>.<span class="hljs-property">ArticleUpdateInput</span> &amp;</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-title class_">Prisma</span>.<span class="hljs-property">ArticleWhereUniqueInput</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="6"></span>
<span class="code-block-extension-codeLine" data-line-num="7"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Article</span>, <span class="hljs-title class_">Tag</span>, <span class="hljs-title class_">Category</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@prisma/client'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="8"></span>
<span class="code-block-extension-codeLine" data-line-num="9"><span class="hljs-comment">// ...类似的</span></span>
</code></pre>
<p>直接在代码中使用这些类型：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PrismaService</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'../data/prisma.service'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Article</span>, <span class="hljs-title class_">ArticleCreateInput</span>, <span class="hljs-title class_">ArticleUpdateInput</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'../types'</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="3"></span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-meta">@Injectable</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="5"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ArticleService</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> prisma: PrismaService</span>) {}</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-keyword">async</span> <span class="hljs-title function_">create</span>(<span class="hljs-attr">createInput</span>: <span class="hljs-title class_">ArticleCreateInput</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Article</span>&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="9">    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">prisma</span>.<span class="hljs-property">article</span>.<span class="hljs-title function_">create</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="10">      <span class="hljs-attr">data</span>: createInput,</span>
<span class="code-block-extension-codeLine" data-line-num="11">    });</span>
<span class="code-block-extension-codeLine" data-line-num="12"></span>
<span class="code-block-extension-codeLine" data-line-num="13">    <span class="hljs-keyword">return</span> res;</span>
<span class="code-block-extension-codeLine" data-line-num="14">  }</span>
<span class="code-block-extension-codeLine" data-line-num="15"></span>
<span class="code-block-extension-codeLine" data-line-num="16">  <span class="hljs-keyword">async</span> <span class="hljs-title function_">update</span>(<span class="hljs-attr">updateInput</span>: <span class="hljs-title class_">ArticleUpdateInput</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Article</span>&gt; {</span>
<span class="code-block-extension-codeLine" data-line-num="17">    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">prisma</span>.<span class="hljs-property">article</span>.<span class="hljs-title function_">update</span>({</span>
<span class="code-block-extension-codeLine" data-line-num="18">      <span class="hljs-attr">data</span>: updateInput,</span>
<span class="code-block-extension-codeLine" data-line-num="19">      <span class="hljs-attr">where</span>: {</span>
<span class="code-block-extension-codeLine" data-line-num="20">        <span class="hljs-attr">id</span>: updateInput.<span class="hljs-property">id</span>,</span>
<span class="code-block-extension-codeLine" data-line-num="21">      },</span>
<span class="code-block-extension-codeLine" data-line-num="22">    });</span>
<span class="code-block-extension-codeLine" data-line-num="23"></span>
<span class="code-block-extension-codeLine" data-line-num="24">    <span class="hljs-keyword">return</span> res;</span>
<span class="code-block-extension-codeLine" data-line-num="25">  }</span>
<span class="code-block-extension-codeLine" data-line-num="26">}</span>
</code></pre>
<h2 data-id="heading-4">总结与预告</h2>
<p>这一节我们学习了 NestJs 框架与 Prisma ORM 的基础概念与使用方式，以及在 NestJs 中集成 Prisma 的方法。相比于其它同类型框架，它们都有着决定性的优势，如 NestJs 的全家桶套餐、Prisma 的类型安全与性能。</p>
<p>完成了这些前置地知识储备后，下一节我们就将进入正式的开发与部署阶段了。但我们并不会走完整个开发阶段，我更相信授人以渔的教学方式，因此实际开发时我们只会完成一部分开发，走通整个流程。如果这两个框架让你感到有点意思，你就会自驱地完成整个流程开发的，毕竟兴趣才是我们最好的老师。相比于开发部分，我们对部署部分的介绍要更加详细，因为我们将使用 Heroku 平台提供的部署与数据库服务，这对于大部分同学来说都是首次接触。</p>
<h2 data-id="heading-5">扩展阅读</h2>
<h3 data-id="heading-6">NestJs 应用目录结构的不同组织方式</h3>
<p>前面我们介绍了 Controller、Service 等文件的基本功能，除此以外，NestJs 应用中其实存在着两种不同的文件组织风格：按功能与按逻辑进行拆分。</p>
<p>按功能进行拆分，即我们本节的应用使用的方式，这一方式下的目录结构是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">project</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── src</span>
<span class="code-block-extension-codeLine" data-line-num="3">├──── controllers</span>
<span class="code-block-extension-codeLine" data-line-num="4">├──── services</span>
<span class="code-block-extension-codeLine" data-line-num="5">├──── providers</span>
<span class="code-block-extension-codeLine" data-line-num="6">├──── app.module.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">├──── main.ts</span>
<span class="code-block-extension-codeLine" data-line-num="8">├── package.json</span>
<span class="code-block-extension-codeLine" data-line-num="9">├── nest-cli.json</span>
<span class="code-block-extension-codeLine" data-line-num="10">└── tsconfig.json</span>
</code></pre>
<p>也就是说，所有的 Controller 文件都在 <code>/controllers</code> 文件夹下，所有的 Service 文件都在 <code>/services</code> 文件夹下。这一方式适用于项目规模较小的情况，此时无需进行精细的模块化拆分，我们只会有一个 AppModule 。</p>
<p>而按逻辑进行拆分的目录结构可能是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">text</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-text code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1">project</span>
<span class="code-block-extension-codeLine" data-line-num="2">├── src</span>
<span class="code-block-extension-codeLine" data-line-num="3">├──── user</span>
<span class="code-block-extension-codeLine" data-line-num="4">├─────── user.controller.ts</span>
<span class="code-block-extension-codeLine" data-line-num="5">├─────── user.service.ts</span>
<span class="code-block-extension-codeLine" data-line-num="6">├─────── user.module.ts</span>
<span class="code-block-extension-codeLine" data-line-num="7">├──── manager</span>
<span class="code-block-extension-codeLine" data-line-num="8">├─────── manager.controller.ts</span>
<span class="code-block-extension-codeLine" data-line-num="9">├─────── manager.service.ts</span>
<span class="code-block-extension-codeLine" data-line-num="10">├─────── manager.module.ts</span>
<span class="code-block-extension-codeLine" data-line-num="11">├──── app.module.ts</span>
<span class="code-block-extension-codeLine" data-line-num="12">├──── main.ts</span>
<span class="code-block-extension-codeLine" data-line-num="13">├── package.json</span>
<span class="code-block-extension-codeLine" data-line-num="14">├── nest-cli.json</span>
<span class="code-block-extension-codeLine" data-line-num="15">└── tsconfig.json</span>
</code></pre>
<p>此时我们的 Controller、Service 都会被归类到对应业务逻辑的文件夹下，每个业务逻辑拥有自己的 Module ，然后再在 AppModule 中汇总。</p>
<p>这一方式适合存在一定规模的项目，以及内部业务模块分类较多的情况，此时使用基于逻辑的目录结构划分可以帮助你更好地进行模块拆分，同时获得更直观的模块依赖关系。</p>
<h3 data-id="heading-7">Data Mapper 与 Active Record</h3>
<p>即使你此前已经有过 ORM 的实践经验，还有两个概念可能是你未了解过的，即 <strong>Data Mapper</strong> 与 <strong>Active Record</strong> 。TypeORM的简介中提到，<em><strong>TypeORM supports both Active Record and Data Mapper patterns</strong></em>，即它同时支持了这两种模式。那么这两种模式对代码有什么影响，它们的差别又是什么？</p>
<p>先来看 Active Record 模式下的 TypeORM 代码：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">BaseEntity</span>, <span class="hljs-title class_">Entity</span>, <span class="hljs-title class_">PrimaryGeneratedColumn</span>, <span class="hljs-title class_">Column</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"typeorm"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-meta">@Entity</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">User</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">BaseEntity</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-meta">@PrimaryGeneratedColumn</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-meta">@Column</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-meta">@Column</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-attr">isActive</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">}</span>
<span class="code-block-extension-codeLine" data-line-num="14"></span>
<span class="code-block-extension-codeLine" data-line-num="15"><span class="hljs-keyword">const</span> user = <span class="hljs-keyword">new</span> <span class="hljs-title class_">User</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="16">user.<span class="hljs-property">name</span> = <span class="hljs-string">"不渡"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="17">user.<span class="hljs-property">isActive</span> = <span class="hljs-literal">true</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="18"></span>
<span class="code-block-extension-codeLine" data-line-num="19"><span class="hljs-keyword">await</span> user.<span class="hljs-title function_">save</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="20"></span>
<span class="code-block-extension-codeLine" data-line-num="21"><span class="hljs-keyword">const</span> newUsers = <span class="hljs-keyword">await</span> <span class="hljs-title class_">User</span>.<span class="hljs-title function_">find</span>({ <span class="hljs-attr">isActive</span>: <span class="hljs-literal">true</span> });</span>
</code></pre>
<p>TypeORM中，Active Record 模式下需要让实体类继承 <code>BaseEntity</code>类，然后实体类上就具有了各种操作方法，如 <code>save</code>  <code>remove</code>  <code>find </code>方法等。Active Record 模式最早由 Martin Fowle在 <em><strong>企业级应用架构模式</strong></em> 一书中命名，即直接在对象上支持相关的 CRUD 方法。</p>
<p>而 Data Mapper 下的代码则是这样的：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Entity</span>, <span class="hljs-title class_">PrimaryGeneratedColumn</span>, <span class="hljs-title class_">Column</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"typeorm"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-meta">@Entity</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="4"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">User</span> {</span>
<span class="code-block-extension-codeLine" data-line-num="5">  <span class="hljs-meta">@PrimaryGeneratedColumn</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="6">  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="7"></span>
<span class="code-block-extension-codeLine" data-line-num="8">  <span class="hljs-meta">@Column</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="9">  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="10"></span>
<span class="code-block-extension-codeLine" data-line-num="11">  <span class="hljs-meta">@Column</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="12">  <span class="hljs-attr">isActive</span>: <span class="hljs-built_in">boolean</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="13">}</span>
<span class="code-block-extension-codeLine" data-line-num="14"></span>
<span class="code-block-extension-codeLine" data-line-num="15"><span class="hljs-keyword">const</span> userRepository = connection.<span class="hljs-title function_">getRepository</span>(<span class="hljs-title class_">User</span>);</span>
<span class="code-block-extension-codeLine" data-line-num="16"></span>
<span class="code-block-extension-codeLine" data-line-num="17"><span class="hljs-keyword">const</span> user = <span class="hljs-keyword">new</span> <span class="hljs-title class_">User</span>();</span>
<span class="code-block-extension-codeLine" data-line-num="18">user.<span class="hljs-property">name</span> = <span class="hljs-string">"不渡"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="19">user.<span class="hljs-property">isActive</span> = <span class="hljs-literal">true</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="20"></span>
<span class="code-block-extension-codeLine" data-line-num="21"><span class="hljs-keyword">await</span> userRepository.<span class="hljs-title function_">save</span>(user);</span>
<span class="code-block-extension-codeLine" data-line-num="22"></span>
<span class="code-block-extension-codeLine" data-line-num="23"><span class="hljs-keyword">await</span> userRepository.<span class="hljs-title function_">remove</span>(user);</span>
<span class="code-block-extension-codeLine" data-line-num="24"></span>
<span class="code-block-extension-codeLine" data-line-num="25"><span class="hljs-keyword">const</span> newUsers = <span class="hljs-keyword">await</span> userRepository.<span class="hljs-title function_">find</span>({ <span class="hljs-attr">isActive</span>: <span class="hljs-literal">true</span> });</span>
</code></pre>
<p>在 Data Mapper 模式下，实体类不能够自己进行数据库操作，而是需要先获取到一个对应到表的“仓库”，然后再调用这个“仓库”上的方法。</p>
<p>这一模式同样由 Martin Fowler 前辈最初命名，Data Mapper 就像是一层拦在操作者与实际数据之间的访问层，就如上面例子中，需要先获取具有访问权限（即相应方法）的对象，再进行数据的操作。</p>
<p>对这两个模式进行比较，很容易发现 Active Record 模式要更加简单，适用于较简单的应用。可以减少很多代码。而 Data Mapper 模式则更加严谨，适用于开发规模较大的应用，一个例子是在 Nest 的 TypeORM 集成包中，也是注入Repository实例然后再进行操作的，即也属于 Data Mapper 模式。</p>
<p>最后，实际上 Prisma 使用的也是 Data Mapper 模式，我们需要 Prisma Client 来作为访问层。</p>
<h3 data-id="heading-8">ORM 与 QueryBuilder</h3>
<p>ORM 并不是唯一一种让我们可以不用写 SQL 就能操作数据库的方式，同时它也不是最贴近 SQL 的方式。</p>
<p>Query Builder 就是这另外一种使用方式，它和 ORM 一样，通过编程语言书写，但不同的是它并不包括实体类映射到数据库表的部分，而只是负责 Query 。</p>
<p>以 TypeORM 的 Query Builder 模式为例：</p>
<pre><div class="code-block-extension-header" style="background-color: rgb(40, 40, 40);"><div class="code-block-extension-headerLeft"><div class="code-block-extension-foldBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg></div></div><div class="code-block-extension-headerRight"><span class="code-block-extension-lang">typescript</span><div class="code-block-extension-copyCodeBtn">复制代码</div></div></div><code class="hljs language-typescript code-block-extension-codeShowNum"><span class="code-block-extension-codeLine" data-line-num="1"><span class="hljs-keyword">import</span> { getConnection } <span class="hljs-keyword">from</span> <span class="hljs-string">"typeorm"</span>;</span>
<span class="code-block-extension-codeLine" data-line-num="2"></span>
<span class="code-block-extension-codeLine" data-line-num="3"><span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getConnection</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="4">  .<span class="hljs-title function_">createQueryBuilder</span>()</span>
<span class="code-block-extension-codeLine" data-line-num="5">  .<span class="hljs-title function_">select</span>(<span class="hljs-string">"user"</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="6">  .<span class="hljs-title function_">from</span>(<span class="hljs-title class_">User</span>, <span class="hljs-string">"user"</span>)</span>
<span class="code-block-extension-codeLine" data-line-num="7">  .<span class="hljs-title function_">where</span>(<span class="hljs-string">"user.id = :id"</span>, { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span> })</span>
<span class="code-block-extension-codeLine" data-line-num="8">  .<span class="hljs-title function_">getOne</span>();</span>
</code></pre>
<p>这么一连串的链式调用，其实就等价于 <code>userRepo.find({ id: 1 })</code> 的作用，看起来更麻烦了，但你是否感觉到了灵活性的成倍增长？在 Query Builder 中，，每一次链式调用都会对最终生成的 SQL 产生一些调整，因此我们可以通过非常细粒度的调整来更加的贴近原生 SQL 。</p>
<p>除了 TypeORM 以外，Node 中使用较多的 Query Builder 还包括 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fknex%2Fknex" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/knex/knex" ref="nofollow noopener noreferrer">knex</a>、<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fkoskimas%2Fkysely" target="_blank" rel="nofollow noopener noreferrer" title="https://github.com/koskimas/kysely" ref="nofollow noopener noreferrer">kysely</a> 等。</p>
<p>关于 Prisma、Query Builder 与 ORM 的比较，可以参考下面这张图片：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/456cfd8784284b5b91c0d19b90f1103b~tplv-k3u1fbpfcp-jj-mark:1663:0:0:0:q75.awebp" alt="comparison" loading="lazy" class="medium-zoom-image"></p></div>
