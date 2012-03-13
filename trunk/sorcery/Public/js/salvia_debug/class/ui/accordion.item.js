;(function($){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.ui==undefined){ $.classes.ui={}; }
	
	$.classes.ui.accordion.item = $.salvia.Class($.classes.ui.base,{
		init:function($super,dom,attr){
			$super();
			if(dom==undefined){return;}
			//default setting
			this.dom = this.createDOM(dom);
			
			//attr
			this.dom.attr("data-id",this.id);
			if(attr==undefined){attr={};}
			for(var pro in attr)
			{
				this.dom.attr("data-"+pro,attr[pro]);
			}
			this.attr = attr;
			
			this.expansion(false);
			this.dom.find("dt").click($.proxy(function(e){
				this.expansion(!this.expansion());
				this._events.run("titleClick",this);
			},this));
			
			this.text = null;
			delete this.text;
		},
		createDOM:function(parent){
			this.parent = parent;
			var dom = $.c("dl").appendTo(parent);
			$.c("dt").appendTo(dom);
			$.c("dd").appendTo(dom).hide();
			return dom;
		},
		title:function(val){
			if(val==undefined){
				return this.dom.find("dt").html();
			}else{
				this.dom.find("dt").html(val);
			}
		},
		content:function(val){
			if(val==undefined){
				return this.dom.find("dd").html();
			}else{
				this.dom.find("dd").html(val);
			}
		},
		expansion:function(val){
			if(val ==undefined){
				return this.dom.attr("data-expansion")=="true";
			}else{
				this.dom.markData({expansion:val});
				this.dom.toggleClass("expansion",val);
				this.dom.find("dd").toggle(val);
			}
		}
	});
	
})(jQuery);