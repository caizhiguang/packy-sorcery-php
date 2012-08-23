<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>测试页</title>
<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/libraries.css" />
<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/mod.css" />
<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/grids.css" />
<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/content.css" />
<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/admin/public/base.css" />
<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/admin/public/icon.css" />
<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.tools.min.js"></script>
<!--[if IE]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script> 
<![endif]--> 
</head>

<body>
<div id="wrap">
<section class="topbar">
    <div class="websites">
    	<?php if(is_array($websites)): $i = 0; $__LIST__ = $websites;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$item): ++$i;$mod = ($i % 2 )?><a href="<?php echo ($website["url"]); ?>"><?php echo ($item["name"]); ?></a><?php endforeach; endif; else: echo "" ;endif; ?>
    </div>
    <dl class="userInfo">
        <dt><?php echo $_SESSION["User"]["name"];?></dt>
        <dd>
            <ul>
                <?php if(is_array($_SESSION["Function"])): $i = 0; $__LIST__ = $_SESSION["Function"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$fun): ++$i;$mod = ($i % 2 )?><li><a href="<?php echo ($fun["url"]); ?>"><?php echo ($fun["name"]); ?></a></li><?php endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </dd>
    </dl>
</section>
<header>
    <h1><?php echo ($website['name']); ?></h1>
    <nav>
        <ul>
        	<?php if(is_array($applications)): $i = 0; $__LIST__ = $applications;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$application): ++$i;$mod = ($i % 2 )?><li class="<?php echo ($application["current"]); ?>"><a href="<?php echo ($application["url"]); ?>" title="<?php echo ($application["name"]); ?>"><i class="i <?php echo ($application["iconClass"]); ?> right5"></i><?php echo ($application["name"]); ?></a></li><?php endforeach; endif; else: echo "" ;endif; ?>
        </ul>
    </nav>
</header>
<div class="body">
	<div id="side_bg"></div>
    <section class="side">
    	<form class="search">
        	<input type="text" class="search_txt" id="search_content" name="search" value="输入模块名称" />
            <input type="submit" class="search_btn" id="search_btn" value="搜索" />
        </form>
        <nav>
	<?php if(is_array($appnav)): $i = 0; $__LIST__ = $appnav;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$navItem): ++$i;$mod = ($i % 2 )?><dl class="<?php echo ($navItem["current"]); ?>">
        <dt><a href="<?php echo ($navItem["url"]); ?>"><i class="i <?php echo ($navItem["iconClass"]); ?> right5"></i><?php echo ($navItem["name"]); ?></a>
        <?php if(count($navItem['items']) > 0): ?><a href="javascript:;" class="btnDrop"><i class="i iDrop"></i></a><?php endif; ?>
        </dt>
        <dd>
            <ul>
            	<?php if(is_array($navItem['items'])): $i = 0; $__LIST__ = $navItem['items'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$subItem): ++$i;$mod = ($i % 2 )?><li><a href="<?php echo ($subItem["url"]); ?>" class="<?php echo ($subItem["current"]); ?>"><?php echo ($subItem["name"]); ?></a></li><?php endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </dd>
    </dl><?php endforeach; endif; else: echo "" ;endif; ?>
    <div class="side_bg"></div>
</nav>
    </section>
    <section class="main">
    	<div class="menu">
	<div>
		<?php if(is_array($options)): $i = 0; $__LIST__ = $options;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$option): ++$i;$mod = ($i % 2 )?><div><?php echo ($option["content"]); ?></div><?php endforeach; endif; else: echo "" ;endif; ?>
    </div>
    <ul>
    	<?php if(is_array($options)): $i = 0; $__LIST__ = $options;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$option): ++$i;$mod = ($i % 2 )?><li><a href="javascript:;"><?php echo ($option["name"]); ?><i class="i iDrop"></i></a></li><?php endforeach; endif; else: echo "" ;endif; ?>
    </ul>
</div>
    	<header>
   	    <h2>文章</h2>
            <div class="header_bar"><a href="javascript:;">写文章</a></div>
            <nav><a href="javascript:;" class="current spacing">全部<span>(45)</span></a><a href="javascript:;" class="spacing">已发布<span>(43)</span></a><a href="javascript:;" class="spacing">草稿<span>(2)</span></a><a href="javascript:;" class="">回收站<span>(0)</span></a></nav>
        </header>
        <form>
            <div class="bar">
                <span class="select"><select class="select">
                    <option>批量操作</option>
                </select></span>
                <input class="btn" type="submit" value="应用" />
                <span class="search">
                    <input type="text" class="search_txt" id="search_content" name="search" value="搜索模块，如：写文章" />
                    <a class="search_btn" href="#" title="搜索">&nbsp;</a>
                </span>
            </div>
            <table class="table" cellpadding="0" cellspacing="0">
            	<thead>
                	<th><input type="checkbox" class="seleceAll" /></th>
                    <th>标题</th>
                    <th>作者</th>
                    <th>分类目录</th>
                    <th>标签</th>
                    <th>回复</th>
                    <th>日期</th>
                </thead>
                <tfoot>
                	<th><input type="checkbox" class="seleceAll" /></th>
                    <th>标题</th>
                    <th>作者</th>
                    <th>分类目录</th>
                    <th>标签</th>
                    <th>回复</th>
                    <th>日期</th>
                </tfoot>
                <tbody>
                	<td><input type="checkbox" class="seleceAll" /></td>
                    <td><a href="javascript:;" title="编辑 Office Pro Plus 2010 VOL 破解密钥(key)">Office Pro Plus 2010 VOL 破解密钥(key)</a></td>
                    <td><a href="javascript:;">招来厄災的恶魔</a></td>
                    <td><a href="javascript:;">解决问题</a></td>
                    <td>key, Office, Office Pro Plus 2010, 密钥, 微软</td>
                    <td>0</td>
                    <td><span>2012-01-12</span><br/><span>已发布</span></td>
                </tbody>
            </table>
        </form>
    </section>
</div>
<footer>&copy;2012 鼠尾草 计划(Salvia-Project) All Rights Reserved</footer>
</div>
<script type="text/javascript">
;(function($){
	$(document).ready(function(){
		$(".menu li").each(function(i){
			$(this).css({width:$(".menu li>a").eq(i).outerWidth()});
		});
		$(".menu li>a").each(function(i){
			$(this).bind("click",i,function(e){
				var isShow = $(".menu>div").css("display")=="block";
				$(".menu li>a").toggle(isShow);
				$(".menu div>div").hide(isShow);
				if(!isShow)
				{
					$(".menu li>a").eq(e.data).toggle(!isShow);
					$(".menu div>div").eq(e.data).toggle(!isShow);
				}
				$(".menu>div").slideToggle(250);
			});
		});
		$(".menu>div").hide();

		$(".side nav dl").each(function(i){
			$(this).find(".btnDrop").bind("click",i,function(e){
				$(".side nav dd").slideUp(250);
				$(".side nav dd").eq(e.data).slideToggle(250);
			});
		});
		$(".side nav dd").hide();
		$(".side nav .current>dd").show();
	});
})(jQuery);
</script>
</body>
</html>