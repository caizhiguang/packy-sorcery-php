<?php
class AccountsAction extends Action{
	
	var $user;
	function __initialize(){
		$this->user = new User();
	}

	public function signin(){
		$verification = $this->user->create();//检验数据有效性
        if(!$verification){$this->error($this->user->getError());return;}
        $verification = $this->user->where($verification)->select();//
        if(!$verification){
        	$this->error('登录失败，但是别气馁 -v-)/！','',0);
        }else{
        	$user_id = $verification['id'];
        	session('user_id',$user_id);
        	cookie('user_id',$user_id,array('expire'=>86400,'prefix'=>'p_'));
        	$this->success('登录完成，稍后数秒为你跳转 /(-L -)。','',$user_id);
        }
	}

	public function signout(){
		$message = ''
		if(session('?user_id')){
			$this->error('(。_ 。;)这页面啥都没有啊！');
		}else if(session('user_id')!=$_GET['id']){
			$this->error('(。_ 。;)这页面啥都没有啊！');
		}else{
			session('user_id',null);
			cookie('user_id',null);
			$this->success('登出完成，安心走好，不送~~(→＿→)。');
		}
	}

	public function register(){
		$verification = $this->user->create($data);//检验数据有效性
        if(!$verification){$this->error($this->user->getError());return;}
        $verification = $this->user->add($verification);//能否于数据库中添加(修改、删除)数据
        if(!$verification){$this->error($this->user->getError());return;}

        $this->success('恭喜，现在可以使用我（Packy）写的很烂的程序了(。_。)。','',$verification['id']);
	}

}