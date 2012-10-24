!function($){

	$.salvia.object.namespace("$.talkcenter.ui");

	$.talkcenter.ui.form = $.salvia.object.Class($.salvia.ui.form,{
		/**初始化**/
		init:function($super,dom,attr){
			$super(dom,attr);
			this.initEvent();
		},
		initEvent:function(){
			this.dom.find('.btnClose').bind('click',this,function(e){
				e.data.close();
			});
		},


		/**属性**/

		/**
		 * 发送信息响应方式
		 * @param  {string} val enter|ctrl+enter
		 * @return {string}
		 */
		sendMode:function(val){},


		/**方法**/

		/**
		 * 发送信息
		 * @return {[type]}
		 */
		send:function(){},

	});

}(jQuery);