/*根据列表页点击判断应该动态添加哪个商品*/
$(function(){
	var $pid = $.cookie('pid');	
	$.get("proDetail.json",function(data){
		/*搜索结果添加*/
		var pid = 0;
		for(var i = 0;i<data.length;i++){			
			//根据pid判断应该添加哪个商品	
			if($pid == data[i].pid){				
				creatNode(i,data);
			}
		}		
		/*tabImg切换图片*/
		$('.tabImg li').mouseenter(function(){
			var index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('.smaItem').eq(index).addClass('show').siblings().removeClass('show');
			$('.bigItem').eq(index).addClass('show').siblings().removeClass('show');
		})
	});
	/*添加商品*/
	function creatNode(index,data){
			var str1 = "";
			str1 = '<span class="proRes">'+data[index].proRes+'</span>';
			$('.proDet h2').append(str1);
			/*标题部分添加*/
			var str2 = '';
			str2 = '<img src="img/1.png"/>'+
						'<h3 pid="'+data[index].pid+'">'+data[index].titH3+'</h3>'+
						'<div class="proDjs">'+
							'<img src="img/zb.jpg" />距结束<i class="Djs">'+data[index].djs+'</i>'+
						'</div>'
			$('.proTit').append(str2);
			/*放大镜图片添加*/
			/*原图*/
			var str3 = '';
			str3 = '<img src="'+data[index].smaImg.img0+'" class="smaItem show"/>'+
					'<img src="'+data[index].smaImg.img1+'" class="smaItem"/>'+
					'<img src="'+data[index].smaImg.img2+'" class="smaItem"/>'
			$('.smaPic').append(str3);
			/*tab切换图片*/
			var str4 = '';
			str4 = '<li><img src="'+data[index].tabImg.img0+'"/></li>'+
					'<li><img src="'+data[index].tabImg.img1+'"/></li>'+
					'<li><img src="'+data[index].tabImg.img2+'"/></li>'
			$('.tabImg').append(str4);
			/*放大后的图片添加*/
			var str5 = '';
			str5 = '<img src="'+data[index].bigImg.img0+'" class="bigItem show"/>'+
					'<img src="'+data[index].bigImg.img1+'" class="bigItem"/>'+
					'<img src="'+data[index].bigImg.img2+'" class="bigItem"/>'
			$('.bigPic').append(str5);
			/*右侧详情部分标题*/
			var str6 = '';
			str6 = '<h3>'+data[index].proRes+'<img src="img/1.png"/></h3>'
			$('.messRight').prepend(str6);
			/*价格部分添加*/
			var str7 = '';
			str7 = '<h4><i>￥</i>'+data[index].price+'</h4><h5>官方指导价<i>'+data[index].introPrc+'</i></h5>';
			$('.messRight .post').before(str7);
			/*倒计时处理*/
			var day = data[index].djs;
			var $djs = $('.Djs');
			setTime(day,$djs);
		}
		
}())
/*倒计时函数封装*/
	function setTime(day,obj){
		//console.log(obj);
		var second = 0;
		var min = 0;
		var hour = 0;
		var T = 0;
		var s = day*24*3600;	;
		var timer = null;		
			timer = setInterval(function(){	
				s--;
				second= parseInt(s%60);
				min = parseInt((s/60)%60);
				hour = parseInt((s/3600)%24);
				T = parseInt(s/24/3600);
			    return obj.html(T+"天&nbsp;"+hour+":"+min+":"+second);					
			},1000)		
	}
/*放大镜部分*/
$(function(){	
	/*鼠标移入移出事件*/
	$('.markFdj').mouseenter(function(){
		$('.floor').show();
		$('.bigPic').show();
	})
	$('.markFdj').mouseleave(function(){
		$('.floor').hide();
		$('.bigPic').hide();
	})
	/*移动浮动块*/
	$('.markFdj').mousemove(function(e){
		var x = e.pageX - $('.smaPic').offset().left - $('.floor').width()/2;
		var y = e.pageY - $('.smaPic').offset().top - $('.floor').height()/2;
		
		if(x < 0){
			x = 0;
		}
		if(x > $('.smaPic').width() - $('.floor').width()){
			x = $('.smaPic').width() - $('.floor').width();
		}
		if(y < 0){
			y = 0;
		}
		if(y > $('.smaPic').height() - $('.floor').height()){
			y = $('.smaPic').height() - $('.floor').height();
		}
		/*浮动块移动*/
		$('.floor').css({
			left:x,
			top:y
		});
		var perX = x/($('.smaPic').width() - $('.floor').width());
		var perY = y/($('.smaPic').height() - $('.floor').height());
		var X = -perX*($('.bigItem').width()-$('.bigPic').width());
		var Y = -perY*($('.bigItem').height()-$('.bigPic').height())
		$('.bigPic img').css({
			left:X,
			top:Y
		});
	})
}());

