<?php
// 本类由系统自动生成，仅供测试用途
class TestAction extends Action {
    public function index(){
		$this->display();
    }
    public function api(){
    	switch ($_SERVER['REQUEST_METHOD']) {
            case 'PUT':
            case 'POST':
                $_PUT = json_decode(file_get_contents('php://input'),true);//取得Put内容
                // $this->save($_PUT);
                $this->ajaxReturn($_PUT);
                break;
            case 'GET':
                $result = $this->getAll(true);
                break;
            case 'DELETE':
                $this->delete($_GET['_URL_'][count($_GET['_URL_'])-1]);
                break;
            default:
                $this->display();
                break;
        }
    }
    public function upload(){
    	$this->ajaxReturn($_POST);
    }
}