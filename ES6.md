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

JS的第七种基本类型Symbols
