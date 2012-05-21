<?php
class router{
	private $_request;
	function __construct(){
		
	}
	public function rewrite(){
		$this->_request = str_split2($_SERVER["REQUEST_URI"],'/');
		$control = import($this->_request[1]);
		$action = $this->_request[2];
		$control->$action();
	}
}