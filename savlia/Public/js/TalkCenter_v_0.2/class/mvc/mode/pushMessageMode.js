;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.pushMessageMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({dataType:"xml"},{
				data:function(data){
					return Boolean(data.text);
				}
			});
		},
		onBeforeSend:function(ajax_options){
			
		},
		onSuccess:function(data,ajax_options){
			if(!data){
				ajax_options.form.addMeTalking($.md5("error"),"系统提示","以下内容发送失败，请再试一次！",ajax_options._data.Content);
			}
		}
	});
})(jQuery);