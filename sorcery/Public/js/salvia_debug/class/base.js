;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	
	/**base(基类)**/
	$.classes.base = $.salvia.Class({
		init:function(){
			this._events = new $.classes.util.events();
		},
		binding:function(setting){
			for(var pro in setting)
			{
				if(this._data[pro]==undefined){continue;}
				if(!$.isFunction(setting[pro])){continue;}
				setting[pro].apply(this,[this._data[pro]]);
			}
		},
		datasource:function(datasource,setting){
			this._data = datasource;
			if(setting!=undefined){ this.binding(setting); }
		},
		addListener:function(key,fun){
			if(this._events.contains(key)){return "This has "+key+" listener!";}
			this._events.add(key,fun);
		}
	});
	
})(jQuery);