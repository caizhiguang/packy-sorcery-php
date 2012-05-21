<?php
/*
 * 路由器
 * 导向程序加载库并运行
 * */
class router{
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
	}
}