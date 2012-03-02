;(function($){
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.view");
	$.TalkCenter.classes.mvc.view.talkCenterView = $.salvia.Class($.TalkCenter.classes.mvc.view.baseView,{
		init:function($super,userInfo,friends,groups){
			this.formManager = new $.classes.util.formManager();
			this.taskbar = new $.classes.ui.taskbar(this.formManager,"#wrap");
			this.talkCenter = new $.TalkCenter.classes.ui.talkCenter($.salvia.packet("TalkCenter.lbi").appendTo("#wrap"));
			this.talkCenter.show();
			this.talkCenter.datasource(userInfo,{
				Avatar:function(avatar){
					//this.dom.find("#avatar img").attr({src:$.getRootPath()+$.TalkCenter.config.avatarPath+avatar+".png"});
					this.dom.find("#avatar img").attr({src:avatar});
				},
				NickName:function(nickName){
					this.dom.find(".name").text(nickName);
				},
				Uid:function(uid){
					this.dom.find(".name").text(this.dom.find(".name").text()+" ("+uid+")");
				}
			});
			this.formManager.add(this.talkCenter);
			
			for(var i in friends)
			{
				this.addToFriends(friends[i]);
			}
			
			for(var i in groups)
			{
				this.addToGroups(groups[i]);
			}
			
			this.mode = {
				message:new $.classes.mvc.mode({dataType:"xml"}),
				groupUsersMode:new $.TalkCenter.classes.mvc.mode.groupUserMode({},{
					GroupUser:function(data){
						return data.GroupUser.Item = [].concat(data.GroupUser.Item);
					}
				}),
				listenMode:new $.TalkCenter.classes.mvc.mode.listenMode(),
				makingFriendMode:new $.TalkCenter.classes.mvc.mode.makingFriendMode()
			};
			this.mode.message.addListener("success",function(e,options,data){
				if(Boolean(data.text)){
					//id,name,time,content
					var id,name,time,content;
					switch(options.form._data._SentTo)
					{
						case "friend":
							id = options._data.Fromuid;
							name = options._data.FromName;
							time = options._data.Posttime;
							content = options._data.Message;
							break;
						case "group":
							id = options._data.Uid;
							name = options._data.RealName;
							time = options._data.Posttime;
							content = options._data.Content;
							break;
					}
					options.form.addMeTalking(id,name,time,content);
					options.form.dom.find(".input .TalkInput").focus();
				}
			},this);
			
			this.mode.groupUsersMode.addListener("success",function(e,options,data){
				var docMenu = new $.classes.ui.menu(options.form.GroupUsers.dom);
				
				var ctrlTalkCenter=$(document).data("TalkCenter");
				for(var i in data.GroupUser)
				{
					var userCon = options.form.GroupUsers.add({});
					for(var j in ctrlTalkCenter.view.talkCenterView.talkCenter.contactList.list){
						var item = ctrlTalkCenter.view.talkCenterView.talkCenter.contactList.list[j];
						if(item.contact._data.Fuid==data.GroupUser[i].Uid)
						{
							data.GroupUser[i]._isFriend = item.type=="friend";
							data.GroupUser[i]._isListen = item.type=="follow";
							break;
						}
					}
					if(data.GroupUser[i].Uid==ctrlTalkCenter.data.loginData.User_Info.Item.Uid){
						ctrlTalkCenter.data.groupNameList[data.GroupUser[i].Uid]=data.GroupUser[i].GroupName;
						data.GroupUser[i]._isFriend = data.GroupUser[i]._isListen = true;
					}
					userCon.datasource(data.GroupUser[i],{
						GroupName:function(name){
							this.dom.find(".name").text(name);
						},
						Uid:function(uid){
							this.dom.data("uid",uid);
						}
					});
					userCon.dom.data("obj",userCon);
					/*userCon.addListener("click",function(e,_e){
						_e.target = _e.target.localName!="li"?$(_e.target).parents("li"):$(_e.target);
						e.other.show(_e);
						return false;
					},docMenu);*/
				}
				ctrlTalkCenter.setUserIds(data.GroupUser,"Uid");
				ctrlTalkCenter.view.communView.updataOnlineUser();
				
				

				//contentmenu
				var list_data = [{name:"加为好友",type:"friend"},{name:"加关注",type:"listen"}];
				var list = new $.classes.ui.list($(document.createElement("ul")).appendTo($("#wrap")));
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
				},{list:list,groupUsers:options.form.GroupUsers});
				
				options.form.menu = docMenu;
				
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
								e.other.view.makingFriend(li_Obj._data);
								break;
							case "listen":
								e.other.view.mode.listenMode.load({data:{
									Uid:$(document).data("TalkCenter").data.loginData.User_Info.Item.Uid,
									UserName:$(document).data("TalkCenter").data.loginData.User_Info.Item.NickName,
									Fuid:li_Obj._data.Uid,
									FUserName:li_Obj._data.GroupName,
									TypeRela:"2"
								}});
								break;
						}
						e.other.menu.hide();
						return false;
					},{menu:docMenu,groupUsers:options.form.GroupUsers,view:e.other});
				}
			},this);
			
			this.mode.listenMode.addListener("success",function(e,options,data){
				var content = "加关注成功";
				if(data)
				{
					e.other.addToFriends(options._data,{
						Avatar:function(avatar){
							//this.dom.find(".avatar img").attr({src:$.getRootPath()+$.TalkCenter.config.avatarPath+avatar+".png"});
							this.dom.find(".avatar img").attr({src:avatar});
						},
						FUserName:function(name){
							this.dom.find(".name").text(name);
						},
						Fuid:function(uid){
							this.dom.find(".name").text(this.dom.find(".name").text()+" ("+uid+")");
						}
					});
				}else{
					content="加关注失败"
				}
				
				e.other.msgBox("提示信息",content,["Ok"]);
			},this);
			
			this.mode.makingFriendMode.addListener("success",function(e,options,data){
				var content = "发送好友请求失败，请稍后再试！";
				if(data){
					content="已发送好友请求，请等待对方确认！";
					/*//添加新友到好友栏
					e.other.addToFriends(options._data,{
						Avatar:function(avatar){
							this.dom.find(".avatar img").attr({src:$.getRootPath()+$.TalkCenter.config.avatarPath+avatar+".png"});
						},
						FUserName:function(name){
							this.dom.find(".name").text(name);
						},
						Fuid:function(uid){
							this.dom.find(".name").text(this.dom.find(".name").text()+" ("+uid+")");
						}
					});*/
				}
				
				e.other.msgBox("提示信息",content,["Ok"]);
			},this);
			
			$(".sidebar .inLine").click($.proxy(function(){
				this.initExperInlineForm();
				return false;
			},this));
		},
		
		initExperInlineForm:function(){
			if(this.frmExperInline!=null){
				this.frmExperInline.show();
			}else{
				$(document).data("TalkCenter").data.groupIds+=",0001:4";
				this.frmExperInline = new $.TalkCenter.classes.ui.talkForm($("#ExpertTalkForm").clone().appendTo("#wrap"));
				this.frmExperInline.datasource({
					Gid:"1",
					text:"专家在线",
					_SentTo:"group",
					GroupType1:"4"
					
				},{
					text:function(text){
						this.text(text);
					}
				});
				this.frmExperInline.dom.css({height:"auto"});
				this.frmExperInline.show();
				this.frmExperInline.addListener("sent",function(e,form,message){
					e.other.onSent(form,message);
				},this);
				this.frmExperInline.addListener("closed",function(e,form){
					$(document).data("TalkCenter").data.groupIds=$(document).data("TalkCenter").data.groupIds.replace(/,0001:4/g,"");
					e.other.frmExperInline = null;
					e.other.formManager.remove(form);
				},this);
				if(this.frmExperInline.isGroup()){
					this.mode.groupUsersMode.load({data:{gid:data.Gid},form:this.frmExperInline});
				}
				
				this.formManager.add(this.frmExperInline);
			}
			return this.frmExperInline;
		},
		
		makingFriend:function(data){
			this.msgBox(
				"加好友请求 - "+data.GroupName,
				"<div class='pbottom10'>向 "+data.GroupName+" 邀请成为好友</div><div>附加说明：<input id='msgForm_comment' class='text' type='text' /></div>",
				{
					Ok:"发送",
					Cancel:"取消"
				},
				function(e,result){
					if(result=="Cancel"){return;}
					var comments = this.dom.find("#msgForm_comment").val();
					e.other.view.mode.makingFriendMode.load({data:{
						Uid:$(document).data("TalkCenter").data.loginData.User_Info.Item.Uid,
						UserName:$(document).data("TalkCenter").data.loginData.User_Info.Item.NickName,
						Fuid:e.other.data.Uid,
						FUserName:e.other.data.GroupName,
						Comments:comments,
						TypeRela:"1"
					}});
				},{view:this,data:data}
			);
		},
		
		addToFriends:function(friend){
			friend._SentTo="friend";
			var type;
			switch(friend.TypeRela)
			{
				case "1":
					type = "friend";
					break;
				case "2":
					type = "follow";
					break;
			}
			var contact = this.talkCenter.addContact({},type);
			contact.datasource(friend,this.request("TalkCenter","setting").binding.contact);
			contact.addListener("click",$.proxy(function(){
				this.showTalkForm(friend);
			},this));
			contact = null;
			delete contact;
		},
		addToGroups:function(group){
			group._SentTo="group";
			var contact = this.talkCenter.addContact({},"group");
			contact.hasAvatar(false);
			contact.datasource(group,this.request("TalkCenter","setting").binding.contact);
			contact.addListener("click",$.proxy(function(){
				this.showTalkForm(group);
			},this));
			contact = null;
			delete contact;
		},
		showTalkForm:function(data){
			var talkForm = new $.TalkCenter.classes.ui.talkForm($.salvia.packet("TalkForm.lbi").appendTo("#wrap"));
			talkForm.datasource(data,this.request("TalkCenter","setting").binding.form);
			if(this.formManager.contains(talkForm)){return;}
			talkForm.dom.find(".content .bar a").eq(1).bind("click",{form:talkForm,view:this},function(e){
				e.data.form.dom.find(".content .bar a").removeClass("current");
				$(this).addClass("current");
				var isFilter = e.data.form.TalkInforList._runFilter;				
				for(var i in e.data.form.GroupUsers.list){
					e.data.form.GroupUsers.list[i].hasCheckBox(!isFilter);
					if(e.data.form.GroupUsers.list[i]._data.Uid==$(document).data("TalkCenter").data.loginData.User_Info.Item.Uid)
					{
						e.data.form.GroupUsers.list[i].checked(true);
						e.data.form.GroupUsers.list[i].enable(false);
					}
					e.data.form.GroupUsers.list[i].addListener("click",function(e,_e){
						e.other.form.TalkInforList.filter(!isFilter,e.other.view.getTalkInforWhiteKey(e.other.form.GroupUsers.list,e.other.form.TalkInforList.list));
					},e.data);
				}
				e.data.form.TalkInforList.filter(!isFilter,e.data.view.getTalkInforWhiteKey(e.data.form.GroupUsers.list,e.data.form.TalkInforList.list));
			});
			talkForm.show();
			talkForm.addListener("sent",function(e,form,message){
				e.other.onSent(form,message);
			},this);
			talkForm.addListener("talked",function(e){
				this.TalkInforList.filter(this.TalkInforList._runFilter,e.other.getTalkInforWhiteKey(this.GroupUsers.list,this.TalkInforList.list));
			},this);
			if(talkForm.isGroup()){
				this.mode.groupUsersMode.load({data:{gid:data.Gid},form:talkForm});
			}
			
			this.formManager.add(talkForm);
			
			return talkForm;
		},
		
		getTalkInforWhiteKey:function(users,talkInforList){
			var keys = [];
			for(var i in users)
			{
				if(users[i].checked()){
					for(var j in talkInforList){
						if(talkInforList[j]._data.id == users[i]._data.Uid){
							keys.push(talkInforList[j].id);
						}
					}
				}
			}
			return keys;
		},
		
		onSent:function(form,message){
			var str = window.getBanStr==undefined?"":window.getBanStr();
			var hasError = false;
			for(var i in str)
			{
				if(message.indexOf(str[i])!=-1){
					hasError=true; break;
				}
			}
			if(hasError){
				this.msgBox(
					"提示信息",
					"输入内容中有不合法信息，请进行修改！",
					["Ok"]
				);
				return false;
			}
			if(message.length<=0){ return false; }
			var data,address;
			if(form._data._SentTo == "friend"){
				address = "AddGroup_Friend";
				data={
					Fromuid:this.talkCenter._data.Uid,
					FromName:this.talkCenter._data.NickName,
					ReceivedID:form._data.Fuid,
					ReceivedName:form._data.NickName,
					Message:message,
					FriFlag:1,
					Posttime:(new Date()).ToString()
				};
			}else{
				var groupType = form._data.GroupType1;
				var groupFunction = "";
				switch(groupType)
				{
					case "0":
					case "2":
						address = "AddGroup_Edu";
						break;
					case "1":
						address = "AddGroup_Ordinary";
						break;
					case "3":
						address = "AddGroup_Commu";
						break;
					case "4":
						address = "AddGroup_Pro";
						break;
				}
				data={
					Uid:this.talkCenter._data.Uid,
					RealName:this.talkCenter._data.NickName,//未改：取回群昵称
					Ip:"127.0.0.1",
					Gid:form._data.Gid,
					Content:message,
					UType:0,
					NickName:this.talkCenter._data.NickName,
					Posttime:(new Date()).ToString()
				};
			}
			
			this.mode.message.load({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/"+address,
				data:data,
				form:form
			});
		}
	});
	
})(jQuery);