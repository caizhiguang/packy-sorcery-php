define([
	'view/task.item',
	'model/task.list',
	'model/tag.list'
],function(TaskItemView,tasks,tags){
	return Backbone.View.extend({
		el:$('.widget-tasks'),
		events:{
			'submit form.task-input':'create'
		},
		initialize:function(){ //初始化

			this.list = tasks;

			this.listenTo(tasks,'add',this.add);
			this.input = this.$('.task-input>input');
		},
		render:function(){
			tasks.fetch();
			return this;
		},
		add:function(task){

			var tag = null;
			if(task.get('tags'))
				tag = tags.findWhere({id:task.get('tags')}).toJSON();

			task.set('tag',tag);

			var view = new TaskItemView({model:task});
			this.$('.tasks').prepend(view.render().el);
		},
		create:function(){
			var taskName = /[^@\s]+/.exec(this.input.val())[0];
			var tagName = /@[^@\s]+/.exec(this.input.val());
			if(tagName){
				tagName=tagName[0];
				var tag = tags.findWhere({name:/[^@]+/.exec(tagName)[0]});
				var tagId = null;
				if(tag)
					tagId = tag.id;
				else
					tags.create({
						name:/[^@]+/.exec(tagName)[0],
						tasks_count:1,
						total_time:0,
						avg_time:0,
						longest_time:0,
						uid:0
					},{
						wait: true,
						success:function(model){
							var task = tasks.findWhere({name:taskName});
							task.save({tags:model.id});
						}
					});
			}
			tasks.create({
				complete: "0",
				content: "",
				end_time: null,
				important: "0",
				name:taskName,
				priority: "0",
				spacing: null,
				start_time: $.dateToString(new Date()),
				tags: tagId,
				time: null,
				today: "0",
				uid: null
			},{wait:true});
			this.input.val('');
			return false;
		},
		filter:function(tag){
			
			var temp = _.template($('#alert').html());
			if(this.alertBox!=undefined)
				this.alertBox.alert('close');
			this.alertBox = $(temp(tag.toJSON())).insertAfter(this.$('.task-input')).alert().bind('closed',this,this.unfilter);

			this.$('.tasks').empty();
			var list = tasks.where({tags:tag.id});
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