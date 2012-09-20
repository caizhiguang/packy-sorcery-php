<?php 
@include '../wp-content/plugins/youyan-social-comment-system/link.php';
?>
<?php
if ( ($_COOKIE['UYEmail'] == '' && $_COOKIE['UYPassword'] == '' ) || !get_option('uyan_first')) {
	@include UYAN_SOURCE.'/uyan_plugin_admin.php';
} else {
	?>
<div style="width:auto; overflow-x:hidden;">
<div style="margin:10px 15px 0; border-bottom:1px solid #cdcdcd; padding-bottom:5px;"><a href="http://www.uyan.cc" target="_blank"><img src="<?php echo UYAN_SOURCE;?>/images/uyancc.png"></a></div>

	<div id="stepTwoWrapper" style=" width:900px; padding-left:101px;padding-top:10px; ">
		<div id="wpEdit" style="display:block;">
			<div class="imoportIntro">1. 数据同步设置</div>
			请自定义密匙，以便用于和友言数据同步时的数据对接密匙，同时以防第三方利用同步接口对您网站进行恶意操作。
			<br />
			<br />
			<div class="clear"></div>
			同步密钥：<input type="text" name="uyan_sync_token" id="uyan_sync_token" value='<?php echo get_option('uyan_sync_token'); ?>' style='width:125px;'>
			<div class="clear"></div>
			<input class="showCodeBTNApply" id="showCodeBTNApply_time_update" type="button" name="Submit" style="position: inherit; left:0px; top: 0; margin-top:10px;" value="保存设置" onclick="save();">
			<div class="clear"></div>
			<input type="hidden" value="<?php echo get_settings('home') ?>" id="url_base" name="url_base"><br>
			<hr>
			<div class="imoportIntro">2. 数据同步</div>
			友言为您提供Wordpress评论和友言评论数据双向同步，我们会将评论及时同步到本地数据库中，最大化的避免了评论数据的丢失。
			<br />
			提交数据同步申请后，友言服务器将在后端同步您的评论信息，其同步速度根据网络交互情况。
			<br />
			<br />
			<div class="clear"></div>
			<div class="importBTNWrapper" style="width:200px;float:left;">
				<a class='importBTN'  id="importBTN" onclick="sync(this)">同步评论数据</a>
			</div>
		</div>
	</div>
	<script>
function sync(node){
			var uyan_sync_token = encodeURIComponent($("#uyan_sync_token").val());
			$node = $(node);
			var exportNoti = $("#exportNoti");
			var text = '';
			$.ajax({
				url: "http://api.uyan.cc",
				dataType: 'jsonp',
				data: "mode=sync&act=sync&token="+uyan_sync_token+"&domain=<?php echo $_SERVER['HTTP_HOST'] ?>&uname=<?php echo $_COOKIE['UYEmail']; ?>&upass=<?php echo $_COOKIE['UYPassword'] ?>",
				jsonp: 'jsonp_callback',
				success: function(json) {
					json = json || {};
					$node.removeAttr('onclick');
					if (json.msg=='1'){
						$node.css({'background-image':'url(<?php echo UYAN_SOURCE?>/images/importDataPressed.png)','cursor':'default'});$node.html('请求已提交');
					}else if(json.msg=='2'){
						$node.css({'background-image':'url(<?php echo UYAN_SOURCE?>/images/importDataPressed.png)','cursor':'default','width':'179px','text-align:':'center'});$node.html('两小时内只能请求一次');
					}else if(json.msg == '3'){
						$node.css({'background-image':'url(<?php echo UYAN_SOURCE?>/images/importDataPressed.png)','cursor':'default'});$node.html('请输入密钥');
					}else{
						$node.css({'background-image':'url(<?php echo UYAN_SOURCE?>/images/importDataPressed.png)','cursor':'default'});$node.html('请求失败，请重试！');
					}
					setTimeout('$(".importBTN").css({"background-image":"url(<?php echo UYAN_SOURCE;?>/images/importData.png)","cursor":"pointer"}).html("同步评论数据").attr()',3000);
			document.getElementById("importBTN").setAttribute("onclick","sync(this)");

				},
				timeout: 3000
			});	
		}
																												
		function save(){
			$.ajax({
				url: "http://api.uyan.cc",
				dataType: 'jsonp',
				data: "mode=sync&act=setting&token="+encodeURIComponent($("#uyan_sync_token").val())+"&domain=<?php echo $_SERVER['HTTP_HOST'] ?>&uname=<?php echo $_COOKIE['UYEmail']; ?>&upass=<?php echo $_COOKIE['UYPassword'] ?>",
				jsonp: 'jsonp_callback',
				success: function(json) {
					json = json || {};
					if (json.msg == 3 && $("#uyan_sync_token").val() == '' ){
						$("#showCodeBTNApply_time_update").val("请输入密钥");
					}else if(json.msg == 1){
						$("#showCodeBTNApply_time_update").val("保存成功");
						saveSettings('time_update');
					}else if(json.msg == 0){
						$("#showCodeBTNApply_time_update").val("保存失败");
					}else if(json.msg == 4){
						$("#showCodeBTNApply_time_update").val("域名未验证");
					}
				},
				timeout: 3000
			});	
			setTimeout('$("#showCodeBTNApply_time_update").val("保存设置")',3000)
		}
																									
		function sel_it(obj){
			$("#"+obj).attr({"checked":true});
		}
	<?php if (get_option('uyan_use_orig') == 0 || get_option('uyan_use_orig') == '') { ?>
			$("input[name='UYUseOriginalChoose'][value='0']").attr("checked",true);

	<?php } else { ?>
			$("input[name='UYUseOriginalChoose'][value='1']").attr("checked",true);
	<?php } ?>		
	</script>

	<?php
}?>
</div>