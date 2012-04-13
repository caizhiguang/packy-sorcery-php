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
			ajax_options.form.GroupUsers.dom.html("<div class='loading'>加载中...</div>");
		},
		onComplete:function(ajax_options){
			ajax_options.form.GroupUsers.dom.find(".loading").hide();
		},
		onSuccess:function(data,ajax_options){
			var docMenu = new $.classes.ui.menu(ajax_options.form.GroupUsers.dom);
			
			var ctrl_view = this.request("TalkCenter","view");
			var ctrl_data = this.request("TalkCenter","data");
			
			ctrl_data.groupMember = ctrl_data.groupMember==undefined?{}:ctrl_data.groupMember;
			ctrl_data.groupMember[ajax_options._data.gid]=data.GroupUser;
			
			ajax_options.form.GroupUsers.datasource(data.GroupUser,function(data){
				for(var j in ctrl_view.talkCenterView.talkCenter.contactList.list){
					var item = ctrl_view.talkCenterView.talkCenter.contactList.list[j];
					data.Avatar = "../photo/avatar/3.png";
					if(item.type=="group"){break;}
					if(item.contact._data.Fuid!=data.Uid){continue;}
					if(item.type=="friend"){data._isFriend = true;}
					if(item.type=="follow"){data._isListen = true;}
					if(data._isFriend&&data._isListen){break;}
				}
				if(data.Uid==ctrl_data.userId){
					ctrl_data.groupNameList[data.Gid]=data.GroupName;
					ctrl_data.groupUser[data.Gid] = data;
					data._isFriend = data._isListen = true;
					data._isMyself=true;
				}
				this.dom.attr("data-uid",data.Uid);
				
				this.dom.find(".name").text(data.GroupName);
				this.dom.data("uid",data.Uid);
				this.dom.find(".avatar img").attr({src:data.Avatar});
				this.dom.data("obj",this);
				var title = "右键点击-可添加好友或关注";
				if(data._isListen){title = "已关注，右键点击-可添加好友";}
				if(data._isFriend){title = "已加为好友，右键点击-可添加关注";}
				if((!data._isMyself)&&data._isFriend&&data._isListen){title="你加了他(她)为好友,和关注了他(她)！";}
				if(data._isMyself){title="这是你自己！";}
				this.dom.find("label").attr({title:title});
				/*userCon.addListener("click",function(e,_e){
					_e.target = _e.target.localName!="li"?$(_e.target).parents("li"):$(_e.target);
					e.other.show(_e);
					return false;
				},docMenu);*/
			});
			
			this.request("TalkCenter","setUserIds",[data.GroupUser,"Uid"]);
			this.request("TalkCenter","updataOnlineUser");			
			

			//contentmenu
			var list_data = [{name:"加为好友",type:"friend"},{name:"加关注",type:"listen"}];
			var list = new $.classes.ui.list($.c("ul").appendTo($("#wrap")));
			list.datasource(list_data,function(data){
				this.text(data.name);
				this.dom.data("type",data.type);
				this.hasAvatar(false);
			});
			docMenu.btnlist = list;
			docMenu.menuPlane.find("#menuPlane_inner").append(list.dom);
			docMenu.addListener("show",function(e){
				var target = $(this.target);
				target = this.target.nodeName!="LI"?target.parents("li"):target;
				var li_Obj = target.data("obj");
				for(var i in e.other.list.list){
					if(e.other.list.list[i]._data.type=="friend"){
						e.other.list.list[i].dom.toggle(!li_Obj._data._isFriend);
					}
					if(e.other.list.list[i]._data.type=="listen"){
						e.other.list.list[i].dom.toggle(!li_Obj._data._isListen);
					}
				}
				return !(li_Obj._data._isFriend&&li_Obj._data._isListen);
			},{list:list,groupUsers:ajax_options.form.GroupUsers});
			
			ajax_options.form.menu = docMenu;
			
			for(var i in list.list)
			{
				list.list[i].addListener("click",function(e){
					var target = $(e.other.menu.target);
					target = e.other.menu.target.nodeName!="LI"?target.parents("li"):target;
					var li_Obj = target.data("obj");
					
					//alert((li_Obj==undefined?"":li_Obj._data.Uid)+" "+e.other.menu.target.localName+" "+this._data.name);
					switch(this.dom.data("type"))
					{
						case "friend":
							e.other.that.request("TalkCenter","makingFriend",[li_Obj._data]);
							break;
						case "listen":
							e.other.that.request("TalkCenter","listen",[{data:{
								/*Uid:$(document).data("TalkCenter").data.loginData.User_Info.Item.Uid,
								UserName:$(document).data("TalkCenter").data.loginData.User_Info.Item.NickName,*/
								Uid:ctrl_data.userId,
								UserName:ctrl_data.loginData.User_Info.Item.NickName,
								Fuid:li_Obj._data.Uid,
								FUserName:li_Obj._data.GroupName,
								TypeRela:"2"
							}}]);
							break;
					}
					e.other.menu.hide();
					return false;
				},{
					menu:docMenu,
					groupUsers:ajax_options.form.GroupUsers,
					ctrl_data:ctrl_data,
					that:this
				});
			}
		}
	});
})(jQuery);