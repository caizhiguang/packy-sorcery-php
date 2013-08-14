<?php

require_once dirname(__FILE__).'/http.php';

/**
 *  OpenDrive -- Sample Class
 *
 *
 */
class OpenDrive
{
	/**
     *  Public Key
     */
	private $_public_key;
	/**
     *  Private Key
     */
	private $_private_key;
	/**
     *  Http Object class
     */
	private $_http;
	/**
     *  Base URL
     */
	private $_url = "";
	/**
     *  Error String
     */
	private $_error = '';

	/**
     *  Communication format
     */
	protected $format = 'php';

	/**
     *  Last raw response
     */
	protected $lastResponse;

	/**
     *  User session id
     */
	protected $session_id = false;
	protected $level = false;
	protected $auth_status = false;


	function setFormat($format) {
		switch (strtolower($format)) {
			case 'php':
			case 'json':
			case 'xml':
				$this->format = strtolower($format);
				return true;
			default:
				return false;
		}
	}

	/**
     *  Contructor class
     *
     *  @param string $public_key
     *  @param string $private_key
     */
	function __construct($public_key, $private_key)
	{
		if (strlen($public_key) < 5 && strlen($private_key) < 40) {
			throw new Exception("Invalid public or private key");
		}
		$this->_public_key  = $public_key;
		$this->_private_key = $private_key;
		/* init our HTTP client */
		$http             = new http_class;
		$http->user_agent = "OpenDrive/2.3";
		$this->_http      = & $http;

		$host = 'http://api.opendrive.com';//http://lpreterite.com:8081/sercer/
		$path_url = $host.'/od_get_path.php';
		$args = $this->prepareRequest("POST", $path_url, array('version'=>'1.3.14.4'));
		$body = $this->processRequest($args);

		preg_match("/<Path>(.+)<\/Path>/im", $body, $matches);
		if ( sizeof($matches) > 0 && $matches[1] != '')
		{
			$this->_url = $host.$matches[1]."od_operations_api.php";
			unset($matches);
		}
		// get session
		$this->_getSessionId();
	}

	function XML2Array($contents, $get_attributes=1, $priority = 'tag') {
		$xml = simplexml_load_string($contents, 'SimpleXMLElement', LIBXML_NOCDATA);
		return $this->xmlobj2array($xml);
	}


	function xmlobj2array($obj, $level=0) {
		$items = array();
		if(!is_object($obj)) return $items;
		$child = (array)$obj;
		if(sizeof($child)>1) {
			foreach($child as $aa=>$bb) {
				if(is_array($bb)) {
					foreach($bb as $ee=>$ff) {
						if(!is_object($ff)) {
							$items[$aa][$ee] = $ff;
						} else
						if(get_class($ff)=='SimpleXMLElement') {
							$ret = $this->xmlobj2array($ff,$level+1);
							if (empty($ret)) {
								$ret = null;
							}
							$items[$aa][$ee] = $ret;
						}
					}
				} else
				if(!is_object($bb)) {
					$items[$aa] = $bb;
				} else
				if(get_class($bb)=='SimpleXMLElement') {
					$ret = $this->xmlobj2array($bb,$level+1);
					if (empty($ret)) {
						$ret = null;
					}
					$items[$aa] = $ret;
				}
			}
		} else
		if(sizeof($child)>0) {
			foreach($child as $aa=>$bb) {
				if(!is_array($bb)&&!is_object($bb)) {
					$items[$aa] = $bb;
				} else
				if(is_object($bb)) {
					$items[$aa] = $this->xmlobj2array($bb,$level+1);
				} else {
					foreach($bb as $cc=>$dd) {
						if(!is_object($dd)) {
							$items[$obj->getName()][$cc] = $dd;
						} else
						if(get_class($dd)=='SimpleXMLElement') {
							$ret = $this->xmlobj2array($dd,$level+1);
							if (empty($ret)) {
								$ret = null;
							}
							$items[$obj->getName()][$cc] = $ret;
						}
					}
				}
			}
		}
		return $items;
	}

