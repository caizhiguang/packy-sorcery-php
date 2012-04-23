;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.mvc.mode");
	$.TalkCenter.classes.mvc.mode.pollingMode = $.salvia.Class($.classes.mvc.mode,{
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
			
			var serverTime = $.doc.data("ServerTimer");
			if(data.NowTime!=undefined){
				var nowServerTime = $.ToDateTime(data.NowTime);
				if(Math.abs(nowServerTime.getSeconds()-serverTime.time.getSeconds())>3){
					serverTime.time = nowServerTime;
					$.doc.data("ServerTimer",serverTime);
				}
				$.cookie("last_time",data.NowTime);
			}
			
			/*var localTime = $.doc.data("LocalTime");
			var nowTime = new Date();
			var diff = localTime.getMilliseconds()-nowTime.getMilliseconds();
			serverTime.time.setMilliseconds(diff);
			$.doc.data("ServerTimer",serverTime);*/
			
			//this作用于options
			var messageCount = data.Check.Item.Message;
			var requestCount = data.Check.Item.Request;
			var noticeCount = data.Check.Item.Notice;
			var fRequestCount = data.Check.Item.FRespone;
			var expertGroupCount = data.Check.Item.Pro;
			
			var ctrl_mode = this.request("TalkCenter","mode");
			var ctrl_data = this.request("TalkCenter","data");
			if(Number(messageCount)!=0){ctrl_mode.messageMode.load({data:{To:ctrl_data.userId,Start:ajax_options._data.start,End:ajax_options._data.end,group:ctrl_data.groupIds}});}
			if(Number(requestCount)!=0){ctrl_mode.requestMode.load({data:{myId:ctrl_data.userId}});}
			//if(Number(noticeCount)!=0){ctrl_mode.loadNotice();}
			if(Number(fRequestCount)!=0){ctrl_mode.friendMode.load({data:{Uid:ctrl_data.userId}});}
			
			if(ctrl_data.config.debug){
				var i = $.doc.data("messageIndex");
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
				$.doc.data("messageIndex",i);
			}
		}
	});
})(jQuery);