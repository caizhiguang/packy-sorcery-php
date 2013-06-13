define([
	'model/task.list',
	'model/tag.list'
],function(tasks,tags){
	return Backbone.View.extend({
		el:$('.widget-time'),
		defaluts:{
			restTime:300,
			workTime:1500
		},
		events:{
			'play':'play',
			'pause':'pause',
			'stop':'stop',
			'click .btn-rest':'rest',
			'click .btn-complete':'complete',
			'click .btn-next':'next'
		},
		initialize:function(){
			this.timer = this.$el.data('modal');
			this.timer.disabled(true);
			this.display('timer');
		},
		init:function(){
			this.$('.work').text('选择你的任务，开始工作！');
			this.timer.disabled(true);
		},
		in:function(taskId){
			this.current = tasks.where({id:taskId});
			this.current = this.current.length>0?this.current[0]:'';
			if(!this.current) return;
			this.timer.disabled(false);
			this.$('.work').text('开始：'+/[^@\s]+/.exec(this.current.get('name'))[0]);
		},
		stop:function(){
			switch(this.modal){
				case 'timer':
					this.current.time();
					this.display('complete');
					break;
				case 'rest':
					this.display('timer');
					break;
			}
		},
		rest:function(){
			this.display('rest');
		},
		complete:function(){
			this.current.toggle();
		},
		next:function(){
			this.timer.stop();
		},
		display:function(modal){
			var timer = this.timer;
			this.modal = modal;

			switch(modal){
				case 'rest':
					this.timer.init(this.defaluts.restTime);
					this.timer.display();
					this.$('.widget-content').animate({top:-410},function(){
						timer.play();
					});
					break;
				case 'timer':
					this.timer.init(this.defaluts.workTime);
					this.timer.display();
					this.$('.widget-content').animate({top:0});
					break;
				case 'complete':
					this.$('.widget-content').animate({top:-205});
					break;
			}
		}
	});
});