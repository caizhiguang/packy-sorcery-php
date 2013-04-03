<?php
class TaskAction extends Action {

	var $tag,$task;

	function _initialize(){
		$this->tag = D('tags');
		$this->task = D('tasks');
	}

    public function task(){
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'PUT':
                $this->update_task();
                break;
            case 'POST':
                $this->add_task();
                break;
            case 'GET':
                $result = $this->tasks();
                $this->ajaxReturn($result,'',$result?1:0);
                break;
            case 'DELETE':
                $this->delete_task($_GET['_URL_'][strlen($_GET['_URL_'])-1]);
                break;
            default:
                # code...
                break;
        }
    }

    public function index(){

        if($_GET['t']=='all')
            $tasks = $this->tasks();
        else
            $tasks = $this->tasks_effective();

    	$this->tags();

        $this->assign('tasks',$tasks);
		$this->display();
    }

    public function api(){
        // switch ($_GET['action']) {
        //     case 'tasks':
        //         $result = $this->tasks();
        //         $this->ajaxReturn($result,'',$result?1:0);
        //         break;
        //     case 'calendar':
        //         $result = $this->calendar();
        //         $this->ajaxReturn($result);
        //         break;
        //     default:
        //         # code...
        //         break;
        // }
        call_user_func($this,'test');
    }

    public function test(){
        dump(233);
    }

    public function calendar(){
        $month = $_GET['month']?$_GET['month']:date('n');

        $year = date('Y');
        $day = date('j');

        $nextMonth = $month+1;
        $prevMonth = $month-1;

        $days = date('t',mktime(0,0,0,$month,$day,$year));
        $inWeek = date('w');
        $firstOfMonthInWeek = date('w',mktime(0,0,0,$month,1,$year));
        $lastOfMonthInWeek = date('w',mktime(0,0,0,$month,$days,$year));

        $displayCount = ($firstOfMonthInWeek-1)+(7-$lastOfMonthInWeek)+$days;
        $result = array(
            'year'=>$year,
            'month'=>$month,
            'day'=>$day,
            'days'=>array()
        );
        for ($i=0; $i < $displayCount; $i++) { 
            $number = $i-$firstOfMonthInWeek;
            $m = $month;
            if($i<$firstOfMonthInWeek){
                $number = date('t',mktime(0,0,0,$month-1,1,$year))-$firstOfMonthInWeek+$i;
                $m = $prevMonth;
            }
            if($i-$firstOfMonthInWeek>=$days){
                $number = $i-$firstOfMonthInWeek-$days;
                $m = $nextMonth;
            }

            $number++;

            $result['days'][]= array(
                'number'=>$number,
                'week'=>date('w',mktime(0,0,0,$m,$number,date('Y',mktime(0,0,0,$m,$year)))),
                'month'=>$m,
            );
        }

        return $result;
    }

    public function tasks(){
    	return $this->task->order('end_time asc')->select();
    }

    public function tasks_effective(){
        $begin = time();

        return $this->task->where(array('end_time'=>array('egt',date('Y-m-d h:i:s',$begin))))->order('end_time asc')->select();
    }

    public function tasks_today(){

        $begin = time();
        $end = time()+60*60*24-1;

        return $this->task->where(array('end_time'=>array('between',array(date('Y-m-d h:i:s',$begin),date('Y-m-d h:i:s',$end)))))->order('end_time asc')->select();
    }

    public function add_task(){
        
        $data = $_POST;

        $verification = $this->task->create($data);//检验数据有效性
        if(!$verification){$this->error($this->task->getError());return;}
        $verification = $this->task->add($verification);//能否于数据库中添加(修改、删除)数据
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
        $verification = $this->task->save($verification);//能否于数据库中添加(修改、删除)数据
        if(!$verification){$this->error($this->task->getError());return;}
        $data['id'] = $verification;
        $data['important'] = strtotime($data['end_time'])==time();


        //返回成功信息
        $message = '编辑完成！';
        $this->success($message,'',$data);
    }

    public function delete_task($id){
        $data = $_REQUEST;
        $data['id'] = !$data['id'] ? $id : $data['id'];
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
    	$verification = $this->tag->add($verification);//能否于数据库中添加(修改、删除)数据
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
    	$verification = $this->tag->save($verification);//能否于数据库中添加(修改、删除)数据
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