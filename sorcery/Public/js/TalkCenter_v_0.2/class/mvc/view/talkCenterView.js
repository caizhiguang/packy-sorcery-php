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
						}
					},
				
					contacts:{
						Avatar:function(avatar){
							this.dom.find(".avatar img").attr({src:avatar});
						},
						NickName:function(name){
							this.dom.find(".name").text(name);
						},
						Fuid:function(fuid){
							this.dom.find(".name").text(this.dom.find(".name").text()+"("+fuid+")");
							this.dom.attr("data-uid",fuid);
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
							this.dom.attr("data-gid",gid);
						}
					}
				}
			};
			
			//注册Controller的[取得在线用户后]事件
			this.request("addListener",["requestOnlineUserAfter",function(e,data){
				
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
				
			},this]);
			
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
			this.control.messagePanel.find(".request").bind("click",this,function(e){});
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
			$(".modUInforBox").find(".name").text(data.userInfor.name);
			
			this._data.contactHash = {};
			for(var i in data.friends)
			{
				if(data.friends[i].relation!="1"){continue;}
				var item = this.control.friendList.add($("#contacts>li").clone());
				item.datasource(data.friends[i],this.config.binding._default);
				item.addListener("click",function(e,obj){
					e.data.openTalking(e.target._data,e.target.online());
				},this);
				$.hash.add(this._data.contactHash,data.friends[i].id,item);
			}
			for(var i in data.groups)
			{
				var item = this.control.groupList.add($("#contacts>li").clone());
				item.online(true);
				item.datasource(data.groups[i],this.config.binding._default);
				item.addListener("click",function(e,obj){
					e.data.openTalking(e.target._data,e.target.online());
				},this);
				$.hash.add(this._data.contactHash,data.groups[i].id,item);
			}
			
			$(".wrap").css({
				margin:"0 auto",
				top:$(window).height()-$(".wrap").height()<0?0:($(window).height()-$(".wrap").height())/2
			}).fadeIn("slow");
		},
		
		openTalking:function(data,online){
			this.view.talkView.show(data,online);
			if(data.id in this._data.contactHash) this._data.contactHash[data.id].twinkle(false);
			this.updateInformation(this.request("_data"));
		},
		
		updateInformation:function(data){
			this.updateFormTalking(data);
			
			var messagesContent=0,gmessagesContent=0,newNoticeContent=0,newRequestContent=0;
			
			//message
			for(var i in data.information.messages)
			{
				var item = data.information.messages[i];
				if(!item._IsNew){continue;}
				if(item._type=="friend"){messagesContent++;}else{gmessagesContent++;}
				this._data.contactHash[item.id].twinkle(true);
				this.timer.start("news_prompt");
			}
			//notice
			for(var i in data.information.notice)
			{
				
			}
			//request
			for(var i in data.information.request)
			{
				
			}
			
			if(messagesContent>0){
				this.control.messagePanel.find(".message").show().find("span.count").text(messagesContent);
			}else{this.control.messagePanel.find(".message").hide();}
			if(gmessagesContent>0){
				this.control.messagePanel.find(".gmessage").show().find("span.count").text(gmessagesContent);
			}else{this.control.messagePanel.find(".gmessage").hide();}
			
			if(messagesContent+gmessagesContent+newNoticeContent+newRequestContent<=0){
				this.timer.stop("news_prompt");
				$("a.btnMessage").removeClass("showNews").find(".iMessage").removeClass("iNew");
				$("a.btnMessage").unbind("click",this.onBtnMessageClick);
			}else{
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