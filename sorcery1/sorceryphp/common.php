<?php
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

function import($classes,$instantiation=true){
	return $GLOBALS['sorcery']->import($classes,$instantiation);
}

function str_split2($str,$howmany,$count=-1){
	$result = array();
	$tok = strtok($str,$howmany);
	$howmany_count = strlen($howmany);
	$index = 0;
	$cut_index = 0;
	while($tok) {
		$result[] = $tok;
		$cut_index += strlen($tok)+$howmany_count;
		$tok = strtok($howmany);
		if($count>0){
			if($index>=$count-1){
				if($cut_index>=strlen($str)){break;}
				$result[] = substr($str,$cut_index,strlen($str));
				break;
			}
			$index++;
		}
	}
	return $result;
}