<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE>
<html>
<head>
	<title>任务列表</title>
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_libraries.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_grids.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_mod.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_contentbykube.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_content.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/task2.css" />
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/json2.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.tools.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.cookie.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/underscore.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/backbone.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/backbone.localStorage.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/task2.js"></script>
</head>
<body>
	<div id="wrap">
		<header>
			<nav>
				<a href="javascript:;" class="current">活动清单
				</a> / <a href="javascript:;">今日待办
				</a> / <a href="javascript:;">记录</a>
			</nav>
		</header>
		<div id="body" class="line">
			<section class="unit size3of4">
				<form action="#" id="task-form" class="form">
					<p>
						<input type="text" class="task_input">
						<input type="submit" value="确定">
						<input type="hidden" name="name">
						<input type="hidden" name="important">
						<input type="hidden" name="start_time">
						<input type="hidden" name="tags">
					</p>
				</form>
				<ul id="list-tasks">
					<li class="list-tasks-item">
						<span class="start_time">2013-4-2</span>
						<a href="#" class="name">界面设计</a><em></em>
						<span class="tags">(<a href="#">番茄任务管理</a>、<a href="#">设计</a>)</span>
						<a href="#" class="delete">x</a>
					</li>
					<li class="list-tasks-item">
						<span class="start_time">2013-4-2</span>
						<a href="#" class="name">查看邮箱</a><em>!</em>
						<span class="tags">(<a href="#">杂项</a>)</span>
						<a href="#" class="delete">x</a>
					</li>
				</ul>
			</section>
			<aside class="unit size1of4">
				<div id="side">
					
				</div>
			</aside>
		</div>
		<footer>2013 &copy <a href="http://lpreterite.com">lpreterite.com</a>. Design by <a href="http://weibo.com/lpreterite">@帕奇奶罐</a>. </footer>
	</div>

	<script type="text/template" id="list-task-item">
		<span class="start_time"><%= start_time %></span>
		<a href="#" class="name"><%- name %></a><em><%= important?'!':'' %></em>
		<span class="tags">(
			<% _.each(tags, function(id,index,list) { %>
			<a href="#"><%- id %></a><% index<=list.length?'':'、' %>
			<% }); %>
		)</span>
		<a href="#" class="delete">x</a>
	</script>
</body>
</html>