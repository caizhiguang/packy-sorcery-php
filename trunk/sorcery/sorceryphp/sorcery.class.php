<?php
require_once SORCERY_PATH.'common.php';
require_once SORCERY_PATH.'library/pool.class.php';
require_once SORCERY_PATH.'library/loader.class.php';
require_once SORCERY_PATH.'library/log.class.php';
require_once PLUG_PATH.'smarty_lib/Smarty.class.php';

class sorcery{
	public static $_sorcery;
	public static function run(){
		$GLOBALS['sorcery'] = self::$_sorcery = new sorcery();
	}
	
	private $_loader;
	private $_log;
	function __construct(){
		$this->_log = $this->import('log');
		$this->initLoader();
		$this->initSmarty();
	}
	
	private function initLoader(){
		$this->_loader = new loader();
		$this->_loader->importPlug(SORCERY_PATH."library/");
		$this->_loader->importPlug(SORCERY_PATH."database/");
		$this->_loader->importPlug(APP_PATH."controller/");
		$this->_loader->importPlug(APP_PATH."mode/");
	}
	
	private function initSmarty(){
		$this->_loader->create("smarty",new Smarty());
		
		$smarty = &$this->_loader->smarty;
		$smarty->template_dir = APP_PATH.'template/';
		$smarty->compile_dir = APP_PATH.'cache/temp/';
		$smarty->cache_dir = APP_PATH.'cache/data/';
		$smarty->config_dir = CONFIG_PATH.'smarty_config/';
	}
	
	public function import($classes,$instantiation=true){
		if(!$instantiation){
			$this->_loader->import($classes);
			return false;
		}else{
			return $this->_loader->create($classes);
		}
	}
}