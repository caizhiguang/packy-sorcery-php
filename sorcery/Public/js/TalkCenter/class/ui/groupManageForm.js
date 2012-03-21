;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.ui");
	
	/**群管理窗口**/
	var groupManageForm = function(){};
	groupManageForm.prototype.init = function($super,dom,attr,authority){
		$super(dom,attr);
		dom.css({height:350});
		
		this._memberCanChange = false;
		
		$.c("li").append($.c("a").attr({href:"javascript:;"}).text("群成员")).appendTo(this.dom.find(".tab.fun"));
		$.c("li").append($.c("a").attr({href:"javascript:;"}).text("群通知")).appendTo(this.dom.find(".tab.fun"));
		this.dom.find(".tab.fun").tabs("div.tmain > div.panel");
		
		this.memberList = new $.TalkCenter.classes.ui.list($.c("ul").appendTo(this.dom.find("#memberForm")));
		this.memberList.dom.addClass("contacts");
		this.dom.find("#memberForm").submit($.proxy(function(){
			this._events.run("memberFormSubmit");
			return false;
		},this));
		
		//this.dom.find(".panel>.tab").tabs(".panel_inner>form");
		
		this.notices = new $.classes.ui.accordion(this.dom.find(".panel_inner .autopanel"));
		this.noticeContacts = new $.classes.ui.list(this.dom.find(".GroupNewNotice .contacts"));
		this.dom.find(".panel").eq(2).find("#seletAll").click($.proxy(function(e){
			if(e.target.checked){
				this.noticeContacts.selectAll();
			}else{
				this.noticeContacts.selectNone();
			}
		},this));
		
		this.dom.find("#GroupNewNotice").bind("submit",$.proxy(function(e){
			this._events.run("sentNewNotice");
			return false;
		},this));
		
		this.setAuthority(authority);
	};
	groupManageForm.prototype.member = function(member,binding){
		this._data.member = member;
		this.noticeContacts._data = this.memberList._data = member;
		for(var i in member)
		{
			var item = this.memberList.add();
			item.hasAvatar(true);
			item.hasCheckBox(this._memberCanChange);
			item.datasource(member[i],binding);
			
			var noticeContact = this.noticeContacts.add();
			noticeContact.datasource(member[i],binding);
			noticeContact.hasAvatar(false);
			noticeContact.hasCheckBox(true);
		}
	};
	groupManageForm.prototype.setAuthority = function(authority){
		switch(authority)
		{
			case "contributor":
				break;
			case "creator":
			case "manager":
				this._memberCanChange = true;
				$.c("input").attr("type","checkbox").appendTo(this.dom.find(".bar").eq(0)).click($.proxy(function(e){
					if(e.target.checked){
						this.memberList.selectAll();
					}else{
						this.memberList.selectNone();
					}
				},this));
				$.c("a").attr("href","javascript:;").text("删除成员").appendTo(this.dom.find(".bar").eq(0)).click($.proxy(function(e){
					this.submit();
				},this.dom.find("#memberForm")));
				$.c("a").attr("href","javascript:;").addClass("right10").text("发通知").prependTo(this.dom.find("div.bar").eq(1)).click($.proxy(function(e){
					this.dom.find(".panel").eq(1).hide();
					this.dom.find(".panel").eq(2).show();
				},this));
				
				this.dom.find("input.btnBack").click($.proxy(function(e){
					this.dom.find(".panel").eq(2).hide();
					this.dom.find(".panel").eq(1).show();
				},this));
				
				break;
		}
	};
	groupManageForm.prototype.notice = function(notices,binding,count){
		this._data.notice = notices;
		this.notices.clear();
		if(notices==""){
			this.notices.dom.append("- 暂无通知 -");
		}else{
			this.notices.datasource(notices,binding);
			this.notices.sort(function(x,y){
				return $(x).find(".time").text()>$(y).find(".time").text()?1:0;
			});	
			this.notices.list[0].dom.find("dt").addClass("top");
		}
		
		if(notices.length>0){
			//click to cell noticePageChanged
		}else{
			
		}
	};
		
	$.TalkCenter.classes.ui.groupManageForm = $.salvia.Class($.classes.ui.form,new groupManageForm());
})(jQuery);

