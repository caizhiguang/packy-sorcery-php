;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.ui==undefined){ $.classes.ui={}; }
	
	/**list(列表类)**/
	$.classes.ui.list = $.salvia.Class($.classes.base.list,{
		init:function($super,dom,attr){
			$super();
			if(dom==undefined){return;}
			//default setting
			this.dom = dom;
			
			//attr
			this.dom.attr("data-id",this.id);
			if(attr==undefined){attr={};}
			for(var pro in attr)
			{
				this.dom.attr("data-"+pro,attr[pro]);
			}
			this.attr = attr;
		},
		add:function($super,attr){
			var item = new $.classes.ui.list.item(parent,attr);
			this.dom.append(item.dom);
			$super(item);
			return item;
		},
		remove:function($super,item){
			var removeIndex = -1;
			item.dom.remove();
			return $super(item);
		},
		datasource:function($super,datasource,setting){
			$super(datasource);
			for(var i in datasource)
			{
				if($.isFunction(datasource[i])){continue;}
				var item = this.add();
				item.datasource(datasource[i],setting);
			}
		},
		selectAll:function(){
			for(var i in this.list)
			{
				if(!this.list[i].hasCheckBox()){continue;}
				this.list[i].checked(true);
			}
		},
		selectInvert:function(){
			for(var i in this.list)
			{
				if(!this.list[i].hasCheckBox()){continue;}
				this.list[i].checked(!this.list[i].checked());
			}
		},
		selectNone:function(){
			for(var i in this.list)
			{
				if(!this.list[i].hasCheckBox()){continue;}
				this.list[i].checked(false);
			}
		}
	});
	
})(jQuery);