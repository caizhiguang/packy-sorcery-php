<?php
class IndexAction extends BaseAction
{
	public function index()
    {
    	//$this->display(THINK_PATH.'/Tpl/Autoindex/hello.html');
    	$this->assign('options',array(
    		array('name'=>'显示选项','content'=>'123123123'),
    		array('name'=>'帮助','content'=>'帮助帮助帮助帮助帮助')
    	));
    	$this->assign('website',array(
    		'name'=>'鼠尾草 官方网站'
    	));
    	$this->assign('websites',array(
    		array('name'=>'鼠尾草 官方网站','url'=>''),
    		array('name'=>'过去式的部落格','url'=>'')
    	));
    	$this->assign('applications',array(
    		array('name'=>'管理台','iconClass'=>'iCenter','url'=>'','current'=>'current'),
    		array('name'=>'文章','iconClass'=>'','url'=>'','current'=>''),
    		array('name'=>'用户','iconClass'=>'','url'=>'','current'=>''),
    		array('name'=>'设置','iconClass'=>'','url'=>'','current'=>''),
    		array('name'=>'工具','iconClass'=>'','url'=>'','current'=>'')
    	));
    	$this->display();
    }
    public function test_data()
    {
    	$this->ajaxReturn(Array(
    		'user'=>Array(
    			'name'=>'hahaha233',
    			'sex'=>'女'
    		),
    		'data'=>Array('1','2','3')
    	),'test',1);
    }
}
?>