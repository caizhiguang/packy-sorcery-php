!function($){

	$(document).ready(function(){
		$('#totop').click(function(){
			$('body,html').animate({scrollTop:0},'normal','easeOutExpo');
			return false;
		});
		$('#sidenav').scrollable({item:'.items>div',navi:'#navbar'});
	});

}(jQuery);