define([
	'model/task.list',
	'backbone'
],function(tasks){
	return Backbone.View.extend({
		tagName:'span',
		template:_.template($('#tag-item').html()),
		msgbox:_.template($('#msgbox').html()),
		events:{
			// 'click':'onClick'// has edit modal
			'click':'delete'// not edit modal
		},
		initialize:function(){ //初始化
			this.listenTo(this.model,'change',this.render);
			this.listenTo(this.model,'destroy',this.remove);
		},
		render:function(){
			// this.setElement(this.template(this.model.toJSON()));
			this.$el.html(this.template(this.model.toJSON()));
			this.$('a').tooltip();
			return this;
		},
		delete:function(){

			/**
			 * has message box code
			 */

			// if($('#msgboxModal').length>0) return;

			// var that = this;
			// var msgboxTemp = this.msgbox({title:'提示', content:'删除<span class="text-info">'+this.model.get('name')+'</span>将会影响'+this.model.get('tasks_count')+'条任务,确认删除<span class="text-info">'+this.model.get('name')+'</span>么？'});
			// $(msgboxTemp).appendTo(document).modal().on('hidden',function(){
			// 	$(this).remove();

			// 	if(that.$el.hasClass('editing')){
			// 		that.input.val(that.model.get('name'));
			// 		that.input.focus();
			// 	}
			// }).find('.btn-primary').on('click',function(){
			// 	that.model.destroy();
			// });
			
			/**
			 * not message box code
			 */
			tasks.clearTag(this.model.id);
			this.model.destroy();
		},
		onClick:function(){
			this.trigger('click',this);
		}
	});
});