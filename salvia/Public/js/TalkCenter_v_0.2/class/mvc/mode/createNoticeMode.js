;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.createNoticeMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/JstAdminManagerGroup.asmx/AddAnnounce_Rec",
				dataType:"xml"
			});
		},
		onSuccess:function(data,ajax_options){
			var result = data.text == "1";
			this.request("TalkCenter","createNotice",[result,ajax_options._data]);
		}
	});
})(jQuery);