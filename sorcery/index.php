<?php
header("Content-Type:text/html; charset=utf-8");

require_once '/common/functions.php';
require_once '/plugin/router.class.php';
$rule = require_once '/config/router.config.php';

$router = new router($rule);