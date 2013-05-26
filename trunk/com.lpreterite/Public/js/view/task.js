define([
	'view/task.item',
	'model/task.list'
],function(TaskItemView,tasks){
	return Backbone.View.extend({
		el:$('.widget-tasks'),
		events:{
			'submit form.task-input':'create'
		},
		initialize:function(){ //初始化
			this.listenTo(tasks,'add',this.add);
			this.input = this.$('.task-input>input');
			this.render();
		},
		render:function(){
			tasks.fetch();
			return this;
		},
		add:function(task){
			var view = new TaskItemView({model:task});
			this.$('.tasks').prepend(view.render().el);
		},
		create:function(){
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
		},
		filter:function(tag){
			
			var temp = _.template($('#alert').html());
			if(this.alertBox!=undefined)
				this.alertBox.alert('close');
			this.alertBox = $(temp(tag.toJSON())).insertAfter(this.$('.task-input')).alert().bind('closed',this,this.unfilter);

			this.$('.tasks').empty();
			var list = tasks.where({complete:'1'});
			for (var i = list.length - 1; i >= 0; i--) {
				this.add(list[i]);
			};
		},
		unfilter:function(e){
			e.data.$('.tasks').empty();
			tasks.each(e.data.add,e.data);
			e.data.alertBox = null;
			delete e.data.alertBox;
		}
	});
});