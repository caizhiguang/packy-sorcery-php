jQuery(document).ready(function($) {
	
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
			this.$el.html(this.template({
				id:1,
				name:'test',
				content:'233',
				tags:'1,2',
				tags_name:'@test, @test2',
				uid:1,
				important:0,
				complete:0,
				spacing:1500,
				time:0
			}));
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

	var taskItem = new taskView();
	taskItem.render();
	taskItem.$el.appendTo(".tasks");
});