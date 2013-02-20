<?php
class TaskAction extends Action {

	var $tag,$task;

	function _initialize(){
		$this->tag = D('tags');
		$this->task = D('tasks');
	}

    public function index(){

    	$this->tags();
    	$this->tasks();

		$this->display();
    }

    public function api(){
    	if(!$_POST['action']) $this->ajaxReturn(0,'没有请求任何操作！',0);

    	$action = $_POST['action'];
    	unset($_POST['action']);
    	$this->$action(true);
    }

    public function tasks(){
    	$tasks = $this->task->select();
    	$this->assign('tasks',$tasks);
    }

    public function add_task($is_ajax=false){

    }

    public function update_task($is_ajax=false){

    }

    public function delete_task($is_ajax=false){

    }

    public function tags(){
    	$tags = $this->tag->select();
    	$this->assign('tags',$tags);
    }

    public function add_tag($is_ajax=false){

		$data = $_POST;

    	$verification = $this->tag->create($data);//检验数据有效性
    	if(!$this->verify($verification,$this->tag)) return;
    	$verification = $this->tag->add($data);//能否于数据库中添加(修改、删除)数据
    	if(!$this->verify($verification,$this->tag)) return;

    	//返回成功信息
    	$message = '添加完成！';
    	if($is_ajax){
			$this->ajaxReturn(1,$message,0);
		}else{
			$this->success($message);
		}
    }

    public function update_tag($is_ajax=false){

    	$data = $_POST;

    	$verification = $this->tag->create($data);//检验数据有效性
    	if(!$this->verify($verification,$this->tag)) return;
    	$verification = $this->tag->save($data);//能否于数据库中添加(修改、删除)数据
    	if(!$this->verify($verification,$this->tag)) return;

    	//返回成功信息
    	$message = '编辑完成！';
    	if($is_ajax){
			$this->ajaxReturn(1,$message,0);
		}else{
			$this->success($message);
		}
    }

    public function delete_tag($is_ajax=false){

    	$data = $_POST;
    	if(!$this->verify(!$data['id'],$this->tag)) return;

    	$verification = $this->tag->where(array('id'=>$data['id']))->delete();
    	if(!$this->verify($verification,$this->tag)) return;

    	//返回成功信息
    	$message = '删除完成！';
    	if($is_ajax){
			$this->ajaxReturn(1,$message,0);
		}else{
			$this->success($message);
		}
    }


    public function verify($result,$model){
    	if(!$result){
    		if($is_ajax){
    			$this->ajaxReturn(0,$model->getError(),0);
    		}else{
    			$this->error($model->getError());
    		}
    		return false;
    	}
    	return true;
    }
}