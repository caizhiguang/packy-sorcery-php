!function($){

    //初始化 jquery.ajax 设置
	$.ajaxSetup({
		dataType:"json",
		type:"POST",
		dataFilter:function(data,type){
			switch(type){
				case "xml":
					return $.xml2json(data);//xml转换成json
				default:
					return data;
			}
		},
		success:function(data, textStatus){
			this._ajax.target.trigger(this._ajax.operation,[data]);
		},
		complete:function(XMLHttpRequest, textStatus){this._ajax.target.trigger(this._ajax.operation+'-ajaxComplete',[textStatus]);},
		beforeSend:function(XMLHttpRequest){this._ajax.target.trigger(this._ajax.operation+'-ajaxBeforeSend',[]);},
		error:function(XMLHttpRequest, textStatus, errorThrown){this._ajax.target.trigger(this._ajax.operation+'-ajaxError',[textStatus]);}
	});

	//extend ajax
	$.fn.ajax = function(options,operation){
		options._ajax = {data:options.data,operation:operation,target:this};
		$.ajax(options);
		return this;
	};


	$(document).ready(function(){

		/**
		 * 动作
		 */
		$('.more>a').click(function(){
			if($(this).parent().hasClass('up')){
				$(this).parent().addClass('down').removeClass('up');
				$('.more-content').show();
			}else{
				$(this).parent().addClass('up').removeClass('down');
				$('.more-content').hide();
			}
		});

		$('#tasks>.tasks .checkbox').live('change',function(){
			$(this).parent().next().toggleClass('complete',this.checked);

			$('#tasks>.tasks').ajax({
				url:$.getRootPath()+'/task/update_task',
				data:{
					id:$(this).attr('data-id'),
					complete:this.checked?1:0
				}
			},'update_task');
		});

		$('#tasks>.tasks').ajax({
			url:$.getRootPath()+'/task/api?action=tasks'
		},'get_tasks').bind('get_tasks',function(ajax,data){
			for (var i = data.length - 1; i >= 0; i--) {
				var task_temp = $('#package .tasks>li').clone().appendTo(this);
				task_temp.find('.checkbox').attr({'data-id':data[i].id}).attr(parseInt(data[i].complete)?{'checked':''}:{});
				task_temp.find('.name').html(data[i].name+(parseInt(data[i].important)?'<em> ! </em>':'')).attr({'href':'#task-'+data[i].id,'data-id':data[i].id}).toggleClass('complete', Boolean(parseInt(data[i].complete)));
				task_temp.find('.end_time').text(data[i].end_time);
			};
		});

		$('.groud input[type="radio"]').change(function(){
			$('#_time_defined').toggle($(this).attr('id')=='time_defined');
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

			$(this).ajax({
				url:$(this).attr('action'),
				data:data
			},'added');
			return false;
		}).bind('added',function(ajax,data){
			var task_temp = $('#package .tasks>li').clone().prependTo('#tasks>.tasks');
			task_temp.find('.checkbox').attr('data-id',data.id).attr(parseInt(data.complete)?{'checked':''}:{});
			task_temp.find('.name').html(data.name+(parseInt(data.important)?'<em> ! </em>':'')).attr({'href':'#task-'+data.id,'data':data.id}).toggleClass('complete',Boolean(parseInt(data[i].complete)));
			task_temp.find('.end_time').text(data.end_time);
		});
	});

	

}(jQuery);