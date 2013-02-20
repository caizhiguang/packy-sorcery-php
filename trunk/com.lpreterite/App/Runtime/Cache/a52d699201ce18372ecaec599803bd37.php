<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE>
<html>
<head>
	<title>任务列表</title>
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_libraries.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_grids.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_mod.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_content.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_content.css" />
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.cookie.js"></script>
</head>
<body>
	<a href="javascript:;">添加任务</a>
	<form action="#" method="post" name="task" id="taskform">
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
				<input type="radio" name="time_mode" value="0" id="time_now" /><label for="time_now">当天</label>
				<input type="radio" name="time_mode" value="1" id="time_week" /><label for="time_week">一周</label>
				<input type="radio" name="time_mode" value="2" id="time_defined" /><label for="time_defined">自定义</label>
			</div>
			<div id="time_defined_panel"></div>
		</div>
		<div>
			<input type="submit" value="添加" />
		</div>
	</form>


	<div>
		<h1>tags</h1>
		<table>
			<tr>
				<td>id</td>
				<td>name</td>
			</tr>
			<?php if(is_array($tags)): foreach($tags as $key=>$item): ?><tr>
				<td><?php echo ($item["id"]); ?></td>
				<td><?php echo ($item["name"]); ?></td>
			</tr><?php endforeach; endif; ?>
		</table>

		<form action="__SELF__add_tag" method="post">
			<h3>添加标签</h3>
			<label for="tag-name">名称：</label><input type="text" name="name" id="tag-name">
			<input type="submit" value="添加">
		</form>
	</div>
</body>
</html>