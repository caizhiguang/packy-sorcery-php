define([
	'view/tag',
	'view/task'
],function(TagView,TaskView){

	//定义页面视图
	return Backbone.View.extend({
		el:$('#wrapper'),
		initialize:function(){ //初始化
			this.view = {
				tag:new TagView,
				task:new TaskView
			};

			this.listenTo(this.view.tag,'itemClick',this.taskfilter);
		},
		taskfilter:function(tag){
			this.view.task.filter(tag);
		}
	});
});