define([
	'view/tag',
	'view/task'
],function(TagView,TaskView){

	//定义页面视图
	return Backbone.View.extend({
		el:$('#wrapper'),
		initialize:function(){ //初始化
			var view = this.view = {
				tag:new TagView,
				task:new TaskView
			};

			this.listenTo(this.view.tag,'itemClick',this.taskfilter);

			$.getJSON('/accounts/api',function(data){
				
				view.tag.source(data.tag);

				if(data.task)
					for (var i = 0; i < data.task.length; i++) {
						view.task.list.add(data.task[i]);
					};

			});
		},
		taskfilter:function(tag){
			this.view.task.filter(tag);
		}
	});
});