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
			this.listenTo(tasks,'remove',this.remove);
			this.input = this.$('.task-input>input');

			this.$('.tasks').append('<li class="empty"><span style="padding-left:10px;">还没有工作！</span></li>');
		},
		render:function(){
			tasks.fetch();
			return this;
		},
		source:function(data){
			if(!data) return false;
			for (var i = 0; i < data.length; i++) {
				tasks.add(data[i]);
			};
		},
		add:function(task){
			if (this.$('.tasks').has('.empty')) this.$('.tasks .empty').remove();
			var view = new TaskItemView({model:task});
			this.$('.tasks').prepend(view.render().el);
		},
		remove:function(){
			if(tasks.length<=0)
				this.$('.tasks').append('<li class="empty"><span style="padding-left:10px;">还没有工作！</span></li>');
		},
		create:function(){
			var tag,tagId="",tagName = /@[^@\s]+/.exec(this.input.val());
			if(tagName){
				tagName=tagName[0];
				tag = tags.findWhere({name:/[^@]+/.exec(tagName)[0]});
				if(!tag){
					tag = tags.create({
						name:/[^@]+/.exec(tagName)[0]
					},{
						wait: true,
						async:false
					});
				}else{
					tag.tasksCount(1);
				}
				tagId = tag.id;
			}
			tasks.create({
				name:this.input.val(),
				start_time: $.dateToString(new Date()),
				tags: tagId
			},{wait:true});
			this.input.val('');
			return false;
		},
		filter:function(tagId){

			var tag = tags.findWhere({id:tagId});
			if(!tag) return;
			
			var temp = _.template($('#alert').html());
			if(this.alertBox!=undefined)
				this.alertBox.alert('close');

			var that = this;
			this.alertBox = $(temp(tag.toJSON())).insertAfter(this.$('.task-input')).alert().click(function(){
				window.location.href = '#tag';
			});
			// .bind('closed',function(){
			// 	that.unfilter();
			// });

			this.$('.tasks').empty();
			var list = tasks.where({tags:tag.id});
			for (var i = list.length - 1; i >= 0; i--) {
				this.add(list[i]);
			};
		},
		unfilter:function(){
			this.$('.tasks').empty();
			tasks.each(this.add,this);
			this.alertBox = null;
			delete this.alertBox;
		}
	});
});