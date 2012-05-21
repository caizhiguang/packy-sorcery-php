;(function($){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.ui==undefined){ $.classes.ui={}; }
	
	/**list(列表类)**/
	$.classes.ui.accordion = $.salvia.Class($.classes.base.list,{
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
			var item = this.onAdd(attr);
			$super(item);
			return item;
		},
		onAdd:function(attr){
			var item = new $.classes.ui.accordion.item(this.dom,attr);
			item.addListener("titleClick",function(e,activeItem){
				for(var i in e.other.list){
					if(e.other.list[i]==activeItem){continue;}
					e.other.list[i].expansion(false);
				}
			},this);
			return item;
		},
		remove:function($super,item){			
			item.dom.remove();
			return $super(item);
		},
		onRemove:function(item){
			item.destruct();
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
		sort:function(compare){
			$.sort(this.dom.find("dl"),compare);
			var s,that = this;
			this.dom.find("dl").each(function(i,n){
				for(var j in that.list)
				{
					if(that.list[j].id != $(n).attr("data-id")){continue;}
					that.list[j].dom = $(n);
					s = that.list[j];
					that.list[j] = that.list[i];
					that.list[i] = s;
				}
			});
		}
	});
	
})(jQuery);