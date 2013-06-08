require([
	'view/app',
	'bootstrap.min',
	'Chart.min',
	'../common'
],function(AppView){

	jQuery(document).ready(function($) {

		var app = new AppView;

		// var ctx = $('#tag-chart').get(0).getContext("2d");
		// var tags_chart = new Chart(ctx).Doughnut([{
		// 	value:35,
		// 	color:"#f25204"
		// },{
		// 	value:65,
		// 	color:"#e5e5e5"
		// }],{
		// 	segmentShowStroke:false
		// });

		$(".widget .bar>.minimize").click(function(){
			var parent = $(this).parents('.widget');
			parent.find('.widget-content').slideToggle('normal','easeOutQuad');
			parent.find('.minimize>i').toggleClass('icon-chevron-up').toggleClass('icon-chevron-down');
		});
	});

});