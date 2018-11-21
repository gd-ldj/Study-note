+ html
```
<div class="merquee-box" >
  <div class="merquee">
    <span class="merquee-txt">
    </span>
  </div> 
</div>
```
+ css
```
.merquee-box{
  height: 25px;
  line-height: 25px;
  box-sizing: border-box;
  word-break: break-all;
  white-space: nowrap;
  .merquee{
    margin: 0 10px;
    overflow: hidden;
    .merquee-txt{
      display: inline-block;
      padding-left: 100%;  /* 从右至左开始轮播 */
      -webkit-animation: marquee 16s linear infinite;
      animation: marquee 16s linear infinite;
    }
  }
  @keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
  }
}
```
