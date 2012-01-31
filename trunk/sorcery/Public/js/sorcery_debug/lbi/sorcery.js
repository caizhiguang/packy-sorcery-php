//sorcery 主要功能
;(function($){
	
	$.extend({sorcery:{}});
	$.sorcery.prototype = {};//只为方便可以查看类结构用，没任何意义
	
	/**==类继承============================================================================**/
	/**
	 * 例子：
	    var parent = $.sorcery.class({
			init:function(){
				this.name = "233";
			},
			callMyName:function(){
				return "My name is"+this.name;
			}
		});
		var sub = $.sorcery.class(parent,{
			callMyName:function($super){
				return $super()+"....Fuck!!!!";
			}
		});

		alert((new parent()).callMyName());
		alert((new sub()).callMyName());
	 * */
	//创建构造函数
	$.sorcery.class=function(){
		var parent = null, properties = $.objToArray(arguments);
        if ($.isFunction(properties[0])){parent = properties.shift();}
            
        var klass = function(){
        	this.init.apply(this, arguments);
        };

        $.extend(klass,{addMethods:$.sorcery.class.addMethods});
        klass.superclass = parent;
        klass.subclasses = [];

        if (parent) {
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
	$.sorcery.class.addMethods=function(source){
		var ancestor = this.superclass && this.superclass.prototype;
        var properties = $.keys(source);
        
        if (!$.keys({ toString: true }).length){properties.push("toString", "valueOf");}

        for (var i = 0, length = properties.length; i < length; i++) {
            var property = properties[i], value = source[property];
            if (ancestor && $.isFunction(value) && value.argumentNames().first() == "$super") {
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
})(jQuery);