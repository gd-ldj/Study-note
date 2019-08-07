# Error 实例对象


JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供`Error`构造函数，所有抛出的错误都是这个构造函数的实例。

`Error`构造函数接受一个参数，表示错误提示，可以从实例的`message`属性读到这个参数。抛出`Error`实例对象以后，整个程序就中断在发生错误的地方，不再往下执行。

`Error`实例对象必须有`message`属性，表示出错时的提示信息

- **message**：错误提示信息
- **name**：错误名称（非标准属性）
- **stack**：错误的堆栈（非标准属性）

`Error`实例对象是最一般的错误类型，在它的基础上，JavaScript 还定义了其他6种错误对象。也就是说，存在`Error`的6个派生对象。

- `SyntaxError`对象是解析代码时发生的语法错误
```javascript
// 变量名错误
var 1a;
// Uncaught SyntaxError: Invalid or unexpected token

// 缺少括号
console.log 'hello');
// Uncaught SyntaxError: Unexpected string
```

- `ReferenceError`对象是引用一个不存在的变量时发生的错误, 或者将一个值分配给无法分配的对象

```javascript
// 使用一个不存在的变量
unknownVariable
// Uncaught ReferenceError: unknownVariable is not defined

/ 等号左侧不是变量
console.log() = 1
// Uncaught ReferenceError: Invalid left-hand side in assignment

// this 对象不能手动赋值
this = 1
// ReferenceError: Invalid left-hand side in assignment
```

- `RangeError`对象是一个值超出有效范围时发生的错误。
```javascript
/ 数组长度不得为负数
new Array(-1)
// Uncaught RangeError: Invalid array length
```

- `TypeError`对象是变量或参数不是预期类型时发生的错误
```javascript
new 123
// Uncaught TypeError: number is not a func

var obj = {};
obj.unknownMethod()
// Uncaught TypeError: obj.unknownMethod is not a function
```

- `URIError`对象是 URI 相关函数的参数不正确时抛出的错误
```javascript
decodeURI('%2')
// URIError: URI malformed
```

-  `Evaerror` 对象

`eval`函数没有被正确执行时，会抛出`EvalError`错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。

<a name="5a16f447"></a>
## 自定义错误

除了 JavaScript 原生提供的七种错误对象，还可以定义自己的错误对象

```javascript
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;

new UserError('这是自定义的错误！');
```

<a name="25a30d5c"></a>
## throw 语句
`throw`语句的作用是手动中断程序执行，抛出一个错误。
