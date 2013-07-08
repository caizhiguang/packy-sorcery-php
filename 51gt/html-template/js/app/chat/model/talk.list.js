!function($,Backbone){

	$.lib('app.chat.model.talk.list',Backbone.Collection.extend({
		model:$.lib('app.chat.model.talk'),
		localStorage: new Store("talk")
	}));

}(jQuery,Backbone);