;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.util==undefined){ $.classes.util={}; }
	
	/**base(基类)**/
	$.classes.util.events = $.salvia.Class({
		init:function(){this.hashtable={};},
		add:function(key,value){
			if(key in this.hashtable){return false;}
			this.hashtable[key] = value;
			return true;
		},
		remove:function(key){
			return delete (this.hashtable[key]);
		},
		contains:function(key){
			return typeof (this.hashtable[key]) != "undefined";
		},
		run:function(key,runObj){//key和runObj是必需的
			//运行事件
			if(!this.contains(key)){return false};
			var arg = $.argToArray(arguments);
			arg.splice(1,2);
			return this.hashtable[key].apply(runObj,arg);
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