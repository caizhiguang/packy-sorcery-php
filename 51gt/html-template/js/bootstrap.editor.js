
/**
 * 已弃用
 */

!function($){

	var EditorBar = function(options){
		var options = $.extend({},{
			bar:''
		},options);

		var $el = this.$el = $(options.bar);

		this.onBtnClick=function(){
			$el.trigger('bar-btn-click',[$(this).attr('data-edit')]);
		};

		this.$el.find('[data-edit]').live('click',this.onBtnClick);
	};

	var Editor = function(options){
		var options = $.extend({},{
			bar:'',
			content:''
		},options);

		this.$el = $(options.content);
		this.$bar = $(options.bar);
		this.$bar.live('bar-btn-click',$.proxy(function(e,key){
			this.execCommand(key);
		},this));

		this.execCommand = function (commandWithArgs, valueArg) {
			var commandArr = commandWithArgs.split(' '),
					command = commandArr.shift(),
					args = commandArr.join(' ') + (valueArg || '');
				document.execCommand(command, 0, args);
		};
	};

	$.fn.extend({
		bootstrapEditor:function(options){
			var options = $.extend({},{
				bar:'.editor-bar'
			},options);

			var bar = new EditorBar({bar:options.bar});
			var editor = new Editor({bar:options.bar,content:$(this)});
		}
	});

	$(document).ready(function(){
		$('.editor').bootstrapEditor();
	});

}(jQuery);