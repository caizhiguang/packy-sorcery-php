<?php
header("Content-Type:text/html; charset=utf-8");

// 浏览器友好的变量输出
function dump($var, $echo=true,$label=null, $strict=true)
{
    $label = ($label===null) ? '' : rtrim($label) . ' ';
    if(!$strict) {
        if (ini_get('html_errors')) {
            $output = print_r($var, true);
            $output = "<pre>".$label.htmlspecialchars($output,ENT_QUOTES)."</pre>";
        } else {
            $output = $label . print_r($var, true);
        }
    }else {
        ob_start();
        var_dump($var);
        $output = ob_get_clean();
        if(!extension_loaded('xdebug')) {
            $output = preg_replace("/\]\=\>\n(\s+)/m", "] => ", $output);
            $output = '<pre>'. $label. htmlspecialchars($output, ENT_QUOTES). '</pre>';
        }
    }
    if ($echo) {
        echo($output);
        return null;
    }else
        return $output;
}

require_once("DB.class.php");
$userName = 'root';
$password = '123456';
$hostName = 'localhost';
$dbName = 'cool';
$dsn = "mysql://$userName:$password@$hostName/$dbName";

$db = new DB($dsn);
$db->connect();
global $db_hash;
dump($db_hash);

dump($db->query('select * from user'));

$db->disconnect();
dump($db_hash);