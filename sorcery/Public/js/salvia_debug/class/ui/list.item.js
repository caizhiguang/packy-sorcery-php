;(function($){
	
	if($.classes==undefined){ $.classes={}; }
	if($.classes.ui==undefined){ $.classes.ui={}; }
	
	/**form(窗体类)**/
	$.classes.ui.list.item = $.salvia.Class($.classes.ui.base,{
		init:function($super,parent,attr){
			$super();
			this.dom = this.createDOM(parent);
			//attr
			this.dom.attr("data-id",this.id);
			if(attr==undefined){attr={};}
			for(var pro in attr)
			{
				this.dom.attr("data-"+pro,attr[pro]);
			}
			this.attr = attr;
			this.hasAvatar(true);
			this.hasCheckBox(false);
			
			this.dom.bind("click",this,function(e){
				if(e.target.tagName != "INPUT" && e.data.hasCheckBox() && e.data.enable()){e.data.checked(!e.data.checked());}
				return e.data._events.run("click",e);
			});
		},
		createDOM:function(parent){
			var checkbox = $(document.createElement("input")).attr({type:"checkbox",id:"checkbox-"+this.id}).addClass("right5");
			var dom = $(document.createElement("li")).appendTo(parent).append(checkbox).append(document.createElement("label"));
			var avatar = $(document.createElement("span")).addClass("avatar").append(document.createElement("img"));
			var name = $(document.createElement("span")).addClass("name");
			dom.find("label").append(avatar).append(name).attr({
				'for':this.id
			});
			return dom;
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
				this.dom.attr("data-enable",val);
				if(val){
					this.dom.find("input[type='checkbox']").removeAttr("disabled");
				}else{
					this.dom.find("input[type='checkbox']").attr("disabled","disabled");
				}
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