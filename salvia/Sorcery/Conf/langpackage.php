<?php
$langpackage = array();
$path = dirname(__FILE__)."/langpackage/";
$handle = @ opendir($path) or die("无法打开目录");
//循环打开目录里的文件
while($file = readdir($handle)){
	//var_dump($file);测试
	if($file=="." || $file==".."){continue;}
	if(substr($file,strripos($file,".")+1)!='php'){continue;}
	$langpackage=array_merge($langpackage,require $path.$file);
}

return $langpackage;