!function($){
	$.fn.scrollable = function(options){
		var options = $.extend({},{},options);
		var scrollable = {
			/**
			 * 初始化scrollable
			 * @param  {jQuery} dom 主体
			 */
			init:function(dom){
				this._dom = dom;
				this._index = 0;
				this._naviEvents = {
					btnNextEvent:function(e){
						e.data.next($(e.target));
					},
					btnPrevEvent:function(e){
						e.data.prev($(e.target));
					},
					btnTo:function(e){
						e.data.to($(e.target).attr('data-index'),$(e.target));
					}
				};
			},
			/**
			 * 包裹item的标签
			 * @param  {jQuery} wrap 包裹item的标签
			 * @return {jQuery}      
			 */
			wrap:function(wrap){
				if(wrap!=undefined){
					this._wrap = wrap;
				}else{
					return this._wrap;
				}
			},
			/**
			 * 内容项
			 * @param  {jQuery} items 内容项
			 * @return {jQuery}      
			 */
			items:function(items){
				if(items!=undefined){
					this._items = items;
				}else{
					return this._items;
				}
			},
			/**
			 * 导航
			 * @param  {jQuery} navi 导航标签
			 * @return {[type]}      [description]
			 */
			navi:function(navi){
				if(navi!=undefined){
					this._navi = navi;
					this._navi.find('.next').bind('click',this,this._naviEvents.btnNextEvent);
					this._navi.find('.prev').bind('click',this,this._naviEvents.btnPrevEvent);
					this._navi.find(':not(.next,.prev)').bind('click',this,this._naviEvents.btnTo);
					this._navi.find(':not(.next,.prev)').each(function(i){$(this).attr('data-index',i);});
				}else{
					return this._navi;
				}
			},
			next:function(){
				this.to(++this._index);
			},
			prev:function(){
				this.to(--this._index);
			},
			to:function(index){
				var top = 0;
				for (var i = 0; i < index; i++) {
					top+=this._items.eq(i).outerHeight();
				};
				this._navi.removeClass('current').eq(index).addClass('current');
				this._wrap.animate({scrollTop:top,height:this._items.eq(index).outerHeight()},'normal','easeOutExpo');
			}
		};
		scrollable.init(this);
		scrollable.wrap(this.find(options.item).parent());
		scrollable.items(this.find(options.item));
		scrollable.navi(this.find(options.navi));
		scrollable.to(options.index==undefined?0:index);
	}
}(jQuery);