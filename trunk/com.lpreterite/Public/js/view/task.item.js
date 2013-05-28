define([
	'model/tag.list',
	'backbone'
],function(tags){
	//定义“任务”视图
	return Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#task-item').html()),
		msgbox:_.template($('#msgbox').html()),
		events: {
			"dblclick .view"  : "edit",
			"blur .editor":"update",
			"keypress .editor":"update",
			"click a.remove":'delete',
			'click .checkbox':'toggle'
		},
		initialize:function(){ //初始化
			this.listenTo(this.model,'change:complete',this.test);
			this.listenTo(this.model,'change',this.render);
			this.listenTo(this.model,'destroy',this.remove);
		},
		render: function() { //类似刷新
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			this.input = this.$el.find('.editor');
			return this;
		},
		test:function(model){
			var d = model;
		},
		delete:function(){ //删除
			if($('#msgboxModal').length>0) return;

			var that = this;
			var msgboxTemp = this.msgbox({title:'提示', content:'确认删除 '+this.model.attributes.name+' 么？'});
			$(msgboxTemp).appendTo(document).modal({
				
			}).on('hidden',function(){
				$(this).remove();

				if(that.$el.hasClass('editing')){
					that.input.val(that.model.get('name'));
					that.input.focus();
				}
			}).find('.btn-primary').on('click',function(){
				that.model.destroy();
			});
		},
		edit:function(e){ //进入更新编辑模式
			if(/label|input/.exec(e.target.nodeName.toLowerCase()) != null) return;
			this.$el.addClass("editing");
			this.input.focus();
		},
		update:function(e){ //编辑完成后
			if(e.type=="keypress")
				if(!(e.which==10 || e.which==13)) return;

			var taskName = /[^@\s]+/.exec(this.input.val())[0];
			var tagName = /@[^@\s]+/.exec(this.input.val());
			if(tagName){
				tagName=tagName[0];
				var tag = tags.findWhere({name:/[^@]+/.exec(tagName)[0]});
				var tagId = null;
				var that = this;
				if(tag)
					tagId = tag.id;
				else
					tags.create({
						name:/[^@]+/.exec(tagName)[0],
						tasks_count:1,
						total_time:0,
						avg_time:0,
						longest_time:0,
						uid:0
					},{
						wait: true,
						success:function(model){
							that.model.save({tags:model.id});
						}
					});
			}
			var value = taskName;
			if (!value) {
				this.delete();
			} else {
				this.$el.removeClass("editing");
				this.model.save({name:value},{wait: true});
			}
		},
		toggle:function(){ //设置为完成
			this.model.toggle();
		}
	});
});