!function($){

	$(document).ready(function(){
		//init gallery
		var index = 0;
		$(new Image()).appendTo('#bg').addClass('view').data('update',function(src,width,height){

			var multiple = 2;
			width = width*multiple+20;
			height = height*multiple+20;
			$('#bg>.view').css({
				minHeight:height,
				minWidth:width,
				height:height,
				width:width,
				top:($(window).height()-height)/2,
				left:($(window).width()-width)/2
			}).attr('src',src).show('normal','easeInOutQuint');

		}).data('interval',function(){
			var img = new Image();
			img.onload = function(){
				$('#bg>.view').hide().data('update')(this.src,this.width,this.height);
			};
			img.src = $('#bg>img:not(.view)').eq(index).attr('src');
			index++;
			if(index+1>$('#bg>img:not(.view)').length)
				index = 0;
		});
		$('#bg>.view').data('interval')();
		
		setInterval(function(){
			$('#bg>.view').data('interval')();
		},8000);

		$(window).bind('resize',function(){
			$('#bg>.view').css({
				top:($(window).height()-$('#bg>.view').height())/2,
				left:($(window).width()-$('#bg>.view').width())/2
			});
		});

		//init sidebar-nav
		$('.nav-catalog>li').each(function(i){
			$(this).find('ul').parent().addClass('sub').attr('expansion',false).children('a').prepend('<i>[ <b>-</b> ]</i>');
		});
		$('.nav-catalog>li.sub>ul').hide().parents('li').find('b').text('+');
		$('.nav-catalog>li.sub ul>.current-cat').parent().show().parents('li').find('a>i>b').text('-');
		$('.nav-catalog>li>a>i').click(function(e){
			var expansion = $(this).parents('li').attr('expansion')=='true';
			$(this).find('b').text(expansion?'+':'-').parents('.sub').attr('expansion',!expansion).find('ul')[expansion?'slideUp':'slideDown']('normal','easeInOutQuint');
		});
		$('.nav-catalog>li>a').click(function(e){
			if(this!=e.target) return false;
			window.location.href=$(this).attr('rel');
		});

		// $('#article').width($('.article').outerWidth()*$('.article').length).height($(window).height());

		//init navtip
		//$('#bottom>nav>a').navtip('#bottom~.tip',[-20,10]);
	});

	$.fn.navtip=function(tip,spacing){
		this.click(function(){
			if($(this).attr('rel'))
			{
				var offset = $(this).offset();
				$(tip).filter($(this).attr('rel')).css({top:offset.top-$(tip).outerHeight()-10,left:offset.left+spacing[1],opacity:0}).show().animate({top:offset.top-$(tip).outerHeight()-10+spacing[0],opacity:1},'normal','easeInOutExpo');
			}
		});
		$(tip).bind('mouseleave',function(){
			$(this).stop().animate({top:$(this).offset().top+$(this).outerHeight()+20,opacity:0},'normal','easeInOutExpo',function(){$(this).hide()});
		});
	};

}(jQuery);