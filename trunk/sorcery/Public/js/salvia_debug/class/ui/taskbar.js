;(function(){
	
	if($.classes==undefined){ $.classes={}; }
	
	/**taskbar(任务栏)**/
	$.classes.taskbar = $.salvia.Class($.classes.base,{
		init:function($super,formManager,parent){
			$super();
			this.dom = $(document.createElement("div")).attr("id","TaskBar").appendTo(parent==undefined?document.body:$(parent));
			this.formManager = formManager;
			this.formManager.addListener("added",function(e,form){
				e.other.addItem(form);
			},this);
			this.formManager.addListener("removed",function(e,form){
				e.other.removeItem(form);
			},this);
			this.list = [];
		},
		addItem:function(form){
			var itemDom = $(document.createElement("a"));
			itemDom.attr({
				"data-for":form.id,
				"href":"javascript:;"
			}).text(form.text()).click(function(){
				if($(this).data("form-obj").actived()=="true"){
					$(this).data("form-obj").hide();
				}else{
					$(this).data("form-obj").show();
				}
			});
			itemDom.data("form-obj",form);
			this.list.push(itemDom);
			this.dom.append(itemDom);
		},
		removeItem:function(form){
			var index=-1;
			var removeItem = "";
			for(var i in this.list){
				if($.isFunction(this.list[i])){continue;}
				if(this.list[i].data("form-obj")==form){
					removeItem = this.list[i];
					index=i;
				}
			}
			if(index==-1){ return false; }
			this.list.splice(index,1);
			removeItem.remove();
			return true;
		},
		clear:function(){
			this.list=[];
			this.dom.html("");
		},
		onActived:function(){
			this._events.run("actived",this);
		}
	});
	
})(jQuery);