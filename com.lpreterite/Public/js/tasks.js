jQuery(document).ready(function($) {

	var taskModel = Backbone.Model.extend({
		urlRoot:'/task/api'
	});

	var taskList = Backbone.Collection.extend({
		model:taskModel,
		url:'/task/api'
	});

	var tasks = new taskList;
	
	var taskView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#task-item').html()),
		events: {
			"dblclick .view"  : "edit",
			"blur .editor":"edited",
			"click a.remove":'remove'
		},
		initialize:function(){

		},
		render: function() {
			// this.$el.html(this.template({
			// 	id:1,
			// 	name:'test',
			// 	content:'233',
			// 	tags:'1,2',
			// 	tags_name:'@test, @test2',
			// 	uid:1,
			// 	important:0,
			// 	complete:0,
			// 	spacing:1500,
			// 	time:0
			// }));
			var data = this.model.toJSON();
			data.tags_name = data.tags;
			this.$el.html(this.template(data));
			return this;
		},
		clear:function(){

		},
		edit:function(e){
			if(/label|input/.exec(e.target.nodeName.toLowerCase()) != null) return;
			this.$el.addClass("editing");
			this.$el.find('.editor').focus();
		},
		edited:function(){
			var value = this.$el.find('.editor').val();
			if (!value) {
				// this.clear();
			} else {
				this.$el.removeClass("editing");
			}
		}

	});

	var tasksView = Backbone.View.extend({
		el:$('.tasks'),
		initialize:function(){
			this.listenTo(tasks,'add',this.add);
			tasks.fetch();
		},
		add:function(task){
			var view = new taskView({model:task});
			this.$el.append(view.render().el);
		}
	});

	var vtasks = new tasksView;

	// var taskItem = new taskView();
	// taskItem.render();
	// taskItem.$el.appendTo(".tasks");
	
	
});