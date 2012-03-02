;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.loginMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/UserLogin",
				dataType:"xml"
			},filter);
		}
	});
})(jQuery);