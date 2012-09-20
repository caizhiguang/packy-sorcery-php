=== Favatars ===
Tags: Favatar, Avatar, Comments
Contributors: chuyskywalker

Favatars is a plugin that enables each comment/pingback/trackback to be accompanied by the website favicon (if available).

A little less cryptically, this means that when a user on your blog leaves a comment/pingback/trackback, if they supply a URL, the plugin will see if their website has a favicon - if they do have a favicon, then you will have the option of making it show up on your blog right next to their name. 

== Installation ==

Installing favatars is very simple.

1. Download favatars.php
2. Upload favatars.php into your wp-content/plugins directory.
3. Activate the plugin through the WordPress admin interface.
4. Somewhere inside your "comment loop" add the code: <?php comment_favicon(); ?> 
   The "comment loop" is found in wp-content/themes/themename/comments.php  

That's about it. Very straight forward installation and useage. 


== Favatise ==

One of the caveats with this script is that it occurs only at the time the comment is posted, this means that comments from the past will not have favatars associated with them. If you wish to "Favatise" your blog, you can go into your Admin pages -> Options -> Favatars and run the script that will process every comment, pingback, and trackback on your blog and try to capture a favatar from it.

Be patient, this process will take a while and will probably stress your server out a good deal. Be careful with it.

== Known Issues ==

= Plugin Conflict =

Benny Chandra points out that this plugin may have errors when used in conjunction with Subscribe To Comments 1.4.2, however it works with Subscribe To Comments 1.4.4, so get the upgrade and that fixes the issue. 

== Screenshots ==

1. Two implementations of the plugin in a comments loop.
2. An example showing the Trackback/Pingback icons.
