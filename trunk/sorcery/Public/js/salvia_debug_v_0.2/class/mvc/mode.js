;(function($){
	
	$.salvia.object.namespace("$.classes.mvc");
	
	/**mode(mvc模型基类)**/
	$.classes.mvc.mode = $.salvia.object.Class($.classes.base,{
		init:function($super,options,filter){
			$super();
			this.filter=filter;
			this.options={
				dataType:"xml",
				type:"POST",
				//context:this,//所有方法作用域指向当前对像
				dataFilter:function(data,type){
					switch(type){
						case "xml":
							return $.xml2json(data);//xml转换成json
						default:
							return data;
					}
				},
				beforeSend:function(XHR){
					this.mode.onBeforeSend(this,XHR);
				},
				complete:function(XMLHttpRequest, textStatus){
					this.mode._events.run("complete",this,XMLHttpRequest, textStatus);
					this.mode.onComplete(this,XMLHttpRequest, textStatus);
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					this.mode._events.run("error",this,XMLHttpRequest, textStatus, errorThrown);
					this.mode.onError(this,XMLHttpRequest, textStatus, errorThrown);
				},
				success:function(data){
					this.mode.datasource(data);
					this.mode.tofilter();
					this.mode._events.run("success",this,this.mode.returnData==undefined?data:this.mode.returnData);
					this.mode.onSuccess(this.mode.returnData==undefined?data:this.mode.returnData,this);
				},
				mode:this
			};
			this.options = $.extend({},this.options,options);
		},
		/**
		 @class 开始Ajax访问
		 @returns {void} 无
		 @author Packy
		 **/
		load:function(options){
			var options = $.extend({},options,this.options);
			options._data = $.extend({},{},options.data);
			$.ajax(options);
		},
		/**
		 @class 过滤数据
		 @returns {void} 无
		 @author Packy
		 **/
		tofilter:function(){
			if(this.filter==undefined){return;}
			this.returnData = {};
			
			if($.isFunction(this.filter))
			{
				this.returnData = this.filter.call(this,$.extend(true,{},this._data));
			}else{
				for(var pro in this._data){
					var prefix = "";//默认前缀是''
					if(this.filter[pro]!=undefined){
						if(!$.isFunction(this.filter[pro])){continue;}
						this.returnData[prefix+pro]=this.filter[pro].apply(this,[$.extend(true,{},this._data)]);//过滤器是方法时，运行其方法取得值并赋予当前mode类
					}else{
						this.returnData[prefix+pro]=this._data[pro];
					}
				}
			}
		},
		
		onBeforeSend:function(ajax_options,XHR){},
		onComplete:function(ajax_options,XMLHttpRequest, textStatus){},
		onError:function(ajax_options,XMLHttpRequest, textStatus, errorThrown){},
		onSuccess:function(data,ajax_options){},
		
		request:function(){
			var arg = $.argToArray(arguments);
			var controllers = $(document).data("Controllers");
			var ctrl,method,args,ctrlName;
			ctrlName = arg[0];
			ctrl = controllers[ctrlName];
			method = arg[1];
			args = arg[2];
			
			if(ctrl==undefined){$.error("No find "+ctrlName);return false;}
			if(ctrl[method]==undefined){$.error("No find "+ctrlName+"."+method);return false;}
			if($.isFunction(ctrl[method])){
				try{
					return ctrl[method].apply(ctrl,args==undefined?[]:args);
				}catch(e){
					$.error(e.message);
				}
			}else{
				return ctrl[method];
			}
		}
	});
	
})(jQuery);