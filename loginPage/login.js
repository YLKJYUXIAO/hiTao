/*登录部分tab切换*/
$(function(){
	$('#mainBox ul li').click(function(){
		$(this).addClass('current').siblings().removeClass('current');
		var index = $(this).index();
		$('#mainBox .item').eq(index).addClass('show').siblings().removeClass('show');
	})
	
}())
/*表单验证部分*/
/*手机号验证*/
$(function(){	
	$("#phone").focus(checkPhone);
	$("#phone").blur(checkPhone);
	$("#phone").keyup(checkPhone);
	function checkPhone(e){		
		var $phone = $('#phone');
		var v = $phone.val();
		//console.log(v.length);
		var pBox = $phone.parent();
		var tip = pBox.find('i');
		var reg = /^[1][0-9]{10}$/;	
		check(e,pBox,tip,v);
		/*keyup 事件*/
		if(v.length != 0){			
			if(reg.test(v)){				
				return false;
			}else if(v.length > 11){				
				tip.show();	
				tip.html("手机号格式错误，请重新输入");
			}
		}
	}
}());
/*密码验证*/
$(function(){
	var $pwd = $('#pwd');
	var pBox = $pwd.parent();
	var tip = pBox.find('i');
	$pwd.focus(checkPwd);
	$pwd.blur(checkPwd);
	$pwd.keyup(checkPwd);
	function checkPwd(e){
		var v = $pwd.val();
		var reg = /^[\w]+$/;
		check(e,pBox,tip,v);
		if(v.length == 0){			
			//tip.show();
			return;
		}else{
			if(reg.test(v)){
				tip.hide();
			}else{
				tip.show();
				tip.html("仅支持字母、数字、“-”“_”的组合");
			}
		}
	}
}());

//验证码登录

/*手机号验证*/
$(function(){	
	$("#phoneNum").focus(checkpNum);
	$('#phoneNum').blur(checkpNum);
	$('#phoneNum').keyup(checkpNum);
	function checkpNum(e){		
		var $pNum = $('#phoneNum');
		var v = $pNum.val();
		//console.log(v.length);
		var pBox = $pNum.parent();
		var tip = pBox.find('i');
		var reg = /^[1][0-9]{10}$/;	
		check(e,pBox,tip,v);
		/*keyup 事件*/
		if(v.length != 0){			
			if(reg.test(v)){				
				return false;
			}else if(v.length > 11){				
				tip.show();	
				tip.html("手机号格式错误，请重新输入");
			}
		}
	}
}());

/*图形码验证*/
$(function(){
	var $code = $('#code');
	var $em = $code.next();	
	$em.click(function(e){		
		var i = parseInt(Math.random()*10);
		$(this).html("");
		$.get("yzm.json",function(data){
			$em.append('<img src="'+data[i].img+'" title="'+data[i].title+'"/>');
		})				
	})	
	$('#code').focus(checkCode);
	$('#code').blur(checkCode);
	$('#code').keyup(checkCode);
	function checkCode(e){		
		var v = $code.val();
		var tit = $em.find('img').attr('title');
		//console.log(tit);
		var pBox = $code.parent();
		var tip = pBox.find('i');
		check(e,pBox,tip,v);				
		if(v != tit){
			//console.log(v+" "+tit);
			tip.show();
			tip.html("图形码输入错误");
		}else{						
			tip.hide();
			return false;
		}
	}
}());
/*短信验证码*/
$(function(){
	var $mess = $('#message');	
	var pBox = $mess.parent();
	var tip = pBox.find('i');
	$mess.focus(checkMess);
	$mess.blur(checkMess);
	$mess.keyup(checkMess);
	function checkMess(e){
		var v = $mess.val();
		var reg = /^([0-9]|[a-z]){4}$/;
		check(e,pBox,tip,v);
		if(v.length == 0){
			//tip.show();
			return;
		}else{
			if(v.length<=4&&v.length>0){
				if(reg.test(v)){				
					tip.hide();
				}
			}else{
				tip.show();
				tip.html("验证码输入错误");
			}
		}
	}
}());
/*封装一个得焦 失焦事件函数*/
function check(e,pBox,tip,v){
	if(e){			
		if(e.type == 'focus') {
			pBox.eq(0).css('border', '2px solid #666');
			tip.hide();
			return false;
		}
		if(e.type == 'blur') {
			if(v.length == 0) {
				pBox.eq(0).css('border', '2px solid #E30485');
				tip.show();
			}
			return false;
		}
	}
}
/*输入账户密码登录*/
$(function(){
	$('.goLogin').click(function(){
		var Vphn = $('#phone').val();
		var Vpwd = $('#pwd').val();
		
		//获取到cookie中的用户信息
		var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
		function convertStrToObj(str) {
			if(!str) {
					return {};
			}				
			var users = str.split(":");
			var res = {};
			for(var i = 0; i < users.length; i++) {
				var userData = users[i].split(",");
				res[userData[0]] = userData[1];			
			}
			return res;
			}
			//将对象转为字符串
			function convertObjToStr(obj) {
				var res = "";
				//遍历对象
				for(var usn in obj) {
					var pwd = obj[usn];
					if(res) {
						res += ":";
					}
					res += usn + "," + pwd;
				}
				return res;
			}
			users = convertStrToObj(users);
			//user1["test1"]  "123"
			if(users[Vphn] == Vpwd) {
				//登录成功
				$.cookie("userName", Vphn, {
					expires: 7,
					path: "/"
				});
				//跳转到首页
				window.location.href = "../homePage/home.html";
			} else {
				//登录失败
				alert("用户名或密码不匹配,请确认后重试。");
			}							
	})
	$('#goRes').click(function(){
		window.location.href = "../registerPage/register.html";
	})
	
}())



