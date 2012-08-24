<?php
class loader{
	private $scope = array();

	public function setScope($scope){
		if(!is_array($scope)) array($scope);
		array_merge($this->scope,$scope);		
	}

	public function import($path,$suffix='class'){
		$path = preg_replace('/\./', '/', $path);
		if(count(preg_split('/\//', $path))>=1){
			for ($i=0; $i < count($this->scope); $i++) { 
				if(!$this->exist($this->scope[$i]."/$path",$suffix)) continue;
				$path = $this->scope[$i].'/'.$path;
			}
		}

		if(!$this->exist($path,$suffix)) return false;
		return require_once $path.($suffix?".$suffix.php":'.php');
	}

	protected function exist($path,$suffix='class'){
		return file_exists($path.($suffix?".$suffix.php":'.php'));
	}
}