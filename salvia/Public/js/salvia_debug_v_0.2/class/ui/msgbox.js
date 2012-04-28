;(function($){
	
	$.salvia.object.namespace("$.classes.ui");
	
	/**msgbox(信息提示窗体)**/
	$.classes.ui.msgbox = $.salvia.object.Class($.classes.ui.form,{
		init:function($super,dom,attr){
			this.initScreen();
			
			$super(dom,attr);
			this.initButton();
			
			this.dom.css({height:"auto",width:230,position:"absolute",zIndex:"999"});
			this.dom.find("#mbtnMini").remove();
		},
		initScreen:function(){
			this._screen = $("#Screen").length!=0?$("#Screen"):$.c("div").attr({id:"Screen"}).appendTo(document.body).append($.c("iframe"));
			this._screen.css({
				zIndex:"998",
				position:"fixed",
				top:0,
				left:0,
				bottom:0,
				right:0
			}).find("iframe").css({
				border:"none",
				width:$(window).width(),
				height:$(window).height()
			});
			if($.browser.msie&&($.browser.version=="6.0"||$.browser.version=="7.0")){
				this._screen.css({
					width:$(window).width(),
					height:$(window).height(),
					position:"absolute",
					top:0,
					left:0
				});
			}
			this._screen.hide();
		},
		initButton:function(){
			var btn = $(document.createElement("input")).attr({type:"button"}).hide();
			this._buttons={
				Yes:btn.clone().val("是"),
				No:btn.clone().val("否"),
				Ok:btn.clone().val("确定"),
				Cancel:btn.clone().val("取消")
			};
			this._buttons.Yes.appendTo(this.dom.find(".ft")).click($.proxy(function(){
				this._events.run("return","Yes");
				this.close();
			},this));
			this._buttons.No.appendTo(this.dom.find(".ft")).click($.proxy(function(){
				this._events.run("return","No");
				this.close();
			},this));
			this._buttons.Ok.appendTo(this.dom.find(".ft")).click($.proxy(function(){
				this._events.run("return","Ok");
				this.close();
			},this));
			this._buttons.Cancel.appendTo(this.dom.find(".ft")).click($.proxy(function(){
				this._events.run("return","Cancel");
				this.close();
			},this));
			
			btn.remove();
		},
		content:function(val){
			if(val==undefined){
				return this._content;
			}else{
				this._content = val;
				this.dom.find(".content").html(val);
			}
		},
		buttons:function(val){
			if(val==undefined){
				return this._buttonsVal;
			}else{
				var _buttons=val;
				if(typeof val=="string"){
					_buttons=[val];
				}
				this._buttonsVal = _buttons;
				for(var i in _buttons)
				{
					if(typeof _buttons[i] == "string"&&$.isArray(_buttons)){
						this._buttons[_buttons[i]].show();
					}else{
						this._buttons[i].val(_buttons[i]);
						this._buttons[i].show();
					}
				}
			}
		},
		showScreen:function(val){
			if(val==undefined){
				return this._showScreen;
			}else{
				this._showScreen = val;
				this._screen.toggle(val);
				this.dom.appendTo(this._showScreen?this._screen:document.body);
			}
		},
		show:function($super,title,content,buttons){
			this.text(title);
			this.content(content);
			this.buttons(buttons);
			if(this._showScreen){
				var use_state = this._screen.data("UseState");
				use_state = use_state==undefined?0:use_state;
				this._screen.data("UseState",++use_state);
			}
			this.dom.css({
				top:$(window).height()/2-this.dom.outerHeight()/2,
				left:$(window).width()/2-this.dom.outerWidth()/2
			});
			$super();
		},
		close:function($super){
			if(this._showScreen){
				var use_state = this._screen.data("UseState");
				this._screen.data("UseState",--use_state);
				if(this._screen.data("UseState")==0) this._screen.hide();
			}
			$super();
		}
	});
	
})(jQuery);