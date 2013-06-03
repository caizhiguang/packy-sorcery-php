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
			this.listenTo(tags,'remove',this.change);
			this.$('.widget-content').html('<span class="data-empty">没还没标签！</span>');
		},
		render:function(){
			tags.fetch({operation:'tags-load'});
			return this;
		},
		source:function(data){
			if(!data) return false;
			for (var i = 0; i < data.length; i++) {
				tags.add(data[i]);
			};
		},
		add:function(tag){
			var view = new TagItemView({model:tag});
			// this.listenTo(view,'click',this.onTagItemClick);
			this.$('.widget-content').append(view.render().el);

			this.change();
		},
		change:function(){
			if(tags.length<=0){
				this.$('.widget-content').html('<span class="data-empty">没还没标签！</span>');
				// this.$('.bar .edit').toggleClass('hide');
			}else{
				this.$('.widget-content .data-empty').remove();
				// this.$('.bar .edit').toggleClass('hide');
			}
		},
		edit:function(){
			/**
			 * has edit modal
			 */
			// this._edited = !this._edited;
			// this.$el.toggleClass('editing',this._edited);
		},
		onTagItemClick:function(tag){
			/**
			 * has edit modal
			 */
			if(!this._edited)
				this.trigger('itemClick',tag.model);
			else
				tag.delete();
		}
	});
});