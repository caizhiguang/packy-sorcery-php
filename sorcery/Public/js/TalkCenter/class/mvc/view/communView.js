;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.view");
	/**
	 * 主要功能：
	 * --带时间器，可设置特定时间间隔去做指定操作
	 * --特定时间向服务器询问数据更新情况
	 * **/
	$.TalkCenter.classes.mvc.view.communView = new $.salvia.Class($.TalkCenter.classes.mvc.view.baseView,{
		init:function($super,options){
			this.data = this.request("TalkCenter","data");
			this.view={
				newsForm:new $.classes.ui.newsForm($.salvia.packet("Form.lbi").appendTo("#wrap"))
			};
			this.view.newsForm.tip($("[data-for='"+this.request("TalkCenter","view").talkCenterView.talkCenter.id+"']"),{
				location:"top center",
				content:"rel",
				hideHandle:"tip",
				hideAction:"mouseleave",
				showAction:"mouseover"
			});
			this.view.newsForm.updateView();
			this.view.newsForm.showDiscription();
			
			var server_timer = {
				time:new Date(this.data.config.serverTime),
				space:500,
				run:function(){
					var server_timer = $.doc.data("ServerTimer");
					server_timer.time.setMilliseconds(server_timer.time.getMilliseconds()+500);
					setTimeout(server_timer.run,server_timer.space);
					
					/*if($.doc.data("Controllers").TalkCenter.data.config.debug){
						var i = $.doc.data("messageIndex");
						var debug_msgBox = $("#debug_message").find(".messageBox");
						var title = "服务器时间：";
						var content = "<div>"+server_timer.time.ToString()+"</div>";
						debug_msgBox.append("<dl class='p10'><dt>("+i+") "+title+"</dt><dd>"+content+"</dd></dl>");
						if(!($("#debug_message").data("isOver")==true)){
							debug_msgBox.scrollTop(debug_msgBox[0].scrollHeight);
						}
						i++;
						$.doc.data("messageIndex",i);
					}*/
				}
			};
			$.doc.data("ServerTimer",server_timer);
			server_timer.run();
			
			var timer = $(document).data("Timer")==undefined?new $.TalkCenter.classes.util.timer():$(document).data("Timer");
			timer.addAction({
				polling:{
					space:2000,
					fun:function(timer,tag){
						var time = new Date($.doc.data("ServerTimer").time);
						//time.setSeconds(time.getSeconds()+tag.count/1000+this.data.config.space/1000);
						$(document).data("TimeNow",time);
						
						var start = new Date(time);
						var end = new Date(time);
						start.setSeconds(end.getSeconds()-this.data.config.space/1000-5);
						end.setSeconds(end.getSeconds()+5);
						
						$.doc.data("LocalTime",new Date());
						this.request("TalkCenter","modeLoad",["pollingMode",{data:{
							start:start.ToString(),
							end:end.ToString(),
							To:this.data.userId,
							group:this.data.groupIds==undefined?"":this.data.groupIds
						}}]);
					},
					scope:this
				},
				online:{
					space:30000,
					fun:function(timer,tag){
						this.updataOnlineUser();
					},
					scope:this
				},
				getProChatTop:{
					space:30000,
					fun:function(timer,tag){
						this.request("TalkCenter","modeLoad",["getProChatTopMode",{data:{n:5}}]);
					},
					scope:this
				}
			});
			var nowTime = new Date(this.data.config.serverTime);
			this.request("TalkCenter","modeLoad",["pollingMode",{data:{
				start:$.cookie("last_time")==undefined?nowTime.setHours(nowTime.getHours()+1).ToString():$.cookie("last_time"),
				end:this.data.config.serverTime.ToString(),
				To:this.data.userId,
				group:this.data.groupIds==undefined?"":this.data.groupIds
			}}]);
			$.cookie("last_time");
			this.updataOnlineUser();
		},
		runTimer:function(){
			$(document).data("Timer").runTimer();
		},
		
		updataOnlineUser:function(){
			this.request("TalkCenter","modeLoad",["onlineUsersMode",{data:{
				onlinelist:this.data.userIds.join(),
				uid:this.data.userId
			}}]);
		},
		
		updateMsgForm:function(){
			//$(document).data("TalkCenter").updataTalkingToForms();
			var contactList = this.request("TalkCenter","view").talkCenterView.talkCenter.contactList;
			var list = [];
			for(var j in contactList.list)
			{
				var item = contactList.list[j].contact._data;
				if(contactList.list[j].type=="follow"){continue;}
				
				var copyData = $.extend({},{},item);
				var messages = this.data.messages;
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
			
			var requests = this.data.requests;
			if(requests.length>0)
			{
				var responeCount={
					Friend:0,
					Group:0
				};
				for(var i in requests)
				{
					responeCount[requests[i].Type]++;
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
			
			var notices = this.data.notice;
			if(notices.length>0)
			{
				/*var noticeItem = {
					id:$.md5("respone"),
					name:"通知("+log.Request.length+")"
				};*/
			}

			this.view.newsForm.removeListener("detailItemClick");
			this.view.newsForm.addListener("detailItemClick",function(e,data){
				var ctrl_data = e.other.data;
				switch(data._newsType){
					case "message":
						var talkForm = e.other.request("TalkCenter","showTalkForm",[data]);
						e.other.request("TalkCenter","updataTalkingToForms");
						e.other.updateMsgForm();
						break;
					case "request":
						for(var i in ctrl_data.requests){							
							e.other.msgBox(
								"好友请求 ",
								"<div class='pbottom10'>"+ctrl_data.requests[i].RequestName+"向你申请成为好友</div><div>附加信息："+ctrl_data.requests[i].RequestComments+"</div>",
								{
									Yes:"同意",
									No:"拒绝",
									Cancel:"忽略"
								},
								function(e,result){
									if(result=="Cancel"){return;}
									
									var view = e.other.view;
									var itemData = e.other.data;
									
									$.list.remove(ctrl_data.requests,itemData);
									view.updateMsgForm();
									var comments = this.dom.find("#msgForm_comment").val();
									view.request("TalkCenter","modeLoad",["responeFriendRequsetMode",{data:{
										Uid:ctrl_data.userId,
										FUserName:itemData.RequestName,
										Fuid:itemData.RequestId,
										IsAgree:result=="Yes"?1:0
									}}])
								},
								{view:e.other,data:ctrl_data.requests[i]}
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