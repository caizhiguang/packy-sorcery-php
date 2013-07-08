!function($,Backbone){

	$(document).ready(function(){

		/**
		 * 初始化页面大小
		 */

		var widgetResize = function(obj){
			var headerHeight = $('#header').outerHeight();
			var footerHeight = $('#footer').outerHeight();
			var widget_height = 0;
			obj.children(':not(.widget-content)').each(function(){
				widget_height+=$(this).outerHeight();
			});

			obj.children('.widget-content').height($(window).height()-headerHeight-footerHeight-widget_height);
		}

		$(window).resize(function(){
			widgetResize($('.widget-chat'));
			widgetResize($('.widget-history'));
			widgetResize($('.widget-question'));
		});
		$(window).trigger('resize');
		$('#history').on('shown', function(){
			widgetResize($(this));
		})

		/**
		 * 初始化 专家在线 应用
		 */

		var Questions = $.lib('app.chat.view.questions');
		var questions = new Questions;
		questions.render();

		var Chat = $.lib('app.chat.view.chat');
		var chat = new Chat;
		chat.render();

		/**
		 * 初始化输入框
		 */
		$('#editor').wysiwyg();
	});

}(jQuery,Backbone);