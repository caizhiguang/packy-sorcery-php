;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.ui");
	
	/**群管理窗口**/
	var groupManageForm = function(){};
	groupManageForm.prototype.init = function($super,dom,attr){
		$super(dom,attr);
		this.dom.css({
			height:400,
			width:500
		}).find(".content").append($("<ul class='tab'></ul>"));
		this.dom.find(".tab").append("<li class='current'><a href='javascript:;'>群成员</a></li>")
		.append("<li><a href='javascript:;'>群通知</a></li>");
	};
	
	$.TalkCenter.classes.ui.groupManageForm = $.salvia.Class($.classes.ui.form,new groupManageForm());
})(jQuery);