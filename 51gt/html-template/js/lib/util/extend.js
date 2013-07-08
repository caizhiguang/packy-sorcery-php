!function($){

	var extend = {
		isFunction:function(fun){
			return typeof(fun)=="function";
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
		isUndefined: function(object) {
			return typeof(object) == "undefined";
		},
		argumentNames:function(fun) {
			var names = fun.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
			return names.length == 1 && !names[0] ? [] : names;
		},
		dateToString:function(date,format){
			var result = format==undefined?"Y-M-D h:m:s":format;

			var dateArray = [
				String(date.getFullYear()),
				String(date.getMonth()+1),
				String(date.getDate()),
				String(date.getHours()),
				String(date.getMinutes()),
				String(date.getSeconds()),
				String(date.getMilliseconds())
			];

			result = result.replace(/Y/,dateArray[0]);
			result = result.replace(/M/,dateArray[1].length>=2?dateArray[1]:'0'+dateArray[1]);
			result = result.replace(/D/,dateArray[2].length>=2?dateArray[2]:'0'+dateArray[2]);
			result = result.replace(/h/,dateArray[3].length>=2?dateArray[3]:'0'+dateArray[3]);
			result = result.replace(/m/,dateArray[4].length>=2?dateArray[4]:'0'+dateArray[4]);
			result = result.replace(/s/,dateArray[5].length>=2?dateArray[5]:'0'+dateArray[5]);
			result = result.replace(/z/,dateArray[6].length>=2?dateArray[6]:'0'+dateArray[6]);
			return result;
		},
		stringToDate:function(str){
			var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})(.(\d{1,3}))*$/;
			var r = str.match(reg);
			if(r==null) return false;
			var d = new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7],r[9]==undefined?"0":r[9]);
			return d;
		},
		selection:function(){
			if (window.getSelection) { 
				//现代浏览器
				return window.getSelection();
			} else if (document.selection) { 
				//IE浏览器 考虑到Opera，应该放在后面
				return document.selection.createRange();
			}
		},
		selectionText:function(){
			var userSelection = this.selection(), text;
			if (!(text = userSelection.text)) {
				text = userSelection;
			}
			return text;
		}
	};
	var _ = window._;
	_ = _?$.extend(_,extend):extend;
	

	$.extend({
		libs:{},
		lib:function(name,_class){
			if(_class==undefined){
				return $.libs[name];
			}

			$.libs[name] = _class;
		},
		objectExtend:function(){
			var parent = null, properties = _.argToArray(arguments);
			if(_.isFunction(properties[0])){parent = properties.shift();}

			var klass = function(){
				this.initialize.apply(this, arguments);
			};

			$.extend(klass,{addMethods:$.addMethods});
			klass.superclass = parent;
			klass.subclasses = [];
			klass.extend = this.objectExtend;

			if(parent){
				var subclass = function() { };
				subclass.prototype = parent.prototype;
				klass.prototype = new subclass;
				parent.subclasses.push(klass);
			}

			for (var i = 0; i < properties.length; i++){
				klass.addMethods(properties[i]);
			}
			if (!klass.prototype.initialize){klass.prototype.initialize = function(){};}
			klass.prototype.constructor = klass;

			return klass;
		},
		addMethods:function(source){
			var ancestor = this.superclass && this.superclass.prototype;
			var properties = _.keys(source);

			if (!_.keys({ toString: true }).length){properties.push("toString", "valueOf");}

			for (var i = 0, length = properties.length; i < length; i++) {
				var property = properties[i], value = source[property];
				if (ancestor && _.isFunction(value) && _.argumentNames(value)[0] == "$super") {
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
		}
	});

}(jQuery);