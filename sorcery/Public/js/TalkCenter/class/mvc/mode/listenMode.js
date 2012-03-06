;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.listenMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/AddFriendFocus",
				dataType:"xml"
			},{
				data:function(data){
					return Number(data.text)>0;
				}
			});
		},
		onSuccess:function(data,ajax_options){
			var content = "加关注成功";
			if(data)
			{
				this.request("TalkCenter","addToFriends",[options._data]);
			}else{
				content="加关注失败"
			}
			
			this.request("TalkCenter","msgBox",["提示信息",content,["Ok"]]);
		}
	});
})(jQuery);