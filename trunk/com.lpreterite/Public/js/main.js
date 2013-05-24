requirejs.config({
	baseUrl:'/Public/js'
});

require(['plug-in/jquery.cookie'], function () {
	console.log($);
});