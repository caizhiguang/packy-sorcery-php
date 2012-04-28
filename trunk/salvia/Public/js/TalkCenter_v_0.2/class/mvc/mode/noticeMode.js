;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.noticeMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				//url:$.getRootPath()+"/UserCenter/JstAnnounce_Rec.asmx/GetUser_AnnounceByStartAndEnd",
				//url:$.getRootPath()+"/UserCenter/JstAnnounce_Rec.asmx/GetUser_AnnounceByFromuid",
				url:$.getRootPath()+"/UserCenter/JstAnnounce_Rec.asmx/GetAllUser_Announce",
				dataType:"xml"
			});
		},
		onSuccess:function(data,ajax_options){
			var notices = data.User_Announce!=""?[].concat(data.User_Announce.Item):"";
			this.request("TalkCenter","updateGroupNoticeByGroupId",[ajax_options._data.groupId,notices]);
		}
	});
})(jQuery);