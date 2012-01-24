<?php
$db_config = require dirname(__FILE__).'/config/db_config.php';
$sorcery_config = require dirname(__FILE__).'/config/sorcery-config.php';
$config = array_merge($db_config,$sorcery_config);

$config['URL']=array(
	'Admin'=>array(
		'article'=>array('文章管理',false),//[0]面包屑中文显示，[1]是否可跳转
		'article_vlist'=>array('文章列表',true),
		'article_cate'=>array('文章分类',true),
		'article_comment'=>array('文章评论',true),
		'article_add'=>array('发表新文章',true),
		'article_edit'=>array('编辑文章',false),
	),
);

//var_dump($config);

return $config;
?>