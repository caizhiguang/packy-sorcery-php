!function($,Backbone){

	var config = $.lib('app.chat.config');

	$.lib('app.chat.view.talk',Backbone.View.extend({
		tagName:'div',
		className:'talk',
		template:_.template($('#talk-item').html()),
		quote_temp:_.template($('#talk-item-quote').html()),
		events:{
			'click .btn-quote':'quote',
			'click .btn-add':'addToServer',
			'click .btn-delete':'destroy'
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
		destroy:function(){
			this.model.destroy();
		},
		quote:function(){
			var quoteText = this.$el.find('blockquote').length>0?this.$el.find('p').html():this.model.get('content');
			var temp = this.quote_temp(_.extend(this.model.toJSON(),{content:quoteText}));
			this.trigger('quote',temp);
		}
	}));

}(jQuery,Backbone);