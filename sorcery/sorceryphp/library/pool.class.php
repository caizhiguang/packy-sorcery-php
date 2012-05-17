<?php
class pool{
	private $_pool = array();
	
	public function __get($key){
		if(array_key_exists($key,$this->_pool)){return $this->_pool[$key];}
		return null;
	}
	
	public function add($key,$obj){
		$this->_pool[$key]=$obj;
		return $obj;
	}
	public function remove($key){
		$result = $this->_pool->$key;
		array_splice($this->_pool,$key);
		return $result;
	}
	public function getAll(){
		return $this->_pool;
	}
	public function clear(){
		$this->_pool = array(); 
	}
}