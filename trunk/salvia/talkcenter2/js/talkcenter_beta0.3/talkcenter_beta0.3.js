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

			wrap:{
				events:{
					sidebar_connection_hover:function(isOver,delay){
						if(delay==undefined) delay=0;
						if (isOver) {
							//over
							$('.sidebar .connection').stop().delay(delay).animate({right:0},'normal');
						}else{
							//out
							$('.sidebar .connection').stop().delay(delay).animate({right:-243},'normal');
						}
					},
					sidebar_userInfor_hover:function(isOver,delay){
						if(delay==undefined) delay=0;
						if (isOver) {
							$('.sidebar .user_infor').stop().delay(delay).animate({right:0},'normal');
						}else{
							$('.sidebar .user_infor').stop().delay(delay).animate({right:'-'+($('.sidebar .user_infor .infor').outerWidth()+$('.sidebar .user_infor .fun').outerWidth()+11)},'normal');
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

	$.fn.extend({
		scrollable:function(){
			var scrollable = {
				init:function(dom){
					this.dom = dom;
					this.spacing = dom.attr('data-spacing');
				},
				next:function(){},
				prov:function(){},
				to:function(index){
					
				}
			};


		}
	});

}(jQuery);