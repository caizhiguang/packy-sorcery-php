define(['backbone','model/task'],function(Backbone,Task){
	//定义“任务”数据模型堆
	var tasks = Backbone.Collection.extend({
		model:Task,//设置数据模型
		url:'/task/api',//数据更新接口
		comparator :'start_time'//设置排序参考属性
	});

	return new tasks;
});