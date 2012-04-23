;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.messageMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetGroup_FriendByTo1",
				dataType:"xml"
			},function(data){
				if(data.MsgToMe==""){return "";}//当没有新信息时跳出
				return [].concat(data.MsgToMe.Item);
			});
		},
		onSuccess:function(data,ajax_options){
			var ctrl_data = this.request("TalkCenter","_data");
			
			var messages = ctrl_data.information.messages;
			ctrl_data.information.newMessagesContent = data.length;
			for(var i in data)
			{
				if(data[i].Gid=="0"){data[i].Gid==null;delete data[i].Gid;}
				var dataItem = $.convert(data[i],{
					Uid:"id",
					Gid:"id",
					Content:"content",
					Datetime:"time",
					RealName:"name"
				});  
				dataItem._type = data[i].Gid==undefined?"friend":"group";
				dataItem._IsNew = true;
				//dataItem._md5Id = $.md5(data[i].Gid+data[i].Uid+data[i].Content+data[i].Datetime);
				dataItem._md5Id = $.md5(dataItem.id+dataItem.content+dataItem.time+dataItem.name+data[i].Gcid);
				var has = false;
				for(var j in messages){
					if(dataItem._md5Id==messages[j]._md5Id)
					{
						has = true;
						break;
					}
				}
				if(has){continue;}
				messages.push(dataItem);
			}
			this.request("TalkCenter","updateInformation",[data,ajax_options]);
		}
	});
})(jQuery);