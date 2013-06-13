requirejs.config({
	baseUrl:'/Public/js/plug-in',
	// urlArgs: "bust=" + (new Date()).getTime(),
	shim:{
		'backbone':{
			deps:['underscore'],
			exports:'Backbone'
		},
		'backbone.localStorage':{
			deps:['backbone']
		},
		'bootstrap.min':['jquery.min'],
		'jquery.easing':['jquery.min'],
		'../common':['jquery.easing']
	},
	paths:{
		'view':'../view',
		'model':'../model',
		'controllor':'../controllor'
	}
});

requirejs(["../init"]);