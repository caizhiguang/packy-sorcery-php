;(function($){
	
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
			this.dom.attr("data-id",this.id);
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
				if(actived){
					this.dom.css({
						opacity:"1",
						filter:"alpha(opacity=100)"
					});
				}else{
					this.dom.css({
						opacity:"0.8",
						filter:"alpha(opacity=80)"
					});
				}
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
			
			//关闭后销毁对象
			this.destruct();//销毁
			try{
				CollectGarbage();//只适用于IE系列，用于释放内存
			}catch(e){
				
			}
		},
		tip:function(dom,options){
			var options = $.extend(
				{}/* new object */,
				{
					tip:this.dom,
					overflow:"auto",
					limit:$(window)
				},
				options || {} /* just-in-time options */
			);
			this._tip = dom.tip(options)[0];
		},
		onActived:function(){
			this.actived(true);
			this._events.run("actived",this);
		}
	});
	
})(jQuery);