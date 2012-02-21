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
		};
		HashTable.prototype.Remove = function(key) {
			this._hashtable[key] = null;
			return delete (this._hashtable[key]);
		};
		HashTable.prototype.Count = function() {
			var i = 0;
			for (var k in this._hashtable){ i++; }
			return i;
		};
		HashTable.prototype.Items = function(key) {
			return this._hashtable[key];
		};
		HashTable.prototype.Clear = function() {
			for (var k in this._hashtable){ delete this._hashtable[k]; }
			return true;
		};
		HashTable.prototype.Contains = function(key) {
			return typeof (this._hashtable[key]) != "undefined";
		};
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
	/*$.extend(Array.prototype,{
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
	});*/
	
	
	
	
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
})(jQuery);