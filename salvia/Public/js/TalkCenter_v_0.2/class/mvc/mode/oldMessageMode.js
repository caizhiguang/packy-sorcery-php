;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.oldMessageMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetOldMessage",
				dataType:"xml"
			},function(data){
				if(data.MsgToMe==""){return "";}//当没有新信息时跳出
				return [].concat(data.MsgToMe.Item);
			});
		},
		onSuccess:function(data){
			var ctrl_data = this.request("TalkCenter","data");
			
			var messages = ctrl_data.messages;
			ctrl_data.newMessagesContent = data.length;
			for(var i in data)
			{
				data[i]._IsNew = true;
				data[i]._md5Id = $.md5(data[i].Gcid+data[i].Uid+data[i].Content+data[i].Datetime);
				var has = false;
				for(var j in messages){
					if(data[i]._md5Id==messages[j]._md5Id)
					{
						has = true;
						break;
					}
				}
				if(has){continue;}
				messages.push(data[i]);
			}
			this.request("TalkCenter","updataTalkingToForms");
			//this.request("TalkCenter","updateMsgForm");
		}
	});
})(jQuery);