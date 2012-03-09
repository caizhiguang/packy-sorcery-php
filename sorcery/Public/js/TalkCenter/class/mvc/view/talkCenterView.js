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
			this.talkCenter.addListener("closed",function(e){
				e.other.request("TalkCenter","logout");
			},this);
			this.talkCenter.dom.find("#btnSetting").click(function(){
				window.open($.getRootPath()+"/User/PerInfo.aspx");
			});
			this.talkCenter.dom.find("#btnSearch").click(function(){
				window.open($.getRootPath()+"/Search/SearcharGroup.aspx");
			});
			
			for(var i in friends)
			{
				this.addToFriends(friends[i]);
			}
			
			for(var i in groups)
			{
				this.addToGroups(groups[i]);
			}
			
			$(".sidebar .inLine").click($.proxy(function(){
				this.initExperInlineForm();
				return false;
			},this));
		},
		
		initExperInlineForm:function(){
			if(this.frmExperInline!=null){
				this.frmExperInline.show();
			}else{
				this.request("TalkCenter","data").groupIds+=",0001:4";
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
					e.other.request("TalkCenter","data").groupIds=e.other.request("TalkCenter","data").groupIds.replace(/,0001:4/g,"");
					e.other.frmExperInline = null;
					e.other.formManager.remove(form);
				},this);
				if(this.frmExperInline.isGroup()){
					this.request("TalkCenter","mode").groupUsersMode.load({data:{gid:data.Gid},form:this.frmExperInline});
				}
				
				this.formManager.add(this.frmExperInline);
			}
			return this.frmExperInline;
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
			var ctrl_data = this.request("TalkCenter","data");
			talkForm.news(ctrl_data.topNews);
			talkForm.dom.find(".content .bar a").eq(1).bind("click",{form:talkForm,view:this},function(e){
				e.data.form.dom.find(".content .bar a").removeClass("current");
				$(this).addClass("current");
				var isFilter = e.data.form.TalkInforList._runFilter;				
				for(var i in e.data.form.GroupUsers.list){
					e.data.form.GroupUsers.list[i].hasCheckBox(!isFilter);
					if(e.data.form.GroupUsers.list[i]._data.Uid==e.data.view.request("TalkCenter","data").userId)
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
			talkForm.dom.find(".content .bar a").eq(3).bind("click",{form:talkForm,view:this},function(e){
				e.data.view.request("TalkCenter","showManageForm",[e.data.form._data]);
				return false;
			});
			talkForm.show();
			talkForm.addListener("sent",function(e,form,message){
				e.other.onSent(form,message);
			},this);
			talkForm.addListener("talked",function(e){
				this.TalkInforList.filter(this.TalkInforList._runFilter,e.other.getTalkInforWhiteKey(this.GroupUsers.list,this.TalkInforList.list));
			},this);
			talkForm.addListener("newsItemClick",function(e){
				e.other.initExperInlineForm();
			},this);
			if(talkForm.isGroup()){
				this.request("TalkCenter","mode").groupUsersMode.load({data:{gid:data.Gid},form:talkForm});
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
		
		updateTopNews:function(data){
			for(var i in this.formManager._forms){
				if(this.formManager._forms[i].news==undefined) continue;
				this.formManager._forms[i].news(data);
			}
		},
		
		onSent:function(form,message){
			var ctrl_data = this.request("TalkCenter","data");
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
				var groupNames = this.request("TalkCenter","data").groupNameList;
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
					RealName:groupNames[form._data.Gid]==undefined?this.talkCenter._data.NickName:groupNames[form._data.Gid],
					Ip:"127.0.0.1",
					Gid:form._data.Gid,
					Content:message,
					UType:ctrl_data.loginData.User_Info.Item.State,
					NickName:this.talkCenter._data.NickName,
					Posttime:(new Date()).ToString()
				};
			}
			
			this.request("TalkCenter","modeLoad",["pushMessageMode",{
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/"+address,
				data:data,
				form:form
			}]);			
		}
	});
	
})(jQuery);