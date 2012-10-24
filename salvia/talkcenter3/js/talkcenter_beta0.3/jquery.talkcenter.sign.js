!function($){
	
	var sign = $.salvia.object.Class({
        /*
         * 初始化
         */
		init:function(){
			$.doc.bind('signin',this,function(e,ajax,data,result){
				e.data.signinAfter(result);
			});
			$.doc.bind('signout',this,function(e){
				e.data.signoutAfter();
			});

			this.signin();
		},

        /*
         * 登入
         */
		signin:function(){
			//登入
			var loginInfo = $.cookie("LoginInfo");
			if(loginInfo!="")
			{
				loginInfo = loginInfo.split(",");
				$.talkcenter.ajax({
					url:$.getRootPath()+"/UserCenter/UserBasic.asmx/UserLogin",
					data:{name:loginInfo[0],psw:loginInfo[1]}
				},'signin');//初始化聊天中心
			}
			else{
				document.location.href = $.getRootPath()+"/Default.aspx";
			}
		},
        /*
         * 登出
         */
		signout:function(){
			//登出
			$.cookie("LoginInfo",null,{path:"/"});//注销用户
			$("#form1").find("input[type='submit']")[0].click();
		},
        /*
         * 登入后
         */
		signinAfter:function(data){
			$.talkcenter.data.userInfor = $.convert(data.User_Info.Item,{
				Avatar:"avatar",
				NickName:"name",
				UserName:"accountName",
				Uid:"id",
				Status:"validity",
				State:"state"
			});
			var friends = data.User_Friends==""?[]:[].concat(data.User_Friends.Item);
			var groups = data.Group==""?[]:[].concat(data.Group.Item);

			$.talkcenter.data.config.serverTime = $.stringToDate(data.NowTime);
			$.talkcenter.data.config.serverTimeSpace = $.talkcenter.data.config.serverTime.getTime() - (new Date()).getTime();
			$.talkcenter.data.friends={};
			$.talkcenter.data.groups={};
			$.talkcenter.data.authorities={};
			$.talkcenter.data.groupIds=[];
			
			for(var i in friends)
			{
				var friend = $.convert(friends[i],{
					Avatar:"avatar",
					NickName:"name",
					FUserName:"fulname",
					Fuid:"id",
					State:"status",
					TypeRela:"relation"
				});
				friend._type = "friend";
				if(friend.relation=="1"){
					$.talkcenter.data.friends[friend.id] = friend;
				}else{
					$.talkcenter.data.friends["_"+friend.id] = friend;
				}
			}
			for(var i in groups)
			{
				var group = $.convert(groups[i],{
					Avatar:"avatar",
					GroupName:"name",
					Gid:"id",
					Status:"status",
					FounderID:"founderId",
					GroupType1:"groupType",
					Authentication:"authentication",
					GroupLevel:"level",
					Gbrief:"brief"
				});
				group._type = "group";
				$.talkcenter.data.groups[group.id] = group;
				$.talkcenter.data.groupIds.push(group.id+":"+group.groupType); 
			}
			$.talkcenter.data.authorities["1"]={
				_type:"authority",
				authentication:"0",
				brief:"",
				founderId:$.talkcenter.data.userInfor.id,
				groupType:"4",
				id:"1",
				level:"1",
				name:"专家在线",
				status:"1"
			};
		},
        /*
         * 登出后
         */
		signoutAfter:function(){}
	});

	$.talkcenter.controller.sign = new sign();

}(jQuery);