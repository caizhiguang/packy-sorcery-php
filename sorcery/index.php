<?php
header("Content-Type:text/html; charset=utf-8");

//require_once '/common/functions.php';
// require_once '/lib/router.class.php';
require_once '/lib/loader.class.php';

$loader = new loader();
$loader->import('common.functions',false);

$rule = $loader->import('config.router','config');
// dump($rule);

$loader->import('lib.router');
$router = new router();
$route = $router->getRoute($rule);

$loader->import('lib.database');
$database = new database('mysql://root:@localhost/winebox');
$database->connect();
$result = $database->query('select * from wb_config');
// dump($result);
$result = $database->query('select count(*) from wb_config');
dump($result);
$database->disconnect();

// $result = preg_match('/count/i','select * form wb_config');
// dump($result);