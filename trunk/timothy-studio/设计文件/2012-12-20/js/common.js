!function($){

	$(document).ready(function(){
		$('#totop').click(function(){
			$('body,html').animate({scrollTop:0},'normal','easeOutExpo');
			return false;
		});
		$('.aside_tab').scrollable({item:'.content>div',navi:'.bar'});
	});

}(jQuery);