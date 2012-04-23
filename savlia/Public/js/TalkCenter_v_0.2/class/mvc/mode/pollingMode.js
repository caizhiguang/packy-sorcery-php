;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.pollingMode = $.salvia.object.Class($.classes.mvc.mode,{
		init:function($super,options,filter){
			$super({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/CheckMessage1",
				dataType:"xml"
			},function(data){
				return data.MsgToMe;
			});
		},
		onSuccess:function(data,ajax_options){
			if(data==""){return;}
			
			var serverTime = $(document).data("ServerTimer");
			if(data.NowTime!=undefined){
				var nowServerTime = $.stringToDate(data.NowTime);
				if(Math.abs(nowServerTime.getSeconds()-serverTime.time.getSeconds())>3){
					serverTime.time = nowServerTime;
					$(document).data("ServerTimer",serverTime);
				}
				$.cookie("last_time",data.NowTime,{path:"/User"});
			}
			
			//this作用于options
			var messageCount = data.Check.Item.Message;
			var requestCount = data.Check.Item.Request;
			var noticeCount = data.Check.Item.Notice;
			var fRequestCount = data.Check.Item.FRespone;
			var expertGroupCount = data.Check.Item.Pro;
			
			var ctrl_mode = this.request("TalkCenter","mode");
			var ctrl_data = this.request("TalkCenter","_data");
			if(Number(messageCount)!=0){ctrl_mode.messageMode.load({data:{To:ajax_options._data.To,Start:ajax_options._data.start,End:ajax_options._data.end,group:ctrl_data.groupIds}});}
			if(Number(requestCount)!=0){ctrl_mode.requestMode.load({data:{myId:ajax_options._data.To}});}
			//if(Number(noticeCount)!=0){ctrl_mode.loadNotice();}
			if(Number(fRequestCount)!=0){ctrl_mode.friendMode.load({data:{Uid:ajax_options._data.To}});}
			
			if(ctrl_data.config.debug){
				var i = $(document).data("messageIndex");
				var debug_msgBox = $("#debug_message").find(".messageBox");
				var title = "轮询"+"<span>server time： "+serverTime.time.ToString()+"</span>";
				var content = "<div><span class='right10'>开始时间："+ajax_options._data.start+"</span><span>结束时间："+ajax_options._data.end+"</span></div>";
				content+="<div>groupIds: "+ajax_options._data.group+"</div>";
				content+="<div>messageCount: "+messageCount+"</div>";
				debug_msgBox.append("<dl class='p10'><dt>("+i+") "+title+"</dt><dd>"+content+"</dd></dl>");
				if(!($("#debug_message").data("isOver")==true)){
					debug_msgBox.scrollTop(debug_msgBox[0].scrollHeight);
				}
				i++;
				$(document).data("messageIndex",i);
			}
		}
	});
})(jQuery);