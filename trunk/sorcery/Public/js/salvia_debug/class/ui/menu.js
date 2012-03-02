;(function($){
	
	$.salvia.Class.namespace("$.classes.ui");
	/**ui.base(可视基类)**/
	$.classes.ui.menu = $.salvia.Class($.classes.ui.base,{
		init:function($super,dom,options){
			this.parent = dom;
			this.menuPlane = $("#menuPlane").length==0?this.createMenuPlane():$("#menuPlane");
			$super();
			
			//this.menuPlane.find("#menuPlane_inner").text("123123123");//测试用
			
			this._eventsFun={
				contextmenu:function(e){
					e.data.show(e);
					return false;
				},
				click:function(e){
					e.data.hide();
					//return false;
				}
			};
			this.parent.bind("contextmenu",this,this._eventsFun.contextmenu);
			$(document.body).bind("click",this,this._eventsFun.click);
		},
		createMenuPlane:function(){
			var creator = $.c([
				{
					element:"div",
					attr:{
						id:"menuPlane"
					},
					css:{
						position:"absolute",
						zIndex:"99999",
						background:"#fff"
					},
					actions:[{
						appendTo:document.body
					}]
				},
				{
					element:"div",
					attr:{
						id:"menuPlane_inner"
					},
					css:{
						overflow: "hidden"
					}
				},
				{
					element:"iframe",
					attr:{
						id:"menuPlane_iframe",
						frameborder:"0",
						scrolling: "no"
					},
					css:{
						width:"100%",
						height:"100%",
						top:0,
						left:0,
						position:"absolute",
						zIndex:"-1"
					}
				}
			]);
			var plane = creator[0];
			var planeInner = creator[1];
			var iframe = creator[2];
			return plane.append(planeInner.append(iframe)).hide();
		},
		show:function(e){
			this.menuPlane.hide();
			this.target = e.target;
			var result = this._events.run("show");
			if(result==undefined?true:result){
				this.menuPlane.show().offset({top:e.clientY,left:e.clientX});
			}
		},
		hide:function(){
			this.menuPlane.hide();
			this.target = null;
			delete this.target;
		},
		destruct:function($super){
			this.parent.unbind("contextmenu",this._eventsFun.contextmenu);
			$(document.body).unbind("click",this._eventsFun.click);
			this.menuPlane.remove();
			$super();
		}
	});

})(jQuery);