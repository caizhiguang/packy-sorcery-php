;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.makingFriendMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/AddFriendRequset",
				dataType:"xml"
			},{
				data:function(data){
					return Number(data.text)>0;
				}
			});
		}
	});
})(jQuery);