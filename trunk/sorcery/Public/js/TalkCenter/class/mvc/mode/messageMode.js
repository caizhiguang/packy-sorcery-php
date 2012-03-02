;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.messageMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetGroup_FriendByTo1",
				dataType:"xml"
			},function(data){
				if(data.MsgToMe==""){return "";}//当没有新信息时跳出
				return [].concat(data.MsgToMe.Item);
			});
		}
	});
})(jQuery);