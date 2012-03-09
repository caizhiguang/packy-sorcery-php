;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.ui");
	
	/**talkcenter(聊天窗体类)**/
	$.TalkCenter.classes.ui.talkCenter = $.salvia.Class($.classes.ui.form,{
		init:function($super,dom,attr){
			$super(dom,attr);
			dom.css({
				width:300,
				height:600,
				right:25,
				top:30
			}).attr("data-disposition","Customer").find(".bar ul").tabs(".content .panels>div",{current:"actived",initialIndex:1});
			this.contactList = new $.classes.base.list();
			this.friendContactList = new $.TalkCenter.classes.ui.list($(document.createElement("ul")).addClass("contacts").appendTo(dom.find(".Friends")));
			this.groupsContactList = new $.TalkCenter.classes.ui.list(dom.find(".Groups .contacts"));
			this.followContactList = new $.TalkCenter.classes.ui.list(dom.find(".Follow .contacts"));
			this.dom.find(".ft").append(
				$.c("a").attr({id:"btnSearch",href:"javascript:;"}).append(
						$.c("i").addClass("i iSearch")
					).append("查找").addClass("right5")
			).append(
				$.c("a").attr({id:"btnSetting",href:"javascript:;"}).append(
						$.c("i").addClass("i iSetting")
					).append("设置")
			);
		},
		text:function(text){
			if(text!=undefined){
				this.dom.find(".name").text(text);
			}else{
				return this.dom.find(".name").text();
			}
		},
		addContact:function(attr,type){
			var contact;
			switch(type)
			{
				case "friend":
					contact = this.friendContactList.add(attr);
					break;
				case "group":
					contact = this.groupsContactList.add(attr);
					break;
				case "follow":
					contact = this.followContactList.add(attr);
					break;
			}
			this.contactList.add({contact:contact,type:type});
			return contact;
		}
	});
	
})(jQuery);