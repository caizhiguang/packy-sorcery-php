<?php
/*
Plugin Name: Google Plus Favicon
Description: This plugin allows you to generate a Google Plus(G+) favicon for your blog, feed logo and admin logo included Apple touch icon. <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=mypatricks@gmail.com&item_name=Donate%20to%20Patrick%20Chia&item_number=1242543308&amount=3.00&no_shipping=0&no_note=1&tax=0&currency_code=USD&bn=PP%2dDonationsBF&charset=UTF%2d8&return=http://patrick.bloggles.info/">Get a coffee to Patrick</a>
Version: 3.0
Author: Patrick Chia
Author URI: http://patrickchia.com/
Plugin URI: http://patrick.bloggles.info/plugins/
Tags: G+, plus, google, google+, multi-site, wpmu, wordpressmu, images, avatar, avatars, gravatar, personalization, avatar, identicon, OpenAvatar, mybloglog, monsterid, Favatar, favicon, shortcut icon, web site icon, URL icon
Donate link: http://bit.ly/aYeS92
*/

function plus_settings_api_init() {
	add_settings_section('plus_setting_section',
		'G+ Web site icon Settings',
		'plus_setting_section_callback_function',
		'general');

	add_settings_field('plus_id',
		'Google Plus ID',
		'plus_setting_callback_function',
		'general',
		'plus_setting_section');

	register_setting('general','plus_id');
}
 
add_action('admin_init', 'plus_settings_api_init');
 
function plus_setting_section_callback_function() {
	if ( get_option('plus_id') && get_plus_photo() ) {
		$site_icon = str_replace( 'photo.jpg', 's31-c/photo.jpg', get_plus_photo() );
		$site_icon = '<img style="float:left;padding-right:10px;" src="'. $site_icon .'" />';
	}

	echo '<p>'.$site_icon.'Simply add a <a href="https://plus.google.com/">Google+</a> account ID to generate a <a href="http://en.wikipedia.org/wiki/Favicon">favicon</a> for your blog, feed logo and admin logo.<br />Enter your G+ account ID</p>';
}
 
function plus_setting_callback_function() {
	if ( get_option('plus_id') && get_plus_photo() ) {
		$site_icon = str_replace( 'photo.jpg', 's31-c/photo.jpg', get_plus_photo() );
		$icon_notes = '<br /><span class="description">If you updated your G+ profile image, please allowed 24 hours to update your new G+ favicon.</span>';
	}

	echo '<input name="plus_id" id="plus_id" type="text" value="'. get_option('plus_id') .'" class="regular-text" />' . $icon_notes;
}

