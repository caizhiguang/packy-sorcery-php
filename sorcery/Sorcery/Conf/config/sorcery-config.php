<?php
$sorcery_config = array(
	//分组设置
	'APP_GROUP_LIST'=>'Home,Admin',
	'DEFAULT_GROUP'=>'Admin',//测试默认为Admin，行为默认为Home

	//扩展配置（设置了后将加载数组内的配置文件）
	//'APP_CONFIG_LIST'=>array('langpackage','routes'),
	'APP_CONFIG_LIST'=>array('langpackage'),
	
	//URL重写设置
	'URL_MODEL'=>'2',
	'URL_CASE_INSENSITIVE'=>false,//URL是否不区大小写
	'URL_PATHINFO_DEPR'=>'/',
	'URL_ROUTER_ON'=>true,

	//标签库开始、结束标签设置
	'TAGLIB_BEGIN'=>'{',
	'TAGLIB_END'=>'}',
);
return $sorcery_config;
?>