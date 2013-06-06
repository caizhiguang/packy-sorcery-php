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
	<!--<script type="text/javascript" data-main="__PUBLIC__/js/require.config" src="__PUBLIC__/js/plug-in/require.js" ></script>-->
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/json2.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.easing.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/underscore.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/backbone.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/bootstrap.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/Chart.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/common.js"></script>
</head>
<body>

	<header class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container-fluid">
				<a href="#" class="brand">think task-list</a>
				<div class="nav-collapse collapse">
					<ul class="nav">
						<li class="active"><a href="#Tasks">Tasks</a></li>
						<li><a href="#Statistic">Statistic</a></li>
						<li><a href="#About">About</a></li>
					</ul>
					<div class="pull-right navbar-text dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-user icon-white"></i> Sign in <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="#register">register</a></li>
							<li><a href="#">Sign in with Twitter</a></li>
							<li><a href="#">Sign in with Weibo</a></li>
							<li><a href="#">Sign in with QQ</a></li>
							<li><a href="#">Sign in with GoogleOpenApi</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</header>

	<section class="content">
		
		<div class="sidebar">
			<aside class="bar">
				<ul>
					<li><a href="#time"><i class="icon-clock"></i></a></li>
					<li><a href="#statistic"><i class="icon-statistic"></i></a></li>
				</ul>
			</aside>

			<div class="widget widget-time">
				<div class="widget-content">
					<p>25<small>.00</small></p>
					<p>something tasks...</p>
				</div>
				<div class="widget-foot">
					<a href="#time?stop"><i class="icon-stop"></i></a>
					<a href="#time?play"><i class="icon-play"></i></a>
					<a href="#time?pause"><i class="icon-pause"></i></a>
				</div>
			</div>
	
			<div class="widget widget-tags">
				<div class="widget-head">Tags:
					<span class="pull-right bar">
						<a href="#" class="minimize"><i class="icon-chevron-up"></i></a>
					</span>
				</div>
				<div class="widget-content">
					<div class="tags">
						<a href="#" class="tag">design</a><a href="#" class="tag">code</a><a href="#" class="tag">web</a><a href="#" class="tag">ui</a><a href="#" class="tag">icon</a><a href="#" class="tag">index</a><a href="#" class="tag">ui element</a>
					</div>
					<form action="" class="tag-input">
						<input type="text" name="tag">
					</form>
				</div>
			</div>

			<div class="widget widget-statistic">
				<div class="widget-head">Statistic
					<span class="pull-right bar">
						<a href="#" class="minimize"><i class="icon-chevron-up"></i></a>
					</span>
				</div>
				<div class="widget-content">
					<div>
						<dl>
							<dd>8</dd>
							<dt>total</dt>
						</dl>
						<dl>
							<dd>6.4</dd>
							<dt>avg-time</dt>
						</dl>
						<dl>
							<dd>6</dd>
							<dt>interrupt</dt>
						</dl>
					</div>
					<div class="statistic-chart">
						<dl>
							<dd class="chart"></dd>
							<dt>design</dt>
						</dl>
						<dl>
							<dd class="chart"></dd>
							<dt>web</dt>
						</dl>
						<dl>
							<dd class="chart"></dd>
							<dt>code</dt>
						</dl>
					</div>
				</div>
			</div>

		</div>
		<div class="mainbar">
			<div class="widget widget-tasks">
				<form action="#" class="widget-head task-input">
					<input type="text" class="span12" placeholder="在这输入你的工作内容">
				</form>
				<ul class="tasks widget-content"></ul>
			</div>
		</div>

	</section>

	<footer>
		<p>&copy 2013 <a href="#">Think-Work</a> All Rights Reserved.</p>
	</footer>

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

	<script id="task-item" type="text/template">
		<div class="view  <%= complete!=0 ? 'disable' : '' %>">
			<label class="checkbox inline"><input type="checkbox" <%= complete!=0 ? 'checked="checked"' : '' %>></label>
			<span class="title"><%- view_name %></span>
			<small class="tags">
				<% if(_.isObject(tag)){ %>
				<a href="#tag-<%- tag.id %>">@<%- tag.name %></a>
				<% } %>
			</small>
			<span class="pull-right">
				<% if(Number(time)){ %><i class="icon-time"></i><span class="time">x<%- time %></span><% } %>
				<a class="remove" href="javascript:;"><i class="icon-remove"></i></a>
			</span>
		</div>
	</script>

	<script id="task-item-editor" type="text/template">
		<input type="text" class="editor span12" value="">
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