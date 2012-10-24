!function($){
	
	$.salvia.object.namespace("$.salvia.ui");
	
	/**ui.base(可视基类)**/
	$.salvia.ui.base = $.salvia.object.Class({
		/**初始化**/

		/**
		 * 初始化
		 * @param  {DOM} dom  DOM对像
		 * @param  {json} attr 初始化属性值
		 */
		init:function(dom,attr){
			this.dom(dom);
		},
		initAttr:function(attr){
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
		/**
		 * 序列化属性(于DOM对象中取得属性值)
		 */
		serializeAttr:function(){
			var attr = this._dom[0].attributes;
			for (var i = 0; i < attr.length; i++) {
				var attrName = attr[i].name;
				if(attrName.indexOf('data-')<=-1) continue;
				var method = '_on' + attrName.substr(5,1).toUpperCase() + attrName.substr(6,attrName.length-6);
				if(this[method]==undefined) continue;
				this[method](attr[i].value);
			};
		},



		/**属性**/

		/**
		 * 可使用
		 * @param  {boolean} val true/false
		 * @return {boolean}
		 */
		enable:function(val){
			if(val == undefined){
				return this._dom.attr('data-enable');
			}else{
				this._dom.attr('data-enable',val);
				this._onEnable(val);
			}
		},
		_onEnable:function(val){},

		/**
		 * 可视化
		 * @param  {boolean} val true/false
		 * @return {boolean}
		 */
		visible:function(val){
			if(val == undefined){
				return this._dom.attr('data-visible');
			}else{
				this._dom.attr('data-visible',val);
				this._onVisible(val);
			}
		},
		_onVisible:function(val){},

		/**
		 * DOM对象
		 * @param  {DOM} val DOM对象
		 * @return {DOM}
		 */
		dom:function(val){
			if(val == undefined){
				return this._dom;
			}else{
				this._dom = val;
				this._onDom(val);
			}
		},
		_onDom:function(val){},



		/**方法**/

		/**
		 * 数据绑定方法
		 * @param  {json} binding 绑定用方法
		 * @param  {object} scope   绑定用方法中方法的作用域
		 * @param  {json} data    数据内容
		 */
		binding:function(binding,scope,data){
			this._binding = binding;
			$.salvia.data.binding(scope==undefined?this:scope,data==undefined?this._data:data,binding);
		},
		/**
		 * 初始化数据方法
		 * @param  {json} datasource 数据内容
		 * @param  {json} setting    绑定用方法
		 * @return {json} 数据内容
		 */
		datasource:function(datasource,setting){
			if(datasource==undefined){
				return $.evalJSON(this._dom.data('datasource'));
			}else{
				this._data = datasource;
				this._dom.data('datasource',$.toJSON(datasource));
				if(setting!=undefined){ this.binding(setting); }
				this.onDatasource(datasource);
			}
		},
		onDatasource:function(datasource){
			this._dom.trigger('onDatasourceChanged',datasource);
		},
		/**
		 * 自销毁
		 */
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
	});
	
}(jQuery);
