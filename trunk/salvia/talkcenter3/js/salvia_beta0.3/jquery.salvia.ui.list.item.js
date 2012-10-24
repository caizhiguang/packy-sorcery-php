!function($){

	$.salvia.object.namespace("$.salvia.ui.list");
	
	/**list.item(窗体类)**/
	$.salvia.ui.list.item = $.salvia.object.Class($.salvia.ui.base,{
		/**初始化**/
		init:function($super,dom,attr){
			$super(dom,attr);
		},



		/**属性**/

		/**
		 * 文本属性
		 * (当没有传入值时为取得文本内容，所有[属性]皆是此模式)
		 * 
		 * @param  {string} text 文本内容
		 * @return {string} 文本内容
		 */
		text:function(text){
			if(text==undefined){
				return this._dom.find(".name").text();
			}else{
				this._dom.find(".name").text(text);
			}
		},
		/**
		 * 头像属性
		 * @param  {string} src 头像地址
		 * @return {string} 头像地址
		 */
		avatar:function(src){
			if(src==undefined){
				return this._dom.find(".avatar").attr("src");
			}else{
				this._dom.find(".avatar").attr("src",src);
			}
		},

		/**
		 * 已选择属性
		 * @param  {boolean} val true/false
		 * @return {boolean} true/false
		 */
		checked:function(val){
			if(val == undefined){
				return this._dom.attr('data-checked');
			}else{
				this._dom.attr('data-checked',val);
				this._onChecked(val);
			}
		},
		_onChecked:function(val){
			this._dom.find('input[type="checkbox"]')[0].checked = val;
		},

		/**
		 * 显示选择项属性
		 * @param  {boolean}  val true/false
		 * @return {boolean} true/false
		 */
		hasCheckBox:function(val){
			if(val==undefined){
				return this._dom.attr("data-hasCheckBox")!="false";
			}else{
				this._dom.attr("data-hasCheckBox",val);
				this._onHasCheckBox(val);
			}
		},
		_onHasCheckBox:function(val){
			this._dom.find("input[type='checkbox']").toggle(val);
		},

		/**
		 * 显示头像属性
		 * @param  {boolean}  val true/false
		 * @return {Boolean} true/false
		 */
		hasAvatar:function(val){
			if(val==undefined){
				return this._dom.attr("data-hasAvatar")=="true";
			}else{
				this._dom.attr("data-hasAvatar",val);
				this._onHasAvatar(val);
			}
		},
		_onHasAvatar:function(val){
			this._dom.find(".avatar").toggle(val);
		},

		_onVisible:function($super,val){
			$super();
			this._dom.toggleClass("visible",val);
			this._dom[val?"show":"hide"]();
		},
		_onEnable:function($super,val){
			$super();
			this._dom.toggleClass("enable",val);
			if(val){
				this._dom.find("input[type='checkbox']").removeAttr("disabled");
			}else{
				this._dom.find("input[type='checkbox']").attr("disabled","disabled");
			}
		}
	});

}(jQuery);