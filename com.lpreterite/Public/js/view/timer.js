define([
	'model/task.list',
	'model/tag.list'
],function(tasks,tags){
	return Backbone.View.extend({
		el:$('.widget-time'),
		events:{
			'play':'play',
			'pause':'pause',
			'stop':'stop'
		},
		initialize:function(){
		},
		init:function(){
			this.$('.work').text('选择你的任务，开始工作！');
		},
		in:function(taskId){
			this.current = tasks.where({id:taskId});
			this.current = this.current.length>0?this.current[0]:'';
			if(!this.current) return;
			this.$('.work').text('开始：'+/[^@\s]+/.exec(this.current.get('name'))[0]);
		},
		stop:function(){
			
		}
	});
});