/*商品详细信息右侧*/
$(function(){
	$('.messRight').find('em').click(function(){
		$(this).addClass('col').siblings().removeClass('col');
	})
	/*加减按钮添加事件*/
	var num =0;
	$('#prev').click(function(){		
		var $Vt = $('#text').val();
		$Vt--;
		if($Vt <= 0){
			$Vt = 1;
		}
		$('#text').val($Vt);
	})
	$('#next').click(function(){
		var $Vt = $('#text').val();
		$Vt++;
		$('#text').val($Vt);
	})
}());

$(function(){
	$('#count').html($.cookie('goodsKind'));
	/*加入购物车点击事件*/
	$('#proDetBox .addBtn').click(function(e){
		var pid = $('#proDetBox .proTit h3').attr('pid');		
		var isSave = checkHasGoodsById(pid); //根据id判断该商品是否在购物车中存在
		if(isSave){ //有
			updateGoodsById(pid,1);
		}else{  //没有
			var tit = $('#proDetBox .proTit h3').html();
			var src = $('#proDetBox .smaPic').find('img').attr('src');
			var price = $('#proDetBox .messRight h4').text();
			var num = Number($('#text').val());
			//用对象的方式把单个商品组织起来{键:值,键:值,键:值,键:值....}*/
			var obj = {pid:pid,src:src,num :num,tit:tit,price:price,count:1};  
			addGoodsToCart(obj) //添加数据到购物车，添加数据到本地cookie
		}
		
		getKind();//获取商品种类数量
		$('#count').html($.cookie('goodsKind'));
		//console.log($("#count").offset().left);
		//飞入购物车的效果
		var cloneImg = $('#proDetBox .smaPic').find('img').clone().css({width:50,height:50});
		cloneImg.fly({
			start: {
				top: e.clientY,
				left: e.clientX
			},
			end: {
				top: $("#sideBar .cart").offset().top,
				left: $("#sideBar .cart").offset().left+100,
				width: 0,
				height: 0
			},
			autoPlay: true,
			onEnd : function(){			
				cloneImg.remove();
			}
		})				
	})							
	
}())


$(function(){
	/*猜你喜欢 部分动态添加*/
	$.get("gLike.json",function(data){
		var str = '';
		for(var i = 0;i<data.length;i++){
			str += '<dl>'+
						'<dt><img src="'+data[i].img+'"/></dt>'+
						'<dd>'+
							'<h3>'+data[i].ddH3+'</h3>'+
							'<span>'+data[i].ddSp+'</span>'+
						'</dd>'+
					'</dl>'
		}
		$('.gLike').append(str);				
	})	
	/*商品介绍部分图片动态添加*/
	function intro(){		
		$.get("img.json",function(data){
			var $height = 0;
			var str = '';
			for(var i = 0;i<data.length;i++){
				str = '<li><img src="'+data[i].img+'"/></li>' 
				$('.intro-imgBox').append(str);
				/*var $imgH = Number(data[i].imgH);//获得每个图片的高度
				$height += $imgH;//所有图片的总高度*/
			}
			/*$height = $height + $('.introdRight ul').height() +$('.intImg').height() + $('intItem h2').height() + $('intItem h3').height() + $('.intMessage').height();
			$('.introdRight').height($height);
			$('.introd').height($height+100);
			$('#introdBox').height($height+100);*/			
	 	})
	}
	
	/*商品评价部分动态添加*/
	function evals(){
		$.get("dl.json",function(data){
			var str = '';
			var $height = 0;
			for(var i=0;i<data.length;i++){
				str += '<dl>'+
						'<dt><img src="'+data[i].img+'"/></dt>'+
						'<dd>'+
							'<h2><em>'+data[i].intHE+'</em><i>'+data[i].intHI+'</i></h2>'+
							'<span>'+data[i].intHS+'</span>'+
						'</dd>'+
					  '</dl>';
			}		
			$('#introdBox .intTwo').append(str);
			/*var $dlH = $('#introdBox .intTwo dl:first').height();//单个dl的高度
			$height = data.length*$dlH;//dl的总高度			
			$('.introdRight').height(1580);
			$('.introd').height(1600);//设置主体的高度
			$('#introdBox').height(1600);//设置主体盒子的高度*/
		})
	}
	
	/*商品介绍与评价部分*/
	intro();	
	$('.introdRight ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		$('#introdBox .intItem').eq(index).addClass('show').siblings().removeClass('show');
		if($('#introdBox .intFirst').hasClass('show')){			
			$('#introdBox .intTwo').html("");//清空商品评价部分
			intro();//调用商品介绍图片的封装函数
		}else{
			$('#introdBox .intro-imgBox').html("");//清空商品介绍图片部分
			evals();//调用商品评价的封装函数
		}				
	})
}())










