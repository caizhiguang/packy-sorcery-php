!function($,Backbone){

	$.lib('app.chat.model.question.list',Backbone.Collection.extend({
		model:$.lib('app.chat.model.question'),
		localStorage: new Store("question"),
	}));

}(jQuery,Backbone);