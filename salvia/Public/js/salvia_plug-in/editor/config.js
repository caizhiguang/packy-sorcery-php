;(function(){
	if($.salvia.editor==undefined) $.salvia.editor={};
	$.salvia.editor.config={
		converts:{
			'<':'&lt;',
			'>':'&gt;'
		},
		iframe:{
			defaultCss:"body{background:#fff;}"
		}
	};
})(jQuery);