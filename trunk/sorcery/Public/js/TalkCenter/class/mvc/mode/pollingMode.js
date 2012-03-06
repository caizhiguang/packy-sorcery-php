;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.pollingMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/CheckMessage1",
				dataType:"xml"
			},function(data){
				return data.MsgToMe;
			});
		},
		onSuccess:function(data,ajax_options){
			if(data==""){return;}
			//this作用于options
			var messageCount = data.Check.Item.Message;
			var requestCount = data.Check.Item.Request;
			var noticeCount = data.Check.Item.Notice;
			var fRequestCount = data.Check.Item.FRespone;
			var expertGroupCount = data.Check.Item.Pro;
			
			var ctrl_mode = this.request("TalkCenter","mode");
			var ctrl_data = this.request("TalkCenter","data");
			if(Number(messageCount)!=0){ctrl_mode.messageMode.load({data:{To:ctrl_data.userId,Start:ajax_options._data.start,End:ajax_options._data.end,group:ctrl_data.groupIds}});}
			if(Number(requestCount)!=0){ctrl_mode.requestMode.load({data:{myId:ctrl_data.userId}});}
			//if(Number(noticeCount)!=0){ctrl_mode.loadNotice();}
			if(Number(fRequestCount)!=0){ctrl_mode.friendMode.load({data:{Uid:ctrl_data.userId}});}
		}
	});
})(jQuery);