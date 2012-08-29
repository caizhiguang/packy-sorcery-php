;(function($){
	
	$.salvia.object.namespace("$.classes.ui");
	
	/**list(列表类)**/
	$.classes.ui.list = $.salvia.object.Class($.classes.base.list,{
		init:function($super,dom,attr){
			$super();
			$.classes.ui.base.prototype.init.apply(this,[dom,attr]);
			this._counts = {
				visible:-1,
				enable:-1,
				checked:-1
			};
		},
		add:function($super,dom,attr,to){
			if(dom==undefined){dom = $.c("li").appendTo(this.dom);}
			if(dom.length==undefined){dom = $.c("li");}
			
			to=to==undefined?0:to;
			switch(to){
				case 0:
				dom.appendTo(this.dom)
				break;
				case 1:
				dom.prependTo(this.dom)
				break;
			}
			var item = this.onCreateItem(dom,attr);
			$super(item);
			return item;
		},
		remove:function($super,item){			
			item.dom.remove();
			return $super(item);
		},
		count:function(condition){
			if(condition==undefined){
				return this.list.length;
			}else{
				try{
					return this._counts[condition];
				}catch (e) {
					return 0;
				}
			}
		},
		changeCounts:function(){
			this._counts.visible = this._counts.enable = this._counts.checked = 0;
			for(var i in this.list){
				if(this.list[i].visible()) this._counts.visible++;
				if(this.list[i].enable()) this._counts.enable++;
				if(this.list[i].checked()) this._counts.checked++;
			}
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
				if(!this.list[i].hasCheckBox() || !this.list[i].enable()){continue;}
				this.list[i].checked(true);
			}
		},
		selectInvert:function(){
			for(var i in this.list)
			{
				if(!this.list[i].hasCheckBox() || !this.list[i].enable()){continue;}
				this.list[i].checked(!this.list[i].checked());
			}
		},
		selectNone:function(){
			for(var i in this.list)
			{
				if(!this.list[i].hasCheckBox() || !this.list[i].enable()){continue;}
				this.list[i].checked(false);
			}
		},
		viewfilter:function(condition,confine){	
			switch(typeof condition)
			{
				case "boolean":
					if(!condition){
						for(var i in this.list)
						{
							this.list[i].visible(true);
						}
						break;
					}else{ return; }
				case "function":
					for(var i in this.list)
					{
						this.list[i].visible(condition.apply(this.list[i],[confine]));
					}
					break;
			}
			this.changeCounts();
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