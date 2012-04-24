;(function($){
	
	if($.classes==undefined){ $.classes={}; }
	
	/**list(列表基类)**/
	$.classes.base.list = $.salvia.Class($.classes.base,{
		init:function($super){
			$super();
			this.list = [];
		},
		add:function(item){
			$.list.add(this.list,item);
			this.onAdded(item);
		},
		remove:function(item){
			var result = $.list.remove(this.list,item);
			this.onRemoved(item);
			return result;
		},
		count:function(){
			return this.list.length;
		},
		items:function(key){
			return this.list[key];
		},
		contains:function(item){
			return $.list.indexOf(this.list,item)!=-1;
		},
		clear:function(){
			this.list=[];
		},
		onAdded:function(item){},
		onRemoved:function(item){},
		
		destruct:function($super){
			for(var i in this.list)
			{
				if(this.list[i]["destruct"]==undefined){continue;}
				this.list[i].destruct();
			}
			$super();
		}
	});
	
})(jQuery);