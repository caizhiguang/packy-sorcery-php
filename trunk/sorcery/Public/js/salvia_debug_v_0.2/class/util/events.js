;(function($){
	
	$.salvia.object.namespace("$.classes.util");
	
	/**base(基类)**/
	$.classes.util.events = $.salvia.object.Class({
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
		run:function(key){
			//运行事件
			if(!this.contains(key)){return;}
			
			var result,scope,arg=$.argToArray(arguments);
			/*if($.isArray(scope)){
				arg.splice(0,1);scope=null;
			}else{
				arg.splice(0,2);scope = scope;
			}*/
			arg.splice(0,1);
			
			for(var subKey in this.hashtable[key])
			{
				if(scope==undefined){scope=this.hashtable[key][subKey].scope;}
				var event = {
					data:this.hashtable[key][subKey].data,
					target:scope
				};
				var _arg = [].concat([],event,arg);
				result = this.hashtable[key][subKey].fun.apply(scope,_arg);
				if((!result) && result!=undefined)return result;
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