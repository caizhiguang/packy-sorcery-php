define([
	'view/tag',
	'view/task',
	'view/timer',
	'controllor/router'
],function(TagView,TaskView,TimerView,router){

	//定义页面视图
	return Backbone.View.extend({
		el:$('#wrapper'),
		initialize:function(){ //初始化
			var view = this.view = {
				tag:new TagView,
				task:new TaskView,
				timer:new TimerView
			};

			this.router = router;
			view.timer.listenTo(router,'route:intimer',view.timer.in);//注册路由跳转
			view.timer.listenTo(router,'route:initTimer',view.timer.init);

			this.listenTo(view.tag,'itemClick',this.taskfilter);

			$.getJSON('/accounts/api',function(data){
				
				view.tag.source(data.tag);
				view.task.source(data.task);

				/**
				 * 设置{pushState: true}后，路由就不需要用#做前缀。
				 * 但是没设置默认要加#
				 */
				Backbone.history.start();//初始化浏览器路由
			});
		},
		taskfilter:function(tag){
			this.view.task.filter(tag);
		}
	});
});