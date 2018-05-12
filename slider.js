(function($){//匿名函数

	$.extend({
		slider:function(options){
			new slider(options);
		}
	});

	function slider(options){
		this.opts = $.extend({},slider.defaluts,options ||{});
		this.carousel();
	}

	slider.prototype.carousel = function(){
		var options = this.opts;
		options.index = 0;//图片索引
		options.timer = null;//定时器
		for (var j = 0; j < options.container.find("ul").first().find("li").length; j++) { //创建圆点
			options.aBox.append('<li></li>')
		}

		var firstimg = options.container.find("ul").first().find("li").first().clone(); //复制第一张图片
		options.container.find("ul").first().append(firstimg)
		.width(options.container.find("ul").first().find("li").length * (options.container.find("ul").first().find("img").width())); //将复制的第一张图片放到最后一张图片后面，设置ul的宽度为图片张数*图片宽度

		var imgLi = options.container.find("ul").first().find("li");
		var numLi = options.aBox.find("li");
		numLi.first().addClass('active'); //初始化给第一个圆点添加样式

		// 下一个按钮
		options.bBox.find('span:last').click(function(){
			play();
		});

		// 上一个按钮
		options.bBox.find('span:first').click(function(){
			options.index--;
			if (options.index === -1) {
				options.index = imgLi.length - 2;
				options.container.find("ul").first().css({left:-(imgLi.length - 1) * options.container.width()});
			}
			options.container.find("ul").first().stop().animate({left:-options.index * options.container.width()},options.manualTime);
			numLi.eq(options.index).addClass('active').siblings().removeClass('active');
		});

		//设置按钮的显示和隐藏
		options.container.hover(function(){
			options.bBox.show();
		},function(){
			options.bBox.hide();
		});

		//鼠标划入圆点
		numLi.mouseover(function(){
			var _index = $(this).index();
			options.container.find("ul").first().stop().animate({left:-_index * options.container.width()},options.dotTime);
			numLi.eq(_index).addClass('active').siblings().removeClass('active');
			options.index = _index;
		});

		//定时器自动播放
		timer = setInterval(function(){
			play();
		},options.autoTime);

		//鼠标移入，暂停自动播放，移出，开始自动播放
		options.container.hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(function(){
				play();
			},options.autoTime)
		});

		play = function(){
			options.index++;
			if (options.index === imgLi.length) {
				options.index = 1;//注意此处应是1，划过第一张了
				options.container.find("ul").first().css({left:0});//立刻将图片容器移到第一张位置 保证无缝轮播，设置left值
			}

			options.container.find("ul").first().stop().animate({left:-options.index * options.container.width()},options.manualTime);
			if (options.index === imgLi.length - 1) {//设置小圆点指示
				numLi.eq(0).addClass('active').siblings().removeClass('active');
			}else{
				numLi.eq(options.index).addClass('active').siblings().removeClass('active');
			}
		}
	};

	//默认参数列表
	slider.defaults = {
		container:null,//对象容器
		aBox:null,//指示对象
		bBox:null,//按钮对象
		autoTime:2000,//自动切换时间间隔
		manualTime:300,//手动箭头切换时间间隔
		dotTime:150//手动圆点切换时间间隔
	};
})(jQuery);