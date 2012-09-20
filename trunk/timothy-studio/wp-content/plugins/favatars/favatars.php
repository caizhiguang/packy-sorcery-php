<?php
/*
Plugin Name: Favatars
Plugin URI: http://dev.wp-plugins.org/wiki/favatars
Description: A system to show favicon.ico files as avatars: "Favatars". Entire recode by <a href="http://www.thecodepro.com/">Jeff Minard</a> <br /> Previous Versions care of: <a href="http://www.noscope.com">Joen</a>, <a href="http://www.peej.co.uk/projects/favatars.html">Paul James</a>, and <a href="http://www.somefoolwitha.com">Matthew</a>. 
Version: 2
Author: Jeff Minard
Author URI: http://thecodepro.com/
*/

// Nothing more to see here. All configuration is done via the admin panel.
// Move along.

$comment_favicon_exists = fav_maybe_add_column($wpdb->comments, 'comment_favicon_url', "ALTER TABLE `$wpdb->comments` ADD `comment_favicon_url` TEXT NOT NULL");

if( $comment_favicon_exists == false )
	die("I could not initialize the need column to make the favicon hack work. Please disable the plugin and contact the author.");




function comment_favicon($before='<img src="', $after='" alt="" />') {
	global $comment, $wpdb;
    
	$favicon_url = $wpdb->get_var("SELECT comment_favicon_url FROM `$wpdb->comments` WHERE `comment_ID` = '$comment->comment_ID'");
	
    if(!empty($favicon_url))
		echo($before . $favicon_url . $after);
}





// Now the real meat, the discovery function.
function discover_favicon($comment_ID) {
    global $wpdb;

    $posters_url = $wpdb->get_var("SELECT comment_author_url FROM `$wpdb->comments` WHERE `comment_ID` = '$comment_ID'");

	if(!empty($posters_url)) { 

		if( $favicon_url = getFavicon($posters_url) )
			$wpdb->query("UPDATE `$wpdb->comments` SET `comment_favicon_url` = '$favicon_url' WHERE `comment_ID` = '$comment_ID' LIMIT 1");

	} 
	
	return $comment_ID;

}

// adds the discovery function to happen on comments, tracks, and pings
add_action('comment_post','discover_favicon');
add_action('trackback_post','discover_favicon');
add_action('pingback_post','discover_favicon');


/**************************************
Utility functions needed for this thing
**************************************/

/*
* @return boolean/string
* @param  string $url
* @desc  Attempts to find and return a favicon url based on $url
*/

function getFavicon($url) {

	// start by fetching the contents of the URL they left...
	if( $html = @file_get_contents($url) ) {

		if (preg_match('/<link[^>]+rel="(?:shortcut )?icon"[^>]+?href="([^"]+?)"/si', $html, $matches)) {
			// Attempt to grab a favicon link from their webpage url

			$linkUrl = html_entity_decode($matches[1]);
			if (substr($linkUrl, 0, 1) == '/') {
				$urlParts = parse_url($url);
				$faviconURL = $urlParts['scheme'].'://'.$urlParts['host'].$linkUrl;
			} else if (substr($linkUrl, 0, 7) == 'http://') {
				$faviconURL = $linkUrl;
			} else if (substr($url, -1, 1) == '/') {
				$faviconURL = $url.$linkUrl;
			} else {
				$faviconURL = $url.'/'.$linkUrl;
			}

		} else {
			// If unsuccessful, attempt to "guess" the favicon location

			$urlParts = parse_url($url);
			$faviconURL = $urlParts['scheme'].'://'.$urlParts['host'].'/favicon.ico';

		}

		// Run a test to see if what we have attempted to get actually exists.
		if( $faviconURL_exists = url_validate($faviconURL) )
			return $faviconURL;

	} 

	// Finally, if we haven't 'returned' yet then there is nothing to see here.
	return false;
}


/**
 ** fav_maybe_add_column()
 ** Add column to db table if it doesn't exist.
 ** Returns:  true if already exists or on successful completion
 **           false on error
 */
function fav_maybe_add_column($table_name, $column_name, $create_ddl) {
    global $wpdb;
	foreach ($wpdb->get_col("DESC $table_name", 0) as $column ) {
		if ($column == $column_name)
			return true;
	}
	
	//didn't find it try to create it.
	$q = $wpdb->query($create_ddl);
	
	// we cannot directly tell that whether this succeeded!
	foreach ($wpdb->get_col("DESC $table_name", 0) as $column ) {
		if ($column == $column_name)
			return true;
	}
	return false;
}

/*
* @return boolean
* @param  string $link
* @desc  Checks to see if $link actually exists (HTTP-Code: 200|30*, etc)
*/
function url_validate( $link ) {
		
	$url_parts = @parse_url( $link );

	if ( empty( $url_parts["host"] ) )
		return false;

	if ( !empty( $url_parts["path"] ) ) {
		$documentpath = $url_parts["path"];
	} else {
		$documentpath = "/";
	}

	if ( !empty( $url_parts["query"] ) )
		$documentpath .= "?" . $url_parts["query"];

	$host = $url_parts["host"];
	$port = $url_parts["port"];
	
	if ( empty($port) )
		$port = "80";

	$socket = @fsockopen( $host, $port, $errno, $errstr, 30 );
	
	if ( !$socket )
		return false;
		
	fwrite ($socket, "HEAD ".$documentpath." HTTP/1.0\r\nHost: $host\r\n\r\n");

	$http_response = fgets( $socket, 22 );

	$responses = "/(200 OK)|(30[0-9] Moved)/";
	if ( preg_match($responses, $http_response) ) {
		fclose($socket);
		return true;
	} else {
		return false;
	}

}

