;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.onlineUserMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetOnlineUser",
				dataType:"xml"
			},filter);
		}
	});
})(jQuery);