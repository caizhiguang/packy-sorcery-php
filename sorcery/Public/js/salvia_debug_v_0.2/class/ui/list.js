;(function($){
	
	$.salvia.object.namespace("$.classes.ui");
	
	/**list(列表类)**/
	$.classes.ui.list = $.salvia.object.Class($.classes.base.list,{
		init:function($super,dom,attr){
			$super();
			$.classes.ui.base.prototype.init.apply(this,[dom,attr]);
		},
		add:function($super,dom,attr){
			if(dom==undefined){dom = $.c("li").appendTo(this.dom);}
			if(dom.length==undefined){dom = $.c("li");}
			
			var item = this.onCreateItem(dom.appendTo(this.dom),attr);
			$super(item);
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
		onCreateItem:function(dom,attr){
			return new $.classes.ui.list.item(dom,attr);
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