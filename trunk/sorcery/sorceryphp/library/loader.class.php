<?php
class loader{
	private $_plug_path,$_scope,$_classes;
	
	function __construct(){
		$this->_plug_path = array();
		$this->_classes = array();
		$this->_scope = array();
	}
	function __get($key){
		switch($key){
			case "scope":
				return $this->_scope;
				break;
			default:
				if(array_key_exists($key,$this->_scope)){return $this->_scope[$key];}		
				break;
		}
		return null;
	}
	
	public function importPlug($dir){
		$this->_plug_path[] = $dir;
	}
	public function import($class){
		if(array_key_exists($class,$this->_classes)){return;}
		foreach($this->_plug_path as $path){
			$fullpath = $path.$class.'.class.php';
			if(!file_exists($fullpath)) continue;
			$this->_classes[$class] = $fullpath;
			require_once $this->_classes[$class];
			break;
		}
	}
	
	public function create($classname,$obj=""){
		if($obj===""){
			$this->import($classname);
			$obj = new $classname;
		}
		if(array_key_exists($classname,$this->_scope)){
			$obj = $this->_scope[$classname];
		}else{
			$this->_scope[$classname]=$obj;
		}
		
		return $obj;
	}
	public function release($classname){
		$result = $this->_scope[$classname];
		array_splice($this->_scope,$classname);
		return $result;
	}
	public function getScope(){
		return $this->_scope;
	}
	public function clearScope(){
		$this->_scope = array(); 
	}
}