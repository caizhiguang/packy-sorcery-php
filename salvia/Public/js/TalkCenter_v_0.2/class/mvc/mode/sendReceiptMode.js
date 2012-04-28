;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.sendReceiptMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/JstAnnounce_Rec.asmx/SendReceipt",
				dataType:"xml"
			});
		},
		onSuccess:function(data,ajax_options){
			var result = data.text == "1";
			this.request("TalkCenter","sendReceiptAfter",[result,ajax_options._oData]);
		}
	});
})(jQuery);