define(['backbone','model/tag'],function(Backbone,Tag){
	//定义“任务”数据模型堆
	var tags = Backbone.Collection.extend({
		url:'/tag/api',
		urlRoot:'/tag/api',
		model:Tag,
		comparator:'id'
	});

	return new tags;
});