;(function($){
	
	$.salvia.object.namespace("$.classes.ui");
	
	/**list(列表类)**/
	$.classes.ui.list = $.salvia.object.class($.classes.list,{
		add:function($super,attr){
			var item = this.onAdded(attr);
			$super(item);
			return item;
		},
		onAdded:function(attr){
			var item = new $.classes.ui.list.item(this.dom,attr);
			this.dom.append(item.dom);
			return item;
		},
		remove:function($super,item){			
			item.dom.remove();
			return $super(item);
		},
		clear:function($super){
			for(var i=this.list.length-1;i>=0;--i){
				this.remove(this.list[i]);
			}
			$super();
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
		},
		sort:function(compare){
			$.sort(this.dom.find("li"),compare);
			for(var i in this.list)
			{
				this.list[i].dom = $("[data-id='"+this.list[i].id+"']");
			}
		}
	});
	
})(jQuery);