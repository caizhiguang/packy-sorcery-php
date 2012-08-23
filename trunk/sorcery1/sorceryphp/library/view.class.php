<?php
class view{
	public static $route;
	public static function setRoute($view,$action,$parameter){
		self::$route['view'] = $view;
		self::$route['action'] = $action;
		self::$route['parameter'] = $parameter;
	}
	
	
	private $_suffix;
	private $_template;
	function __construct($template=''){
		$this->_suffix = '.html';
		$this->_route = array();
		$this->setTemplate($template);
	}
	
	public function setTemplate($template){
		$this->_template = $template;
	}
	
	protected function display($path='') {
		if($path===null){return;}
		$tmpPath = self::$route['view'].'\\'.self::$route['action'].$this->_suffix;
		$this->_template->display($path==''?$tmpPath:$path);
		return;
	}

	protected function assign($name,$val) {
		$this->_template->assign($name,$val);
		return;
	}
}