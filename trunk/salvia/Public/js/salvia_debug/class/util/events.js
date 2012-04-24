;(function($){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.util==undefined){ $.classes.util={}; }
	
	/**base(基类)**/
	$.classes.util.events = $.salvia.Class({
		init:function(){this.hashtable={};},
		add:function(key,fun,scope,other){
			if(!(key in this.hashtable)){this.hashtable[key]=[];}
			this.hashtable[key].push({
				fun:fun,
				scope:scope,
				other:other
			});
			return true;
		},
		remove:function(key,fun){
			//this.hashtable[key]=null;
			if(!(key in this.hashtable)){return false;}
			var removeItem;
			for(var i in this.hashtable[key])
			{
				if(this.hashtable[key][i].fun==fun){removeItem=this.hashtable[key][i];}
			}
			if(removeItem==undefined){removeItem=this.hashtable[key][this.hashtable[key].length-1];}
			return $.list.remove(this.hashtable[key],removeItem);
		},
		contains:function(key){
			return typeof (this.hashtable[key]) != "undefined";
		},
		run:function(key){//key和runObj是必需的
			//运行事件
			if(!this.contains(key)){return true};
			var arg = $.argToArray(arguments);
			arg.splice(0,1);
			
			var result;
			for(var i in this.hashtable[key])
			{
				if(this.hashtable[key][i].other!=undefined){arg.unshift({other:this.hashtable[key][i].other});}
				result = this.hashtable[key][i].fun.apply(this.hashtable[key][i].scope,arg);
				if(result==false){return result;}
			}
			
			//var result = this.hashtable[key].fun.apply(this.hashtable[key].scope,arg);
			return result==undefined?true:result;
		},
		count:function(){
			var i = 0;
			for (var k in this.hashtable){ i++; }
			return i;
		},
		clear:function(){
			for (var k in this.hashtable){ this.hashtable[k]=null; delete this.hashtable[k]; }
			return true;
		}
	});
	
})(jQuery);