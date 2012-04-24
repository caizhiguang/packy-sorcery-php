<?php
function init_config()
{
    $m_config=M('sys_config');
    $config = $m_config->select();
    foreach($config as $item)
    {    		
    	C($item['key'],$item['val']);
    }
}

function check_path($action_name,$key)
{
	return strtolower($action_name)==$key?"current":"";
}

function get_crumb()
{
	$url = C('URL');

	$g = GROUP_NAME;
	$m = strtolower(MODULE_NAME);
	$a = strtolower(ACTION_NAME);
	
	$crumb = array();
	$crumb["$g-$m/"] = $url[$g][$m];
	$crumb["$g-$m/$a"] = $url[$g][$m.'_'.$a];
	
	return $crumb;
}

function cut_str($string, $sublen, $start = 0, $code = 'UTF-8')  
{  
	if($code == 'UTF-8')  
	{  
	$pa = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|\xe0[\xa0-\xbf][\x80-\xbf]|[\xe1-\xef][\x80-\xbf][\x80-\xbf]|\xf0[\x90-\xbf][\x80-\xbf][\x80-\xbf]|[\xf1-\xf7][\x80-\xbf][\x80-\xbf][\x80-\xbf]/";  
	preg_match_all($pa, $string, $t_string);  
	  
	if(count($t_string[0]) - $start > $sublen) return join('', array_slice($t_string[0], $start, $sublen))."...";  
	return join('', array_slice($t_string[0], $start, $sublen));  
	}  
	else  
	{  
	$start = $start*2;  
	$sublen = $sublen*2;  
	$strlen = strlen($string);  
	$tmpstr = '';  
	  
	for($i=0; $i<$strlen; $i++)  
	{  
	if($i>=$start && $i<($start+$sublen))  
	{  
	if(ord(substr($string, $i, 1))>129)  
	{  
	$tmpstr.= substr($string, $i, 2);  
	}  
	else  
	{  
	$tmpstr.= substr($string, $i, 1);  
	}  
	}  
	if(ord(substr($string, $i, 1))>129) $i++;  
	}  
	if(strlen($tmpstr)<$strlen ) $tmpstr.= "...";  
	return $tmpstr;  
	}  
}

function write_crumb($array)
{
	$crumb = get_crumb();
	array_merge($crumb,$array);
	$html = '<ol class="crumb">';
	foreach($crumb as $key=>$val)
	{
		if(!is_array($val)){ continue; }
		if(!$val[1]){
			$html.="<li><span>$val[0]</span></li>";
		}
		else{
			$html.="<li><a href='".U($key)."'>$val[0]</a></li>";
		}
	}
	$html.='</ol>';
	return $html;
}