!function($){

	$.salvia.object.namespace("$.salvia.ui");

	$.salvia.ui.form = $.salvia.object.Class($.salvia.ui.base,{
		/**初始化**/
		init:function($super,dom,attr){
			$super(dom,attr);
			if(attr==undefined){
				this.disposition("default");
			}
			//event
			this._dom.find(".menu a.iClose").bind("click",$.proxy(function(){this.onClose();return false;},this));
			this._dom.bind("click",$.proxy(function(){this.onActived();},this));
			
			this.hide();
		},



		/**方法**/

		/**
		 * 显示位置
		 * @param  {string} disposition [description]
		 * @return {string}
		 */
		disposition:function(disposition){
			if(disposition==undefined){
				return this._dom.attr("data-disposition");
			}else{
				this._dom.attr("data-disposition",disposition);
			}
		},
		/**
		 * 标题
		 * @param  {string} text 标题内容
		 * @return {string}
		 */
		text:function(text){
			if(text==undefined){
				return this._dom.find(".title").text();
			}else{
				this._dom.find(".title").html(text);
			}
		},
		/**
		 * 活动（是否活动中）
		 * @param  {boolean} actived true/false
		 * @return {boolean}
		 */
		actived:function(actived){
			if(actived==undefined){
				return this._dom.attr("data-actived");
			}else{
				this._dom.attr("data-actived",actived);
				this._dom.trigger("actived");
				this._onActived(actived);
			}
		},
		_onActived:function(val){
			// if(actived){
			// 	this._dom.css({
			// 		opacity:"1",
			// 		filter:"alpha(opacity=100)"
			// 	});
			// }else{
			// 	this._dom.css({
			// 		opacity:"0.8",
			// 		filter:"alpha(opacity=80)"
			// 	});
			// }
		},
		/**
		 * 图标
		 * @param  {string} val 图标地址
		 * @return {string}
		 */
		icon:function(val){
			if(val == undefined){
				return this._dom.find('.icon>img,.avatar>img').attr('src');
			}else{
				this._dom.find('.icon>img,.avatar>img').attr('src',val);
			}
		},
		/**
		 * 显示于任务栏中
		 * @param  {boolean} inBar true/false
		 * @return {boolean}
		 */
		inTaskBar:function(inBar){
			if(inBar==undefined){
				return this._dom.attr("data-inTaskBar");
			}else{
				this._dom.attr("data-inTaskBar",inTaskBar);
			}
		},



		/**方法**/

		/**
		 * 显示窗体
		 */
		show:function(){
			this.visible(true);
			this.actived(true);
		},
		/**
		 * 隐藏窗体
		 */
		hide:function(){
			this.visible(false);
			this.actived(false);
		},
		/**
		 * 关闭窗体
		 */
		close:function(){
			this._dom.trigger("closed");
			this._dom.remove();
			this._onClose();
		},
		_onClose:function(){},
		/**
		 * 拖动
		 */
		drag:function(){
			this._dom.css({position:"absolute"});
			this._dom.drag({handle:".hd,.menu"});
		},
		/**
		 * 窗体以提示窗口方式显示
		 * @param  {DOM} dom     DOM对象
		 * @param  {json} options 设置
		 */
		tip:function(dom,options){
			var options = $.extend(
				{}/* new object */,
				{
					tip:this._dom,
					overflow:"auto",
					limit:$(window)
				},
				options || {} /* just-in-time options */
			);
			this._tip = dom.tip(options)[0];
		},
		_onVisible:function(val){
			this._dom.toggle(val);
		}
	});

}(jQuery);