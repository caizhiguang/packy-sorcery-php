define([
	'view/tag',
	'view/task',
	'model/tag.list',
	'model/task.list'
],function(TagView,TaskView,tags,tasks){

	//定义页面视图
	return Backbone.View.extend({
		el:$('#wrapper'),
		events:{
			'submit form.task-input':'create'
		},
		initialize:function(){ //初始化
			this.listenTo(tags,'add',this.renderByTag);
			this.listenTo(tasks,'add',this.renderByTask);
			
			tags.fetch();
			tasks.fetch();

			this.input = this.$('.task-input>input');
		},
		renderByTag:function(tag){
			var view = new TagView({model:tag});
			this.listenTo(view,'click',this.taskFilterByTag)
			$('.widget-tags .widget-content').append(view.render().el);
		},
		renderByTask:function(task){ //显示“任务”视图
			var view = new TaskView({model:task});
			$('.tasks').prepend(view.render().el);
		},
		taskFilterByTag:function(tag){
			// this.$('.alert').show().find('.tag').text(tag.get('name'));
			var temp = _.template($('#alert').html());
			this.$('form.task-input').after(temp(tag.attributes));
		},
		create:function(){ //添加“任务”数据

			var inputData = this.input.val();

			tasks.create({
				complete: "0",
				content: "",
				end_time: null,
				important: "0",
				name: inputData,
				priority: "0",
				spacing: null,
				start_time: $.dateToString(new Date()),
				tags: null,
				time: null,
				today: "0",
				uid: null
			});
			this.input.val('');
			return false;
		}
	});
});