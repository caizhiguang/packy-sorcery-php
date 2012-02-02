//TODO:搁置
;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	
	/**table(表格)**/
	$.classes.table = $.salvia.Class($.classes.base,{
		init:function($super,dom){
			$super();
			this.dom = dom;
			this.rows = new $.classes.base.list();
		},
		addRow:function(){},
		removeRow:function(){}
	});
	
})(jQuery);