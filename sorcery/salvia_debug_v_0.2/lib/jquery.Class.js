;(function($){
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
	$.extend({
		keys:function(source){
			var result = new Array();
			for(var i in source){
				result.push(i);
			}
			return result;
		},
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
		Class:function(){
			var parent = null, properties = $.argToArray(arguments);
	        if($.isFunction(properties[0])){parent = properties.shift();}
	            
	        var klass = function(){
	        	this.init.apply(this, arguments);
	        };
	
	        $.extend(klass,{addMethods:$.addMethods});
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
	});
	
})(jQuery);