function get_plus_photo(){
	if ( get_option('plus_id') )
		$account = get_option('plus_id');
	else
		return false;

	if ( !$gson = wp_cache_get( 'plus-fav', 'general' ) ) {
		$google_json_url = esc_url_raw( 'https://www.googleapis.com/buzz/v1/people/'. $account .'/@self?alt=json&key=AIzaSyAEshRzS0eynJ-k_MxMpBLlRUeDlPuJe1Q' );
		$response = wp_remote_get( $google_json_url, array( 'User-Agent' => get_bloginfo('name') ) );
		$response_code = wp_remote_retrieve_response_code( $response );

		if ( 200 == $response_code ) {
			$gson = wp_remote_retrieve_body( $response );
			$gson = json_decode( $gson, true );
			$expire = 900;
			if ( !is_array( $gson ) || isset( $gson['error'] ) ) {
				$gson = 'error';
				$expire = 300;
			}
		} else {
			$gson = 'error';
			$expire = 300;
			wp_cache_add( 'gplus-response-code', $response_code, 'general', $expire);

		}
		wp_cache_add( 'plus-fav', $gson, 'widget', 86400); //cache for 24 hours

	}

	if ( 'error' != $gson ) :
		foreach ( (array) $gson as $json ) {
			$plus = $json['thumbnailUrl'];
		}

		if ( $plus ){
			//generate local icon file
			$uploads = wp_upload_dir();
			if ( !is_multisite() )
				$bdir = ABSPATH;
			else 
				$bdir = $uploads['basedir'] .'/';

			$icon_file  = $bdir . 'favicon.ico';
			$image_from_plus = str_replace( 'photo.jpg', 's16-c/photo.jpg', $plus );
			copy( $image_from_plus, $bdir.'temp' );

			if ( is_file( $bdir . 'temp' ) ) {
				$temp_image = $bdir . 'temp';
			if ( exif_imagetype( $temp_image ) == IMAGETYPE_GIF )
				$file_type = 'gif';
			if ( exif_imagetype( $temp_image ) == IMAGETYPE_JPEG )
				$file_type = 'jpeg';
			if ( exif_imagetype( $temp_image ) == IMAGETYPE_PNG )
				$file_type = 'png';
			switch ( $file_type ) {
				case "jpeg":
				case "jpg":
					$im = imagecreatefromjpeg( $temp_image );
					break;
				case "gif":
					$im = imagecreatefromgif( $temp_image );
					break;
				case "png":
					$im = imagecreatefrompng( $temp_image );
					imagealphablending( $im, true );
					imagesavealpha( $im, true );
					break;
			}

			imageIco( $im, $bdir . 'favicon.ico' );
			imagedestroy( $im );
			unlink( $temp_image );
		}
	}

	return $plus;

	else :
		if ( 401 == wp_cache_get( 'gplus-response-code', 'general' ) )
			echo '<!--' . esc_html( sprintf( __( 'Error: Please make sure the Google account is <a href="%s">public</a>.'), 'http://plus.google.com/' ) ) . '-->';
		else
			echo '<!--' . esc_html__('Error: Google Plus did not respond. Please wait a few minutes and refresh this page.') . '-->';

	endif;

	return false;
}

function plus_blog_favicon() {
	if ( get_option('plus_id') && get_plus_photo() ) {
		$uploads = wp_upload_dir();
		if ( !is_multisite() )
			$bdir = ABSPATH;
		else 
			$bdir = $uploads['basedir'] .'/';

		$icon_file  = $bdir . 'favicon.ico';

		$apple_icon = str_replace( 'photo.jpg', 's60-c/photo.jpg', get_plus_photo() );
		if ( file_exists( $icon_file ) ){
			if ( !is_multisite() )
				$favicon_icon =	home_url() .'/favicon.ico';
			else
				$favicon_icon =	$uploads['baseurl'] .'/favicon.ico';
		} else {
			$favicon_icon =	str_replace( 'photo.jpg', 's16-c/photo.jpg', get_plus_photo() );
		}

		echo '<link rel="apple-touch-icon" href="'. $apple_icon .'" />';
		echo '<link rel="apple-touch-icon-precomposed" href="'. $apple_icon .'" />';
		echo '<link rel="shortcut icon" href="'. $favicon_icon .'" /><!-- G+ Favicon by Patrick http://patrick.bloggles.info/ -->';
	}
}

function plus_admin_logo() {
	if ( get_option('plus_id') && get_plus_photo() ) {
		$admin_logo = str_replace( 'photo.jpg', 's16-c/photo.jpg', get_plus_photo() );

	?>
	<style type="text/css">#header-logo{background: transparent url( <?php echo $admin_logo; ?> ) no-repeat scroll center center;</style>
	<?php
	}
}

function plus_add_feed_logo() {
	if ( get_option('plus_id') && get_plus_photo() ) {
		$feed_logo = str_replace( 'photo.jpg', 's48-c/photo.jpg', get_plus_photo() );

	echo "
   <image>
    <title>". get_bloginfo('name')."</title>
    <url>". $feed_logo ."</url>
    <link>". get_bloginfo('siteurl') ."</link>
   </image><!-- G+ Favicon by Patrick http://patrick.bloggles.info/ -->\n";
	}
}

