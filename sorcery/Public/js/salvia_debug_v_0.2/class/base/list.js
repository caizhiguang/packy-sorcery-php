;(function($){
	
	$.salvia.object.namespace("$.classes");
	
	/**list(列表基类)**/
	$.classes.base.list = $.salvia.object.class($.classes.base,{
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
			this.onRemoved(result);
			return result;
		},
		count:function(){
			return this.list.length;
		},
		items:function(key){
			return this.list[key];
		},
		contains:function(item){
			return $.list.contains(this.list,item);
		},
		clear:function(){
			return $.list.clear(this.list);
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