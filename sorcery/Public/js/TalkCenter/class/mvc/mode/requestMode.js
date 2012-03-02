;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.requestMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetRequestToMe",
				dataType:"xml"
			},function(data){
				if(data.GFRequest==""){return "";}//当没有新信息时跳出
				return [].concat(data.GFRequest.Item);
			});
		}
	});
})(jQuery);