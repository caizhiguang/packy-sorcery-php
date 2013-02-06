<?php

define('__ROOT__',$_SERVER['DOCUMENT_ROOT']);
define('SYSROOT',__ROOT__.'/libraries');
define('APP_PATH',__ROOT__.'/application');

require_once('common.php');
require_once('template/smarty/Smarty.class.php');

require_once('plug-in/View.class.php');

$config = require_once('config.inc.php');
$smarty = new Smarty();
$smarty->template_dir = APP_PATH.'/template';
$smarty->compile_dir = APP_PATH.'/cache/temp';
$smarty->cache_dir = APP_PATH.'/cache/data';
$smarty->config_dir = APP_PATH.'/config';
//global $config,$smarty;

preg_match($config['routes']['base'][0],$_SERVER['REQUEST_URI'],$matches);

$model = $matches['model'];
$action = $matches['action'];

define('__MODEL__',$matches['model']);
define('__ACTION__',$matches['action']);

unset($matches);

require_once(APP_PATH.'/actions/'.__MODEL__.'.class.php');
$model = new $model($smarty);
$model->$action();

// require_once(APP_PATH.'/actions/index.class.php');
// $index = new View($smarty);
// $index->index();

//debug
//dump($GLOBALS);
// dump(parse_url($_SERVER["REQUEST_URI"]));
// dump($_GET);
