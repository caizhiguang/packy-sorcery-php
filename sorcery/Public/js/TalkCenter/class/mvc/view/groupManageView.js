;(function($){
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.view");
	$.TalkCenter.classes.mvc.view.groupManageView = new $.salvia.Class($.TalkCenter.classes.mvc.view.baseView,{
		init:function(){			
			this.formsObj = {};
		},
		getFormIdByGid:function(gid){
			return this.formsObj[gid];
		},
		showManageForm:function(data){
			if(this.formsObj[data.Gid]!=undefined){return false;}
			var manageForm = this.createForm(data);
			var ctrl_data = this.request("TalkCenter","data");
			manageForm.datasource(data,{
				GroupName:function(name){
					this.text("群管理 "+name);
					this.dom.find("h5.name").text(name);
				},
				Gid:function(id){
					this.text(this.text()+" ("+id+")");
					this.id = $.md5("manager-"+id);
				}
			});
			manageForm.show();
			
			manageForm.dom.find("#btnToManager").click(function(){
				window.location.href=$.getRootPath()+"/GroupCircularize/Circularize.aspx";
			});
			
			manageForm.addListener("memberFormSubmit",function(e){
				var data = [];
				var checkedBox = this.dom.find("#memberForm input:checkbox[checked='true']").each(function(){
					data.push($(this).val());
				});
				e.other.view.request("TalkCenter","modeLoad",["exitGroupMode",{data:{gid:e.other.data.Gid,uid:data.join()}}]);
			},{view:this,data:data});
			manageForm.addListener("noticePageChanged",function(e){
				e.other.view.request("TalkCenter","modeLoad",["noticeMode",{data:{fromuId:ctrl_data.userId,groupId:data.Gid,start:0,end:10}}]);
			},{view:this,data:data});
			manageForm.addListener("sentNewNotice",function(e){
				var Fromuid = e.other.ctrl_data.userId;
				var FromName = e.other.ctrl_data.groupNameList[e.other.data.Gid];
				var ReceivedID = [];
				var ReceivedName = [];
				for(var i in this.noticeContacts.list)
				{
					if(!this.noticeContacts.list[i].checked()){continue;}
					ReceivedID.push(this.noticeContacts.list[i]._data.Uid);
					ReceivedName.push(this.noticeContacts.list[i]._data.GroupName);
				}
				var Subject = this.dom.find("input.new_r_title").val();
				var Message = this.dom.find("textarea.new_r_content").val();
				var GroupID = e.other.data.Gid;
				var GroupName = e.other.data.GroupName;
				var Receipt = this.dom.find("#hasReturn")[0].checked?1:0;
				
				if(ReceivedID.length<=0){
					e.other.view.msgBox("提示","请选择收件人！",["Ok"]);
					return false;
				}
				if(Subject.length<=0){
					e.other.view.msgBox("提示","请填写通知标题！",["Ok"]);
					return false;
				}
				if(Message.length<=0){
					e.other.view.msgBox("提示","请填写通知内容！",["Ok"]);
					return false;
				}
				
				e.other.view.request("TalkCenter","modeLoad",["createNoticeMode",{data:{
					Fromuid:Fromuid,
					FromName:FromName,
					ReceivedID:ReceivedID.join(),
					ReceivedName:ReceivedName.join(),
					Subject:Subject,
					Message:Message,
					GroupID:GroupID,
					GroupName:GroupName,
					Receipt:Receipt
				}}]);
			},{view:this,data:data,ctrl_data:ctrl_data});
			manageForm.member(ctrl_data.groupMember[data.Gid],{
				Uid:function(uid){
					this.dom.markData("uid",uid);
					this.dom.find("input").val(uid);
				},
				GroupName:function(name){
					this.text(name);
				},
				Gid:function(gid){
					this.dom.markData({gid:gid});
				},
				Avatar:function(avatar){
					this.dom.find(".avatar img").attr({src:avatar});
				}
			});
			this.formsObj[data.Gid] = manageForm.id;
			
			manageForm.addListener("closed",function(e){
				e.other.view.formsObj[e.other.data.Gid]==null;
				delete e.other.view.formsObj[e.other.data.Gid];
			},{view:this,data:data});
			
			this.request("TalkCenter","modeLoad",["noticeMode",{data:{fromuId:ctrl_data.userId,groupId:data.Gid,start:0,end:30}}]);
			
			return manageForm;
		},
		createForm:function(data){
			var authority = "";
			var ctrl_data = this.request("TalkCenter","data");
			switch(ctrl_data.groupUser[data.Gid].State){
				case "2":
					authority = "creator";
					break;
			}
			var form = new $.TalkCenter.classes.ui.groupManageForm($.salvia.packet("GroupManageForm.lbi").addClass("modTalkManageForm").appendTo("#wrap"),{},authority);
			return form;
		},
		createNoticeAfter:function(form,data){
			form.dom.find("input.new_r_title").val("");
			form.dom.find("textarea.new_r_content").val("");
			form.dom.find(".panel").eq(1).show();
			form.dom.find(".panel").eq(2).hide();
		}
	});
})(jQuery);