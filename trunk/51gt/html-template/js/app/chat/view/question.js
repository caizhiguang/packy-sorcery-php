!function($,Backbone){

	var config = $.lib('app.chat.config');

	$.lib('app.chat.view.question',Backbone.View.extend({
		tagName:'li',
		template:_.template($('#question-item').html()),
		events:{
			'click .btn-complete':'complete',
			'click .btn-delete':'destroy'
		},
		initialize:function(){
			this.listenTo(this.model,'change',this.render);
			this.listenTo(this.model,'destroy',this.remove);
		},
		render:function(){
			this.$el.html(this.template(_.extend({},this.model.toJSON(),config)))
			.addClass(this.model.get('complete')||this.model.get('number')<4?'strong':'');
			return this;
		},
		complete:function(){
			this.model.complete();
			this.remove();
		},
		destroy:function(){
			this.model.destroy();
		}
	}));

}(jQuery,Backbone);