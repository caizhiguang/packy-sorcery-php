;(function($){
	
	$.salvia.namespace("$.classes.ui");
	/**ui.base(可视基类)**/
	$.classes.ui.menu = $.salvia.Class($.classes.ui.base,{
		init:function($super,dom,options){
			this.parent = dom;
			this.menuPlane = $("#menuPlane").length==0?this.createMenuPlane():$("#menuPlane");
			$super();
			
			//this.menuPlane.find("#menuPlane_inner").text("123123123");//测试用
			this.parent.bind("contextmenu",this,function(e){
				e.data.show(e);
				return false;
			});
			$(document.body).bind("click",this,function(e){
				e.data.hide();
				//return false;
			});
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
						
					}
				},
				{
					element:"iframe",
					attr:{
						id:"menuPlane_iframe",
						frameborder:"0"
					},
					css:{
						width:"100%",
						heigth:"100%",
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
			this.menuPlane.show().offset({top:e.clientY,left:e.clientX});
			this.target = e.target;
		},
		hide:function(){
			this.menuPlane.hide();
			this.target = null;
			delete this.target;
		}
	});

})(jQuery);