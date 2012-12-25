!function($){

	$(document).ready(function(){

		$('#bottom>nav>a').navtip('#bottom~.tip',[-20,10]);

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