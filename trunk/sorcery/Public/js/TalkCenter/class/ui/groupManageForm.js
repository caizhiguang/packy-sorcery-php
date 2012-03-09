;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.ui");
	
	/**群管理窗口**/
	var groupManageForm = function(){};
	groupManageForm.prototype.init = function($super,dom,attr){
		$super(dom,attr);
		dom.css({height:350});
		dom.find(".content").height(dom.height()-dom.find(".outer_header").height());
		var side = $.c("div").addClass("tside").appendTo(dom.find(".content"));
		var main = $.c("div").addClass("tmain").appendTo(dom.find(".content"));
		
		$.c("h5").addClass("name ptop10 pleft10").appendTo(side);
		var fun = $.c("ul").addClass("tab fun").appendTo(side);
		$.c("li").append($.c("a").attr({href:"javascript:;"}).text("群成员")).appendTo(fun);
		$.c("li").append($.c("a").attr({href:"javascript:;"}).text("群通知")).appendTo(fun);
		
		var plane1 = $.c("div").addClass("plane").css({position:"relative",height:"100%"}).appendTo(main);
		var plane2 = $.c("div").addClass("plane").css({position:"relative",height:"100%"}).appendTo(main);
		fun.tabs("div.tmain > div.plane");
		
		$.c("div").css({
			overflow:"auto",
			position:"absolute",
			top:10,
			bottom:30,
			width:"100%"
		}).appendTo(plane1);
		
		var table = $.c("table").attr({id:"member",cellspacing:1,cellpadding:0}).addClass("table").appendTo(plane1.find("div"));
		var thead = $.c("thead").appendTo(table);
		$.c("tbody").appendTo(table);
		$.c("tfoot").appendTo(table);
		
		var tr = $.c("tr").appendTo(thead);
		var topCheck = $.c("input").attr({type:"checkbox"}).click(function(){
			var checked = this.checked;
			if(checked)
			{
				$(this).parents("table").find("input[type='checkbox']").not(this).attr("checked","checked");
			}else{
				$(this).parents("table").find("input[type='checkbox']").not(this).removeAttr("checked");
			}
		});
		$.c("td").css({width:25,textAlign:"center"}).append(topCheck).appendTo(tr);
		$.c("td").text("用户名").appendTo(tr);
		$.c("td").text("操作").appendTo(tr);
	};
	groupManageForm.prototype.member = function(member,binding){
		this._data.member = member;
		for(var pro in member)
		{
			var tr = $.c("tr").appendTo(this.dom.find("#member>tbody"));
			$.c("td").append($.c("input").attr({type:"checkbox",name:"member"})).css({textAlign:"center"}).appendTo(tr);
			$.c("td").addClass("memberName").text(binding.name(member[pro])).appendTo(tr);
			$.c("td").addClass("memberCtrl").appendTo(tr);
		}
		//
	};
	
	$.TalkCenter.classes.ui.groupManageForm = $.salvia.Class($.classes.ui.form,new groupManageForm());
})(jQuery);