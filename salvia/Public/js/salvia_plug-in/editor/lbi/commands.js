;(function(){
	if($.salvia.editor==undefined){$.salvia.editor={};}
	if($.salvia.editor.lbi==undefined){$.salvia.editor.lbi={};}
	
	$.salvia.editor.lbi.commands = $.salvia.Class({
		init:function(){
			this._commands = {};
		},
		addCommand:function(){
			var arg = $.asgToArray(arguments);
			if(arg.length>=2){
				//key,command
			}else
			{
				//options
			}
		},
		removeCommand:function(){
			var arg = $.asgToArray(arguments);
			if(arg.length>=2){
				//key,command
			}else
			{
				//options
			}
		},
		execCommand:function(key){
			
		}
	});
	
})(jQuery);