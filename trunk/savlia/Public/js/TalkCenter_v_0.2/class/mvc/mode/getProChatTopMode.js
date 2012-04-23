;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.getProChatTopMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetProChatTopN",
				dataType:"xml"
			});
		},
		onSuccess:function(data,ajax_options){
			if(data.ProChat.Item==undefined){return;}
			var data = [].concat(data.ProChat.Item);
			this.request("TalkCenter","updateTopNews",[data]);
		}
	});
})(jQuery);