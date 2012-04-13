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
			var id,name,time,content;
			switch(ajax_options.form._data._SentTo)
			{
				case "friend":
					id = ajax_options._data.Fromuid;
					name = ajax_options._data.FromName;
					time = ajax_options._data.Posttime;
					content = ajax_options._data.Message;
					break;
				case "group":
					id = ajax_options._data.Uid;
					name = ajax_options._data.RealName;
					time = ajax_options._data.Posttime;
					content = ajax_options._data.Content;
					break;
			}
			ajax_options.form.addMeTalking(id,name,time,content);
			ajax_options.form.dom.find(".input .TalkInput").focus();
		},
		onSuccess:function(data,ajax_options){
			if(!data){
				ajax_options.form.addMeTalking($.md5("error"),"系统提示","以下内容发送失败，请再试一次！",ajax_options._data.Content);
			}
		}
	});
})(jQuery);