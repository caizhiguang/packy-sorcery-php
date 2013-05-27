<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Test Center</title>
<script type="text/javascript" src="Public/js/salvia_debug_v_0.2/lib/jquery.tools.min.js"></script>
<script type="text/javascript" src="Public/js/salvia_debug_v_0.2/lib/jquery.salvia.js"></script>

<script type="text/javascript" src="Public/js/salvia_debug_v_0.2/class/util/events.js"></script>
<script type="text/javascript" src="Public/js/salvia_debug_v_0.2/class/base/base.js"></script>
<script type="text/javascript" src="Public/js/salvia_debug_v_0.2/class/base/list.js"></script>
<script type="text/javascript" src="Public/js/salvia_debug_v_0.2/class/ui/base.js"></script>
<script type="text/javascript" src="Public/js/salvia_debug_v_0.2/class/ui/contextmenu.js"></script>
<script type="text/javascript" src="Public/js/salvia_debug_v_0.2/class/ui/form.js"></script>
<script type="text/javascript" src="Public/js/salvia_debug_v_0.2/class/ui/msgbox.js"></script>
<script type="text/javascript">

;(function($){
	$.salvia.load("Public/js/plug-in/drag.js");
	/*$.salvia.load("Public/js/plug-in/jquery.md5.js");
	$.salvia.load("Public/js/salvia_debug_v_0.2/class/util/events.js");
	$.salvia.load("Public/js/salvia_debug_v_0.2/class/base/base.js");
	$.salvia.load("Public/js/salvia_debug_v_0.2/class/base/list.js");
	$.salvia.load("Public/js/salvia_debug_v_0.2/class/ui/base.js");
	$.salvia.load("Public/js/salvia_debug_v_0.2/class/ui/contextmenu.js");*/
	
	//window.B();
	$(document).ready(function(){
		$.salvia.object.namespace("$.classes.ui");
		
		var contextmenu = new $.classes.ui.contextmenu($.c("div").css({width:200,border:"#ddd solid 1px",padding:10}).appendTo(document.body));
		contextmenu.datasource(["a","b"],function(data){
			$(this).text(data);
		});
		contextmenu.addListener("menuButtomClick",function(e,contextmenu){
			//alert($(this).text());
			//alert(e.data);
		},"data");

		/*var form = new $.classes.ui.form($("#form"));
		form.drag();
		form.show();*/

		/*var msgbox = new $.classes.ui.msgbox($("#form"),{showScreen:true});
		msgbox.drag();
		msgbox.show("测试标题","测试内容",{Ok:"确认提交",Cancel:"取消"});*/
		
		var date = new Date();
		var str = $.dateToString(date,"Y-M-D h:m:s.z");
		$(document.body).append($.c("div").text(str));
	});
})(jQuery);

</script>
<style>
#Screen{ /*background: #333;*/ }
</style>
</head>
<body>

<div id="form">
	<div class="inner">
		<div class="hd">标题</div>
		<div class="content">内容</div>
		<div class="ft"></div>
	</div>
</div>

</body>
</html>