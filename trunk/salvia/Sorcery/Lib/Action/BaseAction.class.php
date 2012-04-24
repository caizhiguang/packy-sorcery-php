<?php
class BaseAction extends Action
{
	//检查是否已登录，如未登录将跳转，用于必须登录才可进入的页面。
	protected function checkLogin($sekey,$urlreg,$data)
	{
		if(!(isset($_SESSION[$sekey]) && isset($_SESSION[$sekey]['id'])))
		{
			$this->redirect($urlreg,$data,0);
		}
	}
}
?>