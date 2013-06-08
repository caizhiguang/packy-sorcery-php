define(['backbone'],function(){
	var Router = Backbone.Router.extend({
		routes:{
			'intimer/:id': 'intimer',
			'about':'about'
		}
	});
	return new Router;
});