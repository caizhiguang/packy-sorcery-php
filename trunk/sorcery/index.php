<?php
define("SYS_PATH",dirname(__FILE__));//网站根目录
define("SORCERY_PATH",SYS_PATH.'/sorceryphp/');//巫术框架目录
define("PLUG_PATH",SYS_PATH.'/plug/');//插件目录
define("CONFIG_PATH",SYS_PATH.'/config/');//配置目录
define("APP_PATH",SYS_PATH.'/app/');//网站内容目录

require_once SORCERY_PATH.'sorcery.class.php';//加载巫术框架
sorcery::run();//运行巫术框架

//test
$log = import('log');
$log->add("2012-5-3 20:35:30","测试测试");
dump($log->getAll());

$smarty = import('smarty');
$smarty->assign('test','FUCK!!!!!!!!');
$smarty->display('index.html');

dump($_SERVER["REQUEST_URI"]);
$d = str_split2($_SERVER["REQUEST_URI"],'/');
dump($d);