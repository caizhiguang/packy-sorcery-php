requirejs.config({
	baseUrl:'/Public/js/plug-in',
	shim:{
		'backbone':{
			deps:['underscore'],
			exports:'Backbone'
		},
		'jquery.easing':['jquery.min'],
		'bootstrap.min':['jquery.min'],
		'../common':['jquery.min']
	},
	paths:{
		'view':'../view',
		'model':'../model'
	}
});

requirejs(["../init"]);