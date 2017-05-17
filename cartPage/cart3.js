
$(function(){
	/*热销推荐动态添加*/	
	$.get("hotCake.json",function(data){
		var str = '';
		for(var i=0;i<data.length;i++){
			str += '<div class="prodList">'+
					'<img src="'+data[i].img+'"/>'+
					'<span>'+data[i].span+'</span>'+
					'<h3>'+data[i].H3+'</h3>'+
					'<h4><a href="#">立即购买</a></h4>'+
					'</div>'
		}
		$('#cartBox .hotCake').append(str);
	})
	/*获取cookie中的值*/
	
	//$('#count').html($.cookie('goodsKind'));
	var totalCount = getTotalCount();//商品数量
	
	//console.log(totalCount);
	if(totalCount){
		$("#cartBox .empty").hide();
		var goodsListObj = getGoosListObj(); //获取本地数据		
		for(var i = 0;i<goodsListObj.length;i++){						
			var str = '<div class="proItem" pid="'+goodsListObj[i].pid+'">'+
				'<h3><input type="checkbox" class="checkTit"/>韩国直邮4号仓库</h3>'+
					'<div class="mesList">'+
					'<input type="checkbox" class="check"/>'+
					'<img src="'+goodsListObj[i].src+'"/>'+
					'<h4>'+goodsListObj[i].tit+'</h4>'+
					'<i>'+goodsListObj[i].price+'</i>'+
					'<div class="btnBox">'+
					'<a href="javascript:;" class = "prevBtn">-</a>'+
					'<input type="text" class="proNum" value="'+goodsListObj[i].num+'" />'+
					'<a href="javascript:;" class ="nextBtn">+</a>'+
					'</div>'+
					'<span class="subtot">'+goodsListObj[i].price+'</span>'+
					'<a href="javascript:;" class="del"></a>'+
					'<h5>商品金额：<em>'+goodsListObj[i].price+'</em></h5>'+
					'</div>'+
				'</div>'
				$('#cartBox .mainCart').append(str);				
		}
	}else{
		$('#cartBox .mainCart').hide();
		$('#cartBox .headTit').hide();
		$('#cartBox .goPay').hide();
		$("#cartBox .empty").show();
	}
	/*增加、减少、删除*/	
	$('.prevBtn').click(function(){
		var num = $(this).next().val();
		var $mesList = $(this).parents('.mesList');
		var price = $mesList.find('i').html().slice(1);//商品价格
		
		num --;
		if(num<=1){
			num=1;
		}
		$(this).next().val(num);
		$mesList.find('.subtot').html("￥"+num*price+".00");//小计
		$mesList.find('.check')[0].checked = true;
		getTotalPrice();
		allCheckBox();
	})
	//增加
	$('.nextBtn').click(function(){
		var num = $(this).prev().val();
		var $mesList = $(this).parents('.mesList');
		var price = $mesList.find('i').html().slice(1);//商品价格
		num++;
		$(this).prev().val(num);		
		$mesList.find('.subtot').html("￥"+num*price+".00");//小计
		$mesList.find('.check')[0].checked = true;
		getTotalPrice();
		allCheckBox();
	})
	/*删除*/
	$('.del').click(function(){
		var index = $('#product-num').html();
		if(index<=0){
			index = 0;
		}else{
			index--;
		}		
		var thisPid = $(this).parents('.proItem').attr('pid');		
		deleteGoodsById(thisPid);
		$('#product-num').html(index);
		$(this).parents('.proItem').remove();
		if(!($('.proItem').css('display') == 'block')){
			$('#cartBox .headTit').hide();
			$('#cartBox .goPay').hide();
			$("#cartBox .empty").show();
		}
		getKind();//调用求商品种类的函数
		$('#count').html($.cookie('goodsKind'));
	})
	/*勾选框点击事件*/	
	var talNum = 0;
	$('.check').change(function(){		
		for(var i=0;i<$(this).length;i++){
			if($(this)[0].checked ==true){
				$(this).parent().prev().find('.checkTit')[0].checked = true;
				talNum ++;
			}else{
				$(this).parent().prev().find('.checkTit')[0].checked = false;
				talNum --;
				if(talNum<=0){
					talNum = 0;
				}
			}
		}
		$('#product-num').html(talNum);
		getTotalPrice();
		allCheckBox();
	})
	//全选事件
	$("#checkAll").change(function(){
		var cks = $('.check');
		for(var i = 0;i<cks.length;i++){
			cks[i].checked = this.checked;
			cks.eq(i).parents('.mesList').prev().find('.checkTit')[0].checked = this.checked;
		}
		if(this.checked == false){
			$('#product-num').html(0);
		}else{
			$('#product-num').html(cks.length);
		}	
		getTotalPrice();
	})
	//计算商品价格函数封装
	function getTotalPrice(){
		var cks = $(".check");
		var totalPrice = 0;
		for(var i = 0;i<cks.length;i++){
			if(cks[i].checked){
				var price = $(cks[i]).parents(".mesList").children(".subtot").html().slice(1);//小计
				totalPrice=totalPrice+Number(price);//总价格				
			}
		}
		$('#cartBox .allPrice').html("￥"+totalPrice+".00");//设置总价格
	}
	//全选事件函数封装
	function allCheckBox(){
		var cks = $(".check");
		var flag = true;
		for(var i = 0;i<cks.length;i++){
			if(!cks[i].checked){
				flag = false;	
				break;
			}
		}	
		$("#checkAll")[0].checked = flag;	
	}	
}())