<?php
function dump($var, $echo=true, $label=null, $strict=true) {
    $label = ($label === null) ? '' : rtrim($label) . ' ';
    if (!$strict) {
        if (ini_get('html_errors')) {
            $output = print_r($var, true);
            $output = '<pre>' . $label . htmlspecialchars($output, ENT_QUOTES) . '</pre>';
        } else {
            $output = $label . print_r($var, true);
        }
    } else {
        ob_start();
        var_dump($var);
        $output = ob_get_clean();
        if (!extension_loaded('xdebug')) {
            $output = preg_replace('/\]\=\>\n(\s+)/m', '] => ', $output);
            $output = '<pre>' . $label . htmlspecialchars($output, ENT_QUOTES) . '</pre>';
        }
    }
    if ($echo) {
        echo($output);
        return null;
    }else
        return $output;
}

class proxy{
	var $_mirror = '';

	public function SetMirror($val){
		$this->_mirror = $val;
	}

	public function SetRequestHeaders(){

	}

	public function Open($model, $arg=null, $url=null){

		$mirror = $url?$url:$this->_mirror;	// Change this value to the site you want to mirror.
		$model = $model?$model:$_SERVER['REQUEST_URI'];

		$content_type = $_SERVER['CONTENT_TYPE']?$_SERVER['CONTENT_TYPE']:'';

		$req = 'POST' . ' ' . $model . " HTTP/1.1\r\n";//$_SERVER['REQUEST_METHOD']
		$length = 0;
		foreach ($_SERVER as $k => $v) {
			if (substr($k, 0, 5) == "HTTP_") {
				$k = str_replace('_', ' ', substr($k, 5));
				$k = str_replace(' ', '-', ucwords(strtolower($k)));
				if ($k == "Host")
					$v = $mirror;						# Alter "Host" header to mirrored server
				if ($k == "Accept-Encoding")
					$v = "identity;q=1.0, *;q=0";		# Alter "Accept-Encoding" header to accept unencoded content only
				if ($k == "Keep-Alive")
					continue;							# Drop "Keep-Alive" header
				if ($k == "Connection" && $v == "keep-alive")
					$v = "close";						# Alter value of "Connection" header from "keep-alive" to "close"
				$req .= $k . ": " . $v . "\r\n";
			}
		}
		$body = @file_get_contents('php://input');
		$req .= "Content-Type: " . $content_type . "\r\n";
		$req .= "Content-Length: " . strlen($body) . "\r\n";
		$req .= "\r\n";
		$req .= $body;

		dump(strlen($body));

		$fp = fsockopen($mirror, 80, $errno, $errmsg, 30);
		if (!$fp) {
			print "HTTP/1.0 502 Failed to connect remote server\r\n";
			print "Content-Type: text/html\r\n\r\n";
			print "<html><body>Failed to connect to $mirror due to:<br>[$errno] $errstr</body></html>";
			exit;
		}
		fwrite($fp, $req);
		$headers_processed = 0;
		$response = '';
		while (!feof($fp)) {
			$r = fread($fp, 8192);
			if (!$headers_processed) {
				$response .= $r;
				$nlnl = strpos($response, "\r\n\r\n");
				$add = 4;
				if (!$nlnl) {
					$nlnl = strpos($response, "\n\n");
					$add = 2;
				}
				if (!$nlnl)
					continue;
				$headers = substr($response, 0, $nlnl);
				$cookies = 'Set-Cookie: ';
				if (preg_match_all('/^(.*?)(\r?\n|$)/ims', $headers, $matches))
					for ($i = 0; $i < count($matches[0]); ++$i) {
						$ct = $matches[1][$i];
		#				if (substr($ct, 0, 12) == "Set-Cookie: ") {
		#					$cookies .= substr($ct, 12) . ',';
		#					header($cookies);
		#				} else
							header($ct, false);
		#				print '>>' . $ct . "\r\n";
					}
				print substr($response, $nlnl + $add);
				$headers_processed = 1;
			} else
				print $r;
		}
		fclose ($fp);
	}
}

// $proxy = new proxy();
// $proxy->SetMirror("blog.lpreterite.com");
// $proxy->Open('/category/设计日记/');

$proxy = new proxy();
$proxy->SetMirror("api.opendrive.com");
$proxy->Open('od_operations_api.php');

?>
