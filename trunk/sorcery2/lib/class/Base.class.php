<?php
class Base{
	var $__fields;
	
	protected function __construct(){
		$this->__fields = array();
	}
	protected function __set($n,$v){
		$this->__fields[$n] = $v;
	}
	protected function __get($n){
		return $this->__fields[$n];
	}
}