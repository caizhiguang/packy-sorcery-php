;(function($){
	
	$.salvia.object.namespace("$.classes");
	
	/**base(基类)**/
	$.classes.base = $.salvia.object.Class({
		init:function(){
			this.id = $.md5($.dateToString(new Date(),"Y-M-D h:m:s.z"));
			this._data = {};
			this._binding = {};
			this._events = new $.classes.util.events();
		},
		binding:function(binding,scope,data){
			this._binding = binding;
			$.salvia.data.binding(scope==undefined?this:scope,data==undefined?this._data:data,binding);
		},
		datasource:function(datasource,setting){
			this._data = datasource;
			if(setting!=undefined){ this.binding(setting); }
			this.onDatasource(datasource);
		},
		addListener:function(key,fun,data){
			this._events.add(key,fun,this,data);
		},
		removeListener:function(key,fun){
			this._events.remove(key,fun);
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