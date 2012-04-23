;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.onlineUserMode = $.salvia.Class($.classes.mvc.mode,{
		init:function($super,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetOnlineUser",
				dataType:"xml"
			},filter);
		},
		onSuccess:function(data,ajax_options){
			var ctrl_data = this.request("TalkCenter","data");
			var ctrl_view = this.request("TalkCenter","view");
			var onlineUsers = ctrl_data.onlineUserIds = data.text==undefined?"":data.text;
			var compare = function(a,b){
				return ($(a)[0].className.indexOf("off")==-1)&&($(b)[0].className.indexOf("off")==-1)?0:(($(a)[0].className.indexOf("off")==-1)?1:-1);
			};
			
			for(var i in ctrl_view.talkCenterView.talkCenter.friendContactList.list){
				var item = ctrl_view.talkCenterView.talkCenter.friendContactList.items(i);
				if(onlineUsers.indexOf(item._data.Fuid)!=-1){item.online(false);continue;}
				item.online(true);
			}
			for(var i in ctrl_view.talkCenterView.talkCenter.followContactList.list){
				var item = ctrl_view.talkCenterView.talkCenter.followContactList.items(i);
				if(onlineUsers.indexOf(item._data.Fuid)!=-1){item.online(false);continue;}
				item.online(true);
			}
			for(var i in ctrl_view.talkCenterView.formManager._forms){
				var item = ctrl_view.talkCenterView.formManager._forms[i];
				item.dom.toggleClass("off",onlineUsers.indexOf(item._data.Uid)!=-1);
				
				if(item.isGroup==undefined){continue;}
				if(item.isGroup()){
					//GroupUsers
					for(var i in item.GroupUsers.list){
						if(onlineUsers.indexOf(item.GroupUsers.list[i]._data.Uid)!=-1){item.GroupUsers.list[i].online(false);continue;}
						item.GroupUsers.list[i].online(true);
					}
					item.GroupUsers.sort(compare);
				}
			}
			ctrl_view.talkCenterView.talkCenter.friendContactList.sort(compare);
			ctrl_view.talkCenterView.talkCenter.followContactList.sort(compare);
		}
	});
})(jQuery);