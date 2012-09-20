<?php
/*
Plugin Name: Ajax Comments-Reply
Plugin URI: http://zhiqiang.org/blog/plugin/ajaxcomment
Version: 2.62
Description: send comment AJAX, and you can reply comments.
Author: zhiqiang
Author URI: http://zhiqiang.org/blog/
*/

$max_level = 5; // choose the max level 
$comments_per_page = 100; // comments per page

function reply_column_checker() {
	global $wpdb;
	$column_name = 'comment_reply_ID';
	foreach ($wpdb->get_col("DESC $wpdb->comments", 0) as $column) {
		if ($column == $column_name) {
		    return true;
		}
	}
	$q = $wpdb->query("ALTER TABLE $wpdb->comments ADD COLUMN comment_reply_ID INT NOT NULL DEFAULT 0;");
	foreach ($wpdb->get_col("DESC $wpdb->comments", 0) as $column) {
		if  ($column == $column_name) {
			return true;
		}
	}
	return false;
}
function commentreply_load_scripts() {
	echo '<link rel="stylesheet" href="'.get_settings('siteurl').'/wp-content/plugins/ajaxcomment/comment.css" type="text/css" media="screen" />';
}
function add_reply_id_formfield() {
	echo '<input type="hidden" name="comment_reply_ID" id="comment_reply_ID" value="0" />';
}
function add_reply_ID($id) {
	global $wpdb;
	$reply_id = mysql_escape_string($_REQUEST['comment_reply_ID']);
	$q = $wpdb->query("UPDATE $wpdb->comments SET comment_reply_ID='$reply_id' WHERE comment_ID='$id'");
}

// choose your comment comtemplate
function change_comments_template($file) {
	return ABSPATH . "/wp-content/plugins/ajaxcomment/comments.php";
}

function email_back($id) {
	global $wpdb, $email_send_comment;
	$reply_id = mysql_escape_string($_REQUEST['comment_reply_ID']);
	$post_id  = mysql_escape_string($_REQUEST['comment_post_ID']);
	if ( $reply_id == 0 || ($_REQUEST["email"]!=get_settings('admin_email')) && !isset($_REQUEST['comment_email_back'])) return;
	$comment = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_ID='$id' LIMIT 0, 1");

	$reply_comment = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_ID='$reply_id' LIMIT 0, 1");
	$post    = $wpdb->get_results("SELECT * FROM $wpdb->posts WHERE ID='$post_id' LIMIT 0, 1");
	
	$comment = $comment[0];
	$reply_comment = $reply_comment[0];
	$post = $post[0];
	$title = $post->post_title;
	$author = $reply_comment->comment_author;
	$url =	get_permalink($post_id);

	$to = $reply_comment->comment_author_email;
	if ($to == "") return;
	
	$subject = "The author replied your comment at [".get_bloginfo()."]'".$title;
	$date = mysql2date('Y.m.d H:i', $reply_comment->comment_date);
	$message = "
	<div>
		<p>Dear $author:<p>
		<p>{$comment->comment_content}</p>
		<div style='color:grey;'><small>$date, your comment at ".get_bloginfo()."<a href='$url#comment-$id'>$title</a>: </small>
			<blockquote>
				<p>{$reply_comment->comment_content}</p>
			</blockquote>
		</div>
	</div>";

		// strip out some chars that might cause issues, and assemble vars
		$site_name = get_bloginfo();
		$site_email = get_settings('admin_email');
		$charset = get_settings('blog_charset');

		$headers  = "From: \"{$site_name}\" <{$site_email}>\n";
		$headers .= "MIME-Version: 1.0\n";
		$headers .= "Content-Type: text/html; charset=\"{$charset}\"\n";
		
		$email_send_comment = "Email notification has sent to ".$to." with subject '".$subject."'";
		return wp_mail($to, $subject, $message, $headers);
}

// advanced configuration and optimization, for advanced user. Don't change it if you are not sure what you did.
add_action('wp_head','reply_column_checker'); // after first comment after installation, you can uncomment this.
add_action('wp_head','commentreply_load_scripts'); // this is to add CSS file to your blog. You can copy the CSS content to your main CSS file(template/style.css) and uncomment this.
add_action('comment_post','add_reply_id'); // this add reply id to your database for every comment. Never touch it.
add_filter('comments_template', change_comments_template); // choose proper comment template
add_action('comment_post', 'email_back'); // email notification back to replied comment author

?>