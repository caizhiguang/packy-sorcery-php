<?php
class index{
	function __construct(){
		
	}
	
	public function index(){
		$smarty = import('smarty');
		$smarty->assign('test','FUCK!!!!!!!!');
		$smarty->display('file:index\index.html');
	}
}