;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	
	/**base(基类)**/
	$.classes.base = $.salvia.Class({
		init:function(){
			this.id = $.md5((new Date()).ToString());
			this._data = {};
			this._events = new $.classes.util.events();
		},
		binding:function(setting){
			if($.isFunction(setting)){
				setting.apply(this,[this._data]);
			}else{
				for(var pro in setting)
				{
					if(this._data[pro]==undefined){continue;}
					if(!$.isFunction(setting[pro])){continue;}
					setting[pro].apply(this,[this._data[pro]]);
				}
			}
		},
		datasource:function(datasource,setting){
			this._data = datasource;
			if(setting!=undefined){ this.binding(setting); }
			this.onDatasource(datasource);
		},
		addListener:function(key,fun,other){
			if(this._events.contains(key)){return "This has "+key+" listener!";}
			this._events.add(key,fun,this,other);
		},
		onDatasource:function(datasource){},
		
		destruct:function(){
			//自销毁
			for(var i in this)
			{
				this[i] = null;
				delete this[i]
			}
		}
	});
	
})(jQuery);