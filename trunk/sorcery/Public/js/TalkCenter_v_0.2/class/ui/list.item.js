;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.ui");
	
	/**list.item(窗体类)**/
	$.TalkCenter.classes.ui.list.item = $.salvia.object.Class($.classes.ui.list.item,{
		init:function($super,dom,attr){
			$super(dom,attr);
		},
		online:function(val){
			if(val==undefined){
				return this._online;
			}else{
				this._online = val;
				this.dom.toggleClass("off",this._online);
			}
		},
		twinkle:function(val){
			if(val==undefined){
				return this._twinkle;
			}else{
				this._twinkle = val;
				if(this._twinkle){clearTimeout(this.t_twinkle);this.f_twinkle();}
				else{clearTimeout(this.t_twinkle);}
			}
		},
		f_twinkle:function(){
			this.dom.find(".avatar").css({position:"relative"}).animate({top:"+=5px"},100).animate({top:"-=5px"},100);
			var self = this;
			this.t_twinkle = setTimeout(function(){self.f_twinkle();},250);
		}
	});
	
})(jQuery);