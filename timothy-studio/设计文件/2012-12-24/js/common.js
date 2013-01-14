!function($){

	$(document).ready(function(){

		$('#bg>img').each(function(i){
			$(this).load(function(){
				var width = $(this).width();
				var height = $(this).height();
				var multiple = 3;
				width = width*multiple;
				height = height*multiple;
				$(this).width(width).height(height).css({top:($(window).height()-height)/2,left:($(window).width()-width)/2});
			});
		});

		$('#bottom>nav>a').navtip('#bottom~.tip',[-20,10]);

		$('#nav>li.active>ul').slideDown('normal','easeInOutQuint').parents('li').find('b').text('-');
		$('#nav>li>a').click(function(e){
			$(e.target).find('b').text('-').parent().next().slideDown('normal','easeInOutQuint').parents('li').addClass('active')
			.siblings('.active').removeClass('active').find('b').text('+').parent().next().slideUp('normal','easeInOutQuint');
		});

		$('#article').width($('.article').outerWidth()*$('.article').length).height($(window).height());
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