!function($){

	$.extend({
		talkcenter:{
			setDOM:function($){
				this.dom = $;
				return this;
			},
			init:function(){
				$('.sidebar .connection').hover(function(){
					$.talkcenter.wrap.events.sidebar_connection_hover(true);
				},function(){
					$.talkcenter.wrap.events.sidebar_connection_hover(false);
				});

				$('.sidebar .user_infor').hover(function(){
					$.talkcenter.wrap.events.sidebar_userInfor_hover(true);
				},function(){
					$.talkcenter.wrap.events.sidebar_userInfor_hover(false);
				});

				this.sidebar_connection_close();
				this.sidebar_userInfor_close();
			},
			resize:function(wrap){
				if(wrap==undefined) wrap = this.dom;
				return wrap.css({width:$(window).width(),height:$(window).height()});
			},
			resetoffset:function(index,wrap){
				if(wrap==undefined) wrap = this.dom;
				if(index==undefined) index=0;
				var width = wrap.outerWidth();
				var height = wrap.outerHeight();

				return wrap.offset({
					top:$(window).height()/2-height/2,
					left:$(window).width()/2-width/2 +index*$(window).width()
				});
			},

			sidebar_connection_close:function(){
				$.talkcenter.wrap.events.sidebar_connection_hover(false,1000);
			},
			sidebar_userInfor_close:function(){
				$.talkcenter.wrap.events.sidebar_userInfor_hover(false,1000);
			},

			scrollable:{
				init:function(dom,options){
					$.extend({},{
						spacing:0,
						item:'.item'
					},options);
					this.options = options;
					this.dom = dom;
					this.index = options.index==undefined?0:options.index;
				},
				next:function(){
					if(this.index != this.dom.find(this.options.item).length - 1)
						this.to(this.index+1);
				},
				prev:function(){
					if(this.index!=0)
						this.to(this.index-1);
				},
				to:function(index){
					var item = this.dom.find(this.options.item);
					for (var i = 0; i < item.length; i++) {
						var offset = $(item[i]).offset();
						if(index>this.index){
							offset.left = offset.left-index*this.options.spacing;
						}else if(index<this.index){
							offset.left = offset.left+(index==0?1:index)*this.options.spacing;
						}
						$(item[i]).animate(offset,'normal','easeOutExpo');
					};
					this.index = index;
				}
			},

			wrap:{
				events:{
					sidebar_connection_hover:function(isOver,delay){
						if(delay==undefined) delay=0;
						if (isOver) {
							//over
							$('.sidebar .connection').stop().delay(delay).animate({right:0},'normal','easeOutExpo');
						}else{
							//out
							$('.sidebar .connection').stop().delay(delay).animate({right:-243},'normal','easeOutExpo');
						}
					},
					sidebar_userInfor_hover:function(isOver,delay){
						if(delay==undefined) delay=0;
						if (isOver) {
							$('.sidebar .user_infor').stop().delay(delay).animate({right:0},'normal','easeOutExpo');
						}else{
							$('.sidebar .user_infor').stop().delay(delay).animate({right:'-'+($('.sidebar .user_infor .infor').outerWidth()+$('.sidebar .user_infor .fun').outerWidth()+11)},'normal','easeOutExpo');
						}
					}
				}
			}
		}
	});

	$.fn.extend({
		talkcenter:function(){
			return $.talkcenter.setDOM(this);
		}
	})

}(jQuery);