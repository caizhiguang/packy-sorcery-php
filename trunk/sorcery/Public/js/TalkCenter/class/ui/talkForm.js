;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.ui==undefined){ $.classes.ui={}; }
	
	/**talkform(聊天窗体类)**/
	$.classes.ui.talkForm = $.salvia.Class($.classes.ui.form,{
		init:function($super,dom,attr){
			$super(dom,attr);
			this.TalkInforList = new $.classes.ui.talkForm.talkInforList(this.dom.find(".content .info"));
		},
		addTalking:function(data,setting){
			var talkInfor = new $.classes.ui.base($.salvia.packet("TalkInfo.lbi"));
			talkInfor.datasource(data,setting);
			this.TalkInforList.add(talkInfor);
		},
		addMeTalking:function(data,setting){
			var talkInfor = new $.classes.ui.base($.salvia.packet("TalkInfo.lbi"));
			talkInfor.dom.find(".name").addClass("me");
			talkInfor.datasource(data,setting);
			this.TalkInforList.add(talkInfor);
		},
		text:function(text){
			this.dom.find(".name").text(text);
		}
	});
	
})(jQuery);