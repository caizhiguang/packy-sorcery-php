;(function($){
	
	$.salvia.object.namespace("$.classes.util");
	
	/**base(基类)**/
	$.classes.util.events = $.salvia.object.class({
		init:function(){this.hashtable={};},
		add:function(key,fun,scope,data){
			if(!$.hash.contains(this.hashtable,key)){this.hashtable[key]={};}
			
			var subKey = $.md5(fun);
			if(!$.hash.contains(this.hashtable,subKey)){
				this.hashtable[key][subKey] = {
					fun:fun,
					scope:scope,
					data:data
				};
			}
			
			return true;
		},
		remove:function(key,fun){
			if(!$.hash.contains(this.hashtable,key)){return false;}
			
			var removeItem,subKey = $.md5(fun);
			if($.hash.contains(this.hashtable,subKey)){
				removeItem = $.hash.remove(this.hashtable[key],subKey);
			}
			return removeItem;			
		},
		contains:function(key,fun){
			return fun!=undefined?$.hash.contains(this.hashtable[key],$.md5(fun)):$.hash.contains(this.hashtable,key);
		},
		run:function(key){//key和runObj是必需的
			//运行事件
			if(!this.contains(key)){return;}
			var result,arg = $.argToArray(arguments);
			arg.splice(0,1);
			for(var subKey in this.hashtable[key])
			{
				var event = {data:this.hashtable[key][subKey].data,target:this.hashtable[key][subKey].scope};
				arg.unshift(event);
				result = this.hashtable[key][subKey].fun.apply(this.hashtable[key][subKey].scope,arg);
				return result;
			}
		},
		clear:function(){
			for(var key in this.hashtable)
			{
				if($.hash.count(this.hashtable[key])<=0){continue;}
				$.hash.clear(this.hashtable[key]);
			}
			$.hash.clear(this.hashtable);
		},
		destruct:function(){
			//自销毁
			for(var i in this)
			{
				if(this[i]!=undefined){
					if(this[i]["destruct"]!=undefined){this[i].destruct();}
				}
				this[i] = null;
				delete this[i]
			}
		}
	});
	
})(jQuery);