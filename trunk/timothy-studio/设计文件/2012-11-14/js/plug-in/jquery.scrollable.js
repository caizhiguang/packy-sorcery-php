!function($){
	$.fn.scrollable = function(options){
		var options = $.extend({index:0},{},options);

		var scrollable = {
			init:function(dom,attr){
				this._dom = dom;
				this._wrap = '.wrap';
				this._item = '.item';
				this._index = 0;
				this._spacing = 0;
				this._naviSetting = {
					next:'.next',
					prev:'.prev',
					item:'a'
				};
				this._vertical = false;
				this._naviEvents = {
					btnNextEvent:function(e){
						e.data.next($(e.target));
					},
					btnPrevEvent:function(e){
						e.data.prev($(e.target));
					},
					btnTo:function(e){
						e.data.to($(this).attr('data-index'),$(this));
					}
				};

				// $super(dom,attr);
			},
			vertical:function(vertical){
				if(vertical==undefined){
					return this._vertical;
				}else{
					this._vertical = vertical;
				}
			},
			naviSetting:function(setting){
				if(setting==undefined){
					return this._naviSetting;
				}else{
					if(this._navi!=undefined){
						this._navi.find(this._naviSetting.next).unbind('click',this._naviEvents.btnNextEvent);
						this._navi.find(this._naviSetting.prev).unbind('click',this._naviEvents.btnPrevEvent);
						this._navi.find(this._naviSetting.item).unbind('click',this._naviEvents.btnTo);
					}
					this._naviSetting = $.extend({},this._naviSetting,setting);
				}
			},
			navi:function(navi){
				if(navi==undefined){
					return this._navi;
				}else{
					this._navi = navi;
					this._navi.find(this._naviSetting.next).bind('click',this,this._naviEvents.btnNextEvent);
					this._navi.find(this._naviSetting.prev).bind('click',this,this._naviEvents.btnPrevEvent);
					this._navi.find(this._naviSetting.item+':not('+this._naviSetting.next+','+this._naviSetting.prev+')').bind('click',this,this._naviEvents.btnTo);
					this._navi.find(this._naviSetting.item+':not('+this._naviSetting.next+','+this._naviSetting.prev+')').each(function(i){$(this).attr('data-index',i);});
				}
			},
			wrap:function(wrap){
				if(wrap==undefined){
					return this._wrap;
				}else{
					this._wrap = wrap;
				}
			},
			item:function(item){
				if(item==undefined){
					return this._item;
				}else{
					this._item = item;
				}
			},
			spacing:function(spacing){
				if(spacing==undefined){
					return this._spacing;
				}else{
					this._spacing = spacing;
				}
			},
			index:function(index){
				if(index==undefined){
					return this._index;
				}else{
					this._index = index;
				}
			},
			next:function(){
				if(this._index != this._dom.find(this._item).length - 1)
					this.to(this._index+1);
			},
			prev:function(){
				if(this._index!=0)
					this.to(this._index-1);
			},
			to:function(index){
				var item = this._dom.find(this._item);
				var spacing = this._spacing==0?(!this._vertical?item.outerWidth():item.outerHeight()):this._spacing;
				var top = 0;
				var left = 0;
				var wrap = this._dom.find(this._wrap);

				if(wrap.length==0){
					for (var i = 0; i < item.length; i++) {
						var position = $(item[i]).position();

						if(!this._vertical){
							if(i==0) top = position.top;
							if(top != position.top) position.top = top;
							if(index>this._index){
								position.left = position.left-index*spacing;
							}else if(index<this._index){
								position.left = position.left+(index==0?1:index)*spacing;
							}
						}else{
							if(i==0) left = position.left;
							if(left != position.left) position.left = left;
							if(index>this._index){
								position.top = position.top-index*spacing;
							}else if(index<this._index){
								position.top = position.top+(index==0?1:index)*spacing
							}
						}
						$(item[i]).animate(position,'normal','easeOutExpo');
					};
				}else{
					var position = wrap.position();
					if(!this._vertical){
						if(i==0) top = position.top;
						if(top != position.top) position.top = top;
						if(index>this._index){
							position.left = -1*(index+1)*spacing;
						}else if(index<this._index){
							position.left = (index+1)*spacing;
						}
					}else{
						if(i==0) left = position.left;
						if(left != position.left) position.left = left;
						if(index>this._index){
							position.top = -index*spacing;
						}else if(index<this._index){
							position.top = -index*spacing
						}
					}
					wrap.animate(position,'normal','easeOutExpo');
				}
				
				this._index = index;
			}
		};
		scrollable.init(this);
		scrollable.item(options.item);
		scrollable.to(options.index);
		scrollable.navi(this.find(options.navi));
		scrollable.vertical(true);
		this.data('scrollable',scrollable);
	}
}(jQuery);