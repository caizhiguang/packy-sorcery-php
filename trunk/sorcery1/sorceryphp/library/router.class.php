<?php
/*
 * 路由器
 * 导向程序加载库并运行
 * */
class router{
	private $_requestUrl;
	private $_route;
	private $_mode;//路由模式
	private $_pattern;//路由规则
	
	function __construct(){
		$this->_url = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		$this->_requestUrl = $_SERVER['REQUEST_URI'];
		$this->_mode = '0';
		$this->_pattern = array();
		$this->_route=array();
		
		$urlHash = str_split2(preg_replace("/(\/index.php)|(\/?\?.+)/s",'',$this->_requestUrl),'/',2);
		$count = count($urlHash);
		$this->_route['view'] = $count>1?$urlHash[0]:'index';
		$this->_route['action'] = $count>2?$urlHash[1]:'index';
		$this->_route['parameter'] = $count>=3?$urlHash[2]:$_GET;
		if($count>=3){
			$parameter = str_split2($this->_route['parameter'],'/');
			$this->_route['parameter'] = array();
			$parameter_key = "";
			foreach($parameter as $key=>$val){
				if(($key+1)%2==0){
					$this->_route['parameter'][$parameter_key] = $val;
				}else{
					$parameter_key = $val;
				}
			}
		}
	}
	
	function __get($key){
		switch($key){
			case 'mode':
				return $this->_mode;
			case 'pattern':
				return $this->_pattern;
		}
	}
	
	function __set($key,$value){
		switch($key){
			case 'mode':
			case 'pattern':
				$this->$key = $value;
				break;
		}
	}
	
	public function addPattern($pattern,$function_name){
		if(array_key_exists($pattern)){return;}
		$this->_pattern[$pattern] = $function_name;
	}
	public function removePattern($pattern){
		if(!array_key_exists($pattern)){return;}
		//TODO:删除规则
		//$this->_pattern[$pattern] = $function_name;
	}
	
	public function getRequestUrl() {
		return $this->_requestUrl;
	}

	public function getView($url='',$mode='0') {
		return $this->_route['view'];
	}

	public function getAction($url='',$mode='0') {
		return $this->_route['action'];
	}

	public function getParameter($url='',$mode='0') {
		return $this->_route['parameter'];
	}
	/*
	private $_requestUrl;
	private $_method;
	private $_action;
	private $_properties;
	private $_model;
	function __construct($model='0'){
		$this->_requestUrl = $_SERVER['REQUEST_URI'];
		$this->_model = $model;
	}
	
	//引导
	public function pilot(){
		$url_array = str_split2(preg_replace("/(\/index.php)|(\/?\?.+)/s",'',$_SERVER['REQUEST_URI']),'/');
		$url_array_count = count($url_array);
		if($url_array_count>1){$this->action = $url_array[0];}else{$this->action = 'index';}
		if($url_array_count>2){$this->method = $url_array[1];}else{$this->method='index';}
		//if($url_array_count>3){}
		
		$action = import($this->action);
		$method = $this->method;
		$action->$method();
	}*/
}