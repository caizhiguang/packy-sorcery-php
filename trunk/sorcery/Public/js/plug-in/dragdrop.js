;(function($){
	$.fn.extend({
		
		/**-------拖动插件-------**/
		dragdrop:function(options){
			var options = $.extend(
				{}/* new object */,
				$.fn.dragdrop.options/* default options */,
				$.fn.drag.options || {},
				options || {} /* just-in-time options */
			);
			
			options.dropLimitPanels = $(options.dropLimit);//取得接受拖放动作的块
			options.dropLimitPanelsPosition = 
				$.fn.dragdrop.getDropLimitPanelsPosition(options.dropLimitPanels);//取得所有接受拖放动作的块范围
			
			var event = {
				heave:options.heave,
				drag:options.drag,
				drop:options.drop
			};
			
			options.heave=function(panel,options,e){
				event.heave(panel,options,e);//再调用用户自定的方法
			};
			options.drag=function(panel,options,e){
				$.fn.dragdrop.drag(panel,options,e);//先调用拖放控件的方法
				event.drag(panel,options,e);//再调用用户自定的方法
			};
			options.drop=function(panel,options,e){
				$.fn.dragdrop.drop(panel,options,e);//先调用拖放控件的方法
				event.drop(panel,options,e);//再调用用户自定的方法
			};
			
			this.drag(options);
		}
	});
	
	/**-------拖动插件-------**/
	$.fn.dragdrop.options={
		dropLimit:"",//拖放限制的块
		activeLimitPanel:{},
		shadow:"shadow",
		shadowStyleSet:function(shadow,panel,options,e){
			$(shadow).html("<div></div>");
			$(shadow).css({padding:10}).find("div").css({
				width:"100%",
				height:panel.height(),
				border:"#ddd dashed 1px",
				background:"#fdfdfd"
			});
		},
		heave:function(panel,options,e){},
		drag:function(panel,options,e){},
		dropBefore:function(panel,options,e){ return true; },
		drop:function(panel,options,e){},
		dropAfter:function(panel,options,e){
			panel.css({
				position:"relative",
				top:0,
				left:0,
				width:"auto",
				height:"auto",
				zIndex:0
			});
		}
	};
	/**
	 @class 拿着移动方法
	 @param 
	 	panel : {jQuery} 当前活动的块
	 	options : {object} 配置参数
	 	e : {event} 事件参数 
	 @returns {void} 无
	 @author Packy(blog.lpreterite.com)
	 **/
	$.fn.dragdrop.drag=function(panel,options,e){
		var limitPanel = options.activeLimitPanel = $.fn.dragdrop.getActionDropLimitPanel(options,e);
		
		if(limitPanel != undefined){
			var shadow = document.createElement("div");
			$(shadow).attr("id",options.shadow);
			if($("#"+options.shadow).length!=0){
				shadow = $("#"+options.shadow)[0];
			}
			options.shadowStyleSet(shadow,panel,options,e);
			limitPanel.append(shadow);
		}
	};
	/**
	 @class 放下方法
	 @param 
	 	panel : {jQuery} 当前活动的块
	 	options : {object} 配置参数
	 	e : {event} 事件参数 
	 @returns {void} 无
	 @author Packy(blog.lpreterite.com)
	 **/
	$.fn.dragdrop.drop=function(panel,options,e){
		var limitPanel =  options.activeLimitPanel;
		
		$("#"+options.shadow).remove();
		var canDrop = options.dropBefore(panel,options,e);
		if(canDrop)
		{
			if(limitPanel != undefined)
			{
				limitPanel.append(panel);
			}
		}
		options.dropAfter(panel,options,e);
	};
	/**
	 @class 取得接受放下的块的位置 方法
	 @param 
	 	dropLimitPanels : {jQuery} 接受放下的块
	 @returns {void} 无
	 @author Packy(blog.lpreterite.com)
	 **/
	$.fn.dragdrop.getDropLimitPanelsPosition=function(dropLimitPanels){
		var result = [];
		dropLimitPanels.each(function(i){
			var offset = $(this).offset();
			result[i] = {
				top:offset.top,
				bottom:offset.top+$(this).innerHeight(),
				left:offset.left,
				right:offset.left+$(this).innerWidth(),
				that:$(this)
			};
		});
		return result;
	};
	/**
	 @class 取得在范围内的块 方法
	 @param 
	 	options : {object} 配置参数
	 	e : {event} 事件参数 
	 @returns {void} 无
	 @author Packy(blog.lpreterite.com)
	 **/
	$.fn.dragdrop.getActionDropLimitPanel=function(options,e){
		for(var i=0;i<options.dropLimitPanelsPosition.length;i++)
		{
			var n = options.dropLimitPanelsPosition[i];
			var yHas = e.pageY>n.top && e.pageY<n.bottom;
			var xHas = e.pageX>n.left && e.pageX<n.right;
			if(yHas && xHas)
			{
				return n.that;
			}			
		}
	}
})(jQuery);