=== Ajax Comments-Reply ===
Contributors: zhiqiang
Donate link: 
Tags: comments, ajax, reply
Requires at least: 2.3
Tested up to: 2.5
Stable tag: trunk

This plugin have two features mainly. One you can send comments in AJAX. Second you can reply others' comments. 

== Description ==

Features:

* very easy to use, just download it, upload it, activate it, done.
* send comments in Ajax
* reply others' comments
* AJAX preview comments
* show limited number of comments per page.
* Gravatar is integrally supported.
* delete/spamed/edit comment when administrator are reading posts
* Administrator can send notification if he want when reply a comment.
* and more 

See http://zhiqiang.org/blog/ for a demo.

= Notice: =
* This plugin might be conflict with some other plugins with the same features like "QUOTER", "THRESHOLD" and "AJAX COMMENT". Please deactivate the others if you want to use this one.
* The 1.0 version is by http://blog.nahoya.com/archives/2006_04/109

== Installation ==

= installation instruction =

1. Upload `ajaxcomment` fold to the `/wp-content/plugins/` directory
1. Activate the plugin 'Ajax Comments-Reply' through the 'Plugins' menu in WordPress
1. done


= uninstall instruction =

1. deactivate the plugin or remove the plugin files.

= More configurations =

The step below you can customize this plugin:

1. At `ajaxcomment/comment-reply.php`, you can set `$max_level` as the maximum of reply-able level of comments. i.e. if you set it as 0, then you can't reply comments. Default is 5.
1. At `ajaxcomment/comment-reply.php`, you can set `$comments_per_page` as the number of comments displayed each page. If you want to display all comments always, just set it as a big enough number, e.g. 100000. The remaining comments can be AJAX loaded. Default is 100.
1. You can customize the looking by editing CSS. Default CSS is in `ajaxcomment/comment.css`.
1. Specifically, `.mine{border-color:red !important;}.borderc1{border-color:#663399 !important;}.borderc2{border-color:#ccc !important;}` control the border color of the comments. Class mine indicated the comments is by administator.
1. You can customize the comment stucture at `ajaxcomment/comments.php`.  Just keep the id properties of the structure. Notice: editing your `comments.php` in the template directory takes no effect.

== Frequently Asked Questions ==

= I don't like the appearance? =

Please customize it by editing `ajaxcomment/comment.css` and `ajaxcomment/comments.php`

= I use the default CSS, but it isn't the same as the demo site? = 

Maybe your `template/style.css` define CSS of the comment form, and they conflict with default one. Delete them.

= I want the comments sorted by post date reversely =

In `ajaxcomment/comments.php`, uncomment line `// $comments = array_reverse($comments);`

== Screenshots ==

1. This is the first screen shot
2. This is the second screen shot