function plus_plugin_settings( $links ) {
	$settings_link = '<a href="options-general.php">'.__( 'Settings', 'plusfavicon' ).'</a>';
	array_unshift( $links, $settings_link );
	return $links;
}

function plus_add_plugin_settings($links, $file) {
	if ( $file == basename( dirname( __FILE__ ) ).'/'.basename( __FILE__ ) ) {
		$links[] = '<a href="options-general.php">' . __( 'Settings', 'plusfavicon' ) . '</a>';
		$links[] = '<a href="http://bit.ly/aYeS92">' . __( 'Make Donation', 'plusfavicon' ) . '</a>';
	}
	
	return $links;
}

add_action( 'wp_head', "plus_blog_favicon" );
add_action( 'admin_head', 'plus_blog_favicon' );
add_action( 'login_head', 'plus_blog_favicon' );
add_action( 'admin_head', 'plus_admin_logo' );
add_action( 'rss_head', 'plus_add_feed_logo' );
add_action( 'rss2_head', 'plus_add_feed_logo' );
add_action( 'plugin_action_links_'.basename( dirname( __FILE__ ) ).'/'.basename( __FILE__ ), 'plus_plugin_settings', 10, 4 );
add_filter( 'plugin_row_meta', 'plus_add_plugin_settings', 10, 2 );


/**
 * @package com.jpexs.image.ico
 *
 * JPEXS ICO Image functions
 * @version 2.1
 * @author JPEXS
 * @copyright (c) JPEXS 2004-2009
 *
 * Webpage: http://www.jpexs.com
 * Email: jpexs@jpexs.com
 *
 * If you like my script, you can donate... visit my webpages or email me for more info.
 *
 *        Version changes:
 *                v2.1 - redesigned sourcecode, phpdoc included, all internal functions and global variables have prefix "jpexs_"
 *                v2.0 - For icons with Alpha channel now you can set background color
 *                     - ImageCreateFromExeIco added
 *                     - Fixed ICO_MAX_SIZE and ICO_MAX_COLOR values
 *
 * TODO list:
 *      - better error handling
 *      - class encapsulation
 * License:
 *      - you can freely use it
 *      - you can freely distribute sourcecode
 *      - you can freely modify it as long as you leave my copyright/author info in source code
 *      - if you developing closesource application, you should add my name at least to "about" page of your web application
 *      - if you create an amazing modification, please contact me... I can publish link to your webpage if you're interested...
 *      - if you want to use my script in commercial application for earning money, you should make a donation to me first
 */

/** TrueColor images constant  */
define( "ICO_TRUE_COLOR", 0x1000000 );
/** XPColor images constant (Alpha channel) */
define( "ICO_XP_COLOR", 4294967296 );
/** Image with maximum colors */
define( "ICO_MAX_COLOR", -2 );
/** Image with maximal size */
define( "ICO_MAX_SIZE", -2 );


/** TrueColor images constant
 * @deprecated Deprecated since version 2.1, please use ICO_ constants
 */
define( "TRUE_COLOR", 0x1000000 );
/** XPColor images constant (Alpha channel)
 * @deprecated Deprecated since version 2.1, please use ICO_ constants
 */
define( "XP_COLOR", 4294967296 );
/** Image with maximum colors
 * @deprecated Deprecated since version 2.1, please use ICO_ constants
 */
define( "MAX_COLOR", -2 );
/** Image with maximal size
 * @deprecated Deprecated since version 2.1, please use ICO_ constants
 */
define( "MAX_SIZE", -2 );

/**
 * Creates ico file from image resource(s)
 * @param resource|array $images Target Image resource (Can be array of image resources)
 * @param string $filename Target ico file to save icon to, If ommited or "", image is written to snadard output - use header("Content-type: image/x-icon"); */
