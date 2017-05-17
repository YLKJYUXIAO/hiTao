/*轮播图*/
$(function(){
	var $bannerBox = $('#bannerBox');
	var $banner = $('.banner');
	var $tabImg = $('#bannerBox .tabImg');
	var $banItem = $('.banItem');	
	var $width =$('.imgShow').width();
	var timer=null;
	var index=0;
	$.get('home1.json',function(data){
		var str1 = "";
		var str2 = "";
		//console.log(data);
		for(var i = 0;i<data.length;i++){
			str1 += '<div class="item">'+
						'<img src="img/banner'+data[i].img+'.jpg" />'+
					'</div>';
			str2 += '<li></li>';
		}
		$banItem.width($width*data.length);
		$banItem.append(str1);
		$tabImg.append(str2);
		$tabImg.find("li:first").addClass('active');
	})
	$tabImg.on("click","li",function(){		
		index = $(this).index();		
		changeImg(index);		
	})
	function changeImg(index){
		$banItem.css("left",-$width*index);
		$tabImg.find('li').eq(index).addClass('active').siblings().removeClass('active');
		$.get('home1.json',function(data){
			//console.log(data);
			$bannerBox.css("background",data[index].bg);
		})
	}
	/*左按钮切换*/
	$('#bannerBox .prevBtn').click(function(){
		index--;
		if(index<0){
			index = 3;
		}
		clearInterval(timer);
		changeImg(index);				
	})
	/*右侧按钮切换*/
	$('#bannerBox .nextBtn').click(function(){
		index++;
		if(index > 3){
			index = 0;
		}
		clearInterval(timer);
		changeImg(index);		
		
	})
	/*自动轮播*/
	$bannerBox.mouseenter(function(){
		$('#bannerBox .prevBtn').fadeIn(100);
		$('#bannerBox .nextBtn').fadeIn(100);
		clearInterval(timer);
	})
	$bannerBox.mouseleave(function(){
		$('#bannerBox .prevBtn').fadeOut(100);
		$('#bannerBox .nextBtn').fadeOut(100);
		autoTab();
	})	
	autoTab();
	function autoTab(){
		//clearInterval(timer);
		timer = setInterval(function(){
			if(index >3){
				index = 0;
			}
			changeImg(index);			
			index ++;
		},2000)						
	}
	
}());

/*秒杀部分*/
$(function(){
	var $secKill = $('.secKill');
	var $brand = $('.brand');
	$.get("seckill.json",function(data){
		var str1 = '';
		var str2 = '';
		str1 = '<div class="killLeft">'+
				'<img src="'+data[0].img0+'"/>'+
				'</div>'+
				'<ul class="killRight">'+
					'<li><img src="'+data[0].img1+'"/></li>'+
					'<li><img src="'+data[0].img2+'"/></li>'+
					'<li><img src="'+data[0].img3+'"/></li>'+
					'<li><img src="'+data[0].img4+'"/></li>'+
					'<li><img src="'+data[0].img5+'"/></li>'+
					'<li><img src="'+data[0].img6+'"/></li>'+
				'</ul>'
		$secKill.append(str1);
		
		str2 = '<div class="brandLeft">'+
					'<img src="'+data[1].img0+'" />'+
				'</div>'+
				'<ul class="brandRight">'+
					'<li><img src="'+data[1].img1+'" /></li>'+
					'<li><img src="'+data[1].img2+'" /></li>'+
					'<li><img src="'+data[1].img3+'" /></li>'+
					'<li><img src="'+data[1].img4+'" /></li>'+					
				'</ul>'
		$brand.append(str2);
	})
	$secKill.on('mouseenter','img',function(){
		$(this).animate({top:'-10px'},300,function(){
			$(this).mouseleave(function(){
				$(this).animate({top:'0px'},300)
			})
		})
	})
	
	$brand.on('mouseenter','img',function(){
		$(this).animate({
			filter:"alpha(opacity=70)",
			opacity:"0.7"	
			},100,function(){
				$(this).mouseleave(function(){					
					$(this).animate({
						filter:"alpha(opacity=100)",
						opacity:"1"
						},100)
				})
		})
	})
}());


/*商品展览部分*/
$(function(){
	var $exhibitLeft = $('#mainBox .exhibitLeft');
	var arr =[];
	$.get('exhit.json',function(data){
		var str ='';
		for(var i=0;i<data.length;i++){
			str += 	'<div class="exhibitList">'+
					'<div class="listLeft">'+
						'<img src="'+data[i].img1+'" />'+
					'</div>'+
					'<div class="listRight">'+
							'<div class="listRight-top">'+
								'<img src="'+data[i].img2+'"/>'+
								'<h3>'+data[i].topH3+'</h3>'+
								'<h4>距结束<i class="djs">'+data[i].day+'</i></h4>'+
							'</div>'+
							'<div class="listRight-center">'+
								'<a href="#">'+data[i].centerA+'</a>'+
								'<span>'+data[i].centerSpan+'</span>'+
							'</div>'+
							'<div class="listRight-bottom">'+
								'<h3><em>￥</em>'+data[i].bottomH3+'</h3>'+
								'<h4>'+data[i].bottomH4+'</h4>'+
								'<h2><a href="#">立即抢购</a></h2>'+
							'</div>'+
						'</div>'+
						'</div>'															
		}
		$exhibitLeft.append(str);
		var arr = [];
		for(var j =0;j<$('.djs').length;j++){			
			arr.push($('.djs')[j].innerHTML);
		}
		//console.log(arr);
		var $djs = $('.djs');
		setTime(arr,$djs);		
		//console.log($djs);		
		var $exhibitList = $('#mainBox .exhibitList');		
		$exhibitList.mouseenter(function(){
			$(this).children(".listLeft").find('img').animate({
				width:"460px",
				height:"300px",
				left:"-20px",
				top:"-20px"				
			},500)
		});
		$exhibitList.mouseleave(function(){
			$(this).children(".listLeft").find('img').animate({
				width:"420px",
				height:"260px",
				left:"0px",
				top:"0px"				
			},500)
		});						
	})
	
	/*倒计时函数封装*/
	function setTime(arr,obj){
		//console.log(obj);
		var second = 0;
		var min = 0;
		var hour = 0;
		var T = 0;
		var s = 0;
		var timer = null;					
		for(var i=0;i<arr.length;i++){	
			s = arr[i]*24*3600;			
			auto(s,i);
		}
		function auto(s,i){
			timer = setInterval(function(){	
				s--;
				second= parseInt(s%60);
				min = parseInt((s/60)%60);
				hour = parseInt((s/3600)%24);
				T = parseInt(s/24/3600);								
			    return obj.eq(i).html(T+"天&nbsp;"+hour+":"+min+":"+second);					
			},1000)
		}			
	}	
	/*右侧部分*/	
	$('#mainBox .hotImg dl').mouseenter(function(){
		$(this).css('box-shadow','0px 0px 10px #ccc').siblings().css('box-shadow','none');	
		$(this).find('dd').toggle();
	})
	$('#mainBox .hotImg dl').mouseleave(function(){
		$(this).css('box-shadow','none');
		$(this).find('dd').toggle();		
	})
	$('#mainBox .jectImg img').mouseenter(function(){
		$(this).css('box-shadow','0px 0px 10px #ccc').siblings().css('box-shadow','none');
	})
	$('#mainBox .jectImg img').mouseleave(function(){
		$(this).css('box-shadow','none');
	})
}());









