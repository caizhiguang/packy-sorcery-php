;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.accpetFriendMode = $.salvia.Class($.classes.mvc.mode,{
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
			this.request("TalkCenter","addToFriends",[data]);
			this.request("TalkCenter","msgBox",[
                "提示信息 ",
				"对方 "+data.FUserName+" 已同意加你为好友！",
				["Ok"]
			]);
		}
	});
})(jQuery);