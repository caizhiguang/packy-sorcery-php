;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.ui==undefined){ $.classes.ui={}; }
	
	/**form(窗体类)**/
	$.classes.ui.form = $.salvia.Class($.classes.ui.base,{
		init:function($super,dom,attr){
			$super();
			if(dom==undefined){return;}
			//default setting
			this.dom = dom;
			this.actived(false);
			
			//css
			this.dom.css({position:"absolute"});
			
			//attr
			this.dom.attr("data-id",this._id);
			if(attr==undefined){attr={};}
			if(attr.disposition==undefined){attr.disposition="Default";}
			for(var pro in attr)
			{
				this.dom.attr("data-"+pro,attr[pro]);
			}
			this.attr = attr;
			
			//event
			this.dom.find(".iMini").bind("click",$.proxy(function(){this.hide();return false;},this));
			this.dom.find(".iClose").bind("click",$.proxy(function(){this.close();return false;},this));
			this.dom.bind("click",$.proxy(function(){this.onActived();},this));
			
			dom.data("salvia-obj",this);
			dom.drag({handle:".hd,.menu"});
			this.hide();
		},
		text:function(text){
			if(text==undefined){
				return this.dom.find(".hd").text();
			}else{
				this.dom.find(".hd").text(text);
			}
		},
		actived:function(actived){
			if(actived==undefined){
				return this.dom.attr("data-actived");
			}else{
				this.dom.attr("data-actived",actived);
			}
		},
		inTaskBar:function(inBar){
			if(inBar==undefined){
				return this.dom.attr("data-inTaskBar");
			}else{
				this.dom.attr("data-inTaskBar",inTaskBar);
			}
		},
		isShow:function(){
			return this.dom.css("display")!="none";
		},
		show:function(){
			this.dom.show();
			this.onActived();
		},
		hide:function(){
			this.dom.hide();
			this.actived(false);
		},
		close:function(){
			this.dom.remove();
			this._events.run("closed",this);
		},
		onActived:function(){
			this.actived(true);
			this._events.run("actived",this);
		}
	});
	
})(jQuery);