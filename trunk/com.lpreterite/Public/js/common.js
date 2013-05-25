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
}(jQuery);

jQuery(document).ready(function($) {
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