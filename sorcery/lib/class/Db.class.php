<?php
class Db extends Base{
	protected $con;
	protected function __construct($host,$user,$pass){
		$this->con = mysql_connect($host,$user,$pass);
	}
}