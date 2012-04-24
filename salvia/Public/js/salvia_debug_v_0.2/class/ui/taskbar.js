;(function($){
	
	$.salvia.object.namespace("$.classes.ui");
	
	/**taskbar(任务栏)**/
	$.classes.ui.taskbar = $.salvia.object.Class($.classes.ui.list,{
		
		setFormManager:function(formManager){
			this.formManager = formManager;
			this.formManager.addListener("added",function(e,form){
				e.data.addItem(form);
			},this);
			this.formManager.addListener("removed",function(e,form){
				e.data.removeItem(form);
			},this);
			this._type = "default";
		},
		addItem:function(form){
			var item = $.c("a").text(form.text()).attr({
				"data-for":form.id,
				"href":"javascript:;"
			}).click(function(){
				if($(this).data("ui-class").actived()=="true"){
					$(this).data("ui-class").hide();
				}else{
					$(this).data("ui-class").show();
				}
			});
			this.add(item);
			item.data("ui-class",form);
		},
		removeItem:function(form){
			var removeItem;
			for(var i in this.list){
				if($.isFunction(this.list[i])){continue;}
				if(this.list[i].dom.data("ui-class")==form){
					removeItem = this.list[i];
				}
			}
			this.remove(removeItem);
			return true;
		},
		onActived:function(){
			this._events.run("actived");
		}
	});
	
})(jQuery);