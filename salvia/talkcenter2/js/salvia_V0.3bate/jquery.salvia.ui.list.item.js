!function($){

	$.salvia.object.namespace("$.salvia.ui.list");
	
	/**list.item(窗体类)**/
	$.salvia.ui.list.item = $.salvia.object.Class($.salvia.ui.base,{
		init:function($super,dom,attr){
			$super(dom,attr);
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
			if(val == undefined){
				return this.dom.attr('data-checked');
			}else{
				this.dom.attr('data-checked',val);
				this.onChecked(val);
			}
		},
		onChecked:function(val){
			this.dom.find('input[type="checkbox"]')[0].checked = val;
		},

		hasCheckBox:function(val){
			if(val==undefined){
				return this.dom.attr("data-hasCheckBox")!="false";
			}else{
				this.dom.attr("data-hasCheckBox",val);
				this.onHasCheckBox(val);
			}
		},
		onHasCheckBox:function(val){
			this.dom.find("input[type='checkbox']").toggle(val);
		},

		hasAvatar:function(val){
			if(val==undefined){
				return this.dom.attr("data-hasAvatar")=="true";
			}else{
				this.dom.attr("data-hasAvatar",val);
				this.onHasAvatar(val);
			}
		},
		onHasAvatar:function(val){
			this.dom.find(".avatar").toggle(val);
		},

		onVisible:function($super,val){
			$super();
			this.dom.toggleClass("visible",val);
			this.dom[val?"show":"hide"]();
		},
		onEnable:function($super,val){
			$super();
			this.dom.toggleClass("enable",val);
			if(val){
				this.dom.find("input[type='checkbox']").removeAttr("disabled");
			}else{
				this.dom.find("input[type='checkbox']").attr("disabled","disabled");
			}
		}
	});

}(jQuery);