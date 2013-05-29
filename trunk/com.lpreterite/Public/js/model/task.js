define(['backbone'],function(){
	//定义“任务”数据模型
	return Backbone.Model.extend({
		defaults:function(){
			return {
				complete: 0,
				content: "",
				end_time: null,
				important: "0",
				name:'',
				priority: "0",
				spacing: 1500,
				start_time: null,
				tags: '',
				time: 0,
				today: "0",
				uid: null
			};
		},
		urlRoot:'/task/api',//数据更新接口
		toggle:function(){ //自定义方法-toggle,用于更新complete数据
			this.save({complete:''+Number(!Number(this.get('complete')))});
		}
	});
});