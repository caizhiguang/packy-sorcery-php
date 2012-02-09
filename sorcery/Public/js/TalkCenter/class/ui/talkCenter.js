;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.ui==undefined){ $.classes.ui={}; }
	
	/**talkcenter(聊天窗体类)**/
	$.classes.ui.talkCenter = $.salvia.Class($.classes.ui.form,{
		init:function($super,dom,attr){
			$super(dom,attr);
			dom.css({
				width:300,
				height:600,
				right:25,
				top:30
			}).attr("data-disposition","Customer").find(".bar ul").tabs(".content .panels>div",{current:"actived"});
			this.contactList = new $.classes.base.list();
			this.friendContactList = new $.classes.ui.list($(document.createElement("ul")).addClass("contacts").appendTo(dom.find(".Friends")));
			this.groupsContactList = new $.classes.ui.list(dom.find(".Groups .contacts"));
			this.followContactList = new $.classes.ui.list(dom.find(".Follow .contacts"));
		},
		text:function(text){
			this.dom.find(".name").text(text);
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