<?php
require_once SORCERY_PATH.'common.php';
require_once SORCERY_PATH.'pool.class.php';
require_once PLUG_PATH.'smarty_lib/Smarty.class.php';

class sorcery{
	public static $_pool;
	public static function run(){
		self::$_pool = new pool();
		$pool = &self::$_pool;
		$pool->add("smarty",new Smarty());
		
		$smarty = &$pool->smarty;
		$smarty->template_dir = APP_PATH.'template/';
		$smarty->compile_dir = APP_PATH.'cache/temp/';
		$smarty->cache_dir = APP_PATH.'cache/data/';
		$smarty->config_dir = CONFIG_PATH.'smarty_config/';
		
		$smarty->assign('test','FUCK!!!!!!!!');
		$smarty->display('index.html');
	}
}