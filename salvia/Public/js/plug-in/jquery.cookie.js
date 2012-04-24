;(function($){
	$.cookie = function(name, value, options) {
		if (typeof value != 'undefined') { // name and value given, set cookie
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
			}
			var path = options.path ? '; path=' + options.path : '';
			var domain = options.domain ? '; domain=' + options.domain : '';
			var secure = options.secure ? '; secure' : '';
			
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		} else { // only name given, get cookie
			
			var cookie_start = document.cookie.indexOf(name);
			var cookie_end = document.cookie.indexOf(";", cookie_start);
			return cookie_value = cookie_start == -1 ? '' : unescape(decodeURI(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length))));
		}
	};
	
	jQuery.extend({ 
		/** * @see 将json字符串转换为对象 * @param json字符串 * @return 返回object,array,string等对象 */ 
		/**
		* 将json字符串转换为对象的方法。
		*
		* @public
		* @param json字符串
		* @return 返回object,array,string等对象
		**/
	   evalJSON: function(strJson) { 
		 return eval("(" + strJson + ")"); 
	   },
	   /**
		* 将javascript数据类型转换为json字符串的方法。
		*
		* @public
		* @param  {object}  需转换为json字符串的对象, 一般为Json 【支持object,array,string,function,number,boolean,regexp *】
		* @return 返回json字符串
		**/
	   toJSONString: function(object) { 
		 var type = typeof object; 
		 if ('object' == type) { 
		   if (Array == object.constructor) type = 'array'; 
		   else if (RegExp == object.constructor) type = 'regexp'; 
		   else type = 'object'; 
		 } 
		 switch (type) { 
		 case 'undefined': 
		 case 'unknown': 
		   return; 
		   break; 
		 case 'function': 
		 case 'boolean': 
		 case 'regexp': 
		   return object.toString(); 
		   break; 
		 case 'number': 
		   return isFinite(object) ? object.toString() : 'null'; 
		   break; 
		 case 'string': 
		   return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() { 
			 var a = arguments[0]; 
			 return (a == '\n') ? '\\n': (a == '\r') ? '\\r': (a == '\t') ? '\\t': "" 
		   }) + '"'; 
		   break; 
		 case 'object': 
		   if (object === null) return 'null'; 
		   var results = []; 
		   for (var property in object) { 
			 var value = jQuery.toJSONString(object[property]); 
			 if (value !== undefined) results.push(jQuery.toJSONString(property) + ':' + value); 
		   } 
		   return '{' + results.join(',') + '}'; 
		   break; 
		 case 'array': 
		   var results = []; 
		   for (var i = 0; i < object.length; i++) { 
			 var value = jQuery.toJSONString(object[i]); 
			 if (value !== undefined) results.push(value); 
		   } 
		   return '[' + results.join(',') + ']'; 
		   break; 
		 } 
	   } 
	}); 
})(jQuery);