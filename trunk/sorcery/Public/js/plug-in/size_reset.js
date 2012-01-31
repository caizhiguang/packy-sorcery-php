;(function($){
	$.fn.extend({
		sizeReset:function(options){
			var options = $.extend(
				{}/* new object */,
				$.fn.sizeReset.options || {},
				options || {} /* just-in-time options */
			);
			
			options.oheight = this.height();
			options.owidth = this.width();
			
			$(document).mousemove($.proxy(function(e){
				var positionCheck = $.fn.sizeReset.GetPositionCheck(e,this,options);
				
				var reset_height = options.oheight+(e.clientY-options.oY);
				var reset_width = options.owidth+(e.clientX-options.oX);
				
				if(options.canReset){
					this.css({
						height:reset_height,
						width:reset_width
					});
					this.SizeChanged = options.SizeChanged;
					this.SizeChanged();
					delete this.SizeChanged;
				}
				
								
				if(!options.mouseIsDown){
					if(positionCheck.inBottom&&positionCheck.inRigth){this.css({cursor:"se-resize"});}
					/*else if(inBottom&&inLeft||inTop&&inRigth){this.css({cursor:"ne-resize"});}*/
					else if(positionCheck.inBottom){this.css({cursor:"n-resize"});}
					else if(positionCheck.inRigth){this.css({cursor:"e-resize"});}
					else{this.css({cursor:"default"});}
				}
			},this)).mousedown($.proxy(function(e){
				var positionCheck = $.fn.sizeReset.GetPositionCheck(e,this,options);
				
				if(!options.mouseIsDown){
					if(positionCheck.inBottom&&positionCheck.inRigth){options.canReset=true;}
					/*else if(inBottom&&inLeft||inTop&&inRigth){options.canReset=true;}*/
					else if(positionCheck.inBottom){options.canReset=true;}
					else if(positionCheck.inRigth){options.canReset=true;}
				}
				
				options.oX = e.clientX;
				options.oY = e.clientY;
				options.mouseIsDown = true;
			},this)).mouseup($.proxy(function(e){
				options.mouseIsDown = false;
				options.canReset=false;
				
				options.oheight = this.height();
				options.owidth = this.width();
			},this));
		}
	});
	
	$.fn.sizeReset.options = {
		canReset:false,//可否改变大小
		mouseIsDown:false,//是否已点击
		oheight:0,//尺寸改变前的高度
		owidth:0,//尺寸改变前的宽度
		oX:0,//点击后第一个位置的X坐标
		oY:0,//点击后第一个位置的Y坐标
		range:5,//鼠标响应范围(单位：像素
		SizeChanged:function(){}//大小改变后的通知
	};
	
	$.fn.sizeReset.GetPositionCheck=function(e,element,options){
		var position = element.position();
		var result = {
			inTop:e.clientY>=position.top-options.range&&e.clientY<position.top+options.range,
			inBottom:e.clientY>=element.height()+position.top-options.range&&e.clientY<=element.height()+position.top+options.range,
			inLeft:e.clientX>=position.left-options.range&&e.clientX<=position.left+options.range,
			inRigth:e.clientX>=element.width()+position.left-options.range&&e.clientX<=element.width()+position.left+options.range
		};
		
		return result;
	};
})(jQuery);