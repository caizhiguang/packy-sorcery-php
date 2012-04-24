;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.onlineUserMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetOnlineUser",
				dataType:"xml"
			},filter);
		},
		onSuccess:function(data,ajax_options){
			data = data.text;
			this.request("TalkCenter","updataOnlineUser",[data]);
		}
	});
})(jQuery);