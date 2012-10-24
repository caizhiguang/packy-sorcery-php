!function($){

	var polling = $.salvia.object.Class({

		init:function(){this.initEvent();},
		initEvent:function(){
            //绑定事件
			$.doc.bind('polling',this,this.pollingAfter);
			$.doc.bind('getMessage',this,this.getMessageAfter);
			$.doc.bind('getRequest',this,this.getRequestAfter);
			$.doc.bind('getFriendsRequest',this,this.getFriendsRequestAfter);
		},
		pollingAfter:function(e,ajax,data,result){
			if(result==""){return;}
			var that = $.talkcenter;
			that.data.config.serverTime = $.stringToDate(result.NowTime);
			that.data.config.serverTimeSpace = that.data.config.serverTime.getTime() - (new Date()).getTime();

			// var messageCount = result.Check.Item.Message;
			// var requestCount = result.Check.Item.Request;
			// var noticeCount = result.Check.Item.Notice;
			// var fRequestCount = result.Check.Item.FRespone;
			// var expertGroupCount = result.Check.Item.Pro;
			
			if(Number(result.Check.Item.Message)!=0){
				that.ajax({
					url:$.getRootPath()+"/UserCenter/UserBasic.asmx/GetGroup_FriendByTo1",
					data:{To:data.To,Start:data.start,End:data.end,group:that.data.groupIds.join()}
				},'getMessage');
			}
			if(Number(result.Check.Item.Request)!=0){
				that.ajax({
					url:'',
					data:{myId:data.To}
				},'getRequest');
			}
			if(Number(result.Check.Item.FRespone)!=0){
				that.ajax({
					url:'',
					data:{Uid:data.To}
				},'getFriendsRequest');
			}
		},
        //取得信息后 事件
		getMessageAfter:function(e,ajax,data,result){
			var that = $.talkcenter;
			if(data.MsgToMe==""){return "";}//当没有新信息时跳出
			result = [].concat(result.MsgToMe.Item);
			var messages = that.data.information.messages;
			var onCall = that.data.information.onCall == undefined?[]:that.data.information.onCall;
			that.data.information.newMessagesContent = data.length;
			for(var i in result)
			{
				var id = result[i].Gid=='0'?result[i].Uid:result[i].Gid;
				var md5 = $.md5(result[i].Datetime+result[i].RealName+id+result[i].Gcid+result[i].Content)
				var key = id + ':' + result[i].Datetime+'-'+md5.substr(5,5);
				// var key = result[i].Datetime+'-'+result[i].RealName+'('+(result[i].Gid=='0'?result[i].Uid:result[i].Gid)+':'+result[i].Gcid+')'+result[i].Content;
				// var md5 = $.md5(key);
				if(messages[key]!=undefined) continue;

				var dataItem = $.convert(result[i],{
					Uid:"id",
					// Gid:"id",
					Content:"content",
					Datetime:"time",
					RealName:"name",
					Grade:"designation"
				});  

				dataItem._IsNew = true;
				dataItem._type = "friend";
				if(result[i].Gid!=="0"){
					dataItem.id = result[i].Gid;
					dataItem._type = 'group';
				}
				if(that.data.userInfor.state != "2") result[i].Grade=dataItem.designation="";

				dataItem.original = null;
				delete dataItem.original;
				messages[key] = dataItem;
			}

			var removelists = {};
			for(var key in messages){
				if(removelists[messages[key].id]==undefined){
					removelists[messages[key].id] = [];
				}

				removelists[messages[key].id].push(key);
			}

			for(var id in removelists){
				var index = 0;
				for (var i = removelists[id].length - 1; i >= 0; i--) {
					index++;
					if(index<=40) continue;
					messages[removelists[id][i]] = null;
					delete messages[removelists[id][i]];
				};
			}
		},
		getRequestAfter:function(e,ajax,data,result){},
		getFriendsRequestAfter:function(e,ajax,data,result){},


		//向服务器发送轮询请求
		polling:function(){
			var start = $.talkcenter.data.config.serverTime;
			var end = (new Date());
			end.setTime(end.getTime()+$.talkcenter.data.config.serverTimeSpace);

			$.talkcenter.ajax({
				url:$.getRootPath()+"/UserCenter/UserBasic.asmx/CheckMessage1",
				data:{
					start:$.dateToString(start),
					end:$.dateToString(end),
					To:$.talkcenter.data.userInfor.id,
					group:$.talkcenter.data.groupIds==undefined?"":$.talkcenter.data.groupIds.join()
				}
			},'polling');
		}
	});

	$.talkcenter.controller.polling = new polling();

}(jQuery);