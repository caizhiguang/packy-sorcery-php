<?php
return array(
	//'配置项'=>'配置值'
	
	//数据库设置
	'DB_TYPE'		=>	'mysql',
    'DB_HOST'		=>	'localhost',
    'DB_NAME'		=>	'lprete_blog',
    'DB_USER'		=>	'root',
    'DB_PWD'		=>	'',
    'DB_PORT'		=>	'3306',
    'DB_PREFIX'		=>	'p_',

    // 'DB_TYPE'       =>  'mysql',
    // 'DB_HOST'       =>  'localhost',
    // 'DB_NAME'       =>  'lprete_app',
    // 'DB_USER'       =>  'lprete',
    // 'DB_PWD'        =>  '310died666lp',
    // 'DB_PORT'       =>  '3306',
    // 'DB_PREFIX'     =>  'p_',


    //模板设置
    'TMPL_L_DELIM'=>'{',//模板引擎普通标签开始标记
	'TMPL_R_DELIM'=>'}',//模板引擎普通标签结束标记

	// 'TAGLIB_BEGIN'=>'[',//标签库标签开始标签
	// 'TAGLIB_END'=>']',//标签库标签结束标记
    
    //路由
    'URL_CASE_INSENSITIVE' =>true,//路由没有大小写规范
    'URL_MODEL' => 2,
);
?>