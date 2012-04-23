<?php
define('THINK_PATH', './ThinkPHP');// 定义ThinkPHP框架路径
define('APP_NAME', 'Sorcery');//定义项目名称和路径
define('APP_PATH', './Sorcery');
define('NO_CACHE_RUNTIME',True);//不生成核心缓存文件

define('SYS_PATH',dirname(__FILE__));
require(THINK_PATH."/ThinkPHP.php");// 加载框架入口文件

App::run();//实例化一个网站应用实例
?>