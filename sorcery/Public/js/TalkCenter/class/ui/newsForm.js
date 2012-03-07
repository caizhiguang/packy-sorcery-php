;(function($){
	
	$.salvia.Class.namespace("$.TalkCenter.classes.ui");
	
	var newsForm = function(){};	
	newsForm.prototype.init=function($super,dom,attr){
		$super(dom,attr);
		dom.css({
			width:200,
			height:"auto"
		}).attr("data-disposition","Customer").addClass("modNewsForm");
		this.newsList = new $.classes.ui.list($(document.createElement("ul")).addClass("contacts").insertAfter(this.dom.find(".content")));
		this.btnMore = $(document.createElement("a")).appendTo(this.dom.find(".ft")).attr({href:"javascript:;"}).text("查看详细").bind("click",this,function(e){
			e.data.showDetail();
		});
		this.dom.find("#mbtnMini").hide();
		this.dom.hover($.proxy(function(){this.isOver=false},this),$.proxy(function(){this.isOver=true},this));
		this.actived(true);
		this.text("消息提示");
		this.isOver = true;
	};
	newsForm.prototype.show=function(){
		if(this._tip==undefined){
			this.dom.show();
		}else{
			this._tip.show();
		}
	};
	
	newsForm.prototype.updateView=function(){
		var messageCount = 0;
		var requestCount = 0;
		var noticeCount = 0;
		var newFriendCount = 0;
		for(var i in this._data)
		{
			switch(this._data[i]._newsType){
				case "message":
					messageCount+=this._data[i]._newsCount;
					break;
				case "request":
					requestCount+=this._data[i]._newsCount;
					break;
				case "notice":
					noticeCount+=this._data[i]._newsCount;
					break;
			}
		}
		
		var html="";
		if(messageCount){
			html+="<div>未看的聊天信息 "+messageCount+"条</div>";
		}
		if(requestCount){
			html+="<div>未处理的请求"+requestCount+"条</div>";
		}
		if(noticeCount){
			html+="<div>未读的通知"+noticeCount+"条</div>";
		}
		this.dom.find(".content").html("<div>没有新信息</div>");
		if(messageCount!=0||requestCount!=0||noticeCount!=0){
			this.dom.find(".content").html(html);
		}
		
		this.clear();
		for(var i in this._data)
		{
			var item = this.newsList.add();
			item.addListener("click",function(e){
				e.other.form.isOver=true;
				return e.other.form._events.run("detailItemClick",$.extend({},{},e.other.data));
			},{form:this,data:this._data[i]});
			item.hasAvatar(true);
			item.datasource(this._data[i],{
				GroupName:function(name){
					this.text(name);
				},
				NickName:function(name){
					this.text(name);
				},
				FUserName:function(name){
					this.text(name);
				},
				name:function(name){
					this.text(name);
				},
				_newsCount:function(count){
					this.text(this.text()+"("+count+")");
				},
				Avatar:function(avatar){
					var avatar = $.getRootPath()+$.TalkCenter.config.avatarPath+avatar+".png";
					this.dom.find("#avatar img").attr({src:avatar});
				}
			},function(data){
				var name = data.GroupName==undefined?(data.NickName==undefined?data.FUserName:data.NickName):data.GroupName;
				
				this.dom.find(".name").text(name+"("+data._newsCount+")");
			});
		}
	};
	
	newsForm.prototype.showDiscription=function(){
		if(this.dom.find(".content>div").text()!="没有新信息"){
			this.dom.find(".ft").show();
		}else{
			this.dom.find(".ft").hide();
		}
		this.dom.find(".content").show();
		this.newsList.dom.hide();
		
		this.show();
	};
	newsForm.prototype.showDetail=function(){
		this.dom.find(".content").hide().next().show();
		this.dom.find(".ft").hide();
		
		this.show();
	};
	newsForm.prototype.clear=function(){
		this.newsList.clear();
	};
	newsForm.prototype.hide=function(){
		if(this._tip==undefined){
			this.dom.hide();
		}else{
			this._tip.hide();
		}
	};
	newsForm.prototype.close=function(){
		this.hide();
	};
	
	/**newsForm(通知窗体)**/
	$.classes.ui.newsForm = $.salvia.Class($.classes.ui.form,new newsForm());
	
})(jQuery);