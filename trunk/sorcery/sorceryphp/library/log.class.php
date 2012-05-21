<?php
class log{
	private $_log;
	function __construct(){
		$this->_log = array();
	}
	public function getAll(){
		return $this->_log;
	}
	public function add($time,$content){
		$this->_log[$time]=$content;
	}
	public function clear(){
		$this->_log = array();
	}
}