;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.mvc==undefined){ $.classes.mvc={}; }
	
	/**mode(mvc模型基类)**/
	$.classes.mvc.mode = $.salvia.Class($.classes.base,{
		init:function($super,options,filter){
			$super();
			this.filter=filter;
			this.options={
				dataType:"xml",
				type:"POST",
				context:this,//所有方法作用域指向当前对像
				dataFilter:function(data,type){
					switch(type){
						case "json":
						case "xml":
							return $.xml2json(data);//xml转换成json
					}
				},
				complete:function(XMLHttpRequest, textStatus){
					this._events.run("complete",this,XMLHttpRequest, textStatus);
					this.onComplete(XMLHttpRequest, textStatus);
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					this._events.run("error",this,XMLHttpRequest, textStatus, errorThrown);
					this.onError(XMLHttpRequest, textStatus, errorThrown);
				},
				success:function(data){
					this.data = data;
					this.tofilter();
					this._events.run("success",this);
					this.onSuccess(data);
				}
			};
			this.options = $.extend({},this.options,options);
		},
		/**
		 @class 开始Ajax访问
		 @returns {void} 无
		 @author Packy
		 **/
		load:function(){
			var options = $.extend({},this.options);
			$.ajax(options);
		},
		/**
		 @class 过滤数据
		 @returns {void} 无
		 @author Packy
		 **/
		tofilter:function(){
			if(this.filter==undefined){return;}
			for(var pro in this.data){
				var prefix = "f_";//默认前缀是'f_'
				/*if(!$.isFunction(this.filter[prefix+pro])){//如果过滤器不是方法则直接赋值到当前mode类
					if($.isEmptyObject(this.filter[pro])||this.filter[pro]==""){
						if(this.data[pro]==undefined){continue;};
						this[pro]=$.extend($.isArray(this.data[pro])?[]:{},this.data[pro]);
					}else{
						this[pro]=this.filter[pro];
					};
					continue;
				}*/
				if(this.filter[pro]!=undefined){
					if(!$.isFunction(this.filter[pro])){continue;}
					this[prefix+pro]=this.filter[pro].apply(this,[$.extend({},this.data)]);//过滤器是方法时，运行其方法取得值并赋予当前mode类
				}else{
					this[prefix+pro]=this.data[pro];
				}
			}
		},
		
		onComplete:function(XMLHttpRequest, textStatus){},
		onError:function(XMLHttpRequest, textStatus, errorThrown){},
		onSuccess:function(data){}
	});
	
})(jQuery);