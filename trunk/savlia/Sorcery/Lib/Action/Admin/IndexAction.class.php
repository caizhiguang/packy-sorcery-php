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
    	$this->assign('appnav',array(
    		array('name'=>'文章','iconClass'=>'iCenter','url'=>'','current'=>'current','items'=>array(
    			array('name'=>'所有文章','url'=>'','current'=>'current'),
    			array('name'=>'写文章','url'=>'','current'=>''),
    			array('name'=>'分类目录','url'=>'','current'=>''),
    			array('name'=>'标签','url'=>'','current'=>''),
    		)),
    		array('name'=>'评论','iconClass'=>'iComment','url'=>'','current'=>''),
    		array('name'=>'媒体','iconClass'=>'iMedia','url'=>'','current'=>'','items'=>array(
    			array('name'=>'媒体库','url'=>'','current'=>''),
    			array('name'=>'添加媒体','url'=>'','current'=>''),
    		)),
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