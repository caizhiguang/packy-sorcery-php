;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.controller");
	
	$.TalkCenter.classes.mvc.controller.talkCenter = $.salvia.Class($.classes.mvc.controller,{
		init:function($super){
			$super("TalkCenter");
			this.mode={};
			this.view={};
			this.data={
				config:{
					space:3000,
					debug:false,
					shell:{
						debugOn:"run debug on"
					}
				},
				userIds:[],
				groupNameList:{},
				groupUser:{},
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
					},
					form:{
						Avatar:function(avatar){
							//this.dom.find(".avatar img").attr({src:$.getRootPath()+$.TalkCenter.config.avatarPath+avatar+".png"});
							this.dom.find(".avatar").show().find("img").attr({src:avatar});
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
							this.text(this.text()+"("+uid+")");
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
							this.text(this.text()+"("+gid+")");
						},
						_SentTo:function(sentTo){
							this.isGroup(sentTo=="group");
						}
					}
				}
			};
			
			this.mode.loginMode=new $.TalkCenter.classes.mvc.mode.loginMode();//登陆mode
			this.mode.pollingMode=new $.TalkCenter.classes.mvc.mode.pollingMode();//轮询mode
			this.mode.messageMode=new $.TalkCenter.classes.mvc.mode.messageMode();//取通讯信息mode
			this.mode.requestMode=new $.TalkCenter.classes.mvc.mode.requestMode();//取请求信息mode
			this.mode.onlineUsersMode = new $.TalkCenter.classes.mvc.mode.onlineUserMode();//取在线成员信息mode
			this.mode.getProChatTopMode = new $.TalkCenter.classes.mvc.mode.getProChatTopMode();//取得专家在线前N条信息mode
			
			this.mode.friendMode=new $.TalkCenter.classes.mvc.mode.accpetFriendMode();//取好友请求被同意后信息mode
			this.mode.responeFriendRequsetMode=new $.TalkCenter.classes.mvc.mode.responeFriendRequsetMode();//反馈好友请求信息mode
			this.mode.listenMode=new $.TalkCenter.classes.mvc.mode.listenMode();//添加关注mode
			this.mode.makingFriendMode=new $.TalkCenter.classes.mvc.mode.makingFriendMode();//添加好友mode
			
			this.mode.groupUsersMode=new $.TalkCenter.classes.mvc.mode.groupUserMode();//取群成员mode
			this.mode.exitGroupMode=new $.TalkCenter.classes.mvc.mode.exitGroupMode();//清退成员mode
			this.mode.noticeMode = new $.TalkCenter.classes.mvc.mode.noticeMode();
			this.mode.createNoticeMode = new $.TalkCenter.classes.mvc.mode.createNoticeMode();
			
			//发送通讯信息mode
			this.mode.pushMessageMode=new $.classes.mvc.mode({dataType:"xml"});
			this.mode.pushMessageMode.addListener("success",function(e,options,data){
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
		},
		
		//发生好友请求
		makingFriend:function(data){
			this.view.talkCenterView.msgBox(
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
						/*Uid:$(document).data("TalkCenter").data.loginData.User_Info.Item.Uid,
						UserName:$(document).data("TalkCenter").data.loginData.User_Info.Item.NickName,*/
						Uid:e.other.view.data.loginData.User_Info.Item.Uid,
						UserName:e.other.view.data.loginData.User_Info.Item.NickName,
						Fuid:e.other.data.Uid,
						FUserName:e.other.data.GroupName,
						Comments:comments,
						TypeRela:"1"
					}});
				},{view:this,data:data}
			);
		},
		//发生关注请求
		listen:function(data){
			this.mode.listenMode.load(data);
		},
		
		login:function(afterAction){
			this.afterAction = afterAction;
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
			
		},
		initGroupManageView:function(){
			this.view.groupManageView = new $.TalkCenter.classes.mvc.view.groupManageView();
		},
		
		removeMember:function(gid,uids){
			var form = this.view.talkCenterView.formManager.forms.Items(this.view.groupManageView.formsObj[gid]);
			var uids = uids.split(",");
			var removeKeys = [];
			for(var i in this.data.groupMember[gid])
			{
				if($.inArray(this.data.groupMember[gid][i].Uid,uids)!=-1){
					removeKeys.push(i);
				}
			}
			
			for(var i in removeKeys){
				this.data.groupMember[gid].splice(removeKeys[i],1);
			}
			
			if(form){
				for(var i in uids){
					form.dom.find("#"+$.md5(uids[i])).remove();
				}
			}
			if($(".modTalkForm[data-gid='"+gid+"']").length>0)
			{
				for(var i in uids){
					$(".modTalkForm[data-gid='"+gid+"']").find(".contacts li[data-uid='"+uids[i]+"']").remove();
				}
			}
			
			//this.mode.groupUsersMode.load({data:{gid:data.Gid},form:$("[data-gid='"+data.Gid+"']")});
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
		
		updateMsgForm:function(){
			this.view.communView.updateMsgForm();
		},
		updataOnlineUser:function(){
			this.view.communView.updataOnlineUser();
		},
		addToFriends:function(friend){
			this.view.talkCenterView.addToFriends(friend);
		},
		msgBox:function(ctrlName,requestContent,args){
			this.view.talkCenterView.msgBox(ctrlName,requestContent,args);
		},
		showTalkForm:function(data){
			return this.view.talkCenterView.showTalkForm(data);
		},
		responeFriendRequset:function(data){
			this.mode.responeFriendRequsetMode.load(data);
		},
		updateTopNews:function(data){
			/*for(var i in data)
			{
				$("#topNews .planes>div:not(.cloned)").eq(i).text(data[i].Content);
			}*/
			this.data.topNews = data;
			this.view.talkCenterView.updateTopNews(data);
		},
		
		createNotice:function(result,data){
			if(result){
				this.mode.noticeMode.load({data:{
					fromuId:this.data.userId,
					groupId:data.GroupID,
					start:0,
					end:10
				}});
				
				this.view.talkCenterView.msgBox("提示","发送成功！",["Ok"]);
				var formId = this.view.groupManageView.formsObj[data.GroupID];
				var groupManageForm = this.view.talkCenterView.formManager.forms.Items(formId);
				this.view.groupManageView.createNoticeAfter(groupManageForm,data);
			}else{
				this.view.talkCenterView.msgBox("提示","发送失败，请刷新页面再继续！",["Ok"]);
			}
		},
		updateNotice:function(gid,notice,noticesCount){
			var formId = this.view.groupManageView.formsObj[gid];
			var form = this.view.talkCenterView.formManager.forms.Items(formId);
			form.notice(notice,
				{
					Subject:function(title){
						this.dom.addClass("notice");
						this.title("<a href='javascript:;' title='点击展开'>"+title+"</a>");
					},
					Message:function(content){
						this.dom.find("dd").append($.c("div").addClass("notice_content").append(content));
					},
					FromName:function(name){
						this.dom.find("dd").append("<div class='notice_fd'><span class='name'> "+name+"</span> 于 <span class='time'></span> 时间发布</div>");
					},
					Posttime:function(time){
						this.title(this.title()+"<span class='left10 time'>"+time+"</span>");
						this.dom.find("dd .time").text(time);
					},
					Fromuid:function(uid){
						this.dom.find(".notice_fd .name").attr("data-uid",uid);
					},
					Receipt:function(receipt){
						if(receipt=="0"){return;}
						var receiptForm = $.c("form").submit($.proxy(function(e){
							//this.request("TalkCenter","modeLoad",["noticeMode",{data:{fromuId:ctrl_data.userId,groupId:data.Gid,start:0,end:30}}]);
							return false;
						},this));
						$.c("input").attr({
							type:"text",
							name:"receipt"
						}).addClass("text right10 tb10").appendTo(receiptForm);
						$.c("input").attr("type","submit").addClass("btn btn1").val("提交回执").appendTo(receiptForm);
						this.dom.find(".notice_fd").before(receiptForm);
					}
				},noticesCount);
		},
		
		modeLoad:function(modeName,data){
			if(this.mode[modeName]==undefined){
				$.error(modeName+" is not find!");
			}else{
				this.mode[modeName].load(data);
			}
		},
		initExperInline:function(){
			this.view.talkCenterView.initExperInlineForm();
		},
		showManageForm:function(data){
			var form = this.view.groupManageView.showManageForm(data);
			if(form){
				this.view.talkCenterView.formManager.add(form);
			}else{
				var formId = this.view.groupManageView.getFormIdByGid(data.Gid);
				this.view.talkCenterView.formManager.forms.Items(formId).show();
			}
		},
		
		loginLoading:function(){
			var screen = $("#Screen").length!=0?$("#Screen"):$.c("div").appendTo(document.body).append($.c("div").addClass("bgiframe")).append($.c("iframe"));
			var iframeCss = {
				border:"none",
				width:$(window).width(),
				height:$(window).height()
			};
			screen.attr({id:"Screen"}).css({
				width:$(window).width(),
				height:$(window).height(),
				zIndex:"998",
				position:"absolute",
				top:0,
				left:0
			}).find("iframe").css($.extend({},{zIndex:-1},iframeCss));
			screen.find(".bgiframe").css($.extend({},{zIndex:-2},iframeCss));
			
			screen.append($.c("div").css({
				height:"auto",
				width:400,
				left:$(window).width()/2 - 200,
				top:$(window).height()/2 -20,
				position:"absolute",
				/*background:"#fff",*/
				fontSize:"24px",
				textAlign:"center",
				color:"#fff"
			}).text("加载中..."));
			
			$(document).data("screen",screen);
		},
		loginComplete:function(){
			var screen = $(document).data("screen");
			screen.remove();
			$(document).data("screen",null);
		},
		
		createDebugBox:function(){
			$.doc.data("messageIndex",0);
			$("#wrap").append('<div id="debug_message" style="position:absolute;bottom:37px;border:#ddd solid 1px; background:#fff;width:500px; height:300px; z-index:999;right:10px;"></div>');
			$("#debug_message").append("<div class='p10' style='position:absolute;top:0;left;0;background:#fff;height:30px;'><span class='right10'>debug内容</span><a href='javascript:;' class='btnClose'>关闭</a></div>");
			$("#debug_message").append("<div class='messageBox' style='position:absolute; top:30px;left:0; height:270px; right:0; overflow:auto;'></div>");
			$("#debug_message").hover(function(){
				$(this).data("isOver",true);
			},function(){
				$(this).data("isOver",false);
			});
			
			$("#debug_message .btnClose").click($.proxy(function(){
				this.data.config.debug=false;
				$("#debug_message").remove();
			},this));
			this.data.config.debug = true;
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
			this.initCommunView();
			this.initGroupManageView();
			this.mode.getProChatTopMode.load({data:{n:5}});
			
			this.afterAction();
			
			if(window.location.hash=="#expert"){this.initExperInline();}
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
				this.initExperInline();
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