;(function($){
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.view");
	$.TalkCenter.classes.mvc.view.groupManageView = new $.salvia.Class($.TalkCenter.classes.mvc.view.baseView,{
		init:function(){
			this.forms = [];
		},
		showManageForm:function(data){
			var manageForm = new $.TalkCenter.classes.ui.groupManageForm($.salvia.packet("Form.lbi").appendTo("#wrap"));
			manageForm.datasource(data,{
				GroupName:function(name){
					this.text("群管理 "+name);
				},
				Gid:function(id){
					this.text(this.text()+" ("+id+")");
					this.id = $.md5("manager-"+id);
				}
			});
			manageForm.show();
			this.forms.push(manageForm);
			
			return manageForm;
		}
	});
})(jQuery);