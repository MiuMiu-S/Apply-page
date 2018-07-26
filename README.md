# Apply-page 申请页面
![申请页面](https://github.com/MiuMiu-S/Apply-page/blob/master/images/register.gif)



最近工作中一个表单页面的动画效果挺少见，实现效果、交互挺不错的，用动画实现很简单，整理记录一下关键细节，[详细代码戳这里](https://github.com/MiuMiu-S/Apply-page)，这个效果用文字描述不好，文章标题也只好含糊命名了。


####代码片段如下



##### CSS
```
.list .item {
    position: absolute;
    left: 0;
    bottom: 13px;
    font-size: 12px;
    color: #7f7f7f;
    opacity: 0;
    transition: opacity 0.4s, bottom 0.4s;
    -webkit-transition: opacity 0.4s,bottom 0.4s;
    transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
}
.list .item-value {
    position: absolute;
    top: 15px;
    left: 0;
    border: none;
    height: 30px;
    line-height: 30px;
    width: 5.04rem;
    font-size: 15px;
    color: #000;
    background: transparent;
    transition: top 0.4s;
    -webkit-transition: top 0.4s;
    transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    font-weight: bold;
}
```

##### HTML
```
<div class="list">
    <div class="item">身份证</div>
    <input type="text" id="cardid" class="item-value" placeholder="请输入身份证号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入身份证号'">
    <span class="clean" style="display: none;"><img src="images/v3/btn_delect@2x.png" alt=""></span>
</div>
```




##### JS
```
// input动画效果
$(".item-value").on("blur",function(){
    if($(this).val().length > 0){
        //已经输入值...

    }else{
        //未输入值
        $(this).parent(".list").removeClass("onfocus");
    }


}).on('input porpertychange',function(){
    var item = $(".item-value");
    for(var i=0;i<item.length;i++){
        if($(item).eq(i).val().length > 0){
            //已经输入值...

        }else{
            //未输入值
            $(item).eq(i).parent(".list").removeClass("onfocus")
            if($(".city").hasClass("accomplish")){
                $(".city").parent(".list").addClass("onfocus");
            }
        }
    }
    $(this).parent(".list").addClass("current onfocus");
});
```

