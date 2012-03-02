;(function($){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.mvc==undefined){ $.classes.mvc={}; }
	
	/**view(mvc视图基类)**/
	$.classes.mvc.view = $.salvia.Class($.classes.base,{
		init:function($super){
			$super();
		},
		request:function(ctrlName,requestContent,args){
			var controllers = $(document).data("Controllers",controllers);
			var ctrl = controllers[ctrlName];
			if(ctrl==undefined){$.error("No find "+ctrlName);return false;}
			if(ctrl[requestContent]==undefined){$.error("No find "+ctrlName+"."+requestContent);return false;}
			if($.isFunction(ctrl[requestContent])){
				try{
					return ctrl[requestContent](args);
				}catch(e){
					$.error(e.message);
				}
			}else{
				return ctrl[requestContent];
			}
		}
		
	});
	
})(jQuery);