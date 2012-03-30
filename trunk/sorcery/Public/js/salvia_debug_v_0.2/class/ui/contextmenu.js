;(function($){
	
	$.salvia.object.namespace("$.classes.ui");
	/**ui.base(可视基类)**/
	$.classes.ui.contextmenu = $.salvia.object.class($.classes.ui.base,{
		init:function($super,dom,attr){
			$super(dom,attr);
			
			this.domListenEvents = {
				document_click:function(e){
					e.data.hide();
				},
				parent_contextmenu:function(e){
					e.data.location({left:e.clientX,top:e.clientY});
					e.data.target(e.target);
					e.data.show();
					return false;
				}
			};
			
			if(attr==undefined){
				this.setParent($(document.body));
			}
			this.initDOM();
			$(document.body).bind("click",this,this.domListenEvents.document_click);
		},
		initDOM:function(){
			//css
			this.dom.attr({
				id:"ui_contextmenu"
			}).css({
				position:"absolute",
				zIndex:"99999",
				background:"#fff"
			});
			
			$.c("div").attr({
				id:"contextmenu_inner"
			}).css({
				overflow: "hidden"
			}).appendTo(this.dom);
			
			$.c("iframe").attr({
				id:"contextmenu_iframe",
				frameborder:"0",
				scrolling: "no"
			}).css({
				width:"100%",
				height:"100%",
				top:0,
				left:0,
				position:"absolute",
				zIndex:"-1"
			}).appendTo(this.dom.find("#contextmenu_inner"));
			
			this.dom.hide();
		},
		datasource:function(datasource,setting){
			for(var i in datasource)
			{
				var btnMenu = $.c("a").attr({
					href:"javascript:;"
				}).css({
					display:"block"
				}).appendTo(this.dom.find("contextmenu_inner")).bind("click",this,function(e){
					e.data._events.run("menuButtomClick",e.data,this);
				});
				this.binding(setting,btnMenu,datasource[i]);
			}
		},
		setParent:function(parent){
			this.parent = parent;
			this.parent.bind("contextmenu",this,this.domListenEvents.parent_contextmenu);
		},
		location:function(offset){
			this.dom.offset(offset);
		},
		target:function(target){
			if(target==undefined){
				return this._target;
			}else{
				this._target = target;
			}
		},
		show:function(){
			this.dom.hide();
			var result = this._events.run("show");
			this.dom.toggle(result);
		},
		hide:function(){
			this.dom.hide();
			this._target = null;
			delete this._target;
		},
		destruct:function($super){
			this.parent.unbind("contextmenu",this.domListenEvents.parent_contextmenu);
			$(document.body).unbind("click",this.domListenEvents.document_click);
			this.dom.remove();
			$super();
		}
	});

})(jQuery);