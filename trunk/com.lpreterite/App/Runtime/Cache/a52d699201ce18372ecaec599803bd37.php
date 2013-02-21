<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE>
<html>
<head>
	<title>任务列表</title>
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_libraries.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_grids.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_mod.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/_content.css" />
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/task.css" />
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.cookie.js"></script>
	<script type="text/javascript" src="__PUBLIC__/js/plug-in/jquery.salvia.js"></script>
</head>
<body>
	<div id="wrap">
		<a href="javascript:;">添加任务</a>
		<form action="__SELF__add_task" method="post" name="task-form" id="taskform">
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
					<input type="radio" name="time_mode" value="0" id="time_now" checked="checked" /><label for="time_now">当天</label>
					<input type="radio" name="time_mode" value="1" id="time_week" /><label for="time_week">一周</label>
					<input type="radio" name="time_mode" value="2" id="time_defined" /><label for="time_defined">自定义</label>
					<div>
						<label for="defined-start-time">start</label>
						<input type="text" name="defined_start_time" id="defined-start-time">
						 - 
						<label for="defined-end-time">end</label>
						<input type="text" name="defined_end_time" id="defined-end-time">
					</div>
					<input type="hidden" name="start_time">
					<input type="hidden" name="end_time">
				</div>
				<div id="time_defined_panel"></div>
			</div>
			<div>
				<input type="submit" value="添加" />
			</div>
		</form>
		
		<table class="simple" id="tasks">
			<tr>
				<th>id</th>
				<th>name</th>
				<th>start</th>
				<th>end</th>
				<th></th>
			</tr>
			<?php if(is_array($tasks)): foreach($tasks as $key=>$item): ?><tr id="tag-<?php echo ($item["id"]); ?>">
				<td><?php echo ($item["id"]); ?></td>
				<td><a href="#task-<?php echo ($item["id"]); ?>"><?php echo ($item["name"]); ?></a></td>
				<td><?php echo ($item["start_time"]); ?></td>
				<td><?php echo ($item["end_time"]); ?></td>
				<td><a class="delete-task" href="__SELF__delete_task?id=<?php echo ($item["id"]); ?>">删除</a></td>
			</tr><?php endforeach; endif; ?>
		</table>
		
		<div id="tags">
			<h3>tags</h3>
		
			<ul class="tags">
				<?php if(is_array($tags)): foreach($tags as $key=>$item): ?><li class="tag-<?php echo ($item["id"]); ?>"><a href="javascript:;" data-id="<?php echo ($item["id"]); ?>"><?php echo ($item["name"]); ?></a></li><?php endforeach; endif; ?>
			</ul>
		
			<form action="__SELF__add_tag" method="post" name="tag-form">
				<h3>添加标签</h3>
				<label for="tag-name">名称：</label><input type="text" name="name" id="tag-name">
				<input type="submit" value="添加">
			</form>
		</div>
	</div>

	<script type="text/javascript">
		jQuery(document).ready(function($){
			$('#tasks a.delete-task').click(function(){
				$.ajax({
					url:$(this).attr('href'),
					dataType:'json',
					type:'GET',
					success:function(data){
						if(!data.status){alert(data.info); return;}
						$('#tag-'+data.id).remove();
					}
				});
				return false;
			});

			$(document.forms['task-form']).submit(function(){
				var data = $(this).serializeObject();
				
				var now = new Date();
				switch(parseInt(data.time_mode))
				{
					case 0:
						//当天
						data.start_time = $.dateToString(now);
						data.end_time = $.dateToString(now);
						break;
					case 1:
						//一周
						data.start_time = $.dateToString(now);
						data.end_time = new Date(now).setDate(7);
						break;
					case 2:
						//自定义
						data.start_time = data.defined_start_time;
						data.end_time = data.defined_end_time;
						break;
				}

				$.ajax({
					url:$(this).attr('action'),
					data:data,
					dataType:'json',
					type:'POST',
					success:function(data){
						if(!data.status){alert(data.info); return;}
						$('#tasks').append('<tr id="task-'+data.id+'"><td>'+data.id+'</td><td>'+data.name+'</td><td>'+data.start_time+'</td><td>'+data.end_time+'</td><td><a href="__SELF__delete_task?id='+data.id+'">删除</a></td></tr>');
					}
				});
				return false;
			});

			$(document.forms['tag-form']).submit(function(){
				$.ajax({
					url:$(this).attr('action'),
					data:$(this).serialize(),
					dataType:'json',
					type:'POST',
					success:function(data){
						if(!data.status){alert(data.info); return;}
						$('#tags').append('<li class="tag-'+data.id+'">'+data.name+'</li>');
					}
				});
				return false;
			});
		});
	</script>
</body>
</html>