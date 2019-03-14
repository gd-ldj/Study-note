## vue学习笔记  
作者：尤雨溪，现居美国新泽西，全职开发维护vue，以及vue生态系统。  

官方团队成员：全职两个，尤雨溪、蒋豪群，还有很多全球各地的贡献者。  

Vue是从Angular优化而来， AngularJS 是 Vue 早期开发的灵感来源。然而，AngularJS 中存在的许多问题，在 Vue 中已经得到解决。后面又借鉴了React的虚拟dom。  

Vue.js是一个用于创建用户界面的开源JavaScript框架，也是一个创建单页面应用的Web应用框架。  

Vue的初始版本在2014年发布  

Vue相对其它两大框架Angular、React的优势：体积小，易上手  

Vue.js（读音 /vjuː/，类似于 view 的读音）是一套构建用户界面(user interface)的渐进式框架。与其他重量级框架不同的是，Vue 从根本上采用最小成本、渐进增量(incrementally adoptable)的设计。 

Vue的模版式语法，不同于React的JSX语法。Vue.js 的核心是，可以采用简洁的模板语法来声明式的将数据渲染为 DOM   


我们只需要关注于底层逻辑，更新应用程序的状态，而无需触及 DOM - 所有的 DOM 操作都由 Vue 来处理。

### 语法学习

#### Vue 实例
每个 Vue 应用程序都是通过 Vue 函数创建出一个新的 Vue 实例开始的
> 作为约定，通常我们使用变量 vm (ViewModel 的简称) 来表示 Vue 实例
```vue
var data = { message: 'hello vue'}
var vm = new Vue({
  el: '#example', // 绑定作用域
  data: data,  // 组件状态数据
  created: function () { // 生命周期函数
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  },
  methods: { // 自定义方法
    getData: function () {
      this.message = '你好 vue' // 可以修改状态数据
    }
  }
})

// 除了 data 属性， Vue 实例还暴露了一些有用的实例属性和方法。这些属性与方法都具有前缀 $，以便与用户定义(user-defined)的属性有所区分
vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 此回调函数将在 `vm.a` 改变后调用
})
```
> 在控制台里可以修改app.message的值
> 不要在选项属性或者回调函数中使用箭头函数（例如，created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())）。因为箭头函数会绑定父级上下文，所以 this 不会按照预期指向 Vue 实例，经常会产生一些错误
生命周期示意图
![生命周期](https://vue.docschina.org/images/lifecycle.png)
所有的钩子函数在调用时，其 this 上下文都会指向调用它的 Vue 实例

#### 模板语法
Vue.js 使用基于 HTML 的模板语法，允许声明式地将要渲染的 DOM 和 Vue 实例中的 data 数据绑定  
在底层的实现上，Vue 将模板编译为可以生成 Virtual DOM 的 render 函数。结合响应式系统，在应用程序状态改变时，Vue 能够智能地找出重新渲染的最小数量的组件，并应用最少量的 DOM 操作。
+ 插值(Interpolations)
  + 文本(Text)
    数据绑定最基本的形式，就是使用 “mustache” 语法（双花括号）的文本插值
    ```
    <span>{{ Message }}</span>
    ```
    mustache 标签将会被替换为 data 对象上对应的 msg 属性的值。只要绑定的数据对象上的 msg 属性发生改变，插值内容也会随之更新  
    也可以通过使用 v-once 指令，执行一次性插值，也就是说，在数据改变时，插值内容不会随之更新。但是请牢记，这也将影响到同一节点上的其他所有绑定
    ```
    <span v-once>这里的值永远不会改变：{{ Message }}</span>
    ```
    
    
#### 指令系统
+ v-bind：传递属性
+ v-if 控制元素的显示
+ v-for 遍历数组的元素展示
+ v-on:click='onClick'  绑定事件
+ v-model 表单输入和应用程序状态之间的双向绑定


#### 组件系统
> 在 Vue 中，一个组件本质上是一个被预先定义选项的 Vue 实例

注册组件
```vue
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '其他人类食物' }
    ]
  }
})
```
使用组件
```vue
<todo-item
  v-for="item in groceryList"
  v-bind:todo="item"
  v-bind:key="item.id">
</todo-item>
```
