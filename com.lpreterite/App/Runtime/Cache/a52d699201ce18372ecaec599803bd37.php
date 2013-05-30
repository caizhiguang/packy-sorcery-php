<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
	<title>TW任务清单</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="author" content="Tink-Work">
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/bootstrap-responsive.min.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/task-style.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/font-awesome.css" />
	<script type="text/javascript" data-main="__PUBLIC__/js/require.config" src="__PUBLIC__/js/plug-in/require.js" ></script>
	<!-- <script type="text/javascript" src="__PUBLIC__/js/plug-in/json2.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.easing.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/underscore.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/backbone.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/bootstrap.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/Chart.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/common.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/tasks.js"></script> -->
</head>
<body class="task">
	<div id="wrapper">
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
						<div class="widget widget-tasks">
							<div class="widget-head">
								<i class="icon-list-alt"></i> 任务列表
								<span class="pull-right bar">
									<a href="#" class="minimize"><i class="icon-chevron-up"></i></a>
								</span>
							</div>
							<div class="box widget-content">
								<form action="#" class="task-input">
									<input type="text" class="span12" placeholder="在这输入你的工作内容">
								</form>
								<ul class="tasks"></ul>
							</div>
						</div>
					</div>
					<div class="span4">

						<div class="widget widget-user">
							<div class="widget-head">
								<i class="icon-user"></i> 你的信息
								<span class="pull-right bar">
									<a href="#" class="minimize"><i class="icon-chevron-up"></i></a>
								</span>
							</div>
							<div class="widget-content">
								<div class="media">
									<a href="#" class="pull-left">
										<img class="media-object" src="__PUBLIC__/img/default-user-avatar.png">
									</a>
									<div class="media-body">
										<h4>XXX<small>，你好！</small></h4>
										<a href="#" class="btn">登出</a>
									</div>
								</div>
							</div>
						</div>

						<div class="widget widget-tags">
							<div class="widget-head">
								<i class="icon-tag"></i> 标签
								<span class="pull-right bar">
									<a href="#" class="edit"><i class="icon-edit"></i>编辑</a>
									<a href="#" class="minimize"><i class="icon-chevron-up"></i></a>
								</span>
							</div>
							<div class="widget-content box gray b-none"></div>
						</div>

						<div class="widget widget-statistic">
							<div class="widget-head">
								<i class="icon-signal"></i> 初步统计
								<span class="pull-right bar">
									<a href="#" class="minimize"><i class="icon-chevron-up"></i></a>
								</span>
							</div>
							<div class="widget-content">
								<div class="box gray b-none">
									<div class="tag-chart">
										<canvas id="tag-chart" width="70" height="70"></canvas>
									</div>
									<div class="tag-content">
										<p class="tag-name">前端设计</p>
										<p class="tag-statistic">
											<span class="span6">最长 <i class="icon-time"></i><span class="long-time">x8</span></span>
											<span class="span6"><span class="f-orange">平均</span> <i class="icon-time"></i><span class="avg-time">x3</span></span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<footer>
					<p>&copy 2013 <a href="#">Think-Work</a> All Rights Reserved.</p>
				</footer>
			</div>
		</div>
	</div>

	<script id="alert" type="text/template">
		<div class="alert">
			<button type="button" class="close" data-dismiss="alert">&times;</button>
			<strong>当前标签：</strong><%- name %>
		</div>
	</script>

	<script id="msgbox" type="text/template">
		<div id="msgboxModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h3 id="myModalLabel"><%- title %></h3>
			</div>
			<div class="modal-body">
				<%= content %>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
				<button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">确定</button>
			</div>
		</div>
	</script>

	<script id="tag-item" type="text/template">
		<a href="#tag-<%- id %>" class="btn btn-tag" data-toggle="tooltip" data-original-title="包含<%- tasks_count %>个任务"><%- name %><i class="icon-remove"></i></a>
	</script>

	<script type="text/template" id="task-item">
		<div class="view  <%= complete!=0 ? 'disable' : '' %>">
			<label class="checkbox inline"><input type="checkbox" <%= complete!=0 ? 'checked="checked"' : '' %>></label>
			<span class="title"><%- name %></span>
			<small class="tags">
				<% if(_.isObject(tag)){ %>
				<a href="#tag-<%- tag.id %>">@<%- tag.name %></a>
				<% } %>
			</small>
			<span class="pull-right">
				<% if(time){ %><i class="icon-time"></i><span class="time">x<%- time %></span><% } %>
				<a class="remove" href="javascript:;"><i class="icon-remove"></i></a>
			</span>
		</div>
		<input type="text" class="editor span12" value="<%- name %> <% if(_.isObject(tag)){ %>@<%- tag.name %><% } %>">
	</script>

	<script id="tags-statistic-item" type="text/template">
		<div class="tag-chart">
			<canvas id="tag-chart" width="70" height="70" data-avg="<%- avg_time %>" data-longest="<%- longest_time %>"></canvas>
		</div>
		<div class="tag-content">
			<p class="tag-name"><%- name %></p>
			<p class="tag-statistic">最长 <i class="icon-time"></i><span class="long-time">x<%- longest_time %></span> <span class="f-orange">平均</span> <i class="icon-time"></i><span class="avg-time">x<%- avg_time %></span></p>
		</div>
	</script>
</body>
</html>