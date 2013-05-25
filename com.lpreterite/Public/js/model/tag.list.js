define(['backbone','model/tag'],function(Backbone,Tag){
	//定义“任务”数据模型堆
	var tags = Backbone.Collection.extend({
		urlRoot:'/tag/api',
		url:'/tag/api',
		model:Tag,
		comparator:'id'
	});

	return new tags;
});