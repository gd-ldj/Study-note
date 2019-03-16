1. 英文字符断行
```
 word-wrap：break-word （ word-break: break-word; ？）
 overflow-wrap: break-word

```

2. 元素竖向的百分比设定是相对于容器的高度吗？
> 当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如 padding-top , padding-bottom , margin-top , margin-bottom 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。

3. 你对line-height是如何理解的？
- 行高是指一行文字的高度，具体说是两行文字间基线的距离。CSS中起高度作用的是height和line-height，没有定义height属性，最终其表现作用一定是line-height。
- 单行文本垂直居中：把line-height值设置为height一样大小的值可以实现单行文字的垂直居中，其实也可以把height删除。
- 多行文本垂直居中：需要设置display属性为inline-block。  

4. 字符串首字母小写转大写的css写法
```css
text-transform: capitalize;
```


