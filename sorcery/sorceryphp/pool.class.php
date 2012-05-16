<?php
class pool{
	private $_pool = array();
	
	public function __get($key){
		return $this->_pool[$key];
	}
	
	public function add($key,$obj){
		$this->_pool[$key]=$obj;
	}
	public function remove($key){
		array_splice($this->_pool,$key);
	}
	public function getAll(){
		return $this->_pool;
	}
	public function clear(){
		$this->_pool = array(); 
	}
}