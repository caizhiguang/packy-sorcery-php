;(function($){
	$.extend({
		//长时间，形如 (2003-12-05 13:04:06)
		ToDateTime:function(str){
			var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2}).(\d{1,3})$/;
			var r = str.match(reg);
			if(r==null) return false;
			var d = new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7],r[8]);
			return d;
		},
		
		createDOM:function(options){
			return $._c(options);
		},
		_c:function(options){
			var dom;
			
			if(options["element"]!=undefined){ dom=$(document.createElement(options["element"])); }
			if(options["text"]!=undefined){ dom.text(options["text"]); }
			if(options["html"]!=undefined){ dom.html(options["html"]); }
			if(options["val"]!=undefined){ dom.val(options["val"]); }
			if(options["attr"]!=undefined){ 
				dom.attr(options["attr"]);
			}
			if(options["bind"]!=undefined){ 
				for(var bind in options["bind"])
				{
					dom.bind(bind,options["bind"][bind]["data"],options["bind"][bind]["fn"]);
				}
			}
			if(options["css"]!=undefined){ 
				dom.css(options["css"]);
			}
			if(options["class"]!=undefined){
				var classes = options["class"].split(",");
				for(var i in classes)
				{
					dom.addClass(classes[i]);
				}
			}
			
			return dom;
		}
	});
})(jQuery);