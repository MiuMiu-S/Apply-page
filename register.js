/*
 * 作者：s
 * 时间：2018-6-25
 * 描述： 
 *
 */
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

function longAlertStrlong(time) {
	var myTimer = null;
	var i = 0;
	return function(content) {
		clearTimeout(myTimer);
		myTimer = setTimeout(function() {
			$("body").append('<div class="tip-newbox" style="z-index:99999"><div class="tip-newbody"><h3>' + content + '</h3></div></div>')
			$(".tip-newbox").animate({
				top: "18px"
			});
			window.setTimeout(function() {
				$(".tip-newbox").remove();
			}, time)
		}, 500);

	}
}
var tip = longAlertStrlong(4000);

// Framework7
var myApp = new Framework7();
var $$ = Dom7;
$$('.city').on('click', function() {
	myApp.popup('.popup-areachoose');
});

// input动画效果
$(".item-value").on("focus", function() {
	$(".list").removeClass("current");
	if($(this).val().length > 0) {
		//输入值
		$(this).next(".clean").show();
	}

}).on("blur", function() {
	$(this).parent(".list").removeClass("current");
	if($(this).val().length > 0) {
		//输入值
	} else {
		//未输入值
		$(this).parent(".list").removeClass("onfocus");
	}
	$(this).next(".clean").hide();

}).on('input porpertychange', function() {
	var item = $(".item-value");
	for(var i = 0; i < item.length; i++) {
		if($(item).eq(i).val().length > 0) {
			//输入值

		} else {
			//未输入值
			$(item).eq(i).parent(".list").removeClass("onfocus")
			if($(".city").hasClass("accomplish")) {
				$(".city").parent(".list").addClass("onfocus");
			}

		}
	}
	$(this).parent(".list").addClass("current onfocus");

	if(!($(this).val() == null || $(this).val() == '')) {
		$(this).next(".clean").show();
		if($(".onfocus").length == 7) {
			$(".btn").addClass("next");
		}
	} else {
		$(this).next(".clean").hide();
		$(".btn").removeClass("next");
	}

});

//银行卡四字间隔
$('#bankCard').on('keyup', function(e) {
	//只对输入数字时进行处理
	//小米自带浏览器不识别if((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
	//获取当前光标的位置
	var caret = this.selectionStart;
	//获取当前的value
	var value = this.value;
	//从左边沿到坐标之间的空格数
	var sp = (value.slice(0, caret).match(/\s/g) || []).length;
	//去掉所有空格
	var nospace = value.replace(/\s/g, '');
	//重新插入空格
	var curVal = this.value = nospace.replace(/(\d{4})/g, "$1 ").trim();
	//从左边沿到原坐标之间的空格数
	var curSp = (curVal.slice(0, caret).match(/\s/g) || []).length;
	//修正光标位置
	this.selectionEnd = this.selectionStart = caret + curSp - sp;

	//}
});

// 清空输入
$(".list").on("touchstart", ".clean", function() {
	$(this).prev("input").val("");
	$(this).hide();
	$(".btn").removeClass("next");
});

//协议
$(".agreement").on("touchstart", "span", function() {
	if($(this).hasClass("onfocus")) {
		$(this).removeClass("onfocus");
		$(".btn").removeClass("next");
	} else {
		$(this).addClass("onfocus");
	}
	if($(".onfocus").length == 7) {
		$(".btn").addClass("next");
	}
});

//获取验证码
var gc = $(".get-confirmcode");

function codeNock() {
	if($(gc).html() == "正在获取") {
		return
	} else {
		$(gc).html("正在获取").removeClass("getagain");
	}

	if(!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/).test($("#phone").val())) {
		tip("手机号格式错误");
		$(gc).attr("onClick", "codeNock();").html("获取验证码");
		$("#phone").removeAttr("readonly");
		return false;
	}
	if($(gc).hasClass("done")) {
		$(gc).attr("onClick", "codeNock();").html("获取验证码");
		$("#phone").removeAttr("readonly");
		return false;
	} else {
		$(gc).addClass("done");
	}

	$.ajax({
		url: "/sssss.htm?mobile=" + $("#phone").val(),
		type: "get",
		success: function(data) {
			$(gc).removeClass("done");
			if(data == 1) {
				//发送成功
				$(gc).html('60s');
				$(gc).attr('data-t', '60');
				$(gc).attr("onClick", "");
				$("#phone").attr("readonly", "readonly");
				setTimeout(countDown, 1000);
				tip("发送成功");
			} else {
				//发送失败
				tip("发送失败");
				$(gc).attr("onClick", "codeNock();");
				$(gc).html("获取验证码");
				$("#phone").removeAttr("readonly");
			}
		}
	})
}

