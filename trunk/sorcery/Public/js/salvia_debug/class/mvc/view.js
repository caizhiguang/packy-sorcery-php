;(function($){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.mvc==undefined){ $.classes.mvc={}; }
	
	/**view(mvc视图基类)**/
	$.classes.mvc.view = $.salvia.Class($.classes.base,{
		init:function($super){
			$super();
		}
	});
	
})(jQuery);