jQuery(document).ready(function($) {
	var div = document.createElement('div');
	$(div).attr('id','debug-window-size').text($(window).width()+'px')
	.css({
		'float':'right',
		'background':'#232323',
		'color':'#fff',
		'padding':'0 .5em'
	}).appendTo('#think_page_trace_open');

	$(window).bind('resize',function(){
		$('#debug-window-size').text($(window).width()+'px');
	});
});