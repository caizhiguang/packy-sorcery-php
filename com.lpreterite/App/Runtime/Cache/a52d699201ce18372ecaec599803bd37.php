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
</head>
<body>
	<div id="wrap">
		
		<h1>每日任务</h1>
		<div class="line">
			<div class="unit">
				<div id="main">
					<div class="bar">
						
					</div>
					
					<div id="task-today">
						<h2>任务</h2>
						<ol class="tasks">
							<?php if(is_array($tasks)): foreach($tasks as $key=>$item): ?><li>
								<?php if(item.important): ?><span><a href="#task-<?php echo ($item["id"]); ?>" title="今天必须完成的任务"><?php echo ($item["name"]); ?> <em>!</em></a></span>
								<?php else: ?>
								<span><a href="#task-<?php echo ($item["id"]); ?>"><?php echo ($item["name"]); ?></a></span><?php endif; ?>
								<span><?php echo (date("Y-m-d",strtotime($item["end_time"]))); ?></span>
							</li><?php endforeach; endif; ?>
						</ol>
					</div>
				</div>
			</div>
			<div class="unit">
				<div id="side">
					<h2>工具</h2>
					<a href="#" id="btn-new-task" rel="#taskform" class="btn icons"><span class="search">新任务</span></a>
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
					
					<div class="tags">
						
					</div>
					<div class="chart">
						
					</div>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript">
		jQuery(document).ready(function($){
			$("#btn-new-task[rel]").overlay({
				top:160,
				mask:{
					color:'#222',
					loadSpeed:200,
					opacity:.5
				}
			});

			$('#time_defined').change(function(){
				$('#_time_defined').show();
			});
			$('#time_now,#time_week').change(function(){
				$('#_time_defined').hide();
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
						data.end_time = new Date(now.setDate(now.getDate()+7));
						data.end_time = $.dateToString(data.end_time);
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
		});
	</script>
</body>
</html>