!function($){
	
	$.salvia.object.namespace("$.salvia.ui");
	
	/**list(列表类)**/
	$.salvia.ui.list = $.salvia.object.Class($.salvia.ui.base,{
		init:function($super,dom){
			$super(dom);

			this.itemObj = $.salvia.ui.list.item;
		},
		add:function(item,location){
			switch(location){
				case 'first':
				case 0:
				case '0':
					this.dom.prepend(item);
					break;
				case 'last':
				case undefined:
					this.dom.append(item);
					break;
				default:
					if(typeof location != 'Number')
						location = Number(location);
					this.dom.eq(location).after(item);
					break;
			}
			this.dom.trigger("added",item);
		},
		remove:function(item){
			item.remove();
			this.dom.trigger("removed",item);
			this.onAdded(item);
			return item;
		},
		count:function(){
			return this.dom.length;
		},
		items:function(key){
			switch(typeof key){
				case 'Number':
					return this.dom.eq(key);
				case 'String':
					return this.dom.find(key);
			}
		},
		contains:function(item){
			for (var i = this.dom.length - 1; i >= 0; i--) {
				if(this.dom[i]==item){ return true; }
			};
			return false;
		},
		clear:function(){
			return this.dom.empty();
		},
		onAdded:function(item){},
		onRemoved:function(item){},

		selectAll:function(){
			var list = this.dom.find('li');
			for (var i = 0; i <= list.length; i++) {
				var item = new this.itemObj(list[i]);
				if(!item.hasCheckBox() || !item.enable()){continue;}
				item.checked(true);
			}
		},
		selectInvert:function(){
			var list = this.dom.find('li');
			for (var i = 0; i <= list.length; i++) {
				var item = new this.itemObj(list[i]);
				if(!item.hasCheckBox() || !item.enable()){continue;}
				item.checked(!item.checked());
			}
		},
		selectNone:function(){
			var list = this.dom.find('li');
			for (var i = 0; i <= list.length; i++) {
				var item = new this.itemObj(list[i]);
				if(!item.hasCheckBox() || !item.enable()){continue;}
				item.checked(false);
			}
		},
		viewfilter:function(condition,confine){	
			var list = this.dom.find('li');
			switch(typeof condition)
			{
				case "boolean":
					if(!condition){
						for (var i = 0; i <= list.length; i++) {
							var item = new this.itemObj(list[i]);
							item.visible(true);
						}
						break;
					}else{ return; }
				case "function":
					for (var i = 0; i <= list.length; i++) {
						var item = new this.itemObj(list[i]);
						item.visible(condition.apply(item,[confine]));
					}
					break;
			}
			this.changeCounts();
		},
		changeCounts:function(){
			this._counts.visible = this._counts.enable = this._counts.checked = 0;
			var list = this.dom.find('li');
			for (var i = 0; i <= list.length; i++) {
				var item = new this.itemObj(list[i]);
				if(item.visible()) this._counts.visible++;
				if(item.enable()) this._counts.enable++;
				if(item.checked()) this._counts.checked++;
			}
		},
		sort:function(compare){
			$.sort(this.dom.find("li"),compare);
		}
	});
	
}(jQuery);