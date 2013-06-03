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
			var view = new TaskItemView({model:task});
			this.$('.tasks').prepend(view.render().el);
		},
		create:function(){
			var tagName = /@[^@\s]+/.exec(this.input.val());
			if(tagName){
				tagName=tagName[0];
				var tag = tags.findWhere({name:/[^@]+/.exec(tagName)[0]});
				if(!tag){
					tag = tags.create({
						name:/[^@]+/.exec(tagName)[0]
					},{
						wait: true,
						async:false
					});
				}
			}
			tasks.create({
				name:this.input.val(),
				start_time: $.dateToString(new Date()),
				tags: tag.id
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