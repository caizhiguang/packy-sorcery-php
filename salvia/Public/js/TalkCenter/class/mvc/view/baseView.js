;(function($){
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.view");
	$.TalkCenter.classes.mvc.view.baseView = new $.salvia.Class($.classes.mvc.view,{
		msgBox:function(text,content,btn,freturn,data){
			var msg = new $.classes.ui.msgbox($.salvia.packet("Form.lbi"));
			if(freturn!=undefined){msg.addListener("return",freturn,data);}
			msg.show(text,content,btn);
		}
	});
})(jQuery);