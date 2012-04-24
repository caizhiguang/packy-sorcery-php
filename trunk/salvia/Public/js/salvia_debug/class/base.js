;(function($){
	
	if($.classes==undefined){ $.classes={}; }
	
	/**base(基类)**/
	$.classes.base = $.salvia.Class({
		init:function(){
			this.id = $.md5((new Date()).ToString());
			this._data = {};
			this._events = new $.classes.util.events();
		},
		binding:function(binding){
			/*if($.isFunction(setting)){
				setting.apply(this,[this._data]);
			}else{
				for(var pro in setting)
				{
					if(this._data[pro]==undefined){continue;}
					if(!$.isFunction(setting[pro])){continue;}
					setting[pro].apply(this,[this._data[pro]]);
				}
			}*/
			$.salvia.data.binding(this,this._data,binding);
		},
		datasource:function(datasource,setting){
			this._data = datasource;
			if(setting!=undefined){ this.binding(setting); }
			this.onDatasource(datasource);
		},
		addListener:function(key,fun,other){
			this._events.add(key,fun,this,other);
		},
		removeListener:function(key){
			this._events.remove(key);
		},
		onDatasource:function(datasource){},
		
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