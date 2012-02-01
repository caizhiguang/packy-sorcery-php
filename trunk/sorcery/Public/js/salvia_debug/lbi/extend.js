//扩展库
function HashTable(){
	this._hashtable = new Object();
	if (typeof (_hashtable_initialized) == "undefined") {
		HashTable.prototype.Add = function(key, value) {
		if (key in this._hashtable) {
			return false;
		}
		this._hashtable[key] = value;
			return true;
		}
		HashTable.prototype.Remove = function(key) {
			return delete (this._hashtable[key]);
		}
		HashTable.prototype.Count = function() {
			var i = 0;
			for (var k in this._hashtable){ i++; }
			return i;
		}
		HashTable.prototype.Items = function(key) {
			return this._hashtable[key];
		}
		HashTable.prototype.Clear = function() {
			for (var k in this._hashtable){ delete this._hashtable[k]; }
			return true;
		}
		HashTable.prototype.Contains = function(key) {
			return typeof (this._hashtable[key]) != "undefined";
		}
		_hashtable_initialized = true;
	}
};


;(function($){
	/**==Date.extend===================================================================**/
	$.extend(Date.prototype,{
		ToString:function(){
			return this.getFullYear()+"-"+(this.getMonth()+1)+"-"+this.getDate()+" "+this.getHours()+":"+this.getMinutes()+":"+this.getSeconds()+"."+this.getMilliseconds();
		}
	});
	
	
	
	
	/**==Array.extend===================================================================**/
	$.extend(Array.prototype,{
		first:function(){
        	return this[0];
    	},
    	indexOf:function(item){
    		for(var i in this)
    		{
    			if(item==this[i]){return i;}
    		}
    		return -1;
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
		}
	});
})(jQuery);