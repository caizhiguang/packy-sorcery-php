<?php
class IndexAction extends BaseAction
{
	public function index()
    {
    	$this->display();
    }
    public function test_data()
    {
    	$this->ajaxReturn(Array(
    		'user'=>Array(
    			"name"=>"hahaha233",
    			'sex'=>"女"
    		),
    		'data'=>Array("1","2","3")
    	),'test',1);
    }
}
?>