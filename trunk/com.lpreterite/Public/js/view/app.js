define([
	'view/tag',
	'view/task',
	'view/timer',
	'controllor/router'
],function(TagView,TaskView,TimerView,router){

	//定义页面视图
	return Backbone.View.extend({
		el:$('#wrapper'),
		isLocalStorage:true,
		initialize:function(){ //初始化
			var view = this.view = {
				tag:new TagView,
				task:new TaskView,
				timer:new TimerView
			};

			this.router = router;
			this.listenTo(router,'route:intimer',this.intimer);//注册路由跳转
			this.listenTo(router,'route:initTimer',this.initTimer);
			this.listenTo(router,'route:taskfilter',this.taskfilter);
			this.listenTo(router,'route:taskunfilter',this.taskunfilter);

			if(!this.isLocalStorage){
				$.getJSON('/accounts/api',function(data){
					
					view.tag.source(data.tag);
					view.task.source(data.task);

					/**
					 * 设置{pushState: true}后，路由就不需要用#做前缀。
					 * 但是没设置默认要加#
					 */
					Backbone.history.start();//初始化浏览器路由
				});
			}else{
				view.tag.render();
				view.task.render();
				Backbone.history.start();//初始化浏览器路由
			}
		},
		initTimer:function(){
			this.view.task.$('li').removeClass('active');
			this.view.timer.init();
		},
		intimer:function(taskId){
			this.view.task.$('li:not(.task-item-'+taskId+')').removeClass('active');
			this.view.task.$('.task-item-'+taskId).parent().toggleClass('active');
			this.view.timer.in(taskId);
		},
		taskfilter:function(tagId){
			this.view.task.filter(tagId);
		},
		taskunfilter:function(){
			this.view.task.unfilter();
		}
	});
});