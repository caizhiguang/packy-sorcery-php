<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
	<title>index</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/bootstrap-responsive.min.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/task-style.css" />
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/json2.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/underscore.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/backbone.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/bootstrap.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/common.js"></script>
</head>
<body class="task">
	<div id="content">
		<div id="sidebar">
			<div class="sidebar-inner">
				<header class="container-fluid">
					<a class="brand" id="logo" href="#">TW任务清单</a>
					<p><small>这是个提高你工作效率的工具</small></p>
				</header>
				<ul id="navi">
					<li class="active"><a href="#"><i class="icon-list icon-white"></i> 任务</a></li>
					<li><a href="#"><i class="icon-signal icon-white"></i> 统计</a></li>
					<li><a href="#"><i class="icon-info-sign icon-white"></i> 关于</a></li>
				</ul>
			</div>
		</div>
		<div id="mainbar" class="main">
			<div class="container-fluid">
				<div class="row-fluid">
					<div class="span8">
						<h2 class="title"><i class="icon-list-alt"></i> 任务列表</h2>
						<div class="box task">
							<form action="#" class="task-input">
								<input type="text" class="span12" placeholder="在这输入你的工作内容">
							</form>
							<ul class="tasks">
								<li>
									<label class="checkbox"><input type="checkbox">
										<span class="title">测试内容</span>
										<small class="tags">@test</small>
										<span class="pull-right">
											<i class="icon-time"></i>
											<span class="time">x1</span>
										</span>
									</label>
								</li>
								<li>
									<label class="checkbox"><input type="checkbox">
										<span class="title">测试内容</span>
										<small class="tags">@test</small>
										<span class="pull-right">
											<i class="icon-time"></i>
											<span class="time">x1</span>
										</span>
									</label>
								</li>
								<li>
									<label class="checkbox"><input type="checkbox">
										<span class="title">测试内容</span>
										<small class="tags">@test</small>
										<span class="pull-right">
											<i class="icon-time"></i>
											<span class="time">x1</span>
										</span>
									</label>
								</li>
								<li>
									<label class="checkbox"><input type="checkbox">
										<span class="title">测试内容</span>
										<small class="tags">@test</small>
										<span class="pull-right">
											<i class="icon-time"></i>
											<span class="time">x1</span>
										</span>
									</label>
								</li>
							</ul>
						</div>
					</div>
					<div class="span4">
						<h2 class="title"><i class="icon-signal"></i> 初步统计</h2>
						<div class="box">
							
						</div>
					</div>
				</div>

				<footer>
					<p>© 2013 <a href="#">Think-Work</a> All Rights Reserved.</p>
				</footer>
			</div>
		</div>
	</div>
</body>
</html>