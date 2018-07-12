## 第二遍学习react官方文档收获
+ 1、使用箭头函数传参 `onClick = { (id) = {this.handleClick(id)}}`
+ 2、条件渲染的 && 方法  `{ true && <div>hello word</div> }`
+ 3、state 只在交互的时候出现 静态数据是从父级传到子级
+ 4、条件渲染
> 值得注意的是，JavaScript 中的一些 “falsy” 值(比如数字0)，它们依然会被渲染。例如，下面的代码不会像你预期的那样运行，因为当 props.message 为空数组
> 时，它会打印0
>    `<div>
>       {props.messages.length &&
>       <MessageList messages={props.messages} />
>        }
>     </div>`
> 改为 请确保 && 前面的表达式始终为布尔值
>     `<div>
>        {props.messages.length > 0 &&
>         <MessageList messages={props.messages} />
>        }
>     </div>`
+ 5、react的高级API context 是向子孙组件传递数据的方式，可以不用在组件属性上一级一级的向下传递。但是该API并不成熟，存在一定问题，慎用。
+ 6、<></> React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。另一种使用片段的方式是使用 React.Fragment 组件，React.Fragment 组件可以在 React 对象上使用。
+ 7、Error Boundaries 错误边界是用于捕获其子组件树 JavaScript 异常，记录错误并展示一个回退的 UI 的 React 组件，而不是整个组件树的异常 如果一个类组件定义了一个名为 componentDidCatch(error, info): 的新方法，则其成为一个错误边界 componentDidCatch() 方法机制类似于 JavaScript catch {}
+ 8、#### 事件池
> SyntheticEvent是共享的。那就意味着在调用事件回调之后，SyntheticEvent对象将会被重用，并且所有属性会被置空。这是出于性能因素考虑的。 因此，您无法以异步方式访问事件。
+ 9、我应该在组件的哪个生命周期发送 AJAX 请求?
> 你应该在 componentDidMount 生命周期方法内发送 AJAX 请求数据。这样你才能够在请求的数据到达时使用 setState 更新你的组件。

10. setState是异步的
我们可能在一个方法中连续使用多次setState，但由于设置是异步的，我们不能在第二次调用setState方法时拿到第一次调用setState所设置的值，它们的state都是基于最初的state的。
那么这个问题如何解决呢？
其实setState还有第二种形式，使用回调函数而非对象的形式去更新state，像这样
this.setState((prevState,props)=>({counter:prevState.counter + Math.random()}));
this.setState((prevState,props)=>({counter:prevState.counter + props.increment}))
setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

