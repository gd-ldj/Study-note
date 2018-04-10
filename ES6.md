3.2 includes 方法

//判断字符串中是否包含某个字符串
> let str = 'woaini';

str.includes('ai'); //true


Array.includes();//判断数组是否有某值


不要声明之后又给对象添加新属性：
// low
const a = {};
a.x = 3;

// good
const a = { x: null };
a.x = 3;
如果一定非要加请使用Object.assign：
const a = {};
Object.assign(a, { x: 3 });

作者：BrownHu
链接：https://juejin.im/post/5acb1847f265da237c693362
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
