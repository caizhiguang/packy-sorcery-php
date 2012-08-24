<?php
class router{
	public function getRoute($rule){
		$url = $this->getURL();//取得访问地址
		$array = parse_url($url);//格式化地址
		$path = preg_replace("/(\/index.php\/)|(\/?\?.+\/)/s",'', $array['path']);//过滤入口文件，取得访问地址
		$param = array();
		
		//当有自定义规则优先处理
		if(!empty($rule)){
			for ($i=0; $i < count($rule); $i++) { 
				if(preg_match($rule[$i][0],$path)){
					$query = preg_replace($rule[$i][0],'', $path);
					$path = preg_replace('/\./','/',$rule[$i][1]);
				}
			}
		}

		$urlHash = str_split2($path,'/',2);
		if(empty($urlHash[0])) $result[0]='index';
		if(empty($urlHash[1])) $result[1]='index';

		if(empty($query)) $query = $urlHash[2];
		$query = preg_split('/\//', $query);
		if(!empty($array['query'])){
			$query = $array['query'];
			parse_str($query, $query);
		}

		for ($i=0; $i < count($query); $i++) {
			if(($i+1)%2==0){
				$param[$parameter_key] = $query[$i];
			}else{
				$parameter_key = $query[$i];
			}
		}
		unset($parameter_key);

		// define('MODEL_NAME',$urlHash[0]);
		// define('ACTION_NAME',$urlHash[1]);
	
		// $_REQUEST = array_merge($_POST,$_GET);

		return array(
			'entrance'=>'index.php',
			'model'=>$urlHash[0],
			'action'=>$urlHash[1],
			'param'=>$param
		);
	}

	protected function getURL(){
		return $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
	}

}