;(function($){
	
	$.salvia.object.namespace("$.classes.mvc");
	
	$.classes.mvc.view = $.salvia.object.class($.classes.base,{
		init:function($super,ctrlKey){
			this._ctrlKey = ctrlKey;
			$super();
		},
		request:function(){
			var arg = $.argToArray(arguments);
			var controllers = $(document).data("Controllers");
			var ctrl,method,args,ctrlName;
			ctrlName = typeof arg[0] =="string" && arg[1] == "string" ?typeof arg[0]:this._ctrlKey;
			ctrl = controllers[ctrlName];
			method = typeof arg[0] =="string" && arg[1] == "string" ? typeof arg[1] : typeof arg[0];
			args = typeof arg[0] =="string" && arg[1] == "string" ? typeof arg[2] : typeof arg[1];
			
			if(ctrl==undefined){$.error("No find "+ctrlName);return false;}
			if(ctrl[requestContent]==undefined){$.error("No find "+ctrlName+"."+requestContent);return false;}
			if($.isFunction(ctrl[requestContent])){
				try{
					return ctrl[requestContent].apply(ctrl,args==undefined?[]:args);
				}catch(e){
					$.error(e.message);
				}
			}else{
				return ctrl[requestContent];
			}
		}
	});
	
})(jQuery);