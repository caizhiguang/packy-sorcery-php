define([
	'view/tag.item',
	'model/tag.list'
],function(TagItemView,tags){
	return Backbone.View.extend({
		el:$('.widget-tags'),
		_edited:false,
		events:{
			'click .edit':'edit'
		},
		initialize:function(){
			this.listenTo(tags,'add',this.add);
			this.render();
		},
		render:function(){
			tags.fetch();
			return this;
		},
		add:function(tag){
			var view = new TagItemView({model:tag});
			this.listenTo(view,'click',this.onTagItemClick);
			this.$('.widget-content').append(view.render().el);
		},
		edit:function(){
			this._edited = !this._edited;
			this.$el.toggleClass('editing',this._edited);
		},
		onTagItemClick:function(tag){
			if(!this._edited)
				this.trigger('itemClick',tag);
		}
	});
});