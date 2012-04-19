;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.groupUserMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetGroup_UserByGid",
				dataType:"xml"
			},{
				GroupUser:function(data){
					return data.GroupUser.Item = [].concat(data.GroupUser.Item);
				}
			});
		},
		onBeforeSend:function(ajax_options){
			//ajax_options.form.GroupUsers.dom.html("<div class='loading'>加载中...</div>");
		},
		onComplete:function(ajax_options){
			//ajax_options.form.GroupUsers.dom.find(".loading").hide();
		},
		onSuccess:function(data,ajax_options){
			var member = [].concat(data.GroupUser);
			this.request("TalkCenter","updateGroupMemberByGroupId",[ajax_options._data.gid,data.GroupUser]);
		}
	});
})(jQuery);