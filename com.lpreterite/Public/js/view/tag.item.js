define(['jquery.min','backbone'],function(){
	return Backbone.View.extend({
		template:_.template($('#tag-item').html()),
		events:{
			'click':'onClick'
		},
		initialize:function(){ //初始化
			this.listenTo(this.model,'change',this.render);
			this.listenTo(this.model,'destroy',this.remove);
		},
		render:function(){
			this.setElement(this.template(this.model.toJSON()));
			this.$el.tooltip();
			return this;
		},
		onClick:function(){
			if(this.isEdited)
				this.model.destroy();
			else
				this.trigger('click',this.model);
		}
	});
});