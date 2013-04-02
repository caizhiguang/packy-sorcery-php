jQuery(document).ready(function($) {
	var Task = Backbone.Model.extend({
		url:'/task/api/',
		urlRoot:'/task/api/',
	});

	var task = new Task;
	task.fetch();
	task.set({id:'1',name:'233'});
	task.save();

	task.save({name:'231'});
	task.destroy();

	// var TaskList = Backbone.Collection.extend({
	// 	model: Task,
	// 	localStorage: new Backbone.LocalStorage("Tasks-backbone"),
	// 	comparator: 'start_time'
	// });

	// var Tasks = new TaskList;

	// var ListTaskView = Backbone.View.extend({
	// 	tagName:"li",
	// 	template: _.template($('#list-task-item').html()),
	// 	events:{
	// 		'click .delete':'delete',
	// 	},
	// 	delete:function(e){
	// 		this.model.destroy();
	// 	}
	// });

	// var AppView = Backbone.View.extend({
	// 	el : $('#body'),
	// 	events:{
	// 		'keypress #task-form':'createOnEnter',
	// 	},
	// 	initialize:function(){
	// 		this.input = this.$('#task-form .task_input');
	// 		this.listenTo(Tasks,'add',add);
	// 		this.listenTo(Tasks,'add',add);
	// 	},

	// 	add:function(){

	// 	},

	// 	createOnEnter:function(e){
	// 		if (e.keyCode != 13) return;
	// 		if (!this.input.val()) return false;
	// 		Tasks.create({name: this.input.val()});
	// 		this.input.val('');

	// 		return false;
	// 	}
	// });

	// var App = new AppView;
});