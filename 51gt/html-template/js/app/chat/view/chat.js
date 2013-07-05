!function($,Backbone){

	var config = $.lib('app.chat.config');
	var Talk = $.lib('app.chat.view.talk');
	var talkList $.lib('app.chat');

	$.lib('app.chat.view.answer',Backbone.View.extend({
		el:$('.widget-chat'),
		events:{
			'submit .chat-input':'create'
		},
		initialize:function(){
			
		},
		render:function(){
			
			return this;
		},
		add:function(question){
			
		},
		create:function(){
			
		}
	}));

}(jQuery,Backbone);