;(function($){
	$.fn.extend({
		
		/**-------下拉插件-------**/
		dropdown:function(options){
			var options = $.extend(
				{}/* new object */,
				$.fn.dropdown.options/* default options */,
				options || {} /* just-in-time options */
			);

			this.find(options.funbar).toggle(options.showFunbar);//初始化:默认隐藏功能栏
			this.find(options.hd).hover(function(){
				$(this).find(options.funbar).show();
			},function(){
				$(this).find(options.funbar).hide();
			});
			
			$.fn.dropdown.regDrop(this,options);

			return $.fn.dropdown.expansion(this,options);
		}
	});
	
	/**-------下拉插件-------**/
	$.fn.dropdown.options={
		hd:"",//标题头
		funbar:"",//功能栏
		btnDrop:"",//下拉按钮
		content:"",//内容
		dropAfter:function(item,options){},
		changeType:"click",
		showFunbar:false,
		expansionClass:"expansion",
		animationOn:true
	};
	
	/**
	 @class 展开单项方法
	 @param 
	 	index : {int} 索引
	 	item : {jquery} 下拉项(jQuery包装了的元素)
	 	options : {object} 配置参数 
	 @returns {object} 返回值
	 @author Packy(blog.lpreterite.com)
	 **/
	$.fn.dropdown.expansionItem = function(index,item,options){
		var itemOjb = {
			index:index,
			hd:item.find(options.hd),
			funbar:item.find(options.funbar),
			btnDrop:item.find(options.btnDrop),
			content:item.find(options.content),
			options:options
		};
		var result = false;
				
		if(typeof(itemOjb.options.expansion) === "boolean")
		{
			result = itemOjb.options.expansion;
		}
		else if($.isArray(itemOjb.options.expansion))
		{
			$.each(itemOjb.options.expansion,function(j){ 
				result = itemOjb.index === itemOjb.options.expansion[j];
				if(result){ return false; }
			});
		}
		else if(typeof(itemOjb.options.expansion) === "number")
		{
			result = itemOjb.index === itemOjb.options.expansion;
		}
		itemOjb.content.toggle(result);
		
		return {expansion:result,itemOjb:itemOjb};
	};
	
	/**
	 @class 展开所有项方法
	 @param 
	 	items : {array} 下拉元素
	 	options : {object} 配置参数 
	 @returns {array} 返回值
	 @author Packy(blog.lpreterite.com)
	 **/
	$.fn.dropdown.expansion = function(items,options){
		var results = [];
		
		items.each(function(i){
			results[i] = $.fn.dropdown.expansionItem(i,$(this),options);
		});
		
		return results;
	};
	
	/**
	 @class 注册下拉事件
	 @param 
	 	items : {array} 下拉元素
	 	options : {object} 配置参数 
	 @returns {void} 无
	 @author Packy(blog.lpreterite.com)
	 **/
	$.fn.dropdown.regDrop = function(items,options){
		switch(options.changeType)
		{
			case "click"://如果是click类型的，就注册btnDrop的click事件来启动下拉
				items.find(options.btnDrop).click(function(){
					var btn = $(this);
					var item = btn.parents(items.selector);
					item.find(options.btnDrop).toggleClass(options.expansionClass,item.find("dd").css("display")=="none");
					item.find(options.content).slideToggle(options.animationOn?"normal":0,options.dropAfter(item,options));
				});
				break;
			case "hover"://如果是hover类型的，就注册下拉块的hover事件来启动下拉
				items.hover(function(){
					$(this).find(options.content).stop(true,true).slideToggle("normal");
				},function(){
					$(this).find(options.content).stop(true,true).slideToggle("normal");
				});
				break;
		}
	};
})(jQuery);