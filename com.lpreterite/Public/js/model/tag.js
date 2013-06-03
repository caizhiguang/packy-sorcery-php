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
		},
		tasksCount:function(val){
			var tasks_count = Number(this.get('tasks_count'));
			tasks_count = tasks_count+val;
			this.save({'tasks_count':tasks_count});
		}
	});
});