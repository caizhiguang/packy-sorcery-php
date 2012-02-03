;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.ui==undefined){ $.classes.ui={}; }
	
	/**ui.base(可视基类)**/
	$.classes.ui.base = $.salvia.Class($.classes.base,{
		init:function($super,dom,options){
			$super();
			if(dom==undefined){return;}
			//default setting
			this.dom = dom;
			//css
			if(options["css"]!=undefined){this.onCssChanged(options.css);}
			//attr
			if(options["attr"]!=undefined){this.onAttrChanged(options.attr);}
		},
		onCssChanged:function(css){
			this.dom.css(css);
		},
		onAttrChanged:function(attr){
			this.dom.attr(attr);
		}
	});
	
})(jQuery);