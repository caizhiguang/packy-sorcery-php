;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.view");
	/**
	 * 主要功能：
	 * --带时间器，可设置特定时间间隔去做指定操作
	 * --特定时间向服务器询问数据更新情况
	 * **/
	$.TalkCenter.classes.mvc.view.communView = new $.salvia.Class($.TalkCenter.classes.mvc.view.baseView,{
		init:function($super,options){
			this.data = {
				messages:[],
				newMessagesContent:0,
				requests:[],
				newRequestContent:0,
				notice:[],
				newNoticeContent:0,
				
				serverTime:options.config.serverTime,
				userId:options.loginData.User_Info.Item.Uid,
				groupIds:options.groupIds,
				config:options.config
			};
			this.mode={};
			this.view={
				newsForm:new $.classes.ui.newsForm($.salvia.packet("Form.lbi").appendTo("#wrap"))
			};
			this.view.newsForm.tip($("[data-for='"+$(document).data("TalkCenter").view.talkCenterView.talkCenter.id+"']"),{
				location:"top center",
				content:"rel",
				hideHandle:"tip",
				hideAction:"mouseleave",
				showAction:"mouseover"
			});
			this.view.newsForm.updateView();
			this.view.newsForm.showDiscription();
			
			/*this.createPollingMode();
			this.createMessageMode();
			this.createRequestMode();
			this.createFriendMode();
			this.createOnlineUsersMode();
			this.createResponeFriendRequsetMode();*/
			
			var timer = $(document).data("Timer")==undefined?new $.TalkCenter.classes.util.timer():$(document).data("Timer");
			timer.addAction({
				polling:{
					space:2000,
					fun:function(timer,tag){
						var time = new Date(this.data.serverTime);
						time.setSeconds(time.getSeconds()+tag.count/1000+this.data.config.space/1000);
		
						$(document).data("TimeNow",time);
						
						var start = new Date(time);
						var end = new Date(time);
						start.setSeconds(end.getSeconds()-this.data.config.space/1000-5);
						end.setSeconds(end.getSeconds()+5);
						
						this.request("TalkCenter","mode").pollingMode.load({data:{
							start:start.ToString(),
							end:end.ToString(),
							To:this.data.userId,
							group:this.request("TalkCenter","data").groupIds
						}});
					},
					scope:this
				},
				online:{
					space:30000,
					fun:function(timer,tag){
						this.updataOnlineUser();
					},
					scope:this
				}
			});
			this.updataOnlineUser();
		},
		runTimer:function(){
			$(document).data("Timer").runTimer();
		},
		/*
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
				//$(document).data("App.Controller.TalkPageController").Run("UpdateMessageToForm");
				//$(document).data("App.Controller.TalkPageController").Run("MessageData",message);
				e.other.updateMsgForm();
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
				//$(document).data("App.Controller.TalkPageController").Run("RequestData",request);
				e.other.updateMsgForm();
			},this);
			
			this.mode.requestMode=requestMode;
		},
		//创建  添加好友信息  模型(创建AJAX询问模型)
		createFriendMode:function(){
			var friendMode = new $.TalkCenter.classes.mvc.mode.accpetFriendMode();
			friendMode.addListener("success",function(e,mode,returndata){
				//添加新友到好友栏
				$(document).data("TalkCenter").view.talkCenterView.addToFriends(returndata,{
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
					$(document).data("TalkCenter").view.talkCenterView.addToFriends(mode._data,{
						Avatar:function(avatar){
							//this.dom.find(".avatar img").attr({src:$.getRootPath()+$.TalkCenter.config.avatarPath+avatar+".png"});
							this.dom.find(".avatar img").attr({src:avatar});
						},
						FUserName:function(fUserName){
							this.dom.find(".name").text(fUserName);
						},
						Fuid:function(fuid){
							this.dom.find(".name").text(this.dom.find(".name").text()+"("+fuid+")");
							this.dom.attr("data-id",fuid);
						}
					});
					$(document).data("TalkCenter").view.communView.updataOnlineUser();
				}
			},this);
			
			this.mode.responeFriendRequsetMode=responeFriendRequsetMode;
		},*/
		
		updataOnlineUser:function(){
			this.request("TalkCenter","mode").onlineUsersMode.load({data:{
				onlinelist:this.request("TalkCenter","data").userIds.join(),
				uid:this.data.userId
			}});
		},
		
		updateMsgForm:function(){
			//$(document).data("TalkCenter").updataTalkingToForms();
			var contactList = this.request("TalkCenter","view").talkCenterView.talkCenter.contactList;
			var list = [];
			for(var j in contactList.list)
			{
				var item = contactList.list[j].contact._data;
				if(contactList.list[j].type=="friend"){if(item.TypeRela!="1"){continue;}}
				
				var copyData = $.extend({},{},item);
				var messages = this.request("TalkCenter","data").messages;
				for(var i in messages)
				{
					var id = messages[i].Gid!="0"?messages[i].Gid:messages[i].Uid;
					var itemId = item.Gid!=undefined?item.Gid:item.Fuid;
					if(id==itemId && messages[i]._IsNew)
					{
						copyData._newsCount=copyData._newsCount==undefined?0:copyData._newsCount;
						copyData._newsCount++;
						copyData._newsType="message";
						copyData._tag = contactList.list[j].type;
					}
				}
				if(!copyData._newsCount>0){continue;}
				list.push(copyData);
			}
			
			if(this.data.requests.length>0)
			{
				var responeCount={
					Friend:0,
					Group:0
				};
				for(var i in this.data.requests)
				{
					responeCount[this.data.requests[i].Type]++;
				}
				var responeItem = {
					friend:{
						name:"好友验证",
						_newsCount:responeCount.Friend,
						_newsType:"request"
					},
					group:{
						name:"入群验证",
						_newsCount:responeCount.Group,
						_newsType:"request"
					}
				};
				if(responeItem.friend._newsCount>0){list.push(responeItem.friend);}
				if(responeItem.group._newsCount>0){list.push(responeItem.group);}
			}
			
			if(this.data.notice.length>0)
			{
				/*var noticeItem = {
					id:$.md5("respone"),
					name:"通知("+log.Request.length+")"
				};*/
			}

			this.view.newsForm.removeListener("detailItemClick");
			this.view.newsForm.addListener("detailItemClick",function(e,data){
				switch(data._newsType){
					case "message":
						var talkForm = $(document).data("TalkCenter").view.talkCenterView.showTalkForm(data);
						$(document).data("TalkCenter").updataTalkingToForms();
						//e.other.updateMsgForm();
						e.other.view.newsForm.updateView();
						e.other.view.newsForm.showDiscription();
						break;
					case "request":
						for(var i in e.other.data.requests){
							e.other.msgBox(
								"好友请求 ",
								"<div class='pbottom10'>"+e.other.data.requests[i].RequestName+"向你申请成为好友</div><div>附加信息："+e.other.data.requests[i].RequestComments+"</div>",
								{
									Yes:"同意",
									No:"拒绝",
									Cancel:"忽略"
								},
								function(e,result){
									if(result=="Cancel"){return;}
									$.list.remove($(document).data("TalkCenter").view.communView.data.requests,e.other.data);
									$(document).data("TalkCenter").view.communView.updateMsgForm();
									var comments = this.dom.find("#msgForm_comment").val();
									e.other.view.mode.responeFriendRequsetMode.load({data:{
										Uid:$(document).data("TalkCenter").data.loginData.User_Info.Item.Uid,
										FUserName:e.other.data.RequestName,
										Fuid:e.other.data.RequestId,
										IsAgree:result=="Yes"?1:0
									}});
								},
								{view:e.other,data:e.other.data.requests[i]}
							);
						}
						return false;
				}
			},this);
			this.view.newsForm.datasource(list);
			this.view.newsForm.updateView();
			if(this.view.newsForm.isOver){this.view.newsForm.showDiscription();}
		}
	});
	
})(jQuery);