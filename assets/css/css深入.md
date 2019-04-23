1. 英文字符断行
```
 word-wrap：break-word （ word-break: break-word; ？）
 overflow-wrap: break-word

```

2. 元素竖向的百分比设定是相对于容器的高度吗？
```
当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，  
但是，对于一些表示竖向距离的属性，例如padding-bottom , margin-top 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。
```

3. 你对line-height是如何理解的？
```
  - 行高是指一行文字的高度，具体说是两行文字间基线的距离。CSS中起高度作用的是height和line-height，没有定义height属性，最终其表现作用一定是line-height。
  - 单行文本垂直居中：把line-height值设置为height一样大小的值可以实现单行文字的垂直居中，其实也可以把height删除。
  - 多行文本垂直居中：需要设置display属性为inline-block。  
```
4. 字符串首字母小写转大写的css写法
```css
text-transform: capitalize;
```
5. css多列等高的实现
```
利用padding-bottom|margin-bottom正负值相抵；  
设置父容器设置超出隐藏（overflow:hidden），这样子父容器的高度就还是它里面的列没有设定padding-bottom时的高度，  
当它里面的任 一列高度增加了，则父容器的高度被撑到里面最高那列的高度，  
其他比这列矮的列会用它们的padding-bottom补偿这部分高度差。

```

