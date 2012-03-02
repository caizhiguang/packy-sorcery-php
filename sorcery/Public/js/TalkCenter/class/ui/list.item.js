;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.ui");
	
	/**list(列表类)**/
	$.TalkCenter.classes.ui.list.item = $.salvia.Class($.classes.ui.list.item,{
		online:function(val){
			if(val==undefined){
				return this._online;
			}else{
				this._online = val;
				this.dom.toggleClass("off",this._online);
			}
		}
	});
})(jQuery);