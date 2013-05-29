define(['backbone'],function(){
	return Backbone.Model.extend({
		urlRoot:'/tag/api',
		defaults:function(){
			return {
				name:'',
				tasks_count:1,
				total_time:0,
				avg_time:0,
				longest_time:0,
				uid:0
			};
		}
	});
});