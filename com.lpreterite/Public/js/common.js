!function($){

	/**==jQuery.extend===================================================================**/
	$.extend({
		unique: function( array ) {
			var ret = [], done = {};
			try{
				for(var i=0,length=array.length;i<length;i++) {
					var id = array[i];
					if (!done[id]){
						done[id] = true;
						ret.push(array[i]);
					}
				}
			}catch(e){
			ret = array;
			}
			return ret;
		},
	    getRootPath:function(){
			var strFullPath=window.document.location.href;
			var strPath=window.document.location.pathname;
			var pos=strFullPath.indexOf(strPath);
			var prePath=strFullPath.substring(0,pos);
			var postPath="";
			return(prePath+postPath);
		},
		dateToString:function(date,format){
			var result = format==undefined?"Y-M-D h:m:s":format;

			var dateArray = [
				String(date.getFullYear()),
				String(date.getMonth()+1),
				String(date.getDate()),
				String(date.getHours()),
				String(date.getMinutes()),
				String(date.getSeconds()),
				String(date.getMilliseconds())
			];

			result = result.replace(/Y/,dateArray[0]);
			result = result.replace(/M/,dateArray[1].length>=2?dateArray[1]:'0'+dateArray[1]);
			result = result.replace(/D/,dateArray[2].length>=2?dateArray[2]:'0'+dateArray[2]);
			result = result.replace(/h/,dateArray[3].length>=2?dateArray[3]:'0'+dateArray[3]);
			result = result.replace(/m/,dateArray[4].length>=2?dateArray[4]:'0'+dateArray[4]);
			result = result.replace(/s/,dateArray[5].length>=2?dateArray[5]:'0'+dateArray[5]);
			result = result.replace(/z/,dateArray[6].length>=2?dateArray[6]:'0'+dateArray[6]);
			return result;
		},
		stringToDate:function(str){
			var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})(.(\d{1,3}))*$/;
			var r = str.match(reg);
			if(r==null) return false;
			var d = new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7],r[9]==undefined?"0":r[9]);
			return d;
		}
	});

	$.fn.extend({
		//计时器
		timer:function(options){
			var options = $.extend({},{
				minute:'.minute',
				second:'.second',
				play:'.btn-play',
				pause:'.btn-pause',
				stop:'.btn-stop',
				initTime:1500
			},options);
			var that = this;

			var timer = {
				i:0,
				isPause:false,
				time:0,
				run:function(){
					var modal = that.data('modal');
					if(modal.time<0) modal.stop();
					if(modal.isPause) return;
					modal.display();
					modal.time--;
				},
				play:function(){
					if(this.i) this.stop();
					this.time = options.initTime;
					this.isPause = false;
					this.i = setInterval(this.run,1000);
					that.trigger('play',[this]);
				},
				pause:function(){
					this.isPause = true;
					that.trigger('pause',[this]);
				},
				stop:function(){
					clearInterval(this.i);
					this.time = options.initTime;
					this.display();
					that.trigger('stop',[this]);
				},
				display:function(){
					var minute = Math.floor(this.time/60);
					that.find(options.minute).text(String(minute).replace(/^(\d{1})$/,'0$1'));
					that.find(options.second).text(String(this.time-minute*60).replace(/^(\d{1})$/,'0$1'))
				}
			}

			this.find(options.play).click(function(){ timer.play(); });
			this.find(options.pause).click(function(){ timer.pause(); });
			this.find(options.stop).click(function(){ timer.stop(); });
			this.data('modal',timer);
		}
	});

}(jQuery);

jQuery(document).ready(function($) {
	$(".navi-menu > a").click(function(e){
		e.preventDefault();
		var menu_li = $(this).parent("li");
		var menu_ul = $(this).next("ul");

		if(menu_li.hasClass("open")){
			menu_ul.slideUp(350);
			menu_li.removeClass("open")
		}
		else{
			$(".navi > li > ul").slideUp(350);
			$(".navi > li").removeClass("open");
			menu_ul.slideDown(350);
			menu_li.addClass("open");
		}
	});
	var div = document.createElement('div');
	$(div).attr('id','debug-window-size').text($(window).width()+'px')
	.css({
		'float':'right',
		'background':'#232323',
		'color':'#fff',
		'padding':'0 .5em'
	}).appendTo('#think_page_trace_open');

	$(window).bind('resize',function(){
		$('#debug-window-size').text($(window).width()+'px');
	});
});