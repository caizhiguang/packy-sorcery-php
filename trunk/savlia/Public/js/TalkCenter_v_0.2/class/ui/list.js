;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.ui");
	
	/**list(列表类)**/
	$.TalkCenter.classes.ui.list = $.salvia.object.Class($.classes.ui.list,{
		onCreateItem:function(dom,attr){
			return new $.TalkCenter.classes.ui.list.item(dom,attr);
		}
	});
	
})(jQuery);