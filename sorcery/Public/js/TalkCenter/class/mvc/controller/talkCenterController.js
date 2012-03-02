;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.controller");
	
	$.TalkCenter.classes.mvc.controller.talkCenter = $.salvia.Class($.classes.mvc.controller,{
		init:function($super){
			$super("TalkCenter");
			this.mode={};
			this.view={};
			this.data={
				config:{
					space:3000
				},
				userIds:[],
				groupNameList:{},
				messages:[],
				newMessagesContent:0,
				requests:[],
				newRequestContent:0,
				notice:[],
				newNoticeContent:0
			};
			this.setting={
				binding:{
					contact:{
						Avatar:function(avatar){
							//this.dom.find(".avatar img").attr({src:$.getRootPath()+$.TalkCenter.config.avatarPath+avatar+".png"});
							this.dom.find(".avatar img").attr({src:avatar});
						},
						NickName:function(name){
							this.dom.find(".name").text(name);
						},
						Fuid:function(fuid){
							this.dom.find(".name").text(this.dom.find(".name").text()+"("+fuid+")");
							this.dom.attr("data-id",fuid);
						},
						FUserName:function(name){
							this.dom.find(".name").text(name);
						},
						GroupType1:function(type){
							var group;
							switch(type)
							{
								case "0":
									group="教育群";
									break;
								case "1":
									group="聊天群";
									break;
								case "2":
									group="毕业群";
									break;
								case "3":
									group="社区群";
									break;
							}
							this.dom.find(".name").text(group+" - ");
						},
						GroupName:function(name){
							this.dom.find(".name").text(this.dom.find(".name").text()+name);
						},
						Gid:function(gid){
							this.dom.find(".name").text(this.dom.find(".name").text()+"("+gid+")");
						}
					},
					form:{
						Avatar:function(avatar){
							//this.dom.find(".avatar img").attr({src:$.getRootPath()+$.TalkCenter.config.avatarPath+avatar+".png"});
							this.dom.find(".avatar img").attr({src:avatar});
						},
						NickName:function(name){
							this.text(name);
						},
						FUserName:function(name){
							this.text(name);
							this._data.NickName = name;
						},
						Fuid:function(uid){
							this.dom.attr("data-uid",uid);
							this.id = $.md5(uid);
						},
						Gbrief:function(brief){
							this.dom.find(".affiche").html("<h4>群公告：</h4>"+brief);
						},
						GroupName:function(name){
							this.text(name);
						},
						Gid:function(gid){
							this.dom.attr("data-gid",gid);
							this.id = $.md5(gid);
						},
						_SentTo:function(sentTo){
							this.isGroup(sentTo=="group");
						}
					}
				}
			};
			
			this.createLoginMode();
			this.createPollingMode();
			this.createMessageMode();
			this.createRequestMode();
			this.createFriendMode();
			this.createOnlineUsersMode();
			this.createResponeFriendRequsetMode();
		},
		
		createLoginMode:function(){
			var loginMode = new $.TalkCenter.classes.mvc.mode.loginMode();
			loginMode.addListener("success",function(e,mode,data){
				//登录
				if(data.Request!=undefined)
				{
					alert("登录失败！\n密码或用户名有误，请再试一次！");
				}else
				{
					e.other.onAfterLogin(data);
				}
			},this);
			
			this.mode.loginMode=loginMode;
		},
		
		createPollingMode:function(){
			//创建  轮询  模型(创建AJAX询问模型)
			var pollingMode = new $.TalkCenter.classes.mvc.mode.pollingMode();
			pollingMode.addListener("success",function(e,mode,data){
				if(data==""){return;}
				//this作用于options
				var messageCount = data.Check.Item.Message;
				var requestCount = data.Check.Item.Request;
				var noticeCount = data.Check.Item.Notice;
				var fRequestCount = data.Check.Item.FRespone;
				var expertGroupCount = data.Check.Item.Pro;
				
				if(Number(messageCount)!=0){e.other.mode.messageMode.load({data:{To:e.other.data.userId,Start:mode._data.start,End:mode._data.end,group:$(document).data("TalkCenter").data.groupIds}});}
				if(Number(requestCount)!=0){e.other.mode.requestMode.load({data:{myId:e.other.data.userId}});}
				//if(Number(noticeCount)!=0){e.other.mode.loadNotice();}
				if(Number(fRequestCount)!=0){e.other.mode.friendMode.load({data:{Uid:e.other.data.userId}});}
			},this);
			
			this.mode.pollingMode=pollingMode;
		},
		//创建  聊天信息  模型(创建AJAX询问模型)
		createMessageMode:function(){
			var messageMode = new $.TalkCenter.classes.mvc.mode.messageMode();
			messageMode.addListener("success",function(e,mode,returndata){
				//e.other.
				var messages = e.other.data.messages;
				e.other.data.newMessagesContent = returndata.length;
				for(var i in returndata)
				{
					returndata[i]._IsNew = true;
					returndata[i]._md5Id = $.md5(returndata[i].Gcid+returndata[i].Uid+returndata[i].Content+returndata[i].Datetime);
					var has = false;
					for(var j in messages){
						if(returndata[i]._md5Id==messages[j]._md5Id)
						{
							has = true;
							break;
						}
					}
					if(has){continue;}
					messages.push(returndata[i]);
				}
				e.other.updataTalkingToForms();
				e.other.view.communView.updateMsgForm();
			},this);
			
			this.mode.messageMode=messageMode;
		},
		//创建  请求信息  模型(创建AJAX询问模型)
		createRequestMode:function(){
			var requestMode = new $.TalkCenter.classes.mvc.mode.requestMode();
			requestMode.addListener("success",function(e,mode,returndata){
				var request = e.other.data.requests;
				e.other.data.newRequestContent = returndata.length;
				for(var i in returndata)
				{
					if(request[i]!=undefined){continue;}
					request.push(returndata[i]);
				}
				e.other.updataTalkingToForms();
				e.other.view.communView.updateMsgForm();
			},this);
			
			this.mode.requestMode=requestMode;
		},
		//创建  添加好友信息  模型(创建AJAX询问模型)
		createFriendMode:function(){
			var friendMode = new $.TalkCenter.classes.mvc.mode.accpetFriendMode();
			friendMode.addListener("success",function(e,mode,returndata){
				//添加新友到好友栏
				$(document).data("TalkCenter").view.talkCenterView.addToFriends(returndata);
				
				e.other.msgBox(
					"提示信息 ",
					"对方 "+returndata.FUserName+" 已同意加你为好友！",
					["Ok"]
				);
			},this);
			
			this.mode.friendMode=friendMode;
		},
		
		createOnlineUsersMode:function(){
			var onlineUsersMode = new $.TalkCenter.classes.mvc.mode.onlineUserMode();
			onlineUsersMode.addListener("success",function(mode,reurndata){
				var ctrlTalkCenter = $(document).data("TalkCenter");
				var onlineUsers = ctrlTalkCenter.data.onlineUserIds = reurndata.text==undefined?"":reurndata.text;
				var compare = function(a,b){
					return ($(a)[0].className.indexOf("off")==-1)&&($(b)[0].className.indexOf("off")==-1)?0:(($(a)[0].className.indexOf("off")==-1)?1:-1);
				};
				for(var i in ctrlTalkCenter.view.talkCenterView.talkCenter.friendContactList.list){
					var item = ctrlTalkCenter.view.talkCenterView.talkCenter.friendContactList.items(i);
					if(onlineUsers.indexOf(item._data.Fuid)!=-1){item.online(false);continue;}
					item.online(true);
				}
				for(var i in ctrlTalkCenter.view.talkCenterView.talkCenter.followContactList.list){
					var item = ctrlTalkCenter.view.talkCenterView.talkCenter.followContactList.items(i);
					if(onlineUsers.indexOf(item._data.Fuid)!=-1){item.online(false);continue;}
					item.online(true);
				}
				for(var i in ctrlTalkCenter.view.talkCenterView.formManager._forms){
					var item = ctrlTalkCenter.view.talkCenterView.formManager._forms[i];
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
				ctrlTalkCenter.view.talkCenterView.talkCenter.friendContactList.sort(compare);
				ctrlTalkCenter.view.talkCenterView.talkCenter.followContactList.sort(compare);
			});
			this.mode.onlineUsersMode = onlineUsersMode;
		},
		
		createResponeFriendRequsetMode:function(){
			var responeFriendRequsetMode = new $.TalkCenter.classes.mvc.mode.responeFriendRequsetMode();
			responeFriendRequsetMode.addListener("success",function(e,mode,returndata){
				var returndata = Number(returndata.text);
				if(returndata==0){
					e.other.msgBox(
						"提示信息 ",
						"访问信息发生错误，请稍后再试！",
						["Ok"]
					);
				}else{
					if(mode._data.IsAgree!=1){return;}
					mode._data.TypeRela="1";
					$(document).data("TalkCenter").view.talkCenterView.addToFriends(mode._data);
					$(document).data("TalkCenter").view.communView.updataOnlineUser();
				}
			},this);
			
			this.mode.responeFriendRequsetMode=responeFriendRequsetMode;
		},
		
		login:function(){
			var name,pwt;
			var loginInfo = $.cookie("LoginInfo");
			if(loginInfo!="")
			{
				loginInfo = loginInfo.split(",");
				this.mode.loginMode.load({data:{name:loginInfo[0],psw:loginInfo[1]}});//初始化聊天中心
			}
			else{
				document.location.href = $.getRootPath()+"/Default.aspx";
			}
		},
		logout:function(){
			$.cookie("LoginInfo",null,{path:"/"});//注销用户
			$("#form1").find("input[type='submit']")[0].click();
		},
		initCommunView:function(){
			this.view.communView = new $.TalkCenter.classes.mvc.view.communView(this.data);
		},
		initTalkCenterView:function(userInfo,friends,groups){
			this.view.talkCenterView = new $.TalkCenter.classes.mvc.view.talkCenterView(userInfo,friends,groups);
			this.view.talkCenterView.talkCenter.addListener("closed",function(e){
				e.other.logout();
			},this);
		},
		
		updataTalkingToForms:function(){
			for(var j in this.view.talkCenterView.formManager._forms)
			{
				var talkForm = this.view.talkCenterView.formManager._forms[j];
				for(var i in this.data.messages)
				{
					var id = this.data.messages[i].Gid!="0"?this.data.messages[i].Gid:this.data.messages[i].Uid;
					var formId = talkForm._data.Gid!=undefined?talkForm._data.Gid:talkForm._data.Fuid;
					if(this.data.messages[i].Uid == this.view.communView.data.userId){this.data.messages[i]._IsNew=false;continue;}
					if(formId == id && this.data.messages[i]._IsNew)
					{
						this.data.messages[i]._IsNew=false;							
						var	id = this.data.messages[i].Uid;
						var	name = this.data.messages[i].RealName;
						var	time = this.data.messages[i].Datetime;
						var	content = this.data.messages[i].Content;
						talkForm.addTalking(id,name,time,content);
						
						var removeIndex;
						for(var i in this.view.communView.view.newsForm._data)
						{
							if(formId != (this.view.communView.view.newsForm._data[i].Gid==undefined?this.view.communView.view.newsForm._data[i].Fuid:this.view.communView.view.newsForm._data[i].Gid)){continue;}
							removeIndex=i;
						}
						if(removeIndex!=undefined){$.list.remove(this.view.communView.view.newsForm._data,removeIndex);}
					}
				}
			}
		},
		
		
		onAfterLogin:function(data){
			this.data.loginData = data;
			this.data.config.serverTime = $.ToDateTime(data.NowTime);
			this.data.userId = data.User_Info.Item.Uid;
			
			var friends = this.data.loginData.User_Friends==""?[]:this.data.loginData.User_Friends.Item = [].concat(data.User_Friends.Item);
			var groups = this.data.loginData.Group==""?[]:this.data.loginData.Group.Item = [].concat(data.Group.Item);
			
			this.setUserIds(friends,"Fuid");
			this.setGroupIds(groups);
			
			this.initTalkCenterView(this.data.loginData.User_Info.Item,friends,groups);
			//if("")initExperInlineForm
			this.initCommunView();
			if(window.location.search!="")
			{
				var search = eval("({"+window.location.search.replace(/[(?&)](\w*)=([^=]\w*)/g,"$1:'$2',").replace(/,$/,'')+"})");
				if(search["gid"]!=undefined){
					var group,has = false;
					for(var i in this.view.talkCenterView.talkCenter.contactList.list)
					{
						var contact = this.view.talkCenterView.talkCenter.contactList.items(i).contact._data;
						has = contact.Gid == search["gid"];
						if(has){group=contact; break;}
					}
					if(has){
						this.view.talkCenterView.showTalkForm(group);
					}
				}
			}else{
				this.view.talkCenterView.initExperInlineForm();
			}
			this.view.communView.runTimer();
		},
		
		
		
		setUserIds:function(data,key){
			if(data.length<=0){return;}
			var users = [];
			for(var i in data)
			{
				users.push(data[i][key]);
			}
			this.data.userIds=$.unique($.merge(this.data.userIds,users));
		},
		setGroupIds:function(groups){
			if(groups.length<=0){return;}
			var str = "";
			for(var i in groups)
			{
				if(i!="0"){str+=",";}
				str+=groups[i].Gid+":"+groups[i].GroupType1;
			}
			this.data.groupIds = str;
		}
	});
	
})(jQuery);