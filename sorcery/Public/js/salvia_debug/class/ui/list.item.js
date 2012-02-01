;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	
	/**form(窗体类)**/
	$.classes.list.item = $.salvia.Class($.classes.base,{
		init:function($super,attr){
			$super();
			this.dom = this.createDOM();
			//attr
			this.dom.attr("data-id",this._id);
			if(attr==undefined){attr={};}
			for(var pro in attr)
			{
				this.dom.attr("data-"+pro,attr[pro]);
			}
			this.attr = attr;
			this.hasAvatar(true);
			this.hasCheckBox(false);
			
			this.dom.click($.proxy(function(){this._events.run("click");}));
		},
		createDOM:function(){
			var checkbox = document.createElement("input");
			checkbox.type="checkbox";
			$(checkbox).attr({
				id:"checkbox-"+this.id
			});
			var dom = $(document.createElement("li")).append(checkbox).append(document.createElement("label"));
			var avatar = $(document.createElement("span")).addClass("avatar").append(document.createElement("img"));
			var name = $(document.createElement("span")).addClass("name");
			dom.find("label").append(avatar).append(name).attr({
				for:"checkbox-"+this.id
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
				return this.dom.find("input[type='checkbox']").attr("checked")!=undefined;
			}else{
				if(val){
					this.dom.find(".avatar").removeAttr("checked");
				}else{
					this.dom.find(".avatar").attr("checked",val);
				}
			}
		},
		hasCheckBox:function(val){
			if(val==undefined){
				return this.dom.attr("data-hasCheckBox");
			}else{
				this.dom.attr("data-hasCheckBox",val);
				this.dom.find("input[type='checkbox']").toggle(val);
			}
		},
		hasAvatar:function(val){
			if(val==undefined){
				return this.dom.attr("data-hasAvatar");
			}else{
				this.dom.attr("data-hasAvatar",val);
				this.dom.find(".avatar").toggle(val);
			}
		}
	});
	
})(jQuery);