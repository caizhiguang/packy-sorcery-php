;(function($){
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.view");
	$.TalkCenter.classes.mvc.view.groupManageView = new $.salvia.Class($.TalkCenter.classes.mvc.view.baseView,{
		init:function(){
			this.forms = [];
		},
		showManageForm:function(data){
			var manageForm = this.createForm();
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
			manageForm.member(ctrl_data.groupMember[data.Gid],{
				name:function(data){
					return data.GroupName;
				}
			});
			this.forms.push(manageForm);
			
			return manageForm;
		},
		createForm:function(){
			var form = new $.TalkCenter.classes.ui.groupManageForm($.salvia.packet("Form.lbi").addClass("modTalkManageForm").appendTo("#wrap"));
			return form;
		}
	});
})(jQuery);