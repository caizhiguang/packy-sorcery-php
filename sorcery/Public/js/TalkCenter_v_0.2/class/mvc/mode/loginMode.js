;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.loginMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/UserLogin",
				dataType:"xml"
			},filter);
		},
		onBeforeSend:function(ajax_options){
			this.request("TalkCenter","loginLoading");
		},
		onComplete:function(ajax_options){
			this.request("TalkCenter","loginComplete");
		},
		onSuccess:function(data){
			//登录
			if(data.Request!=undefined)
			{
				alert("登录失败！\n密码或用户名有误，请再试一次！");
			}else
			{
				this.request("TalkCenter","loginAfter",[data]);
			}
		}
	});
})(jQuery);