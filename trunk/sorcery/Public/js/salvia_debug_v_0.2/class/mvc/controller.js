;(function($){
	
	$.salvia.object.namespace("$.classes.mvc");
	
	$.classes.mvc.controller = $.salvia.object.class($.classes.base,{
		init:function($super,key){
			$super();
			var controllers = $(document).data("Controllers")==undefined?{}:$(document).data("Controllers");
			controllers[key]=this;
			$(document).data("Controllers",controllers);
		}
	});
	
})(jQuery);