;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.ui");
	
	/**list(列表类)**/
	$.TalkCenter.classes.ui.list = $.salvia.Class($.classes.ui.list,{
		onAdd:function(attr){
			var item = new $.TalkCenter.classes.ui.list.item(this.dom,attr);
			this.dom.append(item.dom);			
			return item;
		}
	});
})(jQuery);