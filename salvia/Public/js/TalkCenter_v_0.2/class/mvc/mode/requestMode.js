;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.requestMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetRequestToMe",
				dataType:"xml"
			},function(data){
				if(data.GFRequest==""){return "";}//当没有新信息时跳出
				return [].concat(data.GFRequest.Item);
			});
		},
		onSuccess:function(data,ajax_options){
			var ctrl_data = this.request("TalkCenter","_data");
			var request = ctrl_data.information.requests;
			//ctrl_data.information.newRequestContent = data.length;
			for(var i in data)
			{
				if(request[i]!=undefined){continue;}
				var item = $.convert(data[i],{
					Fid:"id",
					RequestId:"sender_id",
					RequestName:"sender_name",
					ResponeId:"addressee_id",
					ResponeName:"addressee_name",
					RequestTime:"time",
					RequestComments:"content",
					Type:"type"
				});
				if($.hash.contains(request,item.id)) continue;
				$.hash.add(request,item.id,item);
			}
			this.request("TalkCenter","updateInformation",[data,ajax_options]);
		}
	});
})(jQuery);