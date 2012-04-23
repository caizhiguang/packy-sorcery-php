;(function($){
	
	$.salvia.object.namespace("$.classes.mvc");
	
	$.classes.mvc.view = $.salvia.object.Class($.classes.base,{
		init:function($super,ctrlKey){
			this._ctrlKey = ctrlKey;
			$super();
		},
		request:function(){
			var arg = $.argToArray(arguments);
			var controllers = $(document).data("Controllers");
			var ctrl,method,args,ctrlName;
			ctrlName = typeof arg[0] =="string" && arg[1] == "string" ? arg[0]:this._ctrlKey;
			ctrl = controllers[ctrlName];
			method = typeof arg[0] =="string" && arg[1] == "string" ? arg[1] : arg[0];
			args = typeof arg[0] =="string" && arg[1] == "string" ? arg[2] : arg[1];
			
			if(ctrl==undefined){$.error("No find "+ctrlName);return false;}
			if(ctrl[method]==undefined){$.error("No find "+ctrlName+"."+method);return false;}
			if($.isFunction(ctrl[method])){
				try{
					return ctrl[method].apply(ctrl,args==undefined?[]:args);
				}catch(e){
					$.error(e.message);
				}
			}else{
				return ctrl[method];
			}
		}
	});
	
})(jQuery);