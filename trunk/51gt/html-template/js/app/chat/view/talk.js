!function($,Backbone){

	var config = $.lib('app.chat.config');

	$.lib('app.chat.view.talk',Backbone.View.extend({
		tagName:'div',
		className:'talk',
		template:_.template($('#talk-item').html()),
		events:{
			'click .btn-quote':'quote',
			'click .btn-add':'addToServer',
			'click .btn-delete':'delete'
		},
		initialize:function(){
			this.listenTo(this.model,'change',this.render);
			this.listenTo(this.model,'destroy',this.remove);
		},
		render:function(){
			this.$el.html(this.template(_.extend({},this.model.toJSON(),config)))
			.addClass(config.user.id==this.model.sender_id?'me':'');
			return this;
		},
		addToServer:function(){

		},
		delete:function(){
			this.model.destroy();
		},
		quote:function(){
			this.trigger('quote',[this.model]);
		}
	}));

}(jQuery,Backbone);