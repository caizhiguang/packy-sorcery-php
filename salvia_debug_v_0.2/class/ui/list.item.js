;(function($){
	
	$.salvia.object.namespace("$.classes.ui");
	
	/**list.item(窗体类)**/
	$.classes.ui.list.item = $.salvia.object.Class($.classes.ui.base,{
		init:function($super,dom,attr){
			$super(dom,attr);
			
			if(attr==undefined){
				this.hasAvatar(true);
				this.hasCheckBox(false);
			}
			
			this.dom.bind("click",this,function(e){
				if(e.target.tagName != "INPUT" && e.data.hasCheckBox() && e.data.enable()){e.data.checked(!e.data.checked());}
				return e.data._events.run("click",this,e.data,e);
			});
		},
		text:function(text){
			if(text==undefined){
				return this.dom.find(".name").text();
			}else{
				this.dom.find(".name").text(text);
			}
		},
		avatar:function(src){
			if(src==undefined){
				return this.dom.find(".avatar").attr("src");
			}else{
				this.dom.find(".avatar").attr("src",src);
			}
		},
		checked:function(val){
			if(val==undefined){
				return this.dom.find("input[type='checkbox']").attr("checked");
			}else{
				if(!val){
					this.dom.find("input[type='checkbox']").removeAttr("checked");
				}else{
					this.dom.find("input[type='checkbox']").attr("checked",val);
				}
			}
		},
		enable:function(val){
			if(val==undefined){
				return this.dom.attr("data-enable")!="false";
			}else{
				this.dom.toggleClass("enable",val);
				this.dom.attr("data-enable",val);
				if(val){
					this.dom.find("input[type='checkbox']").removeAttr("disabled");
				}else{
					this.dom.find("input[type='checkbox']").attr("disabled","disabled");
				}
			}
		},
		visible:function(val){
			if(val==undefined){
				return this.dom.attr("data-visible")!="false";
			}else{
				this.dom.toggleClass("visible",val);
				this.dom.attr("data-visible",val);
				this.dom[val?"show":"hide"]();
			}
		},
		hasCheckBox:function(val){
			if(val==undefined){
				return this.dom.attr("data-hasCheckBox")!="false";
			}else{
				this.dom.attr("data-hasCheckBox",val);
				this.dom.find("input[type='checkbox']").toggle(val);
			}
		},
		hasAvatar:function(val){
			if(val==undefined){
				return this.dom.attr("data-hasAvatar")=="true";
			}else{
				this.dom.attr("data-hasAvatar",val);
				this.dom.find(".avatar").toggle(val);
			}
		}
	});
	
})(jQuery);