;(function($){
	
	$.salvia.object.namespace("$.TalkCenter.classes.ui");
	$.TalkCenter.classes.ui.facePanel = $.salvia.object.Class($.classes.ui.base,{
		
		init:function($super,dom,attr){
			$super(dom,attr);
		},
		onDatasource:function(data){
			for(var pro in data)
			{
				var img = $(document.createElement("img")).attr({src:data[pro]});
				var a = $(document.createElement("a")).attr({href:"javascript:;",title:pro}).bind("click",{
					key:pro,
					src:data[pro],
					that:this
				},function(e){
					e.data.that._events.run("click",e.data.that,e.data.key,e.data.src);
				}).append(img).appendTo(this.dom);
			}
		},
		show:function(){this.dom.show();},
		hide:function(){this.dom.hide();},
		toggle:function(){this.dom.toggle();}
	});
	
})(jQuery);