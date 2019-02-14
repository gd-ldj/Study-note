
1. ts里声明变量需要指明类型
```ts
let isDone: boolean = false;
```
2. 枚举
> enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

alert(colorName);  // 显示'Green'因为上面代码里它的值是2
```
3. any任意类型、viod没有类型

当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

let list: any[] = [1, true, "free"];

list[1] = 100;

某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
```ts
function warnUser(): void {
    alert("This is my warning message");
}
```

