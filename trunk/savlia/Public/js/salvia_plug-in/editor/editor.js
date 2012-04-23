;(function(){
	if($.salvia.editor==undefined) $.salvia.editor={};
	
	$.salvia.editor.editor = $.salvia.Class({
		init:function(dom,options){
			this.uid = $(document).data("salvia.editor.lists")==undefined?0:$(document).data("salva.editor.lists").length;
			this.dom = dom;
			this.options = $.extend(true,{},$.salvia.editor.config,options);
			this.commands = new $.salvia.editor.lbi.commands();
			this.iframe = $("<iframe frameborder=0 scroll='no' width='100%' height='100%'>" +
				"<html>" +
				"<head>" +
				"<style>" + options.iframe.defaultCss +
				"</style>" +
				"</head>" +
				"</html>" +
				"</iframe>")
			.attr({
				id:options.iframe.id+"_"+this.uid
			});
			this.iframe.find("body").attr({
				contenteditable:true,
				spellcheck:false
			});
		},
		hasBar:function(){},
		render:function(){},
		execCommand:function(key){
			this.commands.execCommand(key);
		},
		focus:function(){},
		getContent:function(){},
		getContentTxt:function(){},
		reset:function(){},
		setContent:function(){}
	});
	
	$.fn.extend({
		//将当前元素变成编辑器
		toEditor:function(){
			var arg = $.asgToArray(arguments);
			var editor = new $.salvia.editor.editor(this,arg[0]==undefined?{}:arg[0]);
			this.data("editor",editor);
		},
		//在当前元素中添加编辑器
		addEditor:function(){
			var dom,arg = $.asgToArray(arguments);
			switch(arg){
				case "string":
					dom = this.find(arg[0]);
					break;
				case "object":
					dom = arg[0].appendTo(this);
					break;
			};
			var editor = new $.salvia.editor.editor(dom,arg[1]==undefined?{}:arg[1]);
			dom.data("editor",editor);
		}
	});
	
})(jQuery);