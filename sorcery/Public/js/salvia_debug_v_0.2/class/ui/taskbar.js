;(function($){
	
	$.salvia.object.namespace("$.classes.ui");
	
	/**taskbar(任务栏)**/
	$.classes.ui.taskbar = $.salvia.object.Class($.classes.list,{
		setFormManager:function(formManager){
			this.formManager = formManager;
			this.formManager.addListener("added",function(e,form){
				e.other.addItem(form);
			},this);
			this.formManager.addListener("removed",function(e,form){
				e.other.removeItem(form);
			},this);
		},
		onAdded:function(item){
			this.dom.append(item);
		},
		onRemoved:function(item){
			item.remove();
		},
		addItem:function(form){
			var item = $.c("a").text(form.text()).data("ui-class",form).attr({
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
		},
		removeItem:function(form){
			var removeItem;
			for(var i in this.list){
				if($.isFunction(this.list[i])){continue;}
				if(this.list[i].data("ui-class")==form){
					removeItem = this.list[i];
				}
			}
			this.remove(removeItem);
			return true;
		},
		onActived:function(){
			this._events.run("actived",this);
		}
	});
	
})(jQuery);