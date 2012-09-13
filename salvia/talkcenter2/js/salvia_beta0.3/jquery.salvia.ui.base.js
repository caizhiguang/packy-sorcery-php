!function($){
	
	$.salvia.object.namespace("$.salvia.ui");
	
	/**ui.base(可视基类)**/
	$.salvia.ui.base = $.salvia.object.Class({
		init:function(dom,attr){
			this.dom = dom;
			// this.dom.attr('data-id',$.dateToString(new Date(),"YMDhmsz"));
			if(attr!=undefined){
				for(var method in attr){
					if(this[method]==undefined) continue;
					if(typeof(this[method])!='function') continue;
					if(typeof(attr[method])=='string'&&attr[method].lenght==0){
						this[method].cell(this);
						continue;	
					}
					this[method].apply(this,attr[method]);
				}
			}
		},

		/**=[attr]==================================================================================**/

		enable:function(val){
			if(val == undefined){
				return this.dom.attr('data-enable');
			}else{
				this.dom.attr('data-enable',val);
				this.onEnable(val);
			}
		},
		onEnable:function(val){},

		visible:function(val){
			if(val == undefined){
				this.onVisible(val);
				return this.dom.attr('data-visible');
			}else{
				this.dom.attr('data-visible',val);
			}
		},
		onVisible:function(val){},

		/**=[attr]==================================================================================**/






		/**=[method]==================================================================================**/

		binding:function(binding,scope,data){
			this._binding = binding;
			$.salvia.data.binding(scope==undefined?this:scope,data==undefined?this._data:data,binding);
		},
		datasource:function(datasource,setting){
			if(datasource==undefined){
				return $.evalJSON(this.dom.data('datasource'));
			}else{
				this._data = datasource;
				this.dom.data('datasource',$.toJSON(datasource));
				if(setting!=undefined){ this.binding(setting); }
				this.onDatasource(datasource);
			}
		},
		onDatasource:function(datasource){
			this.dom.trigger('onDatasourceChanged',datasource);
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

			try{
				if(CollectGarbage!=undefined) CollectGarbage();//只适用于IE系列，用于释放内存
			}catch(e){}
		}

		/**=[method]==================================================================================**/
	});
	
}(jQuery);
