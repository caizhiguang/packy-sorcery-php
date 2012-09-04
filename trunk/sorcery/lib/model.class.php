<?php
class model{
	private static $database;
	static function setDB($db){
		self::$database = $db;
		self::$database->connect();
	} 

	private $table_name;
	public function setTableName($table_name){
		$this->table_name = $table_name;
	}
	
	private $sql;
	public function query($sql){
		$this->sql = $sql;
		return self::$database->query($sql);
	} 

	private $sql_where;
	public function where($parameter){
		$type = typeof($parameter);
		
		switch($type){
			case 'array':

				break;
			case 'string':
				$this->sql_where = $parameter;
				break;
		}

		return $tihs;
	}
}