function super_flush() {
	// Because some logs are just too big for flush()...
	flush(); ob_flush();
	flush(); ob_flush();
	flush(); ob_flush();
}

function favatars_option_page() {
	global $wpdb;
?>

<div class="wrap">
	<h2>Favatars</h2>

	<?php 
	
		if($_GET['clear'] == 1) {
			$comments = $wpdb->get_results("UPDATE `$wpdb->comments` SET `comment_favicon_url` = ''");
			echo '<div class="updated"><p>All favicons deleted.</p></div>';
		}
	
	?>
	
	<p>Attempt to find a favatar for every single comment, trackback, and pingback on your site. You should really only need to use this once after your turn the script on as it is primarily for fetching favatars for previous comments. However, you may also use this page to <a href="?page=favatars.php&amp;clear=1" onclick="return confirm('Flush all? You sure?');">flush the favatars from your system</a>.</p>

	<?php
	
	$gzipness = get_option('gzipcompression');
	
	if( $_GET['start'] && $gzipness == false ) {
		// go go go! update those avatars!
		
		DEFINE(SP,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		
		$request = "SELECT comment_ID, comment_author_url FROM $wpdb->comments WHERE comment_favicon_url = '' AND comment_author_url != '' ";

	    $comments = $wpdb->get_results($request);
	
		$processed_urls = array();
	
	    if ($comments) {
	        foreach ($comments as $comment) {
	
				super_flush();
				echo("Updating Comment: $comment->comment_ID (<a href=\"$comment->comment_author_url\">$comment->comment_author_url</a>) ... <br />");
				super_flush();
	
				if(!empty($processed_urls[$comment->comment_author_url])) {
					// commenter url already cached, don't reprocess
	
					if($processed_urls[$comment->comment_author_url] == 'none') {
						// empty one discovered, skip it.
						echo(SP."<em>Cached: Couldn't find a favicon</em><br />\n");
					} else {
						// normal favicon, go ahead.
						$wpdb->query("UPDATE `$wpdb->comments` SET `comment_favicon_url` = '" . $processed_urls[$comment->comment_author_url] . "' WHERE `comment_ID` = '$comment->comment_ID' LIMIT 1");
						echo(SP."<em>Cached: Successfully used: " . $processed_urls[$comment->comment_author_url] . "</em><br />\n");
					}
	
				} else {
					// Not in the cached array.
	
					if( $favicon_url = getFavicon($comment->comment_author_url) ) {
						$wpdb->query("UPDATE `$wpdb->comments` SET `comment_favicon_url` = '$favicon_url' WHERE `comment_ID` = '$comment->comment_ID' LIMIT 1");
						$processed_urls[$comment->comment_author_url] = $favicon_url;
						echo(SP."Successfully used: $favicon_url<br />\n");
					} else {
						$processed_urls[$comment->comment_author_url] = 'none';
						echo(SP."No luck. Couldn't find a favicon<br />\n");
					} 
	
				}
					
				super_flush();
				sleep(1);
				
	        }
	    }
	    
	    
	    ?>
	
		<h1>Update Complete!</h1>
		
		<p>You blog should now be all favatar'ed up!</p>
		
		<p><em>You can <a href="?page=favatars.php&amp;gzip=on">turn on gzip compression</a> again if you'd like</em></p>
		
		<?php

	} else if( $_GET['start'] && $gzipness == true ) {
		
		?>
		
		<p>You must <a href="?page=favatars.php&amp;gzip=off">disable GZIP compression</a> for this script to work correctly.</p>
		
		<?php
		
	} else if( !$_GET['start'] && !$_GET['gzip'] ) {
		
		?>
		
		<p><strong>WARNING: THIS SCRIPT IS HARD CORE</strong><br />
		It may bring your server to it's knees, it may not. Regardless, it's going to take a very long time - the script has to parse every single comment. So there, you've been warned.</p>
		
		<p>With that said, this script <em>shouldn't</em> do anything nearly as bad as that sounds - it'd most likely just fail to work.</p> 
	
		<p><em>Also of note, because of the way it's created, you can run this as many times as you want. The script only updates a comment when it has an author URL but no favicon url.</em></p>
		
		<form method="get">
			<input type="hidden" name="page" value="favatars.php" />
			<input type="submit" name="start" id="start" value="Favatise My Blog" style="font-size: 1.7em;" />
		</form>
		
		<?php
		
	}
	
	if( $_GET['gzip'] == 'off'  ) {
		// turn off gzip and proceed to step 2: favatise!
		update_option('gzipcompression', 0);
		?>
		
		<p>Gzip compression has been <strong>disabled</strong>, you may <a href="?page=favatars.php&amp;start=1">begin generating favatars for all comments.</a></p>
		
		<?php
	}
	
	if( $_GET['gzip'] == 'on'  ) {
		// turn off gzip and proceed to step 2: favatise!
		update_option('gzipcompression', 1);
		?>
		
		<p>Gzip compression has been <strong>enabled</strong></p>
		
		<?php
	}
	
	?>
	
	
</div>


<?php

}

function favatars_add_options() {
	 add_options_page('Favatars', 'Favatars Page', 10, __FILE__, 'favatars_option_page');
}

add_action('admin_menu', 'favatars_add_options');

?>