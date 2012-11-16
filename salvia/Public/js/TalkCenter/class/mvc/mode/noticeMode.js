;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.noticeMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				//url:$.getRootPath()+"/UserCenter/JstAnnounce_Rec.asmx/GetUser_AnnounceByStartAndEnd",
				url:$.getRootPath()+"/UserCenter/JstAnnounce_Rec.asmx/GetUser_AnnounceByFromuid",
				dataType:"xml"
			});
		},
		onSuccess:function(data,ajax_options){
			var notices = data.User_Announce!=""?[].concat(data.User_Announce.Item):"";
			var noticesCount = this.noticesCount = data.Count==undefined?notices.length:data.Count.Item.CountNum;
			
			this.request("TalkCenter","updateNotice",[ajax_options._data.groupId,notices,noticesCount]);
		}
	});
})(jQuery);