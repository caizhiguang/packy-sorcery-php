;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.view");

	$.TalkCenter.classes.mvc.view.talkCenterView = $.salvia.object.Class($.classes.mvc.view,{
		
		init:function($super){
			$super("TalkCenter");
			
			$(".modForm .tabs").tabs(">.content>div",{history:true});
			$(".modUInforBox .ft").tabs(".modPanelBox>.inner",{history:false});
			
			this.control={
				friendList:new $.classes.ui.list($("#friends")),
				groupList:new $.classes.ui.list($("#groups")),
				authorityList:new $.classes.ui.list($("#authority"))
			};
			this.view={
				talkView:new $.TalkCenter.classes.mvc.view.talkView()
			};
			
			this.config={
				binding:{
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
			
			$(".wrap").hide();
		},
		
		onDatasource:function(data){
			$(".modUInforBox").find(".avatar>img").attr("src",data.userInfor.avatar);
			$(".modUInforBox").find(".name").text(data.userInfor.name);
			
			for(var i in data.friends)
			{
				if(data.friends[i].TypeRela!="1"){continue;}
				var item = this.control.friendList.add($("#contacts>li").clone());
				item.datasource(data.friends[i],this.config.binding.contacts);
				item.addListener("click",function(e,obj){
					e.data.openTalking(obj._data);
				},this);
			}
			for(var i in data.groups)
			{
				var item = this.control.groupList.add($("#contacts>li").clone());
				item.datasource(data.groups[i],this.config.binding.contacts);
				item.addListener("click",function(e,obj){
					e.data.openTalking(obj._data);
				},this);
			}
			
			$(".wrap").css({
				margin:"0 auto",
				top:$(window).height()-$(".wrap").height()<0?0:($(window).height()-$(".wrap").height())/2
			}).fadeIn("slow");
		},
		
		openTalking:function(data){
			this.view.talkView.show(data);
		}
	});
	
})(jQuery);