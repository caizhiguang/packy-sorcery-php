;(function($){
	$.fn.extend({
		
		/**-------拖动插件-------**/
		drag:function(options){
			var options = $.extend(
				{}/* new object */,
				$.fn.drag.options || {},
				options || {} /* just-in-time options */
			);
			
			var panels = this;
            /**设置把手文本为不可选择**/
			var handles = panels.find(options.handle);
			handles.each(function(i){
				this.oncontextmenu=function(){self.event.returnValue=false;};
				this.onselectstart=function(){return false;};
			}).css({ MozUserSelect:"none" });
			
            /**点击把手（开始拖动）**/
			var panel = {};
			if(options.handle == ""){
				this.mousedown(function(e){
					$(this).css({ cursor:"move" });
					panel = $.fn.drag.options.activePanel = $(this)//记录当前活动中的块
					
					$.fn.drag.heave(panel,options,e);
				}).mouseup(function(){ $(this).css({ cursor:"default" }); });
			}else{
				this.find(options.handle).mousedown(function(e){
					$(this).css({ cursor:"move" });
					panel = $.fn.drag.options.activePanel = $($(this).parents()[options.level]);//记录当前活动中的块
					
					$.fn.drag.heave(panel,options,e);
				}).mouseup(function(){ $(this).css({ cursor:"default" }); });;
			}
			
            /**拖动中**/
			$(document).mousemove(function(e){ 
				$.fn.drag.drag(panel,options,e); 
			});

            /**放下把手（结束拖动）**/
			$(document).mouseup(function(e){
				$.fn.drag.drop(panel,options,e);
			});
		}
	});
	
	/**-------拖动插件-------**/
	$.fn.drag.options={
		limit:"",//拖动限制
		isdrop:true,//是否放下
		handle:"",//把手
		level:1,
		panelX:0,
		panelY:0,
		dX:0,//鼠标X坐标到块左上角X坐标的差值
		dY:0,//鼠标Y坐标到块左上角Y坐标的差值
		panels:{},
		activePanel:{},//当前被拖动的块（jquery类）
		heave:function(panel,options,e){},
		drag:function(panel,options,e){},
		drop:function(panel,options,e){}
	};
	/**
	 @class 提起方法
	 @param 
	 	panel : {jQuery} 当前活动的块
	 	options : {object} 配置参数
	 	e : {event} 事件参数 
	 @returns {void} 无
	 @author Packy(blog.lpreterite.com)
	 **/
	$.fn.drag.heave=function(panel,options,e){
		options.isdrop = false;//开始拖动
		
		options.width = panel.width();
		options.height = panel.height();
		
		var position = panel.position();//取得以父级为准的坐标值
		options.dX = e.clientX - position.left;
		options.dY = e.clientY- position.top;
		
		options.panelX = e.clientX-options.dX;
		options.panelY = e.clientY-options.dY;
		
		panel.css({
			position:"absolute",
			top:options.panelY,
			left:options.panelX,
			width:options.width,
			height:options.height,
			zIndex:999
		});
		
		options.heave(panel,options,e);
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
	$.fn.drag.drag=function(panel,options,e){
		if(!options.isdrop)
		{
			options.panelY = e.clientY-options.dY;
			options.panelX = e.clientX-options.dX;
			panel.css("top",options.panelY);
			panel.css("left",options.panelX);
			
			options.drag(panel,options,e);
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
	$.fn.drag.drop=function(panel,options,e){
		if(!options.isdrop)
		{
			panel.css({
				zIndex:0
			});
			options.drop(panel,options,e);
			options.isdrop = true;//结束拖动
		}
	};
})(jQuery);