!function($){

	var center = $.salvia.object.Class({
		init:function(){
			$.doc.bind('signin',this,function(e,ajax,data,result){
				e.data.signinAfter($.talkcenter.data);
			});
		},

		signinAfter: function (data) {
		    $(".radius_bottom3px a").tab(".modPanelBox .inner", "current");
		    window.tmp = data;
			$('#userInfo').find('.avatar img').attr('src',data.userInfor.avatar);
			$('#userInfo').find('.infor .name').text(data.userInfor.name + '(' + data.userInfor.id + ')');
			$("#contacts input").hide();
			for (var y in data.friends) {  //好友

			};
			
			
			
			for (var i in data.groups) {  //聊天群
			    var list = new $.salvia.ui.list($("#groups"));
                var item = new $.salvia.ui.list.item($("#contacts>li").clone());
			    list.add(item.dom);
			    item.text(data.groups[i].name + "(" + data.groups[i].id + ")");
			    item.checked(data.groups[i].id);
			    var n = +data.groups[i].groupType;
			    switch (n) {
			        case 0:
			            item.avatar("../photo/avatar/教.png")
			            break
			        case 1:
			        case 5:
			            item.avatar("../photo/avatar/聊.png")
			            break
			        case 2:
			            item.avatar("../photo/avatar/毕.png")
			            break
			        case 3:
			            item.avatar("../photo/avatar社.png")
			            break
			        case 4:
			            item.avatar("../photo/avatar/专.png")
			            break
			    };
			    //$("#groups .name:first").text(data.groups[i].name + "(" + data.groups[i].id + ")");
			    //$("#groups li:first").attr("data-gid", data.groups[i].id);
			    //var n = +data.groups[i].groupType;
			    //switch (n) {
			    //    case 0:
			    //        $("#groups .avatar img").attr("src", "../photo/avatar/教.png")
			    //        break
			    //    case 1:
			    //    case 5:
			    //        $("#groups .avatar img").attr("src", "../photo/avatar/聊.png")
			    //        break
			    //    case 2:
			    //        $("#groups .avatar img").attr("src", "../photo/avatar/毕.png")
			    //        break
			    //    case 3:
			    //        $("#groups .avatar img").attr("src", "../photo/avatar/社.png")
			    //        break
			    //    case 4:
			    //        $("#groups .avatar img").attr("src", "../photo/avatar/专.png")
			    //        break
			    //};
			};
			for (var y in data.authorities) {  //专家在线
			    var list = new $.salvia.ui.list($("#authority"));
			    var item = new $.salvia.ui.list.item($("#contacts>li").clone());
			    list.add(item.dom);
			    item.text(data.authorities[y].name + "(" + data.authorities[y].id + ")");
			    $("#authority .avatar img").attr("src", "../photo/avatar/专.png");
			    item.checked(data.authorities[y].id);
			};
			var list = new $.salvia.ui.list($(".wrap .forms"));
			$(".modBox li").click(function () {  //打开群
			    var id = $(this).attr("data-checked");
			    if ($(".forms>[data-checked='" + id + "']").length == 0) {
			        var item = new $.salvia.ui.list.item($("#talkform").clone());
			        list.add(item.dom);
			        $("#talkform:visible").attr("data-checked", id).removeAttr("id").addcss("current").show().siblings().hide();
			        $(".forms>[data-checked='" + id + "'] .title").text($(this).find('.name').text());
			        $(".forms>[data-checked='" + id + "'] img").attr("src", $(this).find('img').attr('src'));
			        $(this).find("span").clone().appendTo($(".taskbar .items")).wrapAll("<a></a>").closest("a").attr("data-checked", id).addcss("current");
			        var this_ = this;
			        $(".taskbar .items>a").click(function () {
			            if ($(this).attr("data-checked") == $(this_).attr("data-checked")) {
			                $(this).addClass("current").siblings().removeClass("current");
			                $(".forms>[data-checked='" + id + "']").show().siblings().hide();
			                $(".forms>[data-checked='" + id + "']").addcss("current");
			            }
			        });
			    } else {
			        $(".forms>[data-checked='" + id + "']").show().siblings().hide();
			        $(".taskbar .items>[data-checked='" + id + "']").addcss("current");
			        $(".forms>[data-checked='" + id + "']").addcss("current");
                }

			})

			$(".btnBack").attr("href", $.getRootPath() + "/User/UserCenter.aspx");
			$("#userInfo .btnSetting").attr("href", $.getRootPath() + "/User/PerInfo.aspx");
			$("#userInfo .btnSearch").attr("href", $.getRootPath() + "/Search/SearcharGroup.aspx");
			$("#userInfo .btnMessage").attr("href", $.getRootPath() + "/Message/Messages.aspx");
			$(".forms .btnClose, .forms .iClose").live("click", function () { //关闭
			    var dom = $(".forms>div:visible,.taskbar .current");
			    list.remove(dom);
			    $(".taskbar .items a:first").addClass("current");
			    $(".forms>[data-checked='" + $(".taskbar .items a:first").attr("data-checked") + "']").show().addClass("current");
			    //$(this).closest(".current").remove();
			    //$(".taskbar .current").remove();
			    //$(".taskbar .items a:first").addClass("current");
			    //$(".forms>[data-checked='" + $(".taskbar .items a:first").attr("data-checked") + "']").show().addClass("current");
			});
		}
	});

	$.fn.addtalkform = function () { //打开群
	    return this.each(function () {
	        var datagid = $(this).attr("data-gid");
	        if ($(".forms>[data-gid='" + datagid + "']").length == 0) {

	        } else {

	        }
	    });
	};

	//$.fn.addform = function () { //打开群
	//    return this.each(function () {
	//        var datagid = $(this).attr("data-gid");
	//        if ($(".forms>[data-gid='" + datagid + "']").length == 0) {
	//            $("#talkform").clone().appendTo($(".wrap .forms")).addcss("current").show().siblings().hide();
	//            $(".forms .modTalkForm:visible").attr("data-gid", datagid);
	//            $(".forms>[data-gid='" + datagid + "'] .title").text($(this).find('.name').text());
	//            $(".forms>[data-gid='" + datagid + "'] img").attr("src", $(this).find('img').attr('src'));
	//            $(this).find("span").clone().appendTo($(".taskbar .items")).wrapAll("<a></a>").closest("a").attr("data-gid", datagid).addcss("current");

	//            var this_ = this;
	//            $(".taskbar .items a").click(function () {
	//                if ($(this).attr("data-gid") == $(this_).attr("data-gid")) {
	//                    $(this).addClass("current").siblings().removeClass("current");
	//                    $(".forms>[data-gid='" + datagid + "']").show().siblings().hide();
	//                    $(".forms>[data-gid='" + datagid + "']").addcss("current");
	//                }
	//            });
	//        } else {
	//            $(".forms>[data-gid='" + datagid + "']").show().siblings().hide();
	//            $(".taskbar .items>[data-gid='" + datagid + "']").addcss("current");
	//            $(".forms>[data-gid='" + datagid + "']").addcss("current");
	//        }
	//    });
	//};
	$.talkcenter.controller.center = new center();
}(jQuery);