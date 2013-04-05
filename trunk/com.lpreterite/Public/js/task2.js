jQuery(document).ready(function($) {
	var Tag = Backbone.Model.extend({
		urlRoot:'/tag/'
	});
	var TagList = Backbone.Collection.extend({
		model:Tag,
		url:'/tag/'
	});

	var Tags = new TagList;
	Tags.fetch();
	// Tags.fetch({success:function(collection){
	// 	var tag1 = collection.at(0);
	// 	tag1.set({name:'中文'});
	// 	tag1.save();

	// 	var newTag = new Tag;
	// 	newTag.set({name:'223'});
	// 	newTag.save();
	// 	tag1.destroy();
	// }});
});