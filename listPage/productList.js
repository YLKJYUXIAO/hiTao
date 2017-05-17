$(function(){
	/*分类动态添加*/
	$.get("dt.json",function(data){
		//console.log(data);
		for(var i = 0;i<data.length;i++){
			var str = '';
				str = '<a href="#">'+data[i].daA+'</a>';
				$('#mainBox .listTop dl dt').append(str);
		}		
	})
	/*品牌动态添加*/
	$.get("dd1.json",function(data){
		for(var i=0;i<data.length;i++){
			var str = '';
				str = '<a href="#">'+data[i].dd1A+'</a>';
				$('#mainBox .brand').append(str);
		}
	})
	/*价格动态添加*/
	$.get("dd2.json",function(data){
		for(var i=0;i<data.length;i++){
			var str = '';
				str = '<a href="#">'+data[i].price+'</a>';
				$('#mainBox .price').append(str);
		}
	})
	//console.log($('#mainBox .brand h4'));
	var sum =1;
	$('#mainBox .brand h4').click(function(){
		sum++;
		$(this).find('span').toggle();
		if((sum%2)==0){
			$('#mainBox .brand').css("height","80px");
			$('#mainBox .listTop').css("height","250px");
			$('#mainBox .listTop dl').css("height","165px");
		}else{
			$('#mainBox .brand').css("height","40px");
			$('#mainBox .listTop').css("height","210px");
			$('#mainBox .listTop dl').css("height","125px");
		}
	})
	/*排序选项点击事件*/
	//console.log($('#mainBox .listCenter h4'));
	$('#mainBox .listCenter h4').click(function(){
		$(this).css("border","1px solid #E30485").siblings('h4').css("border","1px solid #666");
	})
	
	
}())
/*商品列表项动态创建*/
$(function(){
	$.getJSON("productList.json",function(data){
		var str = '';
		for(var i=0;i<data.length;i++){
			str += '<div class="listItem" pid="'+data[i].pid+'">'+
						'<div class="imgBox">'+
							'<img src="'+data[i].img0+'"/>'+
						'</div>'+
						'<h2><img src="'+data[i].img1+'"/><em>'+data[i].iH2+'</em></h2>'+
						'<h3>'+data[i].iH3+'</h3>'+
						'<h4>￥<em>'+data[i].iH4em+'</em><br><b>'+data[i].iH4b+'</b></h4>'+
						'<span class="onCent">无货</span>'+
						'<span class="onBott"></span>'+
					'</div>';
			
		}		
		$('#mainBox .productList').append(str);
		$('#product-num').html(data.length);//设置搜索到的商品数量
		/*var $len = Math.ceil(data.length/4);//列表项个数		
		var $itemH = ($('#mainBox .listItem').height()+20)*$len;//单个列表项的高度
		var $topH = $('#mainBox .listTop').height();//主体头部的高度
		var $centerH = $('#mainBox .listCenter').height();//主体中间部分高度
		var $height = $itemH + $topH + $centerH +100;//主体总高度
		
		$('#mainBox .productList').css("height",$itemH);//设置主体底部列表块的总高度
		$('#mainBox .main').css("height",$height);//设置主体高度
		$('#mainBox').css("height",$height);*/
		
		$('#mainBox .listItem:eq(40)').nextAll().find('.onCent').show();//从41个往后都设置为无货状态
		$('#mainBox .listItem:first').append('<span class="hotBuy">特卖</span>')//给第一个列表项加 特卖 标签
		
		//给每个模块加移入事件			
		$('#mainBox .listItem').mouseenter(function(){
			var that =this
			var $img = $(this).children().children('img:first');
			$img.animate({
				width:"290px",
				height:"290px",
				left:"-10px",
				top:"-10px",
			},200)
		})
		$('#mainBox .listItem').mouseleave(function(){
			var $img = $(this).children().children('img:first');
			$img.animate({
				width:"270px",
				height:"270px",
				left:"0px",
				top:"0px"
			},500)
		})
	
		/*存放cookie*/
		$('#mainBox .listItem').click(function(){
			var $pid = $(this).attr('pid');
			$.cookie("pid",$pid,{expires:7,path:"/"});
			window.location = "../detailPage/proDetail.html";
		})
	
	})
	$('#count').html($.cookie('goodsKind'));
}())



