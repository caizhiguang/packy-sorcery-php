;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.view");
	
	$.TalkCenter.classes.mvc.view.talkView = $.salvia.object.Class($.classes.mvc.view,{
		
		init:function($super){
			$super("TalkCenter");
			
			this._data={
				formhash:{}
			},
			
			this.controll={
				forms:new $.classes.util.formManager(),
				taskbar:new $.classes.ui.list($(".taskbar>.items"))
			};
			
			this.controll.forms.addListener("removed",function(e,form){
				var removeItem = $("[data-id='"+e.data.formhash[form.id]+"']").data("ui-class");
				e.data.taskbar.remove(removeItem);
				$.hash.remove(e.data.formhash,form._data.Gid==undefined?"u"+form._data.Uid:"g"+form._data.Gid);
			},{taskbar:this.controll.taskbar,formhash:this._data.formhash});
			this._type = "default";
			
			$(".main").scrollable().navigator({navi:".taskbar",naviItem:".item",activeClass:"current",history:false});
			
			this.config={
				binding:{
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
							this.dom.attr({'data-uid':uid});
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
							this.dom.attr({'data-gid':gid});
							this.id = $.md5(gid);
							this.text(this.text()+"("+gid+")");
						},
						_SentTo:function(sentTo){
							this.isGroup(sentTo=="group");
						}
					},
					contacts:{
						Avatar:function(avatar){
							//this.dom.find(".avatar img").attr({src:$.getRootPath()+$.TalkCenter.config.avatarPath+avatar+".png"});
							this.dom.find(".avatar img").attr({src:avatar});
						},
						NickName:function(name){
							this.dom.find(".name").text(name);
						},
						Fuid:function(fuid){
							this.dom.find(".name").text(this.dom.find(".name").text()+"("+fuid+")");
							this.dom.attr({href:"#u"+fuid,'data-uid':fuid});
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
							this.dom.attr({href:"#g"+gid,'data-gid':gid});
						}
					}
				}
			};
		},
		show:function(data){
			if($("[href='#"+(data.Gid==undefined?"u"+data.Fuid:"g"+data.Gid)+"']").length>0){
				this.form_seekTo($("[href='#"+(data.Gid==undefined?"u"+data.Fuid:"g"+data.Gid)+"']").attr("data-index"));
				return false;
			}
			var tmp = data.Gid==undefined?$("#talkform").clone():$("#grouptalkform").clone();
			var form = new $.classes.ui.form(tmp.appendTo($(".main>.forms")),{
				disposition:"Customer"
			});
			var taskbar_itemIndex = this.controll.taskbar.count();
			form.datasource(data,this.config.binding.form);
			this.controll.forms.add(form);
			
			var taskbarButton = this.controll.taskbar.add($.c("a").attr({href:"javascript:;",'data-id':form.id,'data-index':taskbar_itemIndex}).addClass("current").append($("#contacts li").html()));
			taskbarButton.datasource(data,this.config.binding.contacts);
			taskbarButton.addListener("click",function(e,obj){
				$(".main").data("scrollable").seekTo(obj.dom.attr("data-index"));
				var taskbar = $(".main").data("scrollable").getNaviButtons().find(".items");
				taskbar.find("a").removeClass("current");
				$(this).addClass("current");
			});
			
			$.hash.add(this._data.formhash,form.id,taskbarButton.id);
			form.dom.fadeIn("slow");
			this.form_seekTo(taskbar_itemIndex);
		},
		
		form_seekTo:function(index){
			$(".main").data("scrollable").seekTo(index);
			$(".main").data("scrollable").getNaviButtons().find(".items>a").removeClass("current").eq(index).addClass("current");
		}
	});
	
})(jQuery);