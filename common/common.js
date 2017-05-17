
$('#count').html($.cookie('goodsKind'));
/*获得btn按钮和input*/
$(function() {
	var $btn = $('#logoBox .btn');
	var $txt = $('#logoBox .txt');
	var $hideS = $('#logoBox .hideSs');
	$txt.on("keyup", function() {
		var Src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=fnData&wd=" + $(this).val();
		var $script = $("<script src=" + Src + "></script>");
		$script.appendTo($('head'));
		$script.remove();
		$hideS.html("");
	})
	$("#logoBox .mark").click(function() {
		$hideS.hide();
	})	
	$hideS.on("click","li",function(){
		$txt.val($(this).html());
		$hideS.toggle();
	})	
	
	//跳转到列表页
	$("#logoBox .search_btm li").click(function(){
		window.location.href = "../listPage/productList.html";
	})
	//跳转到首页
	$("#goHome").click(function(){
		window.location.href = "../homePage/home.html";
	})
}());
/*封装一个接收从百度搜索里获得的数据*/
	function fnData(data) {
		var $hideS = $('#logoBox .hideSs');
		var arr = data.s;
		var str = "";
		for(var i = 0; i < arr.length; i++) {
			str += '<li>' + arr[i] + '</li>';
		}
		$(str).appendTo($hideS);
		$hideS.show();
	}
/*隐藏导航栏部分*/
$(function() {
	$("#navBox .navRight").click(function() {
		$(this).find('span').toggle();
		$(this).find("em").toggleClass("show");
		$('#navBox .navHide').toggle();
	})
	/*二级导航移入事件*/
	$("#navBox .hideLeft li").mouseenter(function() {
		var index = $(this).index();
		var $height = $("#navBox .item").eq(index).height();
		$("#navBox .item").eq(index).parent(".itemBox").css("height", $height)
		$("#navBox .hideRight").css({
			"backgroundColor": "#fff",
			"border-radius": "10px"
		});
		$("#navBox .item").eq(index).addClass("navshow").siblings().removeClass("navshow");

		$(this).find('img').attr({
			"src": "../common/img/" + (index + 1) + "_2.png"
		});
	})
	/*二级导航移出事件*/
	$("#navBox .hideLeft li").mouseleave(function() {
		var index = $(this).index() + 1;
		$(this).find('img').attr({
			"src": "../common/img/" + index + "_1.png"
		});
		
	})
	/*三级导航动态创建部分*/
	$.get('../common/navList.json',function(data){
		for(var i =0;i<data.length;i++){
			var str = "";
			str = '<li style="'+data[i].sty+'">'+
					'<h3>'+data[i].itemH3+'</h3>'+
					'<div class="Abox">'+
					'<a href="#">'+data[i].A1+'</a>'+
					'<a href="#">'+data[i].A2+'</a>'+
					'<a href="#">'+data[i].A3+'</a><br>'+
					'<a href="#">'+data[i].A4+'</a>'+
					'<a href="#">'+data[i].A5+'</a>'+
					'<a href="#">'+data[i].A6+'</a>'+
					'</div>'+
					'</li>';
				$('#navBox .navHide .itemBox .item').eq(0).append(str);	
		}		
	})
	
}());
/*sideBar部分*/
$(function() {
	/*跳转到购物车*/
	$('#sideBar .cart').click(function(){
		window.location = "../cartPage/cart.html";
	})
	$('#sideBar .barUl').on("mouseenter", "li", function() {
		$(this).find('span').fadeIn(50).animate({
			right: "35px",
			opacity: "1"
		}, 500);
	})
	$('#sideBar .barUl').on("mouseout", "li", function() {
		$(this).find('span').animate({
			right: "50px",
			opacity: "0"
		}, 500).fadeOut(50);
	})
	$('#sideBar .goTop').click(function() {		
		$("html,body").animate({scrollTop:"0"},1000);
	})
}());

/*由登录页跳转到首页*/
$(function(){
	var $logTab = $('.logTab');
	var $exLi = $logTab.next();
	if($.cookie("userName")){					
		$logTab.hide();
		$exLi.show();
		$exLi.find('span').html($.cookie("userName"));		
		if($.cookie("userName") !=""){
			$exLi.click(function(){
				$exLi.hide();
				$.cookie("userName","",{path:"/"});
				$logTab.show();
			})
		}		
	}
	
}())
