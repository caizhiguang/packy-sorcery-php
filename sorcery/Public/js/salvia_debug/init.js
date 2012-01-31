//初始化用-可不加载
;(function(){
	if($.salvia==undefined){return;}
	$.salvia.config = config();
	$.salvia.config.DefaultClassedPath=$.getRootPath()+$.salvia.config.DefaultClassedPath;
	$.salvia.init($.salvia.config);
	//$.salvia.loadJs("base");
	//$.salvia.loadJs("form");
})(jQuery);