<?php
define("SYS_PATH",dirname(__FILE__));//网站根目录
define("SORCERY_PATH",SYS_PATH.'\\sorceryphp\\');//巫术框架目录
define("PLUG_PATH",SYS_PATH.'\\plugin\\');//插件目录
define("CONFIG_PATH",SYS_PATH.'\\config\\');//配置目录
define("APP_PATH",SYS_PATH.'\\app\\');//网站内容目录

require_once SORCERY_PATH.'sorcery.php';//加载巫术框架
sorcery::run();//运行巫术框架

require_once SORCERY_PATH.'\\library\\dir.class.php';
$dir = new dir();
dump($dir->dirlist(PLUG_PATH));

//dump($GLOBALS);

//test
/*
$log = import('log');
$log->add("2012-5-3 20:35:30","测试测试");
dump($log->getAll());

$smarty = import('smarty');
$smarty->assign('test','FUCK!!!!!!!!');
$smarty->display('index\index.html');

dump($_SERVER["REQUEST_URI"]);
$d = str_split2($_SERVER["REQUEST_URI"],'/');
dump($d);*/

/*class test{
	public function getClassName(){return __CLASS__;}
	public function getFunctionName(){return __METHOD__;}
	public function cellGetFunctionName(){ return $this->getFunctionName(); }
}

$test = new test();
echo $test->getClassName()."<br/>";
echo $test->getFunctionName()."<br/>";
echo $test->cellGetFunctionName();

require_once SORCERY_PATH.'\\library\\router.class.php';
$router = new router();
dump($router);*/
/*
dump(preg_replace("/(\/index.php)|(\/?\?.+)/s",'',$_SERVER['REQUEST_URI']));
dump(str_split2(preg_replace("/(\/index.php)|(\/?\?.+)/s",'',$_SERVER['REQUEST_URI']),'/',2));

dump($_GET);*/