function imageIco( $images, $filename = "" ) {
	if ( is_array( $images ) ) {
		$ImageCount = count( $images );
		$Image      = $images;
	} else {
		$Image[ 0 ] = $images;
		$ImageCount = 1;
	}
	
	$WriteToFile = false;
	if ( $filename != "" ) {
		$WriteToFile = true;
	}

	$ret = "";
	$ret .= jpexs_inttoword( 0 ); //PASSWORD
	$ret .= jpexs_inttoword( 1 ); //SOURCE
	$ret .= jpexs_inttoword( $ImageCount ); //ICONCOUNT
	
	for ( $q = 0; $q < $ImageCount; $q++ ) {
		$img = $Image[ $q ];
		$Width  = imagesx( $img );
		$Height = imagesy( $img );
		$ColorCount = imagecolorstotal( $img );
		$Transparent   = imagecolortransparent( $img );
		$IsTransparent = $Transparent != -1;
		
		if ( $IsTransparent )
			$ColorCount--;
		
		if ( $ColorCount == 0 ) {
			$ColorCount = 0;
			$BitCount   = 24;
		}
		if ( ( $ColorCount > 0 ) and ( $ColorCount <= 2 ) ) {
			$ColorCount = 2;
			$BitCount   = 1;
		}
		if ( ( $ColorCount > 2 ) and ( $ColorCount <= 16 ) ) {
			$ColorCount = 16;
			$BitCount   = 4;
		}
		if ( ( $ColorCount > 16 ) and ( $ColorCount <= 256 ) ) {
			$ColorCount = 0;
			$BitCount   = 8;
		}

		$ret .= jpexs_inttobyte( $Width ); //
		$ret .= jpexs_inttobyte( $Height ); //
		$ret .= jpexs_inttobyte( $ColorCount ); //
		$ret .= jpexs_inttobyte( 0 ); //RESERVED
		
		$Planes = 0;
		if ( $BitCount >= 8 )
			$Planes = 1;
		
		$ret .= jpexs_inttoword( $f, $Planes ); //PLANES
		if ( $BitCount >= 8 )
			$WBitCount = $BitCount;
		if ( $BitCount == 4 )
			$WBitCount = 0;
		if ( $BitCount == 1 )
			$WBitCount = 0;
		$ret .= jpexs_inttoword( $WBitCount ); //BITS
		$Zbytek     = ( 4 - ( $Width / ( 8 / $BitCount ) ) % 4 ) % 4;
		$ZbytekMask = ( 4 - ( $Width / 8 ) % 4 ) % 4;
		$PalSize = 0;
		$Size = 40 + ( $Width / ( 8 / $BitCount ) + $Zbytek ) * $Height + ( ( $Width / 8 + $ZbytekMask ) * $Height );
		if ( $BitCount < 24 )
			$Size += pow( 2, $BitCount ) * 4;
		$IconId = 1;
		$ret .= jpexs_inttodword( $Size ); //SIZE
		$OffSet = 6 + 16 * $ImageCount + $FullSize;
		$ret .= jpexs_inttodword( 6 + 16 * $ImageCount + $FullSize ); //OFFSET
		$FullSize += $Size;
	}

	for ( $q = 0; $q < $ImageCount; $q++ ) {
		$img        = $Image[ $q ];
		$Width      = imagesx( $img );
		$Height     = imagesy( $img );
		$ColorCount = imagecolorstotal( $img );
		$Transparent   = imagecolortransparent( $img );
		$IsTransparent = $Transparent != -1;
		
		if ( $IsTransparent )
			$ColorCount--;
		if ( $ColorCount == 0 ) {
			$ColorCount = 0;
			$BitCount   = 24;
		}
		if ( ( $ColorCount > 0 ) and ( $ColorCount <= 2 ) ) {
			$ColorCount = 2;
			$BitCount   = 1;
		}
		if ( ( $ColorCount > 2 ) and ( $ColorCount <= 16 ) ) {
			$ColorCount = 16;
			$BitCount   = 4;
		}
		if ( ( $ColorCount > 16 ) and ( $ColorCount <= 256 ) ) {
			$ColorCount = 0;
			$BitCount   = 8;
		}

		$ret .= jpexs_inttodword( 40 ); //HEADSIZE
		$ret .= jpexs_inttodword( $Width ); //
		$ret .= jpexs_inttodword( 2 * $Height ); //
		$ret .= jpexs_inttoword( 1 ); //PLANES
		$ret .= jpexs_inttoword( $BitCount ); //
		$ret .= jpexs_inttodword( 0 ); //Compress method
		$ZbytekMask = ( $Width / 8 ) % 4;
		$Zbytek = ( $Width / ( 8 / $BitCount ) ) % 4;
		$Size   = ( $Width / ( 8 / $BitCount ) + $Zbytek ) * $Height + ( ( $Width / 8 + $ZbytekMask ) * $Height );

		$ret .= jpexs_inttodword( $Size ); //SIZE
		$ret .= jpexs_inttodword( 0 ); //HPIXEL_M
		$ret .= jpexs_inttodword( 0 ); //V_PIXEL_M
		$ret .= jpexs_inttodword( $ColorCount ); //UCOLORS
		$ret .= jpexs_inttodword( 0 ); //DCOLORS

		$CC = $ColorCount;
		if ( $CC == 0 )
			$CC = 256;
		
		if ( $BitCount < 24 ) {
			$ColorTotal = imagecolorstotal( $img );
			if ( $IsTransparent )
				$ColorTotal--;
			
			for ( $p = 0; $p < $ColorTotal; $p++ ) {
				$color = imagecolorsforindex( $img, $p );
				$ret .= jpexs_inttobyte( $color[ "blue" ] );
				$ret .= jpexs_inttobyte( $color[ "green" ] );
				$ret .= jpexs_inttobyte( $color[ "red" ] );
				$ret .= jpexs_inttobyte( 0 ); //RESERVED
			}

			$CT = $ColorTotal;
			for ( $p = $ColorTotal; $p < $CC; $p++ ) {
				$ret .= jpexs_inttobyte( 0 );
				$ret .= jpexs_inttobyte( 0 );
				$ret .= jpexs_inttobyte( 0 );
				$ret .= jpexs_inttobyte( 0 ); //RESERVED
			}
		}

		if ( $BitCount <= 8 ) {
			for ( $y = $Height - 1; $y >= 0; $y-- ) {
				$bWrite = "";
				for ( $x = 0; $x < $Width; $x++ ) {
					$color = imagecolorat( $img, $x, $y );
					if ( $color == $Transparent )
						$color = imagecolorexact( $img, 0, 0, 0 );
					if ( $color == -1 )
						$color = 0;
					if ( $color > pow( 2, $BitCount ) - 1 )
						$color = 0;
					
					$bWrite .= jpexs_decbinx( $color, $BitCount );
					if ( strlen( $bWrite ) == 8 ) {
						$ret .= jpexs_inttobyte( bindec( $bWrite ) );
						$bWrite = "";
					} //strlen( $bWrite ) == 8
				}

				if ( ( strlen( $bWrite ) < 8 ) and ( strlen( $bWrite ) != 0 ) ) {
					$sl = strlen( $bWrite );
					for ( $t = 0; $t < 8 - $sl; $t++ )
						$sl .= "0";
					$ret .= jpexs_inttobyte( bindec( $bWrite ) );
				}
				for ( $z = 0; $z < $Zbytek; $z++ )
					$ret .= jpexs_inttobyte( 0 );
			}
		}

		if ( $BitCount >= 24 ) {
			for ( $y = $Height - 1; $y >= 0; $y-- ) {
				for ( $x = 0; $x < $Width; $x++ ) {
					$color = imagecolorsforindex( $img, imagecolorat( $img, $x, $y ) );
					$ret .= jpexs_inttobyte( $color[ "blue" ] );
					$ret .= jpexs_inttobyte( $color[ "green" ] );
					$ret .= jpexs_inttobyte( $color[ "red" ] );
					if ( $BitCount == 32 )
						$ret .= jpexs_inttobyte( 0 ); //Alpha for ICO_XP_COLORS
				}
				for ( $z = 0; $z < $Zbytek; $z++ )
					$ret .= jpexs_inttobyte( 0 );
			}
		}

		for ( $y = $Height - 1; $y >= 0; $y-- ) {
			$byteCount = 0;
			$bOut      = "";
			for ( $x = 0; $x < $Width; $x++ ) {
				if ( ( $Transparent != -1 ) and ( imagecolorat( $img, $x, $y ) == $Transparent ) ) {
					$bOut .= "1";
				} else {
					$bOut .= "0";
				}
			}
			for ( $p = 0; $p < strlen( $bOut ); $p += 8 ) {
				$byte = bindec( substr( $bOut, $p, 8 ) );
				$byteCount++;
				$ret .= jpexs_inttobyte( $byte );
			}
			$Zbytek = $byteCount % 4;
			for ( $z = 0; $z < $Zbytek; $z++ ) {
				$ret .= jpexs_inttobyte( 0xff );
			}
		}
	}

	if ( $WriteToFile ) {
		$f = fopen( $filename, "w" );
		fwrite( $f, $ret );
		fclose( $f );
	} else {
		echo $ret;
	}
}

