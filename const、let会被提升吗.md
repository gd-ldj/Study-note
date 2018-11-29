## const、let是ES6的新特性，可以声明块级作用域
+ 到底会不会声明被提升，现在说服不一，主流是不会被提升
+ 个人认为也不会被提升，但是和var一样不能先使用再声明
 + var会被提升到顶部，再赋值
 + const、let会在声明地方到块级顶部形成临时性死区，在这区间使用该变量都会被报错
```
  console.log(a)
  var a = 1
  // init.js:1 undefined
  // undefined
  console.log(a)
  let a = 1
 // VM92:1 Uncaught SyntaxError: Identifier 'a' has already been declared
      at <anonymous>:1:1
```
