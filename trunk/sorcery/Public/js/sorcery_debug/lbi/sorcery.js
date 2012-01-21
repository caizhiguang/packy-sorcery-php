
Object.toArray=function(){
	var array = new Array();
	for(var i in this){
		array.push(this[i]);
	}
	return array;
};
Object.addMethods=function(source){
	var ancestor = this.superclass && this.superclass.prototype,
    properties = this.keys(); //以Array形式返回source对象的所有属性

	// IE6 for循环不能迭代`toString`和`valueOf`方法 (包括其他`Object.prototype`内建方法),
	// 如果不能迭代则强制拷贝.
	// 不拷贝其他内建方法（Object.prototype.*）是因为效率
	if (IS_DONTENUM_BUGGY) {
	  if (this.toString != Object.prototype.toString)
	    properties.push("toString");
	  if (this.valueOf != Object.prototype.valueOf)
	    properties.push("valueOf");
	}
	
	for (var i = 0, length = properties.length; i < length; i++) {
	  var property = properties[i], value = this[property]; //取得属性与值
	  if (ancestor && typeof(value)=="function" && value.argumentNames()[0] == "$super") { //如果有父类，且属性的值是函数，且第一个参数是$super
	    var method = value;
	    value = (function(m) {
	      return function() { return ancestor[m].apply(this, arguments); }; //调用父类相同名字的函数
	    })(property).wrap(method); //包装
	
	    value.valueOf = method.valueOf.bind(method);
	    value.toString = method.toString.bind(method);
	  }
	  this.prototype[property] = value; //添加到klass.prototype上使其能被klass的对象访问到
	}
	
	return this;
};
Object.keys=function(){
	var result = new Array();
	for(var i in this){
		result.push(i);
	}
	return result;
};

;(function($){
	
	/**jQuery.extend**/
	$.extend({
		isFun:function(fun){
			return typeof(fun)=="function";
		}
	});
	
	$.extend({sorcery:{}});
	$.sorcery.prototype = {};//只为方便可以查看类结构用，没任何意义
	
	$.sorcery.class=function(){
		var properties = arguments.toArray();
		//生成原型
		var org = function(){
			this.init.apply(this,arguments);
		};
		
		if($.isFun(properties[0])){
			//父类继承
			var parent = properties[0];
			subclass.prototype = parent.prototype;//？
			klass.prototype = new subclass;
			parent.subclasses.push(klass);
		}
	};
	$.sorcery.class.create=function(){
		
	};
})(jQuery);