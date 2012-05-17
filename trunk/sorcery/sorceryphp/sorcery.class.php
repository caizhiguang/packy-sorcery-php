<?php
require_once SORCERY_PATH.'common.php';
require_once SORCERY_PATH.'library/pool.class.php';
require_once PLUG_PATH.'smarty_lib/Smarty.class.php';

class sorcery{
	public static function run(){
		self::$_sorcery = new sorcery();
	}
	public static $_sorcery;
	
	private $_pool;
	function __construct(){
		$this->_pool = new pool();
		$this->_pool->add("smarty",new Smarty());
		
		$this->_loader = array();
		
		$smarty = &$this->_pool->smarty;
		$smarty->template_dir = APP_PATH.'template/';
		$smarty->compile_dir = APP_PATH.'cache/temp/';
		$smarty->cache_dir = APP_PATH.'cache/data/';
		$smarty->config_dir = CONFIG_PATH.'smarty_config/';
		
		$smarty->assign('test','FUCK!!!!!!!!');
		$smarty->display('index.html');
	}
}