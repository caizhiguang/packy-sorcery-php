;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.view");
	
	$.TalkCenter.classes.mvc.view.talkView = $.salvia.object.Class($.classes.mvc.view,{
		
		init:function($super){
			$super("TalkCenter");
			
			this._data={
				groupMember:{},
				formsHash:{},
				facesPath:$.getRootPath()+$.browser.msie&&$.browser.version=="6.0"?"/photo/faces_ie6":"/photo/faces/",
				faceHash:{
					'[闭嘴]':"闭嘴.png",
					'[不是吧]':"不是吧.png",
					'[擦汗]':"擦汗.png",
					'[大笑]':"大笑.png",
					'[发怒]':"发怒.png",
					'[反对]':"反对.png",
					'[鼓掌]':"鼓掌.png",
					'[汗]':"汗.png",
					'[惊吓]':"惊吓.png",
					'[惊讶]':"惊讶.png",
					'[可怜]':"可怜.png",
					'[哭]':"哭.png",
					'[衰]':"衰.png",
					'[无奈]':"无奈.png",
					'[无语]':"无语.png",
					'[鲜花]':"鲜花.png",
					'[疑惑]':"疑惑.png",
					'[晕]':"晕.png",
					'[支持]':"支持.png"
				}
			};

			for(var pro in this._data.faceHash)
			{
				this._data.faceHash[pro]=$.getRootPath()+this._data.facesPath+this._data.faceHash[pro];
			}
			
			this.control={
				formManager:new $.classes.util.formManager({resetLocation:false}),
				taskbar:new $.TalkCenter.classes.ui.list($(".taskbar>.items"))
			};
			
			this.control.formManager.addListener("removed",function(e,form){
				var current_index = $("[data-from='"+form.dom.attr("data-id")+"']").attr("data-index");
				e.data.control.taskbar.remove($("[data-from='"+form.dom.attr("data-id")+"']").data("ui-class"));
				
				if(e.data.control.taskbar.count()<=0){return;}
				e.data.control.taskbar.dom.find("a").each(function(i){
					$(this).attr("data-index",i);
				});
				e.data.form_seekTo(current_index<=0?current_index:current_index-1);
			},this);
			this._type = "default";
			
			//注册controler的[取得群组用户后]事件
			this.request("addListener",["requestGroupMemberAfter",function(e,gid,member){
				e.data._data.groupMember[gid]=[];
				for(var i in member){
					var data = $.convert(member[i],{
						Uid:"id",
						GroupName:"name",
						Avatar:"avatar",
						Utype:"status",
						State:"groupStatus",
						GroupType:"groupType",
						StudentID:"number"
					});
					data.avatar = data.avatar==undefined?"../photo/avatar/3.png":data.avatar;
					e.data._data.groupMember[gid].push(data);
					e.data._data.formsHash[gid].setGroupMember($("#contacts>li").clone().attr("name","member"),data,e.data.config.binding._memberContacts);
				}
				e.data._data.formsHash[gid].dom.find(".infor .memberCount").text(member.length);
			},this]);
			//注册controler的[取得在线用户后]事件
			this.request("addListener",["requestOnlineUserAfter",function(e,data){
				var forms = e.data.control.formManager._forms;
				var taskbarItems = e.data.control.taskbar.list;
				var compare = function(a,b){
					return ($(a)[0].className.indexOf("off")==-1)&&($(b)[0].className.indexOf("off")==-1)?0:(($(a)[0].className.indexOf("off")==-1)?1:-1);
				};
				
				for(var i in taskbarItems){
					var item = taskbarItems[i];
					if(data.indexOf(item._data.id)!=-1){item.online(false);continue;}
					item.online(true);
				}
				for(var i in forms){
					var item = forms[i];
					if(data.indexOf(item._data.id)!=-1){item.online(false);continue;}
					item.online(true);
				}
			},this]);
			
			this.config={
				binding:{
					_defaultForm:{
						avatar:function(avatar){
							this.dom.find(".avatar").show().find("img").attr({src:avatar});
						},
						name:function(name){
							this.text(name);
							this.dom.find("form.input>[name='addressee_name']").val(name);
							this.dom.find(".infor .groupName").text(name);
						},
						id:function(id){
							this.dom.attr({'data-dId':id});
							this.text(this.text()+"("+id+")");
							this.dom.find("form.input>[name='addressee_id']").val(id);
						},
						brief:function(brief){
							this.dom.find(".affiche>.news_box_content").html(brief);
							this.dom.find(".infor .affiche").html(brief);
						},
						groupType:function(type){
							this.dom.find("form.input>[name='grouptype']").val(type);
							var groupType = "";
							switch(type)
							{
								case "0":
									groupType="教育群";
									break;
								case "1":
									groupType="聊天群";
									break;
								case "2":
									groupType="毕业群";
									break;
								case "3":
									groupType="社区群";
									break;
							}
							this.dom.find(".infor .groupType").text(groupType);
						},
						_type:function(_type){
							this.dom.attr("data-_type",_type);
							this.dom.find("form.input>[name='type']").val(_type);
						}
					},
					_defaultContacts:{
						avatar:function(avatar){
							this.dom.find(".avatar").show().find("img").attr({src:avatar});
						},
						name:function(name){
							this.text(name);
							this.dom.find("form.input>[name='addressee_name']").val(name);
						},
						id:function(id){
							this.text(this.text()+"("+id+")");
							this.dom.attr({href:"#"+id,'data-dId':id});
						},
						brief:function(brief){
							this.dom.find(".affiche>.news_box_content").html(brief);
						},
						_type:function(_type){
							this.dom.attr("data-_type",_type);
						}
					},
					_memberContacts:{
						avatar:function(avatar){
							this.dom.find(".avatar").show().find("img").attr({src:avatar});
						},
						name:function(name){
							this.text(name);
							this.dom.find("form.input>[name='addressee_name']").val(name);
						},
						id:function(id){
							this.text(this.text()+"("+id+")");
						},
						brief:function(brief){
							this.dom.find(".affiche>.news_box_content").html(brief);
						},
						_type:function(_type){
							this.dom.attr("data-_type",_type);
						}
					},
					send:{
						sender_name:function(name){
							this.dom.find(".name").text(name);
						},
						sender_id:function(id){
							
						},
						time:function(time){
							this.dom.find(".time").text(time);
						},
						content:function(content){
							this.dom.find(".infor").html(content);
						}
					}
				}
			};
		},
		createForm:function(data){
			var tmp = data._type=="friend"?$("#talkform").clone().removeAttr("id"):$("#grouptalkform").clone().removeAttr("id");
			var form = new $.TalkCenter.classes.ui.talkForm(tmp.appendTo($(".main>.forms")),{
				disposition:"Customer"
			});
			var ctrl_data = this.request("_data");
			form.datasource(data,this.config.binding._defaultForm);
			form.dom.find("form.input>[name='sender_id']").val(ctrl_data.userInfor.id);
			form.dom.find("form.input>[name='sender_name']").val(ctrl_data.userInfor.name);
			form.dom.find("form.input>[name='sender_type']").val(ctrl_data.userInfor.state);
			
			form.faceDatasource(this._data.faceHash);
			
			form.addListener("send",function(e){
				e.data.that.onSend(e.data.form);
			},{form:form,that:this});
			form.addListener("closed",function(e){
				$.hash.remove(e.data._data.formsHash,this._data.id);
				if($.hash.contains(e.data._data.groupMember,this._data.id)){$.hash.remove(e.data._data.groupMember,this._data.id);}
			},this);
			
			$.hash.add(this._data.formsHash,data.id,form);
			return form;
		},
		createTaskbarButton:function(from_id,index){
			var taskbarButton = this.control.taskbar.add($.c("a").attr({href:"javascript:;",'data-from':from_id,'data-index':index}).addClass("current").append($("#contacts li").html()));
			taskbarButton.addListener("click",function(e,obj){
				var current_index = $(obj).attr("data-index");
				e.data.form_seekTo(current_index);
			},this);
			return taskbarButton;
		},
		
		onSend:function(form){
			var ajax_data = {
				url:"",
				data:{}
			};
			var view_data = $(form.dom.find("form.input")).serializeObject();
			view_data.time = $.dateToString((new Date()));
			if(view_data.content.length<=0){return;}
			switch(view_data.type)
			{
				case "friend":
					ajax_data.url=$.getRootPath()+"/UserCenter/UserBasic.asmx/"+"AddGroup_Friend";
					ajax_data.data = $.convert(view_data,{
						sender_id:"Fromuid",
						sender_name:"FromName",
						addressee_id:"ReceivedID",
						addressee_name:"ReceivedName",
						content:"Message",
						time:"Posttime"
					});
					ajax_data.data.FriFlag=1;
					ajax_data.data.original = null;
					delete ajax_data.data.original;
					break;
				case "group":
					var address;
					switch(view_data.grouptype){
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
					ajax_data.url=$.getRootPath()+"/UserCenter/UserBasic.asmx/"+address;
					ajax_data.data = $.convert(view_data,{
						sender_id:"Uid",
						sender_name:"RealName",
						sender_type:"UType",
						addressee_id:"Gid",
						//addressee_name:"FromName",
						content:"Content",
						time:"Posttime"
					});
					ajax_data.data.Ip="127.0.0.1";
					ajax_data.data.original = null;
					delete ajax_data.data.original;
					break;
			}
			
			this.talkingTo(form, view_data);
			this.request("sentTalking",[ajax_data]);
		},
		
		talkingWithMe:function(form,data){
			if(this.checkValidity(data.content)){return;}
			data.content = this.strToFaceImage(data.content);
			
			form.talkingWithMe($("#talking").clone().removeAttr("id"),data,this.config.binding.send);
			form.dom.find("form.input>[name='content']").val("");
		},
		talkingTo:function(form,data){
			if(this.checkValidity(data.content)){return;}
			data.content = this.strToFaceImage(data.content);
			
			form.talkingTo($("#talking").clone().removeAttr("id"),data,this.config.binding.send);
			form.dom.find("form.input>[name='content']").val("");
		},
		
		strToFaceImage:function(content){
			for(var pro in this._data.faceHash)
			{
				content=content.replace(new RegExp("(\\["+pro.substring(pro.indexOf("[")+1,pro.indexOf("]"))+"\\])","g"), "<img data-key='"+pro+"' src='"+this._data.faceHash[pro]+"' />");
			}
			content = content.replace(/\n/g,"<br/>");
			content = content.replace(/\[q\](.*)\[\/q\]/g,"<div class='quote'>$1</div>");
			return content;
		},
		
		checkValidity:function(content){
			var str = window.getBanStr==undefined?"":window.getBanStr();
			var hasError = false;
			for(var i in str)
			{
				if(content.indexOf(str[i])!=-1){
					hasError=true; break;
				}
			}
			if(hasError){alert("输入内容中有不合法信息，请进行修改！");}
			return hasError;
		},
		
		show:function(data,online){
			if($("[data-dId='"+data.id+"']").length>0){
				this.form_seekTo($("[href='#"+data.id+"']").attr("data-index"));
				return;
			}
			
			var form = this.createForm(data);
			this.control.formManager.add(form);
			
			var taskbar_itemIndex = this.control.taskbar.count();
			var taskbarButton = this.createTaskbarButton(form.id,taskbar_itemIndex);
			taskbarButton.online(online);
			taskbarButton.datasource(data,this.config.binding._defaultContacts);
			
			this.form_seekTo(taskbar_itemIndex);
			if(data._type=="group") this.request("requestGroupMemberByGroupId",[data.id]);
		},
		
		form_seekTo:function(index){
			for(var i in this.control.formManager._forms)
			{
				this.control.formManager._forms[i].hide();
			}
			this.control.formManager._forms[index].show();
			this.control.taskbar.dom.find("a").removeClass("current").eq(index).addClass("current");
		}
	});
	
})(jQuery);