/*
 * Internal functions:
 *-------------------------
 * jpexs_inttobyte($n) - returns chr(n)
 * jpexs_inttodword($n) - returns dword (n)
 * jpexs_inttoword($n) - returns word(n)
 * jpexs_freadbyte($file) - reads 1 byte from $file
 * jpexs_freadword($file) - reads 2 bytes (1 word) from $file
 * jpexs_freaddword($file) - reads 4 bytes (1 dword) from $file
 * jpexs_freadlngint($file) - same as freaddword($file)
 * jpexs_decbin8($d) - returns binary string of d zero filled to 8
 * jpexs_RetBits($byte,$start,$len) - returns bits $start->$start+$len from $byte
 * jpexs_freadbits($file,$count) - reads next $count bits from $file
 */
function jpexs_decbin8( $d ) {
	return jpexs_decbinx( $d, 8 );
}

function jpexs_decbinx( $d, $n ) {
	$bin  = decbin( $d );
	$sbin = strlen( $bin );
	for ( $j = 0; $j < $n - $sbin; $j++ )
		$bin = "0$bin";
	return $bin;
}

function jpexs_retBits( $byte, $start, $len ) {
	$bin = jpexs_decbin8( $byte );
	$r   = bindec( substr( $bin, $start, $len ) );
	return $r;
}