	final function getFolderContent($folder_id)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=get_folder_content&format={$this->format}&folder_id={$folder_id}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function createFolder($folder_name, $parent_folder_id = 0)
	{
		if ( $this->session_id )
		{
			$folder_name = urlencode(trim($folder_name));
			$args = $this->prepareRequest("GET", "?op=folder_create&format={$this->format}&folder_id={$parent_folder_id}&folder_name={$folder_name}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}

	}

	final function renameFolder($folder_id, $new_folder_name)
	{
		if ( $this->session_id )
		{
			$folder_name = urlencode(trim($new_folder_name));
			$args = $this->prepareRequest("GET", "?op=folder_rename&format={$this->format}&folder_id={$folder_id}&new_folder_name={$new_folder_name}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}

	}

	final function removeFolder($folder_id)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=folder_remove&format={$this->format}&folder_id={$folder_id}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function trashFolder($folder_id)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=folder_trash&format={$this->format}&folder_id={$folder_id}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function restoreFolder($folder_id)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=folder_restore&format={$this->format}&folder_id={$folder_id}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function copyFolder($src_folder_id, $dest_folder_id, $new_folder_name = '', $move = false)
	{
		$move = intval($move);
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=folder_copy&format={$this->format}&src_folder_id={$src_folder_id}&dest_folder_id={$dest_folder_id}&new_folder_name={$new_folder_name}&move={$move}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function renameFile($file_id, $new_file_name)
	{
		if ( $this->session_id )
		{
			$new_file_name = urlencode(trim($new_file_name));
			$args = $this->prepareRequest("GET", "?op=file_rename&format={$this->format}&file_id={$file_id}&new_file_name={$new_file_name}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function removeFile($file_id)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=file_remove&format={$this->format}&file_id={$file_id}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function trashFile($file_id)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=file_trash&format={$this->format}&file_id={$file_id}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function restoreFile($file_id)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=file_restore&format={$this->format}&file_id={$file_id}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function setFileAccess($file_id, $access)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=file_set_access&format={$this->format}&file_id={$file_id}&access={$access}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function setFolderAccess($folder_id, $access)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=folder_set_access&format={$this->format}&folder_id={$folder_id}&access={$access}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}
	final function newProfile($user_name, $passwd, $verify_passwd, $email, $first_name, $last_name)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=new_profile&format={$this->format}&user_name=$user_name&passwd=$passwd&verify_passwd=$verify_passwd&email=$email&first_name=$first_name&last_name=$last_name&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function getPrivateKey($username)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=get_private_key&format={$this->format}&username=$username&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function getUserInfo()
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=get_user_info&format={$this->format}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}


	final function copyFile($src_file_id, $dest_folder_id, $move = false)
	{
		$move = intval($move);
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=file_copy&format={$this->format}&src_file_id={$src_file_id}&dest_folder_id={$dest_folder_id}&move={$move}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function thumbnailFile($file_id)
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=file_thumbnail&file_id={$file_id}&session_id={$this->session_id}");
			$url = $args['Protocol']."://".$args['HostName'].$args['RequestURI'];
			//$body = $this->processRequest($args);
			return $url;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}



	final function getUploadURL()
	{
		if ( $this->session_id )
		{
			return $this->_url.'?session_id='.$this->session_id."&level=".$this->level."&format=json";
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}

	final function listTrash()
	{
		if ( $this->session_id )
		{
			$args = $this->prepareRequest("GET", "?op=list_trash&format={$this->format}&session_id={$this->session_id}");
			$body = $this->processRequest($args);
			return $body;
		}
		else
		{
			echo 'session failed';
			return false;
		}
	}


	private function _getSessionId()
	{
		$args = $this->prepareRequest("GET", "?op=get_session_id&format={$this->format}&public_key=".$this->_public_key."&private_key=".$this->_private_key );
		$body = $this->processRequest($args);
		$var  = $this->unserialize($body);
		if ( isset($var['session_id']) )
		{
			$this->session_id = $var['session_id'];
			$this->level = $var['level'];
			$this->auth_status = $var['auth'];
			return true;
		}
		else
		{
			echo $var['error'];
			return false;
		}
	}

	/**
     *  Sign Request
     *
     *  This method generates the sign hash based on the parameters
     *  of the current HTTP request
     *
     *  @param string $method   GET, POST, INFO
     *  @param string $uri      URI to request
     *  @param string $post     Array of post paramenters
     *  @param string $files    Array of files to upload, if any
     *  @param string $host     Host name
     *  @param string $date     HTTP request Date
     *
     */
	final private function _signRequest($method, $uri, $post, $files, $host, $date)
	{
		$query='';
		extract(parse_url($uri));

		foreach ($files as &$file) {
			$file = basename($file);
		}
		unset($file);

		$http = & $this->_http;
		$sign  = "";
		$sign .= "DATE:{$date}\n";
		$sign .= "FILES:".implode(",", $files)."\n";
		$sign .= "GET:{$query}\n";
		$sign .= "HOST:{$host}\n";
		$sign .= "METHOD:{$method}\n";
		$sign .= "POST:".http_build_query($post)."\n";
		$sign .= "URI:{$path}\n";
		$sign .= "USER_AGENT:{$http->user_agent}\n";
		$sign .= $this->_private_key;
		$sign = sha1($this->_private_key.sha1($sign));
		return $sign;
	}

	public function unserialize($string) {
		switch ($this->format) {
			case 'php':
				$object = unserialize($string);
				break;
			case 'json':
				$object = json_decode($string, true);
				break;
			case 'xml':
				$object = $this->XML2Array($string);
				break;
			default:
				throw new Exception("Unknown serialization format");
				break;
		}
		$this->lastResponse = $string;
		if (!is_array($object)) {
			throw new Exception("Invalid server response: " . $string);
		}
		return $object;
	}


	/**
     *  Prepare Request
     *
     *  This function prepare our Http Client object, based on the paramenters.
     *
     *  @param string $method   GET, POST, INFO
     *  @param string $uri      URI which is gonna be appended to BaseURI
     *  @param array  $post     List of Post params
     *  @param array  $files    List of files to upload
     *
     */
	protected function prepareRequest($method, $uri, $post = array(), $files = array())
	{
		$http = & $this->_http;
		$url  = $this->_url.$uri;
		if (($err = $http->GetRequestArguments($url, $args)) != "") {
			throw new Exception($err);
		}

		if (count($post) > 0) {
			$args['PostValues'] = $post;
		}
		if (count($files) > 0) {
			foreach ($files as $id => $file) {
				$args['PostFiles']["file_{$id}"] = array(
				'FileName'     => $file,
				'Content-Type' => 'automatic/name',
				);
			}
		}

		$http->request_method = $method;
		$header = & $args['Headers'];
		$header['Date']   = gmdate("D, d M Y H:i:s T");
		$request_sign     = $this->_signRequest($method, $url, $post, $files, $header['Host'], $header['Date']);
		$header['ODAuth'] = $this->_public_key.":".$request_sign;

		unset($headers, $http);
		return $args;
	}

	/**
     *  This function process a already prepared query.
     *
     *  @param  array $args List of arguments
     */
	protected function processRequest($args)
	{
		$http = & $this->_http;
		if (($err = $http->open($args)) != "") {
			throw new Exception($err);
		}
		if (($err = $http->SendRequest($args)) != "") {
			throw new Exception($err);
		}
		if (($err = $http->ReadReplyHeaders($headers)) != "") {
			throw new Exception($err);
		}
		$body = '';
		do {
			$err = $http->ReadReplyBody($read, 4096);
			if ($read == "" || $err != "") {
				break;
			}
			$body .= $read;
		} while (true);
		if ($err != "") {
			throw new Exception($err);
		}
		$http->close();
		return $body;
	}

}

