!function($){
	
	$.salvia.object.namespace("$.salvia.ui");
	
	/**list(列表类)**/
	$.salvia.ui.list = $.salvia.object.Class($.salvia.ui.base,{
		/**初始化**/
		init:function($super,dom){
			$super(dom);

			this.itemObj = new $.salvia.ui.list.item();
		},



		/**方法**/

		/**
		 * 添加方法
		 * @param {DOM} item     DOM对象(指DOM-li)
		 * @param {string} location 插入位置信息
		 */
		add:function(item,location){
			this._onAdded(item,location);
		},
		/**
		 * 删除方法
		 * @param  {DOM} item DOM对象(指DOM-li)
		 * @return {DOM}
		 */
		remove:function(item){
			return this._onRemoved(item);
		},
		/**
		 * 取得长度方法
		 * @return {int}
		 */
		count:function(){
			return this._dom.length;
		},
		/**
		 * 取得子项方法
		 * @param  {string|number} key 参考值|位置值
		 * @return {DOM}
		 */
		items:function(key){
			switch(typeof key){
				case 'Number':
					return this._dom.eq(key);
				case 'String':
					return this._dom.find(key);
			}
		},
		/**
		 * 是否存在列表中的方法
		 * @param  {DOM} item DOM对象(DOM-li)
		 * @return {boolean}
		 */
		contains:function(item){
			for (var i = this._dom.length - 1; i >= 0; i--) {
				if(this._dom[i]==item){ return true; }
			};
			return false;
		},
		/**
		 * 清除所有子项 方法
		 * @return {boolean}
		 */
		clear:function(){
			return this._dom.empty();
		},
		_onAdded:function(item,location){
			switch(location){
				case 'first':
				case 0:
				case '0':
					this._dom.prepend(item);
					break;
				case 'last':
				case undefined:
					this._dom.append(item);
					break;
				default:
					if(typeof location != 'Number')
						location = Number(location);
					this._dom.eq(location).after(item);
					break;
			}
			this._dom.trigger("added",item);
		},
		_onRemoved:function(item){
			item.remove();
			this._dom.trigger("removed",item);
			this.onRemoved(item);
			return item;
		},

		/**
		 * 选择所有 方法
		 */
		selectAll:function(){
			var list = this._dom.find('li');
			for (var i = 0; i <= list.length; i++) {
				var item = this.itemObj.dom(list[i]);
				if(!item.hasCheckBox() || !item.enable()){continue;}
				item.checked(true);
			}
		},
		/**
		 * 反向选择 方法
		 */
		selectInvert:function(){
			var list = this._dom.find('li');
			for (var i = 0; i <= list.length; i++) {
				var item = this.itemObj.dom(list[i]);
				if(!item.hasCheckBox() || !item.enable()){continue;}
				item.checked(!item.checked());
			}
		},
		/**
		 * 全不选择 方法
		 */
		selectNone:function(){
			var list = this._dom.find('li');
			for (var i = 0; i <= list.length; i++) {
				var item = this.itemObj.dom(list[i]);
				if(!item.hasCheckBox() || !item.enable()){continue;}
				item.checked(false);
			}
		},
		/**
		 * 显示过滤方法
		 * @param  {boolean|function} condition 过滤条件()
		 * @param  {[type]} confine   [description]
		 * @return {[type]}
		 */
		viewfilter:function(condition,confine){	
			var list = this._dom.find('li');
			switch(typeof condition)
			{
				case "boolean":
					if(!condition){
						for (var i = 0; i <= list.length; i++) {
							var item = this.itemObj.dom(list[i]);
							item.visible(true);
						}
						break;
					}else{ return; }
				case "function":
					for (var i = 0; i <= list.length; i++) {
						var item = this.itemObj.dom(list[i]);
						item.visible(condition.apply(item,[confine]));
					}
					break;
			}
			this._changeCounts();
		},
		_changeCounts:function(){
			this._counts.visible = this._counts.enable = this._counts.checked = 0;
			var list = this._dom.find('li');
			for (var i = 0; i <= list.length; i++) {
				var item = this.itemObj.dom(list[i]);
				if(item.visible()) this._counts.visible++;
				if(item.enable()) this._counts.enable++;
				if(item.checked()) this._counts.checked++;
			}
		},
		/**
		 * 排序
		 * @param  {function} compare 判断方法
		 */
		sort:function(compare){
			$.sort(this._dom.find("li"),compare);
		}
	});
	
}(jQuery);