define(['backbone'],function(){
	//定义“任务”数据模型
	return Backbone.Model.extend({
		urlRoot:'/task/api',//数据更新接口
		toggle:function(){ //自定义方法-toggle,用于更新complete数据
			this.save({complete:!Number(this.get('complete'))});
		}
	});
});