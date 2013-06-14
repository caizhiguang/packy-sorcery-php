define(['backbone'],function(){
	var Router = Backbone.Router.extend({
		routes:{
			'intimer':'initTimer',
			'intimer/*id': 'intimer',
			'tag/*id':'taskfilter',
			'tag':'taskunfilter',
			'about':'about'
		},
		taskfilter:function(e){
			var d = e;
		}
	});
	return new Router;
});