!function($){

	$.extend({
		talkcenter:{
			setDOM:function($){
				this.dom = $;
				return this;
			},
			init:function(){
				$('.sidebar .connection').hover(function(){},function(){
					$.talkcenter.wrap.events.sidebar_connection_hover(false);
				}).find('.tab').click(function(){
					$.talkcenter.wrap.events.sidebar_connection_hover(true);
				});

				$('.sidebar .user_infor').hover(function(){},function(){
					$.talkcenter.wrap.events.sidebar_userInfor_hover(false);
				}).find('.avatar').click(function(){
					$.talkcenter.wrap.events.sidebar_userInfor_hover(true);
				});;

				this.sidebar_connection_close();
				this.sidebar_userInfor_close();

				// $('.addresseeinfo>.avatar').click(function(){
				// 	$(this).parents('.form').find('.sub_inner').animate({top:0},'normal','easeOutExpo');
				// });
				// $('.nav>a').eq(0).click(function(){
				// 	$(this).parents('.form').find('.sub_inner').animate({top:-454},'normal','easeOutExpo');
				// });

				var scrollableOfForms = new $.salvia.ui.scrollable($('.forms'),{
					item:['.form'],
					to:[1],
					naviSetting:[{prev:'.left',next:'.right'}],
					navi:[$('.channel_fun')]
				});

				$('.forms>.group').each(function(i){
					var scrollableOfGroup = new $.salvia.ui.scrollable($(this),{
						item:['.sub_inner>div'],
						wrap:['.sub_inner'],
						vertical:[true],
						to:[1],
						naviSetting:[{prev:'.left',next:'.right'}],
						navi:[$(this).find('.nav')]
					});
					$(this).data('scrollable',scrollableOfGroup);
				});
			},
			resize:function(wrap){
				if(wrap==undefined) wrap = this.dom;
				return wrap.css({width:$(window).width(),height:$(window).height()});
			},
			resetoffset:function(index,options,wrap){
				if(wrap==undefined) wrap = this.dom;
				if(index==undefined) index=0;
				var width = wrap.outerWidth();
				var height = wrap.outerHeight();
				var options = $.extend({},{
					top:true,
					left:true
				},options);

				var offset = {};

				if(options.top) offset.top = $(window).height()/2-height/2;
				if(options.left) offset.top = $(window).width()/2-width/2 +index*$(window).width();

				return wrap.offset(offset);
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
					var spacing = this.options.spacing==0?item.outerWidth():this.options.spacing;
					var top = 0;
					for (var i = 0; i < item.length; i++) {
						var offset = $(item[i]).offset();
						if(i==0) top = offset.top;
						if(top != offset.top) offset.top = top;
						if(index>this.index){
							offset.left = offset.left-index*spacing;
						}else if(index<this.index){
							offset.left = offset.left+(index==0?1:index)*spacing;
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