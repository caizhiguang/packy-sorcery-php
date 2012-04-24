;(function($){
	$.fn.extend({
		tip:function(options){
			var options = $.extend(
				{}/* new object */,
				$.fn.tip.options || {},
				options || {} /* just-in-time options */
			);
			options.tips = new Array();
			$.each(this,function(i,n){
				var tip = typeof(options.tip)=="string"?$(n).find(options.tip):options.tip;
				var objTip = new $.fn.tip.objTip();
				objTip.tip=tip;
				objTip.target = typeof(options.target)=="string"?$(n).find(options.target):$(n);
				
				objTip.notHide=options.notHide;
				objTip.location=options.location;
				objTip.resetLocatoin=options.resetLocatoin;
				objTip.resetContent=options.resetContent;
				objTip.animation=options.animation;
				objTip.spacing=options.spacing;
				objTip.overflow=options.overflow;
				objTip.content=options.content;
				objTip.limit=$(options.limit);
				objTip.hideHandle=$.isEmptyObject(options.hideHandle)?objTip.target:(typeof(options.hideHandle)=="string"?(options.hideHandle=="tip"?objTip.tip:$(n).find(options.hideHandle)):options.hideHandle);
				objTip.showHandle=$.isEmptyObject(options.showHandle)?objTip.target:(typeof(options.showHandle)=="string"?(options.showHandle=="tip"?objTip.tip:$(n).find(options.showHandle)):options.showHandle);
				objTip.hideAction=options.hideAction;
				objTip.showAction=options.showAction;
				objTip.event.hide=options.hideActionEvent;
				objTip.event.show=options.showActionEvent;
				objTip.init();
				objTip.regAction();
				
				options.tips.push(objTip);
			});
			
			return options.tips;
		}
	});
	$.fn.tip.options = {
		notHide:false,
		location:"top center",
		resetLocatoin:true,
		resetContent:false,
		animation:"none",
		spacing:"10",
		overflow:"hidden",
		tip:{},
		target:{},
		content:"rel",
		limit:$(document),
		hideHandle:{},
		showHandle:{},
		hideAction:"hover",
		showAction:"hover",
		hideActionEvent:function(){},
		showActionEvent:function(){}
	};
	
	
	$.fn.tip.objTip = function(){
		this.hideHandle={};
		this.showHandle={};
		this.hideAction="hover";
		this.showAction="hover";
		this.event={
			show:function(){},
			hide:function(){}
		};
		this.notHide=false;
		this.location="top center";
		this.resetLocatoin=true;
		this.resetContent=false;
		this.animation="none";
		this.spacing="0";
		this.overflow="hidden";
		this.tip={};
		this.content="rel";
		this.limit=$(document.body);
		this.target={};
	};
	$.fn.tip.objTip.prototype.init=function(){
		if(this.resetContent){this.tip.text(this.target.attr("rel"));}
		var parent = this.limit[0]==window?$(document.body):(this.limit[0]==document?$(document.body):this.limit);
		this.tip.appendTo(parent).css({position:"absolute"}).hide();
		this.limit.css("overflow",this.overflow);
		this.setlocationType();
	};
	$.fn.tip.objTip.prototype.show_animation={
		slide:function(){}
	};
	$.fn.tip.objTip.prototype.hide_animation={
		slide:function(){}
	};
	$.fn.tip.objTip.prototype.setlocationType=function(){
		/*
		 * default:1,
		 * left:2,right:4,center:8
		 * top:3,bottom:9,center:27
		 * top&left:6,top&right:12,top&center:24,bottom&left:18,bottom&right:32,bottom&center:72
		 * center&left:54,center&right:108,center&center:216
		 */
		this._locatoin = 1;
		var isSetX = false;
		var isSetY = false;
		if(this.location.indexOf("top")!=-1){this._locatoin*=3;isSetY=true;}
		if(this.location.indexOf("bottom")!=-1){this._locatoin*=9;isSetY=true;}
		if(this.location.indexOf("left")!=-1){this._locatoin*=2;isSetX=true;}
		if(this.location.indexOf("right")!=-1){this._locatoin*=4;isSetX=true;}
		if(this.location.indexOf("center")!=-1){this._locatoin*=isSetY?8:(isSetX?27:216);}
		if(typeof(this.location)=="mouselocation"){this._locatoin=1;}
	},
	$.fn.tip.objTip.prototype.get_location=function(e){
		var spacing = Number(this.spacing);
		var tipHeight = this.tip.outerHeight();
		var tipWidth = this.tip.outerWidth();
		var obj = this.target;
		var offset = obj.offset();
		
		var css={};
		switch(this._locatoin)
		{
			case 1://mouse location
				css.top=e.clientY;
				css.left=e.clientX;
				break;
			case 6://top left
				css.top=offset.top-spacing-tipHeight;
				css.left=offset.left-spacing-tipWidth;
				break;
			case 12://top right
				css.top=offset.top-spacing-tipHeight;
				css.left=offset.left+spacing+tipWidth;
				break;
			default://default setting is top center
			case 3://top(center)
			case 24://top center
				css.top=offset.top-spacing-tipHeight;
				css.left=offset.left+(obj.outerWidth()/2-tipWidth/2);
				break;
			case 18://bottom left
				css.top=offset.top+spacing+tipHeight;
				css.left=offset.left-spacing-tipWidth;
				break;
			case 32://bottom right
				css.top=offset.top+spacing+tipHeight;
				css.left=offset.left+spacing+tipWidth;
				break;
			case 9://bottom(center)
			case 72://bottom center
				css.top=offset.top+spacing+tipHeight;
				css.left=offset.left+(obj.outerWidth()/2-tipWidth/2);
				break;
			case 2://left(center)
			case 54://center left
				css.top=offset.top+(obj.outerHeight()/2-tipHeight/2);
				css.left=offset.left-spacing-tipWidth;
				break;
			case 4://right(center)
			case 108://center right
				css.top=offset.top+(obj.outerHeight()/2-tipHeight/2);
				css.left=offset.left+spacing+tipWidth;
				break;
			case 8://center(center)
			case 27://center(center)
			case 216://center center
				css.top=offset.top+(obj.outerHeight()/2-tipHeight/2);
				css.left=offset.left+(obj.outerWidth()/2-tipWidth/2);
				break;
		}
		
		switch(this.overflow)
		{
			case "hidden":
				break;
			case "auto":
			default:
				var limitHeight = this.limit.height();
				var limitWidth = this.limit.width();
				css.top = css.top<0?spacing:(css.top+tipHeight>limitHeight?limitHeight-tipHeight-spacing:css.top);
				css.left = css.left<0?spacing:(css.left+tipWidth>limitWidth?limitWidth-tipWidth-spacing:css.left);
				break;
		}
		
		return css;
	},
	$.fn.tip.objTip.prototype.show=function(e){
		var e = e==undefined?{}:e;
		var css = this.get_location(e);
		css.zIndex = "999";
		if(this.animation!="none"){
			this.show_animation[this.animation].apply(this);
		}else{
			this.tip.show();
		}
		this.tip.css(css);
	},
	$.fn.tip.objTip.prototype.hide=function(e){
		var e = e==undefined?{}:e;
		var css = this.get_location(e);
		css.zIndex = "0";
		if(this.animation!="none"){
			this.hide_animation[this.animation].apply(this);
		}else{
			this.tip.hide();
		}
		this.tip.css(css);
	},
	$.fn.tip.objTip.prototype.regAction=function(){
		if(this.showHandle[0]==this.hideHandle[0]&&this.showAction==this.hideAction&&this.hideAction=="hover"&&this.showAction=="hover")
		{
			this.showHandle[this.showAction]($.proxy(function(e){
				this.show(e);
				this.event.show(this,e);
			},this),$.proxy(function(e){
				this.hide(e);
				this.event.hide(this,e);
			},this));
		}else{
			this.showHandle[this.showAction]($.proxy(function(e){
				this.show(e);
				this.event.show(this,e);
			},this));
			this.hideHandle[this.hideAction]($.proxy(function(e){
				if(this.notHide){return;}
				this.hide(e);
				this.event.hide(this,e);
			},this));
		}
	}
})(jQuery);