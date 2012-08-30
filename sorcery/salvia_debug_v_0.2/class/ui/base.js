;(function($){
	
	$.salvia.object.namespace("$.classes.ui");
	
	/**ui.base(可视基类)**/
	$.classes.ui.base = $.salvia.object.Class($.classes.base,{
		init:function($super,dom,attr){
			$super();
			this.dom = dom;
			this.dom.data("ui-class",this);
			this.dom.attr("data-id",this.id);
			if(attr!=undefined){
				this.initSet(attr);
			}
		},
		initSet:function(attr){
			for(var pro in attr){
				if(this[pro]==undefined) continue;
				this[pro](attr[pro]);
			}
		}
	});
	
})(jQuery);
