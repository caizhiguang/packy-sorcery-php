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
		}
	});
})(jQuery);