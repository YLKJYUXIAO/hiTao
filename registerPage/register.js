	/*手机号*/
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

/*图形码验证*/
$(function(){
	var $code = $('#code');
	var $em = $code.next();
	$em.click(function(e){		
		var i = parseInt(Math.random()*10);		
		$(this).html("");
		$.get("yzm.json",function(data){
			$(this).html("");
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
		var reg = /^([0-9]|[a-z]){6}$/;
		check(e,pBox,tip,v);
		if(v.length == 0){
			//tip.show();
			return;
		}else{
			if(v.length<=6&&v.length>0){
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

/*昵称验证*/
$(function(){
	var $petName = $('#petName');
	var pBox = $petName.parent();
	var tip = pBox.find('i');
	$petName.focus(checkPet);
	$petName.blur(checkPet);
	$petName.keyup(checkPet);
	function checkPet(e){
		var v = $petName.val();
		var reg = /^[\u4e00-\u9fa5\w-]+$/;
		check(e,pBox,tip,v);
		if(v.length == 0){
			//tip.show();
			return;
		}else{
			if(reg.test(v)){
				tip.hide();
			}else{
				tip.show();
				tip.html("仅支持汉字、字母、数字、“-”“_”的组合");
			}
		}
	}	
}());
/*密码*/
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
/*确认密码*/
$(function(){
	var $pwd = $('#pwd');
	var $secPwd = $('#secPwd');
	var pBox = $secPwd.parent();
	var tip = pBox.find('i');
	$secPwd.focus(checkSec);
	$secPwd.blur(checkSec);
	$secPwd.keyup(checkSec);
	function checkSec(e){		
		var v1 = $('#pwd').val();
		var v2 = $('#secPwd').val();
		check(e,pBox,tip,v1);
		if(v1!=v2){
			tip.show();
			tip.html("确认密码输入错误");
		}else{
			tip.hide();
		}
	}
	
	
}())
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

/*下一步 注册 按钮点击事件*/
$(function(){
	//下一步点击事件
	$('#mainBox .goNext').click(function(){	
		if(!(/^[1][0-9]{10}$/).test($('#phone').val())){
			alert('请输入正确的手机号');
		}
		var tit = $('#code').next().find('img').attr('title');
		if($('#code').val()!=tit){
			alert('请输入正确的图形码');
		}
		if(!(/^([0-9]|[a-z]){6}$/).test($('#message').val())){
			alert('请输入正确的验证码');
		}
		//下一步点击事件验证		
		if((/^[1][0-9]{10}$/).test($('#phone').val())&&$('#code').val()==tit&&(/^([0-9]|[a-z]){6}$/).test($('#message').val())){
			
		$('#mainBox .item:first').hide().siblings().show();
		}else{		
			$(this).css("cursor","not-allowed");
		}										
	})
	$('#goLogin').click(function(){
		window.location.href = "../loginPage/login.html";
	})		
	
}())
/*注册信息存入cookie中*/
$(function(){
	$('#goLogin').click(function(){
		window.location.href = "../loginPage/login.html";
	})
	//注册点击事件判断验证
	$('#register').click(function(){
		var phone = $("#phone").val();
		var pwd = $("#pwd").val();
		var secPwd = $("#secPwd").val();
		var petName = $('#petName').val();
		var reg = /^[\u4e00-\u9fa5\w-]+$/;//昵称正则判断
		//注册协议勾选判断
		if($('#agm')[0].checked == true){
			if($('#pwd').val()!=$('#secPwd').val()){
				alert('两次密码输入不一致');
			}
			//输入框里内容判断
			var agm = reg.test(petName)&&(/^[\w]+$/).test(pwd)&&pwd==secPwd;
			if(agm){
				var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
				users = convertStrToObj(users);
				if(phone in users) {
					alert("用户名已经被注册");
					return;
				} else {
					users[phone] = pwd;
					//将用户信息对象转化回字符串，以便于设置cookie
					usersStr = convertObjToStr(users);
					//设置用户信息cookie
					$.cookie("registerUsers", usersStr, {
						expires: 7,
						path: "/"
					});
					alert("注册成功");
				}									
			}
							
		}else{
			alert('您是否同意注册协议呢？');
		}
				
				
		
	})
		//将字符串转为对象
	function convertStrToObj(str) {
		if(!str) {
			return {};
		}
		//"test1,123:test2,abc:test3,888"	
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
		for(var usn in obj) {
			var pwd = obj[usn];
			if(res) {
				//看是否是第一组用户名和密码信息
				//如果不是，先在前面添加一个：
				res += ":";
			}
			res += usn + "," + pwd;
		}
		return res;
	}
}())

