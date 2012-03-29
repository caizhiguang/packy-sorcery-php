;(function($){
	
	/**==Date.extend===================================================================**/
	$.extend(Date.prototype,{
		ToString:function(){
			return this.getFullYear()+"-"+(this.getMonth()+1)+"-"+this.getDate()+" "+this.getHours()+":"+this.getMinutes()+":"+this.getSeconds()+"."+this.getMilliseconds();
		}
	});
	/**==Function.extend===================================================================**/
	$.extend(Function.prototype,{
		argumentNames:function() {
		    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
		    return names.length == 1 && !names[0] ? [] : names;
		},
		bind:function(){
		    if (arguments.length < 2 && $.isUndefined(arguments[0])) return this;
		    var __method = this, args = $.argToArray(arguments), object = args.shift();
		    return function() {
		        return __method.apply(object, args.concat($.argToArray(arguments)));
		    };
		},
		wrap:function(wrapper){
		    var __method = this;
		    return function(){
		        return wrapper.apply(this, [__method.bind(this)].concat($.argToArray(arguments)));
		    };
		}
	});
	/**==jQuery.extend===================================================================**/
	$.extend({
		isFunction:function(fun){
			return typeof(fun)=="function";
		},
		isUndefined: function(object) {
            return typeof(object) == "undefined";
        },
        argToArray:function(arg){
        	if(!arg) return [];
        	var result = [],length = arg.length || 0;
        	while (length--) result[length] = arg[length];
        	return result;
        },
        keys:function(source){
			var result = new Array();
			for(var i in source){
				result.push(i);
			}
			return result;
		},
        getRootPath:function(){
			var strFullPath=window.document.location.href;
			var strPath=window.document.location.pathname;
			var pos=strFullPath.indexOf(strPath);
			var prePath=strFullPath.substring(0,pos);
			var postPath="";
			return(prePath+postPath);
		},
		list:{
			add:function(list,item){
				list.push(item);
			},
			remove:function(list,item){
				return list.splice(this.indexOf(list, item),1);
			},
			count:function(list){
				return list.length;
			},
			contains:function(list,item){
				return this.indexOf(list,item)!=-1;
			},
			clear:function(list){
				list=[];
			},
			indexOf:function(list,item){
				for(var i in list)
	    		{
	    			if(item==list[i]){return i;}
	    		}
	    		return -1;
			}
		},
		bubbleSort:function (arr,compare) { //交换排序->冒泡排序
			//var st = new Date();
			var temp;
			var exchange;
			for(var i=0; i<arr.length; i++) {
				exchange = false;
				for(var j=arr.length-2; j>=i; j--) {
					if(compare(arr[j+1],arr[j])>0){
						temp = arr[j+1];
						arr[j+1] = arr[j];
						arr[j] = temp;
						exchange = true;
					}
				}
				if(!exchange) break;
			}
			//status = (new Date() - st) + ' ms';
			return arr;
		},
		sort:function (arr,compare) { //交换排序->冒泡排序
			//var st = new Date();
			var temp;
			var exchange;
			for(var i=0; i<arr.length; i++) {
				exchange = false;
				for(var j=arr.length-2; j>=i; j--) {
					if(compare(arr[j+1],arr[j])>0){
						temp = $(arr[j+1]).clone(true);
						temp.insertBefore(arr[j]);
						$(arr[j+1]).remove();
						arr[j+1] = arr[j];
						arr[j] = temp;
						exchange = true;
					}
				}
				if(!exchange) break;
			}
			//status = (new Date() - st) + ' ms';
			return arr;
		}
	});
	/**==salvia.extend===================================================================**/
	$.extend({
		//salvia扩展类
		salvia:{
			//DOM
			dom:{
				create:function(options){
					var result = new Array();
					if(typeof options=="string"){
						return $(document.createElement(options));
					}else if($.isArray(options))
					{
						for(var i in options)
						{
							result.push($(document.createElement(options[i]["element"])));
						}
					}
					else if(options["element"]!=undefined){
						result.push($(document.createElement(options["element"])));
					}else{
						for(var id in options)
						{
							result.push($(document.createElement(id)));
						}
					}
					return result.length==1?result[0]:result;
				}
			},
			//Object
			object:{
				class:function(){
					var parent = null, properties = $.argToArray(arguments);
			        if($.isFunction(properties[0])){parent = properties.shift();}
			            
			        var klass = function(){
			        	this.init.apply(this, arguments);
			        };

			        $.extend(klass,{addMethods:$.salvia.object.addMethods});
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
				},
				addMethods:function(source){
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
				},
				namespace:function(str){
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
				}
			},
			//Data
			data:{
				binding:function(scope,data,binding){
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
				},
				//数据转换
				convert:function(data,rule){
					var result = {};
					if(typeof rule!="object"){$.error("rule is not a object");}
					for(var pro in rule)
					{
						if(data[pro]==undefined){continue;}
						result[rule[pro]] = data[pro];
					}
					result.original = data;
					return result;
				}
			},
			//Util
			load:function(path){
				var result = false;
				
				var ajax_load_list = $(document).data("ajax_load_list")==undefined?[]:$(document).data("ajax_load_list");
				ajax_load_list.push(path);
				$(document).data("ajax_load_list",ajax_load_list);
				
				$.ajax({
					url:path,
					async:false,//关闭异步，使用同步
					type:"get",
					dataType:"script",
					success:function(data, textStatus){
						result = true;
					}
				});
				return result;
			}
		}
	});
	
})(jQuery);