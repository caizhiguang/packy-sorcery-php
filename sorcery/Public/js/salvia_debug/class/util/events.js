;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.util==undefined){ $.classes.util={}; }
	
	/**base(基类)**/
	$.classes.util.events = $.salvia.Class({
		init:function(){this.hashtable={};},
		add:function(key,fun,runObj,other){
			if(key in this.hashtable){return false;}
			this.hashtable[key] = {
				fun:fun,
				runObj:runObj,
				other:other
			};
			return true;
		},
		remove:function(key){
			return delete (this.hashtable[key]);
		},
		contains:function(key){
			return typeof (this.hashtable[key]) != "undefined";
		},
		run:function(key){//key和runObj是必需的
			//运行事件
			if(!this.contains(key)){return false};
			var arg = $.argToArray(arguments);
			arg.splice(0,1);
			if(this.hashtable[key].other!=undefined){arg.unshift({other:this.hashtable[key].other});}
			return this.hashtable[key].fun.apply(this.hashtable[key].runObj,arg);
		},
		count:function(){
			var i = 0;
			for (var k in this.hashtable){ i++; }
			return i;
		},
		clear:function(){
			for (var k in this.hashtable){ delete this.hashtable[k]; }
			return true;
		}
	});
	
})(jQuery);