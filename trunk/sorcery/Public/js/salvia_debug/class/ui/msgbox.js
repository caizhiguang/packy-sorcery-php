;(function($){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.ui==undefined){ $.classes.ui={}; }
	
	/**msgbox(信息提示窗体)**/
	$.classes.ui.msgbox = $.salvia.Class($.classes.ui.form,{
		init:function($super,dom,attr){
			this.screen = $("#Screen").length!=0?$("#Screen"):$(document.createElement("div"));
			this.screen.appendTo(document.body).append(document.createElement("iframe").attr({id:"Screen"})).css({
				width:$(window).width(),
				height:$(window).height(),
				zIndex:"998",
				position:"absolute",
				top:0,
				left:0
			}).find("iframe").css({
				border:"none",
				width:$(window).width(),
				height:$(window).height()
			});
			
			if(dom==undefined){return;}
			this.screen.append(dom).hide();
			$super(dom,attr);
			this.createButton();
			this.dom.addClass("modMessageForm").css({
				zIndex:"0"
			}).find(".inner").css({
				height:"auto"
			});
			this.dom.find("#mbtnMini").hide();
		},
		createButton:function(){
			var btn = $(document.createElement("input")).attr({type:"button"}).hide();
			this.buttons={
				Yes:btn.clone().val("是"),
				No:btn.clone().val("否"),
				Ok:btn.clone().val("确定"),
				Cancel:btn.clone().val("取消")
			};
			this.buttons.Yes.appendTo(this.dom.find(".ft")).click($.proxy(function(){
				this._events.run("return","Yes");
				this.close();
			},this));
			this.buttons.No.appendTo(this.dom.find(".ft")).click($.proxy(function(){
				this._events.run("return","No");
				this.close();
			},this));
			this.buttons.Ok.appendTo(this.dom.find(".ft")).click($.proxy(function(){
				this._events.run("return","Ok");
				this.close();
			},this));
			this.buttons.Cancel.appendTo(this.dom.find(".ft")).click($.proxy(function(){
				this._events.run("return","Cancel");
				this.close();
			},this));
			btn = null;
		},
		show:function($super,title,content,buttons){
			this.text(title);
			this.dom.find(".content").text(content);
			if($.isArray(buttons))
			{
				for(var i in buttons)
				{
					if(typeof buttons[i] == "string"){
						this.buttons[buttons[i]].show();
					}else{
						this.buttons[i].val(buttons[i]);
						this.buttons[i].show();
					}
				}
			}
			this.screen.show();
			this.dom.css({
				top:$(window).height()/2-this.dom.outerHeight()/2,
				left:$(window).width()/2-this.dom.outerWidth()/2
			});
			$super();
		},
		close:function($super){
			this.screen.hide();
			$super();
		}
	});
	
})(jQuery);