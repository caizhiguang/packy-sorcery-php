;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	
	/**form(窗体类)**/
	$.classes.form = $.salvia.Class($.classes.base,{
		init:function($super,dom,data,setting){
			$super();
			if(dom==undefined){return;}
			//default setting
			this.dom = dom;
			this.datasource(data,setting);
			
			//css
			this.dom.css({position:"absolute"});
			
			//event
			this.dom.find(".iMini").bind("click",$.proxy(function(){this.hide();},this));
			this.dom.find(".iClose").bind("click",$.proxy(function(){this.close();},this));
			this.dom.bind("click",$.proxy(function(){this.onActived()},this));
			
			dom.data("salvia-obj",this);
			dom.drag({handle:".hd,.menu"});
		},
		text:function(text){
			this.dom.find(".hd").text(text);
		},
		show:function(){
			this.dom.show();
		},
		hide:function(){
			this.dom.hide();
		},
		close:function(){
			this.dom.remove();
		},
		onActived:function(){
			this._events.run("actived",this);
		}
	});
	
})(jQuery);