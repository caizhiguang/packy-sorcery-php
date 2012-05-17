<?php
class directory{
	private $_path,$_file;
	function __construct($path){
		$this->_path = $path;
	}
	
	public function dirlist(){
		return scandir($this->_path);
	}
}