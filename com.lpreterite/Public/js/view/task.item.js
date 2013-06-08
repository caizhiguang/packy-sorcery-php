define([
	'model/tag.list',
	'backbone'
],function(tags){
	//定义“任务”视图
	return Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#task-item').html()),
		inputTemplate:_.template($('#task-item-editor').html()),
		msgbox:_.template($('#msgbox').html()),
		viewData:{},
		_active:false,
		events: {
			"dblclick .view"  : "edit",
			"keypress .editor":"update",
			"click a.remove":'delete',
			'click .checkbox':'toggle',
			'click':'active'
		},
		initialize:function(){ //初始化
			// this.listenTo(this.model,'change:name',this.name_changed);
			this.listenTo(this.model,'change',this.render);
			this.listenTo(this.model,'destroy',this.remove);
			this.$el.html(this.inputTemplate());
			this.input = this.$el.find('.editor');
		},
		render: function() { //类似刷新
			var data = this.model.toJSON();
			this.viewData.name = data.view_name = /[^@\s]+/.exec(data.name)[0];
			this.viewData.tag = data.tag = tags.findWhere({id:data.tags});
			data.tag = data.tag?data.tag.toJSON():null;

			this.$('.view').remove();
			this.$el.prepend(this.template(data));
			return this;
		},
		delete:function(){ //删除

			/**
			 * has message box code
			 */
			 
			// if($('#msgboxModal').length>0) return;

			// var that = this;
			// var msgboxTemp = this.msgbox({title:'提示', content:'确认删除 '+this.viewData.name+' 么？'});
			// $(msgboxTemp).appendTo(document).modal().on('hidden',function(){
			// 	$(this).remove();

			// 	if(that.$el.hasClass('editing')){
			// 		that.input.val(that.model.get('name'));
			// 		that.input.focus();
			// 	}
			// }).find('.btn-primary').on('click',function(){
			// 	that.model.destroy();
			// });
			 
			/**
			 * not message box code
			 */
			if(this.viewData.tag){
				this.viewData.tag.save({
					'tasks_count':Number(this.viewData.tag.get('tasks_count'))-1
				});
			}
			this.model.destroy();
			return false;
		},
		edit:function(e){ //进入更新编辑模式
			if(/label|input/.exec(e.target.nodeName.toLowerCase()) != null) return;
			this.$el.addClass("editing");
			this.input.focus();
			this.input.val(this.model.get('name'));
		},
		update:function(e){ //编辑完成后
			if(!(e.which==10 || e.which==13)) return;

			var tag,tagId="",tagName,preTag;
			tagName = /@[^@\s]+/.exec(this.input.val());

			if(tagName){
				tagName=tagName[0];
				tag = tags.findWhere({name:/[^@]+/.exec(tagName)[0]});
				if(!tag){
					tag = tags.create({
						name:/[^@]+/.exec(tagName)[0]
					},{
						wait: true,
						async:false
					});
				}else{
					preTag = tags.findWhere({id:this.model.get('tags')});
					if(preTag)
						preTag.tasksCount(-1);
					tag.tasksCount(1);
				}
				tagId = tag.id;
			}
			var value = this.input.val();
			if (!value) {
				this.delete();
			} else {
				this.$el.removeClass("editing");
				this.model.save({
					name:value,
					tags:tagId
				});
			}
		},
		active:function(e){
			this.$el.parent().find('.view:not(.task-item-'+this.model.id+')').removeClass('active');
			this.$('.view').toggleClass('active');
			var isActive = this.$('.view').hasClass('active');
			window.location.href = isActive?this.$('.title').attr('href'):'#';
			if(e.target.tagName.toLowerCase()=='a') return false;
		},
		toggle:function(){ //设置为完成
			this.model.toggle();
			return false;
		}
	});
});