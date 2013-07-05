!function($,Backbone){

	$.lib('app.chat.model.talk.list',Backbone.Collection.extend({
		model:$.lib('app.answer.model.talk'),
		localStorage: new Store("talk")
	}));

}(jQuery,Backbone);