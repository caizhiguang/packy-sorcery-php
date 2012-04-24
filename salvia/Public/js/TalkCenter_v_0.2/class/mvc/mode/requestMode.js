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
			var ctrl_data = this.request("TalkCenter","data");
			var request = ctrl_data.requests;
			ctrl_data.newRequestContent = data.length;
			for(var i in data)
			{
				if(request[i]!=undefined){continue;}
				request.push(data[i]);
			}
			this.request("TalkCenter","updateInformation",[data,ajax_options]);
		}
	});
})(jQuery);