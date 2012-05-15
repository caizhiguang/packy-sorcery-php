<?php
class pool{
	private static $pool = array(); 
	public static function add($key,$obj){
		self::$pool[$key]=$obj;
	}
	public static function remove($key){
		array_splice(self::$pool,$key);
	}
	public static function clear(){
		$pool = array(); 
	}
}