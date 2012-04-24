;(function($){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.mvc==undefined){ $.classes.mvc={}; }
	
	/**controller(mvc控制器基类)**/
	$.classes.mvc.controller = $.salvia.Class($.classes.base,{
		init:function($super,key){
			$super();
			var controllers = $(document).data("Controllers")==undefined?{}:$(document).data("Controllers");
			controllers[key]=this;
			$(document).data("Controllers",controllers);
		}
	});
	
})(jQuery);