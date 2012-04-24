//TODO:搁置
;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	
	/**table.row(表格行)**/
	$.classes.table.row = $.salvia.Class($.classes.base.list,{
		init:function($super,columnCount){
			$super();
			this.dom = this.createDom(columnCount);
			for(var i=columnCount-1;i<=0;--i){
				this.add(document.createElement("td"));
			}
		},
		createDom:function(){
			var dom = $(document.createElement("tr"));
			return dom;
		},
		add:function($super,item){
			$super(item);
			this.dom.append(item);
		},
		remove:function($super,item){
			$super(item);
			item.remove();
		}
	});
	
})(jQuery);