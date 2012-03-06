;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.responeFriendRequsetMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/ResponeFriendRequset",
				dataType:"xml"
			});
		},
		onSuccess:function(data,ajax_options){
			var data = Number(data.text);
			if(data==0){
				this.request("TalkCenter","addToFriends","msgBox",[
					"提示信息 ",
					"访问信息发生错误，请稍后再试！",
					["Ok"]
				]);
			}else{
				if(ajax_options._data.IsAgree!=1){return;}
				ajax_options._data.TypeRela="1";
				this.request("TalkCenter","addToFriends",[ajax_options._data]);
				this.request("TalkCenter","updataOnlineUser");				
			}
		}
	});
})(jQuery);