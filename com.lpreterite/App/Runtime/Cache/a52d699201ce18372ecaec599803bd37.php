<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE>
<html>
<head>
	<title>任务列表</title>
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_libraries.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_grids.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_mod.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_contentbykube.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_content.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/task.css" />
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.tools.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.cookie.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.salvia.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/task.js"></script>
</head>
<body>
	<div id="wrap">
		
		<h1>每日任务</h1>
		<div class="line">
			<div class="unit size3of4">
				<div id="main">
					<div class="bar">
						
					</div>
				</div>
			</div>
			<div class="unit size1of4">
				<div id="side">
					<div id="tasks">
						<h2>任务</h2>
						<ol class="tasks"></ol>
						<form action="__SELF__add_task" method="post" name="task-form" id="taskform" class="forms">
							<p>
								<input type="text" name="name" class="name small">
							</p>
							<div class="more-content">
								<p>
									<textarea id="task-content" name="content" class="content"></textarea>
								</p>
								<label for="name">时间：</label>
								<div class="groud">
									<label for="time_now"><input type="radio" name="time_mode" value="0" id="time_now" checked="checked" />当天</label>
									<label for="time_week"><input type="radio" name="time_mode" value="1" id="time_week" />一周</label>
									<label for="time_defined"><input type="radio" name="time_mode" value="2" id="time_defined" />自定义</label>
									<div id="_time_defined" class="line">
										<span class="unit"><input type="text" name="defined_start_time" id="defined-start-time"></span>
										<span class="unit"> - </span>
										<span class="unit"><input type="text" name="defined_end_time" id="defined-end-time"></span>
									</div>
									<input type="hidden" name="start_time">
									<input type="hidden" name="end_time">
								</div>
								<div id="time_defined_panel"></div>
								<div>
									<input type="submit" value="添加" class="btn" />
								</div>
							</div>
							<div class="more up">
								<a href="javascript:;">◆</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="package">
		<ol class="tasks">
			<li>
				<span>
					<label for=""><input type="checkbox" class="checkbox"></label>
					<a class="name" href="" rel="#task-detail" title=""><em>!</em></a>
				</span>
				<span class="end_time"></span>
			</li>
		</ol>
		<form action="__SELF__add_task" method="post" name="task-form" id="taskform" class="msg forms">
			<h2>添加任务</h2>
			<div>
				<label for="name">任务名称：</label>
				<input type="text" name="name" id="name" value="" tabindex="1" />
			</div>
			<div>
				<label for="content">任务内容：</label>
				<textarea id="content" name="content"></textarea>
			</div>
			<div>
				<label for="name">时间：</label>
				<div class="groud">
					<label for="time_now"><input type="radio" name="time_mode" value="0" id="time_now" checked="checked" />当天</label>
					<label for="time_week"><input type="radio" name="time_mode" value="1" id="time_week" />一周</label>
					<label for="time_defined"><input type="radio" name="time_mode" value="2" id="time_defined" />自定义</label>
					<div id="_time_defined">
						<input type="text" name="defined_start_time" id="defined-start-time"> - <input type="text" name="defined_end_time" id="defined-end-time">
					</div>
					<input type="hidden" name="start_time">
					<input type="hidden" name="end_time">
				</div>
				<div id="time_defined_panel"></div>
			</div>
			<div>
				<input type="submit" value="添加" class="btn" />
			</div>
		</form>
		<div id="task-detail" class="msg">
			<h2 class="name"></h2>
			<p class="content"></p>
			<p>
				<span class="start_time"></span>
				<span> - </span>
				<span class="end_time"></span>
			</p>
		</div>
	</div>
</body>
</html>