!function($){

	$.salvia.object.namespace("$.salvia.ui");
	/**ui.base(可视基类)**/
	$.salvia.ui.contextmenu = $.salvia.object.Class($.salvia.ui.base,{
		init:function($super,dom,attr){
			$super(dom,attr);
			
			this.initDOM();
			$(document.body).bind("click",this,$.salvia.ui.contextmenu.document_click);
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
			
			this.visible(false);
		},
		datasource:function(datasource,setting){
			if(datasource==undefined){
				return this.dom.data('datasource');
			}else{
				this.dom.data('datasource');
				for(var i in datasource)
				{
					var btnMenu = $.c("a").attr({
						href:"javascript:;"
					}).css({
						display:"block"
					}).appendTo(this.dom.find("#contextmenu_inner")).bind("click",this,function(e){
						e.data.dom.trigger("menuButtomClick",[this,e.data]);
					});
					this.binding(setting,btnMenu,datasource[i]);
				}
			}

			
		},
		parent:function(parent){
			if(parent==undefined){
				return this.parent;
			}else{
				this.parent = parent;
				this.parent.bind("contextmenu",this,$.salvia.ui.contextmenu.parent_contextmenu);
			}
		},
		location:function(offset){
			if(offset==undefined){
				return this.dom.offset();
			}else{
				this.dom.offset(offset);
			}
		},
		target:function(target){
			if(target==undefined){
				return this._target;
			}else{
				this._target = target;
			}
		},
		visible:function(val){
			if(val==undefined){
				return this.dom.attr('visible');
			}else{
				this.dom.attr('visible',val);
			}
		},
		show:function(){
			// this.dom.hide();
			// var cancel = false;
			// this.dom.trigger("show",cancel);
			// this.dom.toggle(!cancel);
			this.dom.show();
			this.visible(true);
		},
		hide:function(){
			this.dom.hide();
			this._target = "";
			this.visible(false);
		},
		destruct:function($super){
			this.parent.unbind("contextmenu",$.salvia.ui.contextmenu.parent_contextmenu);
			$(document.body).unbind("click",$.salvia.ui.contextmenu.document_click);
			this.dom.remove();
			$super();
		}
	});
	
	$.salvia.ui.contextmenu.document_click = function(e){
		e.data.hide();
	};
	$.salvia.ui.contextmenu.parent_contextmenu = function(e){
		e.data.target(e.target);
		e.data.show();
		e.data.location({left:e.clientX,top:e.clientY});
		return false;
	};

}(jQuery)