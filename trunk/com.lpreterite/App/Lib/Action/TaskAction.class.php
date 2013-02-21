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

    public function tasks(){
    	$tasks = $this->task->select();
    	$this->assign('tasks',$tasks);
    }

    public function add_task(){
        
        $data = $_POST;

        $verification = $this->task->create($data);//检验数据有效性
        if(!$verification){$this->error($this->task->getError());return;}
        $verification = $this->task->add($data);//能否于数据库中添加(修改、删除)数据
        if(!$verification){$this->error($this->task->getError());return;}
        $data['id'] = $verification;


        //返回成功信息
        $message = '添加完成！';
        $this->success($message,'',$data);
    }

    public function update_task(){
        $data = $_POST;

        $verification = $this->task->create($data);//检验数据有效性
        if(!$verification){$this->error($this->task->getError());return;}
        $verification = $this->task->save($data);//能否于数据库中添加(修改、删除)数据
        if(!$verification){$this->error($this->task->getError());return;}
        $data['id'] = $verification;


        //返回成功信息
        $message = '添加完成！';
        $this->success($message,'',$data);
    }

    public function delete_task(){
        $data = $_REQUEST;
        if(!$data['id']){$this->error('id不存在');return;}

        $verification = $this->task->where(array('id'=>$data['id']))->delete();
        if(!$verification){$this->error($this->task->getError());return;}

        //返回成功信息
        $message = '删除完成！';
        $this->success($message,'',$data);
    }

    public function tags(){
    	$tags = $this->tag->select();
    	$this->assign('tags',$tags);
    }

    public function add_tag(){

		$data = $_POST;

    	$verification = $this->tag->create($data);//检验数据有效性
    	if(!$verification){$this->error($this->tag->getError());return;}
    	$verification = $this->tag->add($data);//能否于数据库中添加(修改、删除)数据
    	if(!$verification){$this->error($this->tag->getError());return;}
        $data['id'] = $verification;


    	//返回成功信息
        $message = '添加完成！';
        $this->success($message,'',$data);
    }

    public function update_tag(){

    	$data = $_POST;

    	$verification = $this->tag->create($data);//检验数据有效性
    	if(!$verification){$this->error($this->tag->getError());return;}
    	$verification = $this->tag->save($data);//能否于数据库中添加(修改、删除)数据
    	if(!$verification){$this->error($this->tag->getError());return;}

    	//返回成功信息
    	$message = '编辑完成！';
    	$this->success($message,'',$data);
    }

    public function delete_tag(){

    	$data = $_REQUEST;
    	if(!$data['id']){$this->error('id不存在');return;}

    	$verification = $this->tag->where(array('id'=>$data['id']))->delete();
    	if(!$verification){$this->error($this->tag->getError());return;}

    	//返回成功信息
    	$message = '删除完成！';
    	$this->success($message,'',$data);
    }
}