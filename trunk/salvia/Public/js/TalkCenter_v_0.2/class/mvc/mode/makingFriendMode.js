;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.makingFriendMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/AddFriendRequset",
				dataType:"xml"
			},{
				data:function(data){
					return Number(data.text)>0;
				}
			});
		},
		onSuccess:function(data,ajax_options){
			var content = "发送好友请求失败，请稍后再试！";
			if(data){
				content="已发送好友请求，请等待对方确认！";
			}
			this.request("TalkCenter","msgBox",["提示信息",content,["Ok"]]);
		}
	});
})(jQuery);