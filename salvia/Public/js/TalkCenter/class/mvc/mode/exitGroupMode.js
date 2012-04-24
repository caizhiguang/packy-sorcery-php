;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.exitGroupMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/JstAdminManagerGroup.asmx/ExitGroup",
				dataType:"xml"
			},function(data){
				return data.text;
			});
		},
		onSuccess:function(data,ajax_options){
			switch(data){
				case "退群成功":
					this.request("TalkCenter","removeMember",[ajax_options._data.gid,ajax_options._data.uid]);
					this.request("TalkCenter","msgBox",[
		                "提示信息 ",
						"删除成功",
						["Ok"]
					]);
					break;
				default:
					if(data.indexOf("群主不能退群")==-1){break;}
				case "退群失败":
					this.request("TalkCenter","msgBox",[
		                "提示信息 ",
		                data,
						["Ok"]
					]);
					break;
			}
		}
	});
})(jQuery);