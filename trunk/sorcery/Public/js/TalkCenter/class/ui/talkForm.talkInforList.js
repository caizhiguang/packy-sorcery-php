;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.ui==undefined){ $.classes.ui={}; }
	
	/**talkForm.talkInforList**/
	$.classes.ui.talkForm.talkInforList = $.salvia.Class($.classes.base.list,{
		init:function($super,dom){
			$super();
			(new $.classes.ui.base()).init.apply(this,[dom]);
			this.limit = 20;
			this.showlist = [];
			this.canScroll = true;
			this.dom.hover($.proxy(function(){this.canScroll=false;},this),$.proxy(function(){this.canScroll=true;},this));
		},
		onAdded:function(item){
			this.dom.append(item.dom);
			this.runFilter(this._runFilter);
			this.clearSpilth();
		},
		onRemoved:function(item){
			item.dom.remove();
		},
		clearSpilth:function(){
			var index = 0;
			for(var i=this.list.length-1;i>=0;--i)
			{
				++index;
				if(index>this.limit){
					this.list[i].dom.remove();
				}
			}
		},
		filter:function(val,keys){
			this._runFilter = val;
			this.filterKeys = keys;
			this.runFilter(this._runFilter);
		},
		runFilter:function(on){
			if(!on){
				for(var j in this.list)
				{
					this.dom.append(this.list[j].dom);
				}
				this.scrollToBottom(this.canScroll);
				return;
			}
			if(this.filterKeys==undefined){return;}
			this.dom.html("");
			for(var i in this.filterKeys)
			{
				for(var j in this.list)
				{
					if(this.filterKeys[i]==this.list[j].id){
						this.dom.append(this.list[j].dom);
					}
				}
			}
			this.scrollToBottom(this.canScroll);
		},
		scrollToBottom:function(canScroll){
			if(!canScroll){return;}
			this.dom.scrollTop(this.dom[0].scrollHeight);
		}
	});
	
})(jQuery);