$jpexs_currentBit = 0;
function jpexs_freadbits( $f, $count ) {
	global $jpexs_currentBit, $jpexs_SMode;
	$Byte     = jpexs_freadbyte( $f );
	$LastCBit = $jpexs_currentBit;
	$jpexs_currentBit += $count;
	if ( $jpexs_currentBit == 8 ) {
		$jpexs_currentBit = 0;
	} else {
		fseek( $f, ftell( $f ) - 1 );
	}
	return jpexs_retBits( $Byte, $LastCBit, $count );
}

function jpexs_freadbyte( $f ) {
	return ord( fread( $f, 1 ) );
}

function jpexs_freadword( $f ) {
	$b1 = jpexs_freadbyte( $f );
	$b2 = jpexs_freadbyte( $f );
	return $b2 * 256 + $b1;
}

function jpexs_freadlngint( $f ) {
	return jpexs_freaddword( $f );
}

function jpexs_freaddword( $f ) {
	$b1 = jpexs_freadword( $f );
	$b2 = jpexs_freadword( $f );
	return $b2 * 65536 + $b1;
}

function jpexs_inttobyte( $n ) {
	return chr( $n );
}

function jpexs_inttodword( $n ) {
	return chr( $n & 255 ) . chr( ( $n >> 8 ) & 255 ) . chr( ( $n >> 16 ) & 255 ) . chr( ( $n >> 24 ) & 255 );
}

function jpexs_inttoword( $n ) {
	return chr( $n & 255 ) . chr( ( $n >> 8 ) & 255 );
}

?>