;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	
	$.TalkCenter.classes.mvc.mode.accpetFriendMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetAccpetFriend",
				dataType:"xml"
			},function(data){
				data.User_Friends.Item.TypeRela = "1";
				return data.User_Friends.Item;
			});
		},
		onSuccess:function(data,ajax_options){
			//添加新友到好友栏
			this.request("TalkCenter","markfriendAfter",[data]);
		}
	});
})(jQuery);