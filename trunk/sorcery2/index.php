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

echo "hello!";

require_once '/lib_v0.2/lib.php';

/*
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

//dump($db->query("insert into user(name) values('test1')"));

$db->disconnect();
dump($db_hash);

$has = preg_match('/^select/i','select * from user');
dump($has?"true":"false");

require_once("Mode.class.php");

Mode::setDB($db);

class UserMode extends Mode{}

$m = new UserMode();
//dump($m->getModeName());
$m->aa = "123";
dump($m->getModeName());
*/
