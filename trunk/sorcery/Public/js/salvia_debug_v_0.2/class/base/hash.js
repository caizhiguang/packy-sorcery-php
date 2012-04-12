;(function($){
	
	$.salvia.object.namespace("$.classes");
	
	/**list(列表基类)**/
	$.classes.base.hash = $.salvia.object.Class($.classes.base,{
		init:function($super){
			$super();
			this.hashtable = [];
		},
		add:function(key,item){
			$.hash.add(this.hashtable,key,item);
			this.onAdded(key,item);
		},
		remove:function(key){
			var result = $.list.remove(this.hashtable,key);
			this.onRemoved(result);
			return result;
		},
		count:function(){
			return $.hash.count(this.hashtable);
		},
		items:function(key){
			return this.hashtable[key];
		},
		contains:function(key){
			return $.hash.contains(this.hashtable,key);
		},
		clear:function(){
			return $.hash.clear(this.hashtable);
		},
		onAdded:function(item){},
		onRemoved:function(item){},
		
		destruct:function($super){
			for(var key in this.hashtable)
			{
				if(this.hashtable[key]["destruct"]==undefined){continue;}
				this.hashtable[key].destruct();
			}
			$super();
		}
	});
	
})(jQuery);