<?php
header("Content-Type:text/html; charset=utf-8");

//require_once '/common/functions.php';
// require_once '/lib/router.class.php';
require_once '/lib/loader.class.php';

$loader = new loader();
$loader->import('common.functions',false);

$rule = $loader->import('config.router','config');
dump($rule);

$loader->import('lib.router');
$router = new router();
$route = $router->getRoute($rule);
dump($route);