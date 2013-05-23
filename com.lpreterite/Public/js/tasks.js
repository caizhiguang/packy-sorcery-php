jQuery(document).ready(function($) {

	var Tag = Backbone.Model.extend({
		urlRoot:'/tag/api'
	});

	var TagList = Backbone.Collection.extend({
		urlRoot:'/tag/api',
		url:'/tag/api',
		model:Tag
	});

	//定义“任务”数据模型
	var Task = Backbone.Model.extend({
		urlRoot:'/task/api',//数据更新接口
		toggle:function(){ //自定义方法-toggle,用于更新complete数据
			this.save({complete:!Number(this.get('complete'))});
		}
	});

	//定义“任务”数据模型堆
	var TaskList = Backbone.Collection.extend({
		model:Task,//设置数据模型
		url:'/task/api',//数据更新接口
		comparator :'start_time'//设置排序参考属性
	});

	var tasks = new TaskList;//创建“任务”数据模型堆
	var tags = new TagList;

	//定义“任务”视图
	var TaskView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#task-item').html()),
		msgbox:_.template($('#msgbox').html()),
		events: {
			"dblclick .view"  : "edit",
			"blur .editor":"update",
			"keypress .editor":"update",
			"click a.remove":'clear',
			'click .checkbox':'toggle'
		},
		initialize:function(){ //初始化
			this.listenTo(this.model,'change',this.render);
			this.listenTo(this.model,'destroy',this.remove);
		},
		render: function() { //类似刷新
			var data = this.model.toJSON();
			data.tags_name = data.tags;
			this.$el.html(this.template(data));
			this.input = this.$el.find('.editor');
			return this;
		},
		clear:function(){ //删除
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

			var value = this.input.val();
			if (!value) {
				this.clear();
			} else {
				this.$el.removeClass("editing");
				this.model.save({name:value});
			}
		},
		toggle:function(){ //设置为完成
			this.model.toggle();
		}

	});

	//定义页面视图
	var AppView = Backbone.View.extend({
		el:$('#content'),
		events:{
			'submit form.task-input':'create'
		},
		initialize:function(){ //初始化
			this.listenTo(tags,'add',this.renderByTag);
			this.listenTo(tasks,'add',this.renderByTask);
			// tags.fetch();
			tasks.fetch();
			this.input = this.$('.task-input>input');
		},
		renderByTag:function(tag){
			$('.widget-tags>.widget-content').append('<a href="javascript:;" data-tag-id="'+tag.get('id')+'">'+tag.get('name')+'</a> ');
		},
		renderByTask:function(task){ //显示“任务”视图
			var view = new TaskView({model:task});
			$('.tasks').prepend(view.render().el);
		},
		create:function(){ //添加“任务”数据

			var inputData = this.input.val();

			tasks.create({
				complete: "0",
				content: "",
				end_time: null,
				important: "0",
				name: inputData,
				priority: "0",
				spacing: null,
				start_time: $.dateToString(new Date()),
				tags: null,
				time: null,
				today: "0",
				uid: null
			});
			this.input.val('');
			return false;
		}
	});

	var app = new AppView;

	// var taskItem = new TaskView();
	// taskItem.render();
	// taskItem.$el.appendTo(".tasks");
	
	
});