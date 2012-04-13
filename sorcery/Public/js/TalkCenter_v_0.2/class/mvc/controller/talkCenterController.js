;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.controller");
	
	$.TalkCenter.classes.mvc.controller.talkCenterController = $.salvia.object.Class($.classes.mvc.controller,{
		init:function($super){
			$super("TalkCenter");
			this._data = {
				config:{
					space:3000,
					debug:false,
					shell:{
						debugOn:"run debug on"
					}
				},
				information:{
					messages:[],
					newMessagesContent:0,
					requests:[],
					newRequestContent:0,
					notice:[],
					newNoticeContent:0
				},
				userIds:[],
				groupUser:{}
			};
			
			this.view={
				talkCenter:new $.TalkCenter.classes.mvc.view.talkCenterView()
			};
			
			this.mode={};
			this.mode.loginMode=new $.TalkCenter.classes.mvc.mode.loginMode();//登陆mode
			this.mode.pollingMode=new $.TalkCenter.classes.mvc.mode.pollingMode();//轮询mode
			this.mode.messageMode=new $.TalkCenter.classes.mvc.mode.messageMode();//取通讯信息mode
			this.mode.requestMode=new $.TalkCenter.classes.mvc.mode.requestMode();//取请求信息mode
			this.mode.onlineUsersMode = new $.TalkCenter.classes.mvc.mode.onlineUserMode();//取在线成员信息mode
			this.mode.getProChatTopMode = new $.TalkCenter.classes.mvc.mode.getProChatTopMode();//取得专家在线前N条信息mode
			
			this.mode.oldMessageMode=new $.TalkCenter.classes.mvc.mode.oldMessageMode();//取旧的通讯信息mode
			
			this.mode.friendMode=new $.TalkCenter.classes.mvc.mode.accpetFriendMode();//取好友请求被同意后信息mode
			this.mode.responeFriendRequsetMode=new $.TalkCenter.classes.mvc.mode.responeFriendRequsetMode();//反馈好友请求信息mode
			this.mode.listenMode=new $.TalkCenter.classes.mvc.mode.listenMode();//添加关注mode
			this.mode.makingFriendMode=new $.TalkCenter.classes.mvc.mode.makingFriendMode();//添加好友mode
			
			this.mode.groupUsersMode=new $.TalkCenter.classes.mvc.mode.groupUserMode();//取群成员mode
			this.mode.exitGroupMode=new $.TalkCenter.classes.mvc.mode.exitGroupMode();//清退成员mode
			this.mode.noticeMode = new $.TalkCenter.classes.mvc.mode.noticeMode();
			this.mode.createNoticeMode = new $.TalkCenter.classes.mvc.mode.createNoticeMode();
			this.mode.sendReceiptMode = new $.TalkCenter.classes.mvc.mode.sendReceiptMode();
			
			this.mode.pushMessageMode=new $.TalkCenter.classes.mvc.mode.pushMessageMode();//发送通讯信息mode
		},
		
		initPolling:function(){
			var server_timer = {
				time:new Date(this._data.config.serverTime),
				space:500,
				run:function(){
					var server_timer = $(document).data("ServerTimer");
					server_timer.time.setMilliseconds(server_timer.time.getMilliseconds()+500);
					setTimeout(server_timer.run,server_timer.space);
				}
			};
			
			$(document).data("ServerTimer",server_timer);
			server_timer.run();
			
			var timer = $(document).data("Timer")==undefined?new $.TalkCenter.classes.util.timer():$(document).data("Timer");
			timer.addAction({
				polling:{
					space:2000,
					fun:function(timer,tag){
						var time = new Date($(document).data("ServerTimer").time);
						$(document).data("TimeNow",time);
						
						var start = new Date(time);
						var end = new Date(time);
						start.setSeconds(end.getSeconds()-this._data.config.space/1000-5);
						end.setSeconds(end.getSeconds()+5);
						
						$(document).data("LocalTime",new Date());
						this.mode.pollingMode.load({data:{
							start:start.ToString(),
							end:end.ToString(),
							To:this._data.userInfor.Uid,
							group:this._data.groupIds==undefined?"":this._data.groupIds
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
				},
				getProChatTop:{
					space:30000,
					fun:function(timer,tag){
						this.mode.getProChatTopMode.load({data:{n:5}});
					},
					scope:this
				}
			});
			
		},

		login:function(){
			//登入
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
			//登出
			$.cookie("LoginInfo",null,{path:"/"});//注销用户
			$("#form1").find("input[type='submit']")[0].click();
		},
		loginLoading:function(){},
		loginComplete:function(){},
		loginAfter:function(data){
			//登入后处理
			
			this._data.userInfor = data.User_Info.Item;
			this._data.friends = data.User_Friends==""?[]:[].concat(data.User_Friends.Item);
			this._data.groups = data.Group==""?[]:[].concat(data.Group.Item);
			this._data.config.serverTime = $.stringToDate(data.NowTime);
			
			this._data.userIds = $.unique($.merge(this._data.userIds,this.getUserIds(this._data.friends,"Fuid")));
			this._data.groupUser = this.getGroupIds(this._data.groups);
			
			this.view.talkCenter.datasource({
				userInfor:$.salvia.data.convert(this._data.userInfor,{
					Avatar:"avatar",
					NickName:"name"
				}),
				friends:this._data.friends,
				groups:this._data.groups
			});
			this.initPolling();
			$(document).data("Timer").runTimer();
			
			this._events.run("loginAfter");
		},
		
		//取得轮询结果，更新其他板块
		updateInformation:function(data,ajax_options){
			
		},
		//取得在线用户列表，更新所有用户在线状态
		updataOnlineUser:function(){},
		
		getUserIds:function(data,key){
			if(data.length<=0){return;}
			var users = [];
			for(var i in data)
			{
				users.push(data[i][key]);
			}
			return users;
		},
		getGroupIds:function(groups){
			var str = "";
			for(var i in groups)
			{
				if(i!="0"){str+=",";}
				str+=groups[i].Gid+":"+groups[i].GroupType1;
			}
			return str;
		}
	});
	
})(jQuery);