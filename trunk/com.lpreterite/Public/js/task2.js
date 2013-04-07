!function($){

	$.fn.extend({
		serializeObject:function(){
			var obj=new Object();  
			$.each(this.serializeArray(),function(index,param){  
				if(param.name in obj) return; 
				obj[param.name]=param.value;
			});  
			return obj; 
		}
	});

}(jQuery);

jQuery(document).ready(function($) {
	// var Tag = Backbone.Model.extend({
	// 	urlRoot:'/tag/'
	// });
	// var TagList = Backbone.Collection.extend({
	// 	model:Tag,
	// 	url:'/tag/'
	// });

	// var Tags = new TagList;
	// Tags.fetch();
	// // Tags.fetch({success:function(collection){
	// // 	var tag1 = collection.at(0);
	// // 	tag1.set({name:'中文'});
	// // 	tag1.save();

	// // 	var newTag = new Tag;
	// // 	newTag.set({name:'223'});
	// // 	newTag.save();
	// // 	tag1.destroy();
	// // }});
	
	var Tag = Backbone.Model.extend({
		urlRoot:'/tag/'
	});

	var Task = Backbone.Model.extend({
		urlRoot:'/task/'
	});

	var TaskList = Backbone.Collection.extend({
		model:Task,
		url:'/task/',
		comparator:'start_time'
	});

	var Tasks = new TaskList;

	var TaskView = Backbone.View.extend({
		tagName:'li',
		className:'list-tasks-item',
		template:_.template($('#list-task-item').html()),
		events:{
			'click a.delete':'destroy'
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var AppView = Backbone.View.extend({
		el:$('#body'),
		initialize:function(){
			this.listenTo(Tasks, 'add', this.addOne);
		},
		events:{
			'submit #task-form':'create_task'
		},
		create_task:function(e){
			this.$('#task-form .name').val(this.$('#task-form .task_input').val());
			Tasks.create(this.$('#task-form').serializeObject());

			return false;
		},
		addOne:function(task){
			var view = new TaskView({model:task});
			//task.save();
			this.$('#list-tasks').append(view.render().el);
		}
	});

	var app = new AppView;
});