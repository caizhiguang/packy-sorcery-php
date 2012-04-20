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
							To:this._data.userInfor.id,
							group:this._data.groupIds==undefined?"":this._data.groupIds
						}});
					},
					scope:this
				},
				online:{
					space:30000,
					validity:"one",
					fun:function(timer,tag){
						this.mode.onlineUsersMode.load({data:{
							onlinelist:this._data.userIds.join(),
							uid:this._data.userInfor.id
						}});
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
			
			this._data.userInfor = $.convert(data.User_Info.Item,{
				Avatar:"avatar",
				NickName:"name",
				UserName:"accountName",
				Uid:"id",
				Status:"validity",
				State:"state"
			});
			var friends = data.User_Friends==""?[]:[].concat(data.User_Friends.Item);
			var groups = data.Group==""?[]:[].concat(data.Group.Item);
			this._data.config.serverTime = $.stringToDate(data.NowTime);
			
			this._data.friends={};
			this._data.groups={};
			
			for(var i in friends)
			{
				var friend = $.convert(friends[i],{
					Avatar:"avatar",
					NickName:"name",
					FUserName:"fulname",
					Fuid:"id",
					State:"status",
					TypeRela:"relation"
				});
				friend._type = "friend";
				if(friend.relation=="1"){
					this._data.friends[friend.id] = friend;
				}else{
					this._data.friends["_"+friend.id] = friend;
				}
			}
			for(var i in groups)
			{
				var group = $.convert(groups[i],{
					Avatar:"avatar",
					GroupName:"name",
					Gid:"id",
					Status:"status",
					FounderID:"founderId",
					GroupType1:"groupType",
					Authentication:"authentication",
					GroupLevel:"level",
					Gbrief:"brief"
				});
				group._type = "group";
				this._data.groups[group.id] = group;
			}
			this._data.userIds = $.unique($.merge(this._data.userIds,this.getUserIds(this._data.friends,"id")));
			this._data.groupIds = this.getGroupIds(this._data.groups);
			
			this.view.talkCenter.datasource({
				userInfor:this._data.userInfor,
				friends:this._data.friends,
				groups:this._data.groups
			});
			this.initPolling();
			var timer = $(document).data("Timer");
			timer.runTimer();
			timer.runAction("online");
			
			this._events.run("loginAfter");
		},
		
		//发送聊天内容
		sentTalking:function(data){
			this.mode.pushMessageMode.load(data);
		},
		
		//取得轮询结果，更新其他板块
		updateInformation:function(data,ajax_options){
			this.view.talkCenter.updateInformation(this._data);
		},
		//取得在线用户列表，更新所有用户在线状态
		updataOnlineUser:function(data){
			data = data==undefined?"":data;
			
			this._events.run("requestOnlineUserAfter",data);
		},
		updateGroupMemberByGroupId:function(gid,member){
			this._events.run("requestGroupMemberAfter",gid,member);
		},
		requestGroupMemberByGroupId:function(gid){
			this.mode.groupUsersMode.load({data:{gid:gid}});
		},
		
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
			var i = 0;
			for(var pro in groups)
			{
				if(i!="0"){str+=",";}
				str+=groups[pro].id+":"+groups[pro].groupType;
				i++;
			}
			return str;
		}
	});
	
})(jQuery);