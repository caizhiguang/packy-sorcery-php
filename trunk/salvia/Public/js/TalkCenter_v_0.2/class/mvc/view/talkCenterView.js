;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.view");

	$.TalkCenter.classes.mvc.view.talkCenterView = $.salvia.object.Class($.classes.mvc.view,{
		
		init:function($super){
			$super("TalkCenter");

			this.control={
				friendList:new $.TalkCenter.classes.ui.list($("#friends")),
				groupList:new $.TalkCenter.classes.ui.list($("#groups")),
				authorityList:new $.TalkCenter.classes.ui.list($("#authority"))
			};
			this.view={
				talkView:new $.TalkCenter.classes.mvc.view.talkView()
			};
			
			this.config={
				binding:{
					_default:{
						avatar:function(avatar){
							this.dom.find(".avatar img").attr({src:avatar});
						},
						name:function(name){
							this.dom.find(".name").text(name);
						},
						id:function(fuid){
							this.dom.find(".name").text(this.dom.find(".name").text()+"("+fuid+")");
							this.dom.attr("data-uid",fuid);
						},
						groupType:function(type){
							var avatar;
							switch(type)
							{
								case "0":
									avatar="../photo/avatar/教.png";
									break;
								case "1":
									avatar="../photo/avatar/聊.png";
									break;
								case "2":
									avatar="../photo/avatar/毕.png";
									break;
								case "3":
									avatar="../photo/avatar/社.png";
									break;
							}
							this.dom.find(".avatar").show().find("img").attr({src:avatar});
						}
					}
				}
			};
			
			this.initControllerListener();

			$(".modUInforBox .ft").tabs(".modPanelBox>.inner",{history:false});
			$(".modUInforBox .ft").data("tabs").click(1);
			this.control.messagePanel = $(".modUInforBox .messages");
			this.control.messagePanel.hide().click(function(){return false;});
			this.control.messagePanel.find(".message").bind("click",this,function(e){
				$(".modUInforBox .ft").data("tabs").click(0);
			});
			this.control.messagePanel.find(".gmessage").bind("click",this,function(e){
				$(".modUInforBox .ft").data("tabs").click(1);
			});
			this.control.messagePanel.find(".notice").bind("click",this,function(e){});
			this.control.messagePanel.find(".request").bind("click",this,function(e){e.data.showRequest();});
			this.control.messagePanel.find(".grequest").bind("click",this,function(e){$(".modUInforBox .ft").data("tabs").click(1);});
			this.control.messagePanel.find("a.btnClose").click($.proxy(function(){this.toggle();},this.control.messagePanel));
			
			this.timer = $(document).data("Timer")==undefined?new $.TalkCenter.classes.util.timer():$(document).data("Timer");
			this.timer.addAction({
				news_prompt:{
					space:500,
					fun:function(timer,tag){
						$("a.btnMessage").toggleClass("showNews").find(".iMessage").toggleClass("iNew");						
					},
					scope:this
				}
			});
			this.timer.stop("news_prompt");
			
			$(".wrap").hide();
			
			$(document).bind("click",this,this.onMessagePanelLostFocus);
		},
		
		initControllerListener:function(){
			//注册Controller的[取得在线用户后]事件
			this.addCtrlListener("requestOnlineUserAfter",function(e,data){
				
				var talkCenterView = e.data;
				var compare = function(a,b){
					return ($(a)[0].className.indexOf("off")==-1)&&($(b)[0].className.indexOf("off")==-1)?0:(($(a)[0].className.indexOf("off")==-1)?1:-1);
				};
				
				for(var i in talkCenterView.control.friendList.list){
					var item = talkCenterView.control.friendList.list[i];
					if(data.indexOf(item._data.id)!=-1){item.online(true);continue;}
					item.online(false);
				}
				talkCenterView.control.friendList.sort(compare);
				
			},this);
			//注册Controller的[退出群后]事件
			this.addCtrlListener("exitGroupAfter",function(e,success,gid,uid){
				if(uid==this._data.userInfor.id){
					e.data.control.groupList.remove(e.data._data.contactHash[gid]);
					e.data._data.contactHash[gid]=null;
					delete e.data._data.contactHash[gid];
				}
			},this);
		},
		
		onBtnMessageClick:function(e){
			e.data.timer.stop("news_prompt");
			$(this).removeClass("showNews").find(".iMessage").removeClass("iNew").parents(".menu").css({zIndex:2});
			e.data.control.messagePanel.css("zIndex",1).toggle();
			
			return false;
		},
		onMessagePanelLostFocus:function(e){
			e.data.control.messagePanel.hide();
		},
		
		onDatasource:function(data){
			$(".modUInforBox").find(".avatar>img").attr("src",data.userInfor.avatar);
			$(".modUInforBox").find(".name").text(data.userInfor.name+" ("+data.userInfor.id+")");
			
			this._data.contactHash = {};
			for(var i in data.friends)
			{
				if(data.friends[i].relation!="1"){continue;}
				this.addFriend(data.friends[i]);
			}
			for(var i in data.groups)
			{
				this.addGroup(data.groups[i]);
			}
			
			$(".wrap").css({
				margin:"0 auto",
				top:$(window).height()-$(".wrap").height()<0?0:($(window).height()-$(".wrap").height())/2
			}).fadeIn("slow");
		},
		
		addFriend:function(data){
			var item = this.control.friendList.add($("#contacts>li").clone());
			item.datasource(data,this.config.binding._default);
			item.addListener("click",function(e,obj){
				e.data.openTalking(e.target._data,e.target.online());
			},this);
			$.hash.add(this._data.contactHash,data.id,item);
			var ctrl_data = this.request("_data");
			if(!$.hash.contains(ctrl_data.friends,data.id)){
				ctrl_data.friends[data.id]=data;
				ctrl_data.userIds = $.unique($.merge(ctrl_data.userIds,this.request("getUserIds",[ctrl_data.friends,"id"])));
			}
		},
		addGroup:function(data){
			var item = this.control.groupList.add($("#contacts>li").clone());
			item.online(true);
			item.datasource(data,this.config.binding._default);
			item.addListener("click",function(e,obj){
				e.data.openTalking(e.target._data,e.target.online());
			},this);
			$.hash.add(this._data.contactHash,data.id,item);
		},
		
		showRequest:function(){
			var ctrl_data = this.request("_data");
			for(var i in ctrl_data.information.requests)
			{
				var request = ctrl_data.information.requests[i];
				var msg = new $.classes.ui.msgbox($("#modMsgBox").clone().removeAttr("id").appendTo(document.body));
				msg.show("","<p>"+request.sender_name+"请求加你为好友</p><div>验证信息：</div><div>"+request.content+"</div>",{Yes:"加为好友",No:"拒绝",Cancel:"忽略"});
				msg.addListener("return",function(e,returnVal){
					var agree = -1;
					switch(returnVal){
						case "Yes":
							e.data.request.agree = 1;
							break;
						case "No":
							e.data.request.agree = 0;
							break;
						case "Cancel":
							e.data.request.agree = -1;
							break;
					}
					if(e.data.request.agree<0){return;}
					e.data.that.request("responeFriendRequest",[e.data.request]);
				},{that:this,request:request});
			}
		},
		
		openTalking:function(data,online){
			this.view.talkView.show(data,online);
			if(data.id in this._data.contactHash) this._data.contactHash[data.id].twinkle(false);
			this.updateInformation(this.request("_data"));
		},
		
		updateInformation:function(data){
			this.updateFormTalking(data);
			
			var messagesContent=0,gmessagesContent=0,newNoticeContent=0,requestContent=0,grequestContent=0;
			
			//message
			for(var i in data.information.messages)
			{
				var item = data.information.messages[i];
				if(!item._IsNew){continue;}
				if(item._type=="friend"){messagesContent++;}else{gmessagesContent++;}
				this._data.contactHash[item.id].twinkle(true);
			}
			//notice
			for(var i in data.information.notice)
			{
				
			}
			//request
			for(var i in data.information.requests)
			{
				if(data.information.requests[i].agree!=undefined){continue;}
				switch(data.information.requests[i].type){
					case "Friend":
						requestContent++;
						break;
					case "Group":
						grequestContent++;
						break;
				}
			}
			
			if(messagesContent>0){
				this.control.messagePanel.find(".message").show().find("span.count").text(messagesContent);
			}else{this.control.messagePanel.find(".message").hide();}
			if(gmessagesContent>0){
				this.control.messagePanel.find(".gmessage").show().find("span.count").text(gmessagesContent);
			}else{this.control.messagePanel.find(".gmessage").hide();}
			if(requestContent>0){
				this.control.messagePanel.find(".request").show().find("span.count").text(requestContent);
			}else{this.control.messagePanel.find(".request").hide();}
			if(grequestContent>0){
				this.control.messagePanel.find(".grequest").show().find("span.count").text(grequestContent);
			}else{this.control.messagePanel.find(".grequest").hide();}
			
			if(messagesContent+gmessagesContent+newNoticeContent+requestContent+grequestContent<=0){
				this.timer.stop("news_prompt");
				$("a.btnMessage").removeClass("showNews").find(".iMessage").removeClass("iNew");
				$("a.btnMessage").unbind("click",this.onBtnMessageClick);
			}else{
				this.timer.start("news_prompt");
				$("a.btnMessage").unbind("click",this.onBtnMessageClick).bind("click",this,this.onBtnMessageClick);
			}
		},
		
		updateFormTalking:function(data){
			for(var j in this.view.talkView.control.formManager._forms){
				var talkForm = this.view.talkView.control.formManager._forms[j];
				for(var i in data.information.messages)
				{
					if(data.information.messages[i].id == data.userInfor.id || data.information.messages[i].original.Uid == data.userInfor.id){data.information.messages[i]._IsNew=false;continue;}
					if(talkForm._data.id == data.information.messages[i].id && data.information.messages[i]._IsNew)
					{
						data.information.messages[i]._IsNew=false;							
						
						this.view.talkView.talkingWithMe(talkForm,$.convert(data.information.messages[i],{
							id:"sender_id",
							name:"sender_name",
							content:"content",
							time:"time"
						}));
					}
				}
			}
		}
	});
	
})(jQuery);