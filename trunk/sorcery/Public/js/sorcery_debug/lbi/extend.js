//扩展库
;(function($){
	/**==Array.extend===================================================================**/
	$.extend(Array.prototype,{
		first: function() {
        	return this[0];
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
		    var __method = this, args = $.objToArray(arguments), object = args.shift();
		    return function() {
		        return __method.apply(object, args.concat($.objToArray(arguments)));
		    };
		},
		wrap:function(wrapper){
		    var __method = this;
		    return function(){
		        return wrapper.apply(this, [__method.bind(this)].concat($.objToArray(arguments)));
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
        objToArray:function(obj){
        	var result = [];
        	for(var pro in obj){
        		result.push(obj[pro]);
        	}
        	return result;
        },
        keys:function(source){
			var result = new Array();
			for(var i in source){
				result.push(i);
			}
			return result;
		}
	});
})(jQuery);