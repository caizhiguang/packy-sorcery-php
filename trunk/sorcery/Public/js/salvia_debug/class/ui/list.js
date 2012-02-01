;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	
	/**form(窗体类)**/
	$.classes.list = $.salvia.Class($.classes.base,{
		init:function($super,dom,attr){
			$super();
			if(dom==undefined){return;}
			//default setting
			this.dom = dom;
			
			//attr
			this.dom.attr("data-id",this._id);
			if(attr==undefined){attr={};}
			for(var pro in attr)
			{
				this.dom.attr("data-"+pro,attr[pro]);
			}
			this.attr = attr;
			
			this.list = [];
		},
		addItem:function(attr){
			var item = new $.classes.list.item(attr);
			this.dom.append(item.dom);
			this.list.push(item);
			return item;
		},
		removeItem:function(id){
			var item = '';
			var removeIndex = -1;
			for(var i in this.list)
			{
				if(this.list[i].id==id){item=this.list[i];removeIndex = i;}
			}
			if(item==''){return false;}
			this.list.splice(removeIndex,1);
			item.dom.remove();
		},
		datasource:function($super,datasource,setting){
			$super(datasource);
			for(var i in datasource)
			{
				var item = this.addItem();
				item.datasource(datasource[i],setting);
			}
		}
	});
	
})(jQuery);