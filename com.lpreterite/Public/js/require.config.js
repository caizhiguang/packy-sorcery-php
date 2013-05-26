requirejs.config({
	baseUrl:'/Public/js/plug-in',
	urlArgs: "bust=" + (new Date()).getTime(),
	shim:{
		'backbone':{
			deps:['underscore'],
			exports:'Backbone'
		},
		'bootstrap.min':['jquery.min'],
		'../common':['jquery.min','jquery.easing']
	},
	paths:{
		'view':'../view',
		'model':'../model'
	}
});

requirejs(["../init"]);