function countDown() {
	var time = $(gc).attr('data-t');
	$(gc).html((time - 1) + "s");
	$(gc).attr('data-t', (time - 1));
	time = time - 1;
	if(time < 1) {
		$(gc).attr("onClick", "codeNock();");
		$(gc).html("重新获取");
		$(gc).addClass("getagain");
		$("#phone").removeAttr("readonly");
	} else {
		setTimeout(countDown, 1000);
	}
}

//获取城市列表
//var citystr = "";
//var normalimg ="";
//$.ajax({
//  type: 'get',
//  url: '/ssss.htm',
//  success: function(data) {
//      if(data.addressList.length >2){
//          $(".popup-areachoose").addClass("more")
//      }
//      for(var ii =0;ii<data.addressList.length;ii++){
//          if(data.addressList[ii].city.cityName=="北京市"){
//              normalimg = "../../images/v3/icon_beijing@2x.png";
//          }else if(data.addressList[ii].city.cityName=="乌兰察布市"){
//              normalimg = "../../images/v3/icon_wukanchabu@2x.png";
//          }else{
//              normalimg ="../../images/v3/Group@2x.png";
//          }
//          citystr += '<span class="close-popup1" index="'+data.addressList[ii].city.cityId+'">';
//          citystr += '<b>'+data.addressList[ii].city.cityName+'</b>';
//          citystr += '<p>目前已开通配送服务</p><img src='+normalimg+'></span>';
//      }
//      $(".popup-areachoose .warp").html(citystr);
//      $('.close-popup1').on('click', function () {
//          $("#cityId").val($(this).attr("index"));
//          $(".city").parent(".list").addClass("onfocus");
//          $(".city").html($(this).find("b").html()).addClass("accomplish");
//          if($(".onfocus").length == 7){
//              $(".btn").addClass("next");
//          }
//          myApp.closeModal('.popup-areachoose');
//      });
//  }
//});
$('.close-popup1').on('click', function() {
	$("#cityId").val($(this).attr("index"));
	$(".city").parent(".list").addClass("onfocus");
	$(".city").html($(this).find("b").html()).addClass("accomplish");
	if($(".onfocus").length == 7) {
		$(".btn").addClass("next");
	}
	myApp.closeModal('.popup-areachoose');
});

//提交申请
$(".btn").on("click", function() {

	if(!$(this).hasClass("next")) {
		return false;
	}
	var realname = $("#realname").val();
	var cardid = $("#cardid").val();
	var phone = $("#phone").val();
	var code = $("#code").val();
	var bankCard = $("#bankCard").val();
	var cityId = $("#cityId").val();

	if(realname.length > 16) {
		tip("输入姓名过长");
		return false;
	}
	//
	// if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(cardid)){
	//     tip("请输入正确的身份证号");
	//     return false;
	// }
	// if(!(/^([1-9]{1})(\d{15}|\d{18})$/).test(bankCard)){
	//     tip("请输入正确的银行卡号");
	//     return false;
	// }

	// if(!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/).test(phone)){
	//     tip("请输入正确的手机号");
	//     return false;
	// }

	// if(bankCard.length > 22 || bankCard.length < 19){
	//     tip("请输入正确的银行卡号");
	//     return false;
	// }

	// if(cityId == null || cityId==''){
	//     tip("所在地区不能为空");
	//     return false;
	// }
	var distributorId = window.location.href.split('=')[1];
	$.ajax({
		url: "/sssss.htm",
		type: "post",
		data: {
			realname: realname,
			cardid: cardid,
			phone: phone,
			code: code,
			bankCard: bankCard,
			cityId: cityId,
			distributorId: distributorId
		},
		success: function(data) {
			// console.info(data);
			if(data == "success") {
				window.location.href = '/ssssssss.htm';
			} else if(data == 1) {
				tip("请输入正确的验证码");
			} else if(data == 2) {
				tip("姓名不能为空");
			} else if(data == 3) {
				tip("请输入正确的身份证号");
			} else if(data == 4) {
				tip("请输入正确的银行卡号");
			} else if(data == 5) {
				tip("所在地区不能为空");
			} else if(data == 6) {
				tip("请输入正确的手机号");
			} else {
				tip("输入有误");
			}
		}
	})

});