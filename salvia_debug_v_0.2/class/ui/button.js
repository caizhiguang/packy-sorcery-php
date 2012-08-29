;(function($){
	
	$.salvia.object.namespace("$.classes.ui");
	
	$.classes.ui.button = $.salvia.object.Class($.classes.ui.base,{
		text:function(text){
			if(text==undefined){
				return this.dom.find(".text").text();
			}else{
				this.dom.find(".text").text(text);
			}
		},
		enable:function(val){
			if(val==undefined){
				return this.dom.attr("data-enable")!="false";
			}else{
				this.dom.toggleClass("enable",val);
				this.dom.attr("data-enable",val);
				if(val){
					this.dom.find("input[type='checkbox']").removeAttr("disabled");
				}else{
					this.dom.find("input[type='checkbox']").attr("disabled","disabled");
				}
			}
		}
	});
	
})(jQuery);