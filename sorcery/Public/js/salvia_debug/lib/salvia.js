//salvia 主要功能
;(function($){
	
	$.extend({salvia:{}});
	$.salvia.prototype = {};//只为方便可以查看类结构用，没任何意义
	
	/**==类继承============================================================================**/
	/**
	 * 例子：
	    var parent = $.salvia.Class({
			init:function(){
				this.name = "233";
			},
			callMyName:function(){
				return "My name is"+this.name;
			}
		});
		var sub = $.salvia.Class(parent,{
			callMyName:function($super){
				return $super()+"....Fuck!!!!";
			}
		});

		alert((new parent()).callMyName());
		alert((new sub()).callMyName());
	 * */
	
	//创建构造函数
	$.salvia.Class=function(){
		var parent = null, properties = $.argToArray(arguments);
        if($.isFunction(properties[0])){parent = properties.shift();}
            
        var klass = function(){
        	this.init.apply(this, arguments);
        };

        $.extend(klass,{addMethods:$.salvia.Class.addMethods});
        klass.superclass = parent;
        klass.subclasses = [];

        if(parent){
            var subclass = function() { };
            subclass.prototype = parent.prototype;
            klass.prototype = new subclass;
            parent.subclasses.push(klass);
        }

        for (var i = 0; i < properties.length; i++){
        	klass.addMethods(properties[i]);
        }
        if (!klass.prototype.init){klass.prototype.init = function(){};}
        klass.prototype.constructor = klass;
        
        return klass;
	};
	//继续所以方法
	$.salvia.Class.addMethods=function(source){
		var ancestor = this.superclass && this.superclass.prototype;
        var properties = $.keys(source);
        
        if (!$.keys({ toString: true }).length){properties.push("toString", "valueOf");}

        for (var i = 0, length = properties.length; i < length; i++) {
            var property = properties[i], value = source[property];
            if (ancestor && $.isFunction(value) && value.argumentNames()[0] == "$super") {
                var method = value;
                value = (function(m){
                    return function(){return ancestor[m].apply(this, arguments)};
                })(property).wrap(method);

                value.valueOf = method.valueOf.bind(method);
                value.toString = method.toString.bind(method);
            }
            this.prototype[property] = value;
        }

        return this;
	};
	$.salvia.Class.namespace = function(str){
		var chain,array = str.split(".");
		for(var i in array)
		{
			if(Number(i)==0){
				if(window[array[i]]==undefined){
					chain=window[array[i]]={};
				}else{
					chain = window[array[i]];
				}
			}else{
				if(chain[array[i]]==undefined){chain[array[i]]={};}
				chain = chain[array[i]];
			}
		}
		return chain;
	};
	
	//类加载
	$.salvia.Class.loadJs=function(name,path){
		if(path==undefined){path=$.salvia.DefaultClassedPath;}
		var result = false;
		$.ajax({
			url:path+name+".js",
			async:false,//关闭异步，使用同步
			type:"get",
			dataType:"script",
			success:function(data, textStatus){
				result = true;
			}
		});
		return result;
	};
	
	/**==DOM操作============================================================================**/
	$.salvia.dom = {};
	//创建DOM(jQuery DOM)
	$.salvia.dom.createDOM=function(options){
		var result = new Array();
		if($.isArray(options))
		{
			for(var i in options)
			{
				var dom = $(document.createElement(options[i]["element"]));
				result.push($.salvia.dom.flex(dom,options[i]));
			}
		}
		else if(options["element"]!=undefined){
			var dom = $(document.createElement(options["element"]));
			result.push($.salvia.dom.flex(dom,options));
		}else{
			for(var id in options)
			{
				var dom = $(document.createElement(id));
				result.push($.salvia.dom.flex(dom,options[id]));
			}
		}
		return result.length==1?result[0]:result;
		
		/*var dom;
		if(options["element"]!=undefined){dom=$(document.createElement(options["element"]));}
		return $.salvia.dom.binding(dom,options);*/
	};
	$.salvia.dom.binding=function(dom,options){
		for(var pro in options)
		{
			switch(pro)
			{
				case "element":
					break;
				case "bind":
				case "one":
				case "triggerHandler":
					for(var bind in options[pro])
					{
						dom.bind(bind,options[pro][bind]["data"],options[pro][bind]["fn"]);
					}
					break;
				case "class":
					var classes = options[pro].split(",");
					for(var i in classes)
					{
						dom.addClass(classes[i]);
					}
					break;
				case "data":
					$.salvia.dom.markData(dom,options[pro]);
					break;
				default:
					if(dom[pro]==undefined){break;}
					dom[pro](options[pro]);
					break;
			}
		}
		
		return dom;
	};
	
	$.salvia.dom.flex=function(dom,options){
		$.salvia.dom.binding(dom,options);
		if(options["actions"]==undefined){return dom;}
		for(var i in options["actions"])
		{				
			var result = dom;
			for(var action in options["actions"][i])
			{
				options["actions"][i][action]=$.isArray(options["actions"][i][action])?options["actions"][i][action]:[options["actions"][i][action]];
				result = result[action].apply(result,options["actions"][i][action]);
			}
		}
		return dom;
	};

	//设置DOM数据
	$.salvia.dom.markData=function(dom,data){
		for(var pro in data)
		{
			if($.isArray(data[pro])){continue;}
			dom.attr("data-"+pro,data[pro]);
		}
	};
	
	//复数加入DOM
	$.salvia.dom.addto=function(dom,action,array){
		for(var i in array){
			if(dom[action]==undefined){return;}
			dom[action](array[i]);
		}
	};
	
	/**==HTML包============================================================================**/
	$.salvia.packet=function(name,path){
		if(path==undefined){ path=$.salvia.DefaultPacketPath; }
		
		var packets = $(document).data("packets")==undefined?new HashTable():$(document).data("packets");
		if(packets.Contains(name)){ 
			var dom = packets.Items(name);
			return dom.clone();
		}
		var packetUrl = path+name;
		$.ajax({
			url:packetUrl,
			async:false,//关闭异步，使用同步
			type:"get",
			dataType:"text",
			success:function(data, textStatus){
				this.packets.Add(name,$(data));
			},
			packets:packets
		});
		$(document).data("packets",packets);
		return packets.Items(name).clone();
	};
	
	/**==数据操作============================================================================**/
	$.salvia.data = {};
	//数据绑定
	$.salvia.data.binding=function(scope,data,binding){
		/**
		 * mode 为数据和绑定处理的不同以做的处理的方法：
		 * 
		 * 0 数据是数组，绑定处理必需是方法（因：不做复杂处理）
		 * 1 数据是类，绑定处理是方法（整个类传入方法进行处理）
		 * 2 数据是类，绑定处理是类（绑定处理中的方法名与类的属性名相同时调用方法进行处理）
		 * 
		 * **/
		var mode = -1;
		//判断数据类型
		if($.isArray(data)){mode = 0;}
		if(typeof binding=="function"){mode += 1;}else{mode += 3;}
		
		switch(mode){
			case 0:
			case 1:
				binding.call(scope,data);
				break;
			case 2:
				for(var pro in binding){
					if(typeof binding[pro]!="function"){continue;}
					if(data[pro]==undefined){continue;}
					binding[pro].call(scope,data[pro]);
				}
				break;
		}
		return mode>=0;
	};
	//数据转换
	$.salvia.data.convert=function(data,rule){
		var result = {};
		if(typeof rule!="object"){$.error("rule is not a object");}
		for(var pro in rule)
		{
			if(data[pro]==undefined){continue;}
			result[rule[pro]] = data[pro];
		}
		result.original = data;
		return result;
	};
	
	/**==初始化============================================================================**/
	$.salvia.init=function(arg){
		for(var pro in arg)
		{
			if($.isFunction($.salvia[pro])){continue;}
			$.salvia[pro] = arg[pro];
		}
	};
	//初始化设定
	$.salvia.DefaultClassedPath = "";
	$.salvia.DefaultPacketPath = "";
	
	
	/**==jQuery扩展============================================================================**/
	$.extend({
		c:function(options){
			return $.salvia.dom.createDOM(options);
		}
	});
	$.fn.extend({
		markData:function(data){
			$.salvia.dom.markData(this,data);
		},
		binding:function(options){
			$.salvia.dom.binding(this,options);
		},
		flex:function(options){
			var dom = this;
			return $.salvia.dom.flex(dom,options);
		}
	});
})(jQuery);