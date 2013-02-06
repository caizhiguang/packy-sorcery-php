<?php
class Index extends View{
	public function index(){
		$this->assign('test','FUCK!');
		$this->display();
	}
}