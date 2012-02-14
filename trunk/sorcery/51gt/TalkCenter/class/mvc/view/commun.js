;(function($){
	
	$.salvia.namespace("$.TalkCenter.classes.mvc.view");
	/**
	 * 主要功能：
	 * --带时间器，可设置特定时间间隔去做指定操作
	 * --特定时间向服务器询问数据更新情况
	 * **/
	$.TalkCenter.classes.mvc.view.commun = new $.salvia.Class($.classes.mvc.view,{
		init:function($super,options){
			this.data = {
				messages:[],
				newMessagesContent:0,
				requests:[],
				newRequestContent:0,
				
				serverTime:"",
				userId:"",
				groupIds:""
			};
			this.mode={};
			
			this.createPollingMode();
			this.createMessageMode();
			this.createRequestMode();
			this.createFriendMode();
			
			var timer = $(document).data("Timer");
			timer.addAction({
				polling:{
					space:2000,
					fun:function(){
						var time = this.data.serverTime;
						
						if(time==undefined){time = config.ServerTime;}
						time.setSeconds(time.getSeconds()+config.Space/1000);
		
						$(document).data("TimeNow",time);
						
						var start = newsController.Start = new Date(time);
						var end = newsController.End = new Date(time);
						start.setSeconds(end.getSeconds()-config.Space/1000-5);
						end.setSeconds(end.getSeconds()+5);
						
						this.mode.pollingMode.load({
							start:start,
							end:end,
							To:this.data.userId,
							group:this.data.groupIds
						});
					},
					scope:this
				}
			});
			timer.runTimer();
		},
		//创建  轮询  模型(创建AJAX询问模型)
		createPollingMode:function(){
			var pollingMode = new $.classes.mvc.mode({
				url:"../../UserCenter/UserBasic.asmx/GetGroup_FriendByTo1",
				dataType:"xml",
			});
			pollingMode.addListener("success",function(e,mode,data){
				//this作用于options
				var messageCount = data.Check.Item.Message;
				var requestCount = data.Check.Item.Request;
				var noticeCount = data.Check.Item.Notice;
				var fRequestCount = data.Check.Item.FRespone;
				var expertGroupCount = data.Check.Item.Pro;
				
				if(Number(messageCount)!=0){e.other.mode.messageMode.load(id,start_str,end_str);}
				if(Number(requestCount)!=0){e.other.mode.requestMode.load(id);}
//				if(Number(noticeCount)!=0){e.other.mode.loadNotice();}
				if(Number(fRequestCount)!=0){e.other.mode.friendMode.load();}
			},this);
			
			this.mode.pollingMode=pollingMode;
		},
		//创建  聊天信息  模型(创建AJAX询问模型)
		createMessageMode:function(){
			var messageMode = new $.classes.mvc.mode({
				url:"../../UserCenter/UserBasic.asmx/GetGroup_FriendByTo1",
				dataType:"xml",
			},{
				data:function(data){
					if(data.MsgToMe==""){return "";}//当没有新信息时跳出
					return [].concat(data.MsgToMe.Item);
				}
			});
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
			var requestMode = new $.classes.mvc.mode({
				url:"../../UserCenter/UserBasic.asmx/GetRequestToMe",
				dataType:"xml",
			},{
				data:function(data){
					if(data.GFRequest==""){return "";}//当没有新信息时跳出
					return [].concat(data.GFRequest.Item);
				}
			});
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
			});
			
			this.mode.requestMode=requestMode;
		},
		//创建  添加好友信息  模型(创建AJAX询问模型)
		createFriendMode:function(){
			var friendMode = new $.classes.mvc.mode({
				url:"../../UserCenter/UserBasic.asmx/GetAccpetFriend",
				dataType:"xml",
			},{
				data:function(data){
					data.User_Friends.Item.ID = data.User_Friends.Item.Fuid;
					data.User_Friends.Item.name = data.User_Friends.Item.FUserName;
					data.User_Friends.Item.avatar = data.User_Friends.Item.Avatar;
					return data.User_Friends.Item;
				}
			});
			friendMode.addListener("success",function(e,mode,returndata){
				//添加到好友列表
			});
			
			this.mode.friendMode=friendMode;
		},
		
		
		updateMsgForm:function(){}
	});
	
})(jQuery);