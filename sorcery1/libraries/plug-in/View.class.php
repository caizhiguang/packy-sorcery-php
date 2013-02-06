<?php 
class View{
	private $_suffix;
	private $_template;

	function __construct($_template){
		$this->_template = $_template;
		$this->_suffix = '.html';
	}

	protected function display($path='') {
		$tmpPath = __MODEL__.'/'.__ACTION__.$this->_suffix;
		$this->_template->display($path==''?$tmpPath:$path);
	}

	protected function assign($name,$val) {
		$this->_template->assign($name,$val);
	}
}