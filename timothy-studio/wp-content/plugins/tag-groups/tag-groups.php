<?php
/*
Plugin Name: Tag Groups
Plugin URI: http://www.christoph-amthor.de/software/tag-groups/
Description: Assign tags to groups and display them in a tabbed tag cloud
Author: Christoph Amthor
Version: 0.7
Author URI: http://www.christoph-amthor.de
License: GNU GENERAL PUBLIC LICENSE, Version 3
*/

define("TAG_GROUPS_VERSION", "0.7");

define("TAG_GROUPS_BUILT_IN_THEMES", "ui-gray,ui-lightness,ui-darkness");

define("TAG_GROUPS_STANDARD_THEME", "ui-gray");




add_action( 'admin_init', 'tg_register_settings' );

add_action( 'admin_menu', 'tg_register_tag_label_page' );

add_shortcode( 'tag_groups_cloud', 'tag_groups_cloud' );

add_action( 'wp_enqueue_scripts', 'tg_add_js_css' );

add_action( 'admin_enqueue_scripts', 'tg_add_admin_js_css' );

add_action( 'wp_head', 'tg_custom_js' );

// register_activation_hook();

// register_deactivation_hook();


function tg_register_settings() {
/*
	Initial settings after calling the plugin
*/

	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );

	add_action( "{$tag_group_taxonomy}_edit_form_fields", 'tg_tag_input_metabox' );

	add_action( "{$tag_group_taxonomy}_add_form_fields", 'tg_create_new_tag' );

	add_filter( "manage_edit-{$tag_group_taxonomy}_columns", 'tg_add_taxonomy_columns' );

	add_filter( "manage_{$tag_group_taxonomy}_custom_column", 'tg_add_taxonomy_column_content', 10, 3 );

	add_action( 'quick_edit_custom_box', 'tg_quick_edit_tag', 10, 3 );
	
	add_action( 'create_term', 'tg_update_edit_term_group' );
		
	add_action( 'edit_term', 'tg_update_edit_term_group' );
	
	$plugin = plugin_basename(__FILE__);

	add_filter("plugin_action_links_$plugin", 'tg_plugin_settings_link' );
	
	add_action('admin_footer', 'tg_quick_edit_javascript');

	add_filter('tag_row_actions', 'tg_expand_quick_edit_link', 10, 2);

	tg_init();

}


function tg_plugin_settings_link($links) {
/*
	adds Settings link to plugin list
*/

  $settings_link = '<a href="edit.php?page=tag-groups-settings">Settings</a>'; 
  array_unshift($links, $settings_link); 

  return $links; 

}
 

function tg_add_admin_js_css() {
/*
	adds css to backend
*/

	wp_register_style( 'tag-groups-css-backend', plugins_url('css/style.css', __FILE__) );
	
	wp_enqueue_style( 'tag-groups-css-backend' );

}


function tg_add_js_css() {
/*
	adds js and css to frontend
*/

	$theme = get_option( 'tag_group_theme', TAG_GROUPS_STANDARD_THEME );

	$default_themes = explode( ',', TAG_GROUPS_BUILT_IN_THEMES );
	
	$tag_group_enqueue_jquery = get_option( 'tag_group_enqueue_jquery', true );


	if ($tag_group_enqueue_jquery) {

		wp_enqueue_script('jquery');

		wp_enqueue_script('jquery-ui-core');

		wp_enqueue_script('jquery-ui-tabs');

	}

	if ($theme == '' ) return;
	
	if (in_array($theme, $default_themes)) {

		wp_register_style( 'tag-groups-css-frontend', plugins_url('css/'.$theme.'/jquery-ui-1.8.21.custom.css', __FILE__) );

		
	} else {

		wp_register_style( 'tag-groups-css-frontend', get_bloginfo('wpurl').'/wp-content/uploads/'.$theme.'/jquery-ui-1.8.21.custom.css' );
	
	}

	wp_enqueue_style( 'tag-groups-css-frontend' );

}


function tg_register_tag_label_page() {
/*
	adds the submenus to the admin backend
*/

	add_submenu_page( 'edit.php', 'Tag Groups', 'Tag Groups', 'manage_options', 'tag-groups', 'tg_group_administration' );

	add_submenu_page( 'edit.php', 'Tag Groups Settings', 'Tag Groups Settings', 'manage_options', 'tag-groups-settings', 'tg_settings_page');

}


function tg_add_taxonomy_columns($columns) {
/*
	adds a custom column to the table of tags/terms
	thanks to http://coderrr.com/add-columns-to-a-taxonomy-terms-table/
*/
		
	$columns['term_group'] = __('Tag Group', 'tag-groups');
	
	return $columns;
 		
}

	
function tg_add_taxonomy_column_content($empty = '', $empty = '', $term_id) {
/*
	adds data into custom column of the table for each row
	thanks to http://coderrr.com/add-columns-to-a-taxonomy-terms-table/
*/

	$tag_group_labels = get_option( 'tag_group_labels', array() );

	$tag_group_ids = get_option( 'tag_group_ids', array() );

	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );
	
	$tag = get_term($term_id, $tag_group_taxonomy);
	
	$i = array_search($tag->term_group, $tag_group_ids);

	return $tag_group_labels[$i];

}


function tg_update_edit_term_group($term_id) {
/*
	get the $_POSTed value after saving a tag/term and save it in the table
*/

	// next two lines to prevent infinite loops when the hook edit_term is called again from the function wp_update_term

	global $tg_update_edit_term_group_called;

	if ($tg_update_edit_term_group_called > 0) return;
	
	$screen = get_current_screen();
	
	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );

	if ( ($screen->taxonomy != $tag_group_taxonomy) && (!isset($_POST['new-tag-created']))) return;
	
	$tg_update_edit_term_group_called++;
	
	if (current_user_can('edit_posts')) {

		$term_id = (int) $term_id;
		
		$term = array();
		

		if ( isset($_POST['term-group-option']) ) {

			if ( !isset($_POST['tag-groups-option-nonce']) || ! wp_verify_nonce($_POST['tag-groups-option-nonce'], 'tag-groups-option') ) die("Security check");

			$term['term_group'] = (int) $_POST['term-group-option'];

		} elseif ( isset($_POST['term-group']) ) {

			if ( !isset($_POST['tag-groups-nonce']) || ! wp_verify_nonce($_POST['tag-groups-nonce'], 'tag-groups') ) die("Security check");

			$term['term_group'] = (int) $_POST['term-group'];

		}

		if ( isset($_POST['name']) && ($_POST['name'] != '') ) $term['name'] = stripslashes(sanitize_text_field($_POST['name']));

		if ( isset($_POST['slug']) && ($_POST['slug'] != '') ) $term['slug'] = sanitize_title($_POST['slug']);

		if ( isset($_POST['description']) && ($_POST['description'] != '') ) $term['description'] = stripslashes(sanitize_text_field($_POST['description']));
		
		wp_update_term( $term_id, $tag_group_taxonomy, $term );
		
	} else wp_die( __( 'Cheatin&#8217; uh?' ) );

}

 
function tg_quick_edit_javascript() {
/*
	adds JS function that sets the saved tag group for a given element when it's opened in quick edit
	thanks to http://shibashake.com/wordpress-theme/expand-the-wordpress-quick-edit-menu
*/

	$screen = get_current_screen();
	
	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );
	
	if ( $screen->taxonomy != $tag_group_taxonomy ) return;
 
	?>
	<script type="text/javascript">
	<!--
	function set_inline_tag_group_selected(tag_group_Selected, nonce) {
		inlineEditTax.revert();
		var tag_group_Input = document.getElementById('term-group-option');
		var nonceInput = document.getElementById('tag-groups-option-nonce');
		nonceInput.value = nonce;
		for (i = 0; i < tag_group_Input.options.length; i++) {
			if (tag_group_Input.options[i].value == tag_group_Selected) { 
				tag_group_Input.options[i].setAttribute("selected", "selected");
			} else { tag_group_Input.options[i].removeAttribute("selected");}
		}
	}

	//-->
	</script>
	<?php
}


function tg_expand_quick_edit_link($actions, $tag) {
/*
	modifies Quick Edit link to call JS when clicked
	thanks to http://shibashake.com/wordpress-theme/expand-the-wordpress-quick-edit-menu
*/

	$screen = get_current_screen();

	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );
	
	if ( $screen->taxonomy != $tag_group_taxonomy ) return $actions;
 
	$tag_group_ids = get_option( 'tag_group_ids', array() );

	$tag_group_id = $tag->term_group;
	
	$nonce = wp_create_nonce('tag-groups-option');
	
	$actions['inline hide-if-no-js'] = '<a href="#" class="editinline" title="';

	$actions['inline hide-if-no-js'] .= esc_attr( __( 'Edit this item inline' ) ) . '" ';

	$actions['inline hide-if-no-js'] .= " onclick=\"set_inline_tag_group_selected('{$tag_group_id}', '{$nonce}')\">"; 

	$actions['inline hide-if-no-js'] .= __( 'Quick&nbsp;Edit' );

	$actions['inline hide-if-no-js'] .= '</a>';

	return $actions;	
}


function tg_quick_edit_tag() {
/*
	assigning tags to tag groups directly in tag table ('quick edit')
*/

	$screen = get_current_screen();

	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );

	if ( $screen->taxonomy != $tag_group_taxonomy ) return;

 	$tag_group_labels = get_option( 'tag_group_labels', array() );

	$tag_group_ids = get_option( 'tag_group_ids', array() );

	$number_of_tag_groups = count($tag_group_labels) - 1;

	?>

		<fieldset><div class="inline-edit-col">
		
		<label><span class="title"><?php _e( 'Group' , 'tag-groups') ?></span><span class="input-text-wrap">
		
		<select id="term-group-option" name="term-group-option" class="ptitle">
		
			<option value="0" ><?php _e('not assigned', 'tag-groups') ?></option>

			<?php for ($i = 1; $i <= $number_of_tag_groups; $i++) :?>

			<option value="<?php echo $tag_group_ids[$i]; ?>" ><?php echo $tag_group_labels[$i]; ?></option>

		<?php endfor; ?>

		</select>

		<input type="hidden" name="tag-groups-option-nonce" id="tag-groups-option-nonce" value="" />

		</span></label>
		
		</div></fieldset>
	<?php
	
}


function tg_create_new_tag($tag) {
/*
	assigning tags to tag groups upon new tag creation (left of the table)
*/

 	$tag_group_labels = get_option( 'tag_group_labels', array() );

	$tag_group_ids = get_option( 'tag_group_ids', array() );

	$number_of_tag_groups = count($tag_group_labels) - 1;

	?>

	<div class="form-field"><label for="term-group"><?php _e('Tag Group', 'tag-groups') ?></label>
	
	<select id="term-group" name="term-group">
		<option value="0" selected ><?php _e('not assigned', 'tag-groups') ?></option>

		<?php for ($i = 1; $i <= $number_of_tag_groups; $i++) :?>

			<option value="<?php echo $tag_group_ids[$i]; ?>"><?php echo $tag_group_labels[$i]; ?></option>

		<?php endfor; ?>

		</select>		
	<input type="hidden" name="tag-groups-nonce" id="tag-groups-nonce" value="<?php echo wp_create_nonce('tag-groups') ?>" />
	<input type="hidden" name="new-tag-created" id="new-tag-created" value="1" />
	</div>

	<?php
}


function tg_tag_input_metabox($tag) {
/*
	assigning tags to tag groups on single tag view (after clicking tag for editing)
*/

 	$tag_group_labels = get_option( 'tag_group_labels', array() );

	$tag_group_ids = get_option( 'tag_group_ids', array() );

	$number_of_tag_groups = count($tag_group_labels) - 1; ?>
	
	<tr class="form-field">
		<th scope="row" valign="top"><label for="tag_widget"><?php _e('Tag group' , 'tag-groups') ?></label></th>
		<td>
		<select id="term-group" name="term-group">
			<option value="0" <?php if ($tag->term_group == 0) echo 'selected'; ?> ><?php _e('not assigned', 'tag-groups') ?></option>

		<?php for ($i = 1; $i <= $number_of_tag_groups; $i++) :?>

			<option value="<?php echo $tag_group_ids[$i]; ?>"

			<?php if ($tag->term_group == $tag_group_ids[$i]) echo 'selected'; ?> ><?php echo $tag_group_labels[$i]; ?></option>

		<?php endfor; ?>

		</select>
		<input type="hidden" name="tag-groups-nonce" id="tag-groups-nonce" value="<?php echo wp_create_nonce('tag-groups') ?>" />
		<p><a href="edit.php?page=tag-groups"><?php _e('Edit tag groups' , 'tag-groups') ?></a>. (<?php _e('Clicking will leave this page without saving.', 'tag-groups') ?>)</p>
		</td>
	</tr>

<?php
}


function tg_init() {
/*
	If it doesn't exist: create the default group with ID 0 that will only show up on tag pages as "unassigned".
*/

	$tag_group_labels = get_option( 'tag_group_labels', array() );

	$number_of_tag_groups = count($tag_group_labels) - 1;

	if ((!isset($tag_group_labels)) || ($tag_group_labels[0] == '')) {

		$tag_group_labels[0] = 'not assigned';

		$tag_group_ids[0] = 0;

		$number_of_tag_groups = 0;

		$max_tag_group_id = 0;
		
		$tag_group_taxonomy = 'post_tag';

		update_option( 'tag_group_labels', $tag_group_labels );

		update_option( 'tag_group_ids', $tag_group_ids );

		update_option( 'max_tag_group_id', $max_tag_group_id );
		
		upate_option( 'tag_group_taxonomy', $tag_group_taxonomy );

		$tag_group_theme = get_option( 'tag_group_theme', TAG_GROUPS_STANDARD_THEME );

		if ($tag_group_theme == '') $tag_group_theme = TAG_GROUPS_STANDARD_THEME;

	}
}


function tg_group_administration() {
/*
	Outputs a table on a submenu page where you can add, delete, change tag groups, their labels and their order.
*/

	$tag_group_labels = get_option( 'tag_group_labels', array());

	$tag_group_ids = get_option( 'tag_group_ids', array() );

	$max_tag_group_id = get_option( 'max_tag_group_id', 0 );
		
	$number_of_tag_groups = count($tag_group_labels) - 1;

	if ($max_tag_group_id < 0) $max_tag_group_id = 0;

	if (isset($_REQUEST['action'])) $action = $_REQUEST['action']; else $action = '';

	if (isset($_GET['id'])) (int) $tag_groups_id = $_GET['id']; else $tag_groups_id = 0;

	if (isset($_POST['ok'])) $ok = $_POST['ok']; else $ok = '';


	?>
	
	<div class='wrap'>
	<h2>Tag Groups</h2>
	
<?php

	// save a new label
	if (isset($_POST['label'])) {
	
		$label = stripslashes(sanitize_text_field($_POST['label']));
		
		if ($label == '') : ?>
	
			<div class="updated fade"><p>
			<?php _e('The label cannot be empty. Please correct it or go back.', 'tag-groups') ?>
			</p></div><br clear="all" /><?php
	
		elseif ((is_array($tag_group_labels)) && (in_array($label, $tag_group_labels))) : ?>
	
			<div class="updated fade"><p>
			<?php _e( 'A tag group with the label \''.$label.'\' already exists, or the label has not changed. Please choose another one or go back.', 'tag-groups' ) ?>
			</p></div><br clear="all" /> <?php
	
		else:

			if ( !isset($_POST['tag-groups-settings-nonce']) || ! wp_verify_nonce($_POST['tag-groups-settings-nonce'], 'tag-groups-settings') ) die("Security check");
	
	
			if (isset($tag_groups_id) && $tag_groups_id!='0' && $tag_groups_id!='') {

			// update
		
				tg_unregister_string_wpml( $tag_group_labels[$tag_groups_id] );
				
				$tag_group_labels[$tag_groups_id] = $label;
				
				tg_register_string_wpml( 'Group Label ID '.$tag_groups_id, $tag_group_labels[$tag_groups_id] );
				
			} else {
			//new

				$max_tag_group_id++;

				$number_of_tag_groups++;

				$tag_group_labels[$number_of_tag_groups] = $label;
				
				tg_register_string_wpml( 'Group Label ID '.$number_of_tag_groups, $label );

				$tag_group_ids[$number_of_tag_groups] = $max_tag_group_id;
				
			}
	
			update_option( 'tag_group_labels', $tag_group_labels );
	
			update_option( 'tag_group_ids', $tag_group_ids );
	
			update_option( 'max_tag_group_id', $max_tag_group_id ); ?>

			<div class="updated fade"><p>
			<?php _e( 'The tag group with the label \''.$label.'\' has been saved!', 'tag-groups' ) ?>
			</p></div><br clear="all" />

			<?php
			$action = '';

			$tag_group_labels = get_option( 'tag_group_labels', array() );

			$tag_group_ids = get_option( 'tag_group_ids', array() );

			$number_of_tag_groups = count($tag_group_labels) - 1;	

		endif;
	
	}
	
	// change order - move up
	if (($action == 'up') && ($tag_groups_id > 1)) {
	
		tg_swap($tag_group_labels,$tag_groups_id-1,$tag_groups_id);

		tg_swap($tag_group_ids,$tag_groups_id-1,$tag_groups_id);

		update_option( 'tag_group_labels', $tag_group_labels );

		update_option( 'tag_group_ids', $tag_group_ids );

		$action = "";
	
	}
	
	// change order - move down
	if (($action == 'down') && ($tag_groups_id < $number_of_tag_groups)) {

		tg_swap($tag_group_labels,$tag_groups_id,$tag_groups_id+1);

		tg_swap($tag_group_ids,$tag_groups_id,$tag_groups_id+1);

		update_option( 'tag_group_labels', $tag_group_labels );

		update_option( 'tag_group_ids', $tag_group_ids );

		$action = "";
	
	}

	switch ($action) {
	case 'new': ?>
	
		<h3><?php _e('Create a new tag group', 'tag-groups' ) ?></h3>
		<form method="POST" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
		<input type="hidden" name="tag-groups-settings-nonce" id="tag-groups-settings-nonce" value="<?php echo wp_create_nonce('tag-groups-settings') ?>" />
		<ul>
			<li><label for="label"><?php _e('Label' , 'tag-groups') ?>: </label>
			<input id="label" maxlength="100" size="70" name="label" value="<?php echo $label ?>" /></li>   
		</ul>
		<input class='button-primary' type='submit' name='Save' value='<?php _e('Create Group', 'tag-groups'); ?>' id='submitbutton' />
		<input class='button-primary' type='button' name='Cancel' value='<?php _e('Cancel'); ?>' id='cancel' onclick="location.href='edit.php?page=tag-groups'"/>
		</form>
	<?php break;
	
	case 'edit': ?>
	
		<h3><?php _e('Edit the label of an existing tag group', 'tag-groups' ) ?></h3>
		<form method="POST" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
		<input type="hidden" name="tag-groups-settings-nonce" id="tag-groups-settings-nonce" value="<?php echo wp_create_nonce('tag-groups-settings') ?>" />
		<ul>
			<li><label for="label"><?php _e('Label', 'tag-groups' ) ?>: </label>
			<input id="label" maxlength="100" size="70" name="label" value="<?php echo $tag_group_labels[$tag_groups_id] ?>" /></li>   
		</ul>
		<input class='button-primary' type='submit' name='Save' value='<?php _e('Save Group', 'tag-groups' ); ?>' id='submitbutton' />
		<input class='button-primary' type='button' name='Cancel' value='<?php _e('Cancel'); ?>' id='cancel' onclick="location.href='edit.php?page=tag-groups'"/>
		</form>

	<?php break;

	case 'delete':

		if (($tag_groups_id < 1) || ($tag_groups_id > $max_tag_group_id)) break;

		$label = $tag_group_labels[$tag_groups_id];

		$id = $tag_group_ids[$tag_groups_id];

		if ( !isset($_GET['tag-groups-delete-nonce']) || ! wp_verify_nonce($_GET['tag-groups-delete-nonce'], 'tag-groups-delete-'.$tag_groups_id) ) die("Security check");

		array_splice($tag_group_labels, $tag_groups_id, 1);

		array_splice($tag_group_ids, $tag_groups_id, 1);
		
		tg_unregister_string_wpml('Group Label ID '.$id);

		$max = 0;
		foreach($tag_group_ids as $check_id) {	
			if ($check_id > $max) $max = $check_id;
		}
		$max_tag_group_id = $max;

		tg_unassign($tag_groups_id);

		update_option( 'tag_group_labels', $tag_group_labels );

		update_option( 'tag_group_ids', $tag_group_ids );

		update_option( 'max_tag_group_id', $max_tag_group_id ); ?>
		
		<div class="updated fade"><p>
			<?php printf(__('A tag group with the id %i and the label \'%s\' has been deleted.', 'tag-groups'), $id, $label); ?>
		</p></div><br clear="all" />
		<input class='button-primary' type='button' name='ok' value='<?php _e('OK'); ?>' id='ok' onclick="location.href='edit.php?page=tag-groups'"/>
	<?php break;

	default:
?>
		<p><?PHP _e('On this page you can define tag groups. Tags (or terms) can be assigned to these groups on the page where you edit the tags (terms).', 'tag-groups') ?></p>
		<h3><?php _e('List', 'tag-groups') ?></h3>
		<table class="widefat">
		<thead>
		<tr>
			<th><?php _e('ID', 'tag-groups') ?></th>
			<th><?php _e('Label displayed on the frontend', 'tag-groups') ?></th>
			<th><?php _e('Number of assigned tags', 'tag-groups') ?></th>
			<th><?php _e('Action', 'tag-groups') ?></th>
			<th><?php _e('Change sort order', 'tag-groups') ?></th>
		</tr>
		</thead>
		<tfoot>
		<tr>
			<th><?php _e('ID', 'tag-groups') ?></th>
			<th><?php _e('Label displayed on the frontend', 'tag-groups') ?></th>
			<th><?php _e('Number of assigned tags', 'tag-groups') ?></th>
			<th><?php _e('Action', 'tag-groups') ?></th>
			<th><?php _e('Change sort order', 'tag-groups') ?></th>
		</tr>
		</tfoot>
		<tbody>

		<?php for ($i = 1; $i <= $number_of_tag_groups; $i++) :?>

		   <tr>
			 <td><?php echo $tag_group_ids[$i]; ?></td>
			 <td><?php echo $tag_group_labels[$i] ?></td>
			 <td><?php echo tg_number_assigned($tag_group_ids[$i]) ?></td>
			 <td><a href="edit.php?page=tag-groups&action=edit&id=<?php echo $i; ?>"><?php _e('Edit') ?></a>, <a href="#" onclick="var answer = confirm('<?PHP _e('Do you really want to delete the tag group', 'tag-groups') ?> \'<?php echo esc_js($tag_group_labels[$i]) ?>\'?'); if( answer ) {window.location ='edit.php?page=tag-groups&action=delete&id=<?php echo $i ?>&tag-groups-delete-nonce=<?php echo wp_create_nonce('tag-groups-delete-'.$i) ?>'}"><?php _e('Delete') ?></a></td>
			 <td>
				 <div style="overflow:hidden; position:relative;height:15px;width:27px;clear:both;">
				 <?php if ($i > 1) :?>
				 	<a href="edit.php?page=tag-groups&action=up&id=<?php echo $i ?>">
				 	<div class="tag-groups-up"></div>
				 	</a>
				<?php endif; ?>
				</div>

				 <div style="overflow:hidden; position:relative;height:15px;width:27px;clear:both;">
				<?php if ($i < $number_of_tag_groups) :?>
				 	<a href="edit.php?page=tag-groups&action=down&id=<?php echo $i ?>">
				 	<div class="tag-groups-down"></div>
				 	</a>
				<?php endif; ?>
				</div>
			</td>
		  	</tr>

		<?php endfor; ?>

		<tr>
		 <td><?php _e('new') ?></td>
		 <td></td>
		 <td></td>
		 <td><a href="edit.php?page=tag-groups&action=new"><?php _e('Create') ?></a></td>
		 <td></td>
		</tr>
		</tbody>
		</table>
	</div>
	
	<p><a href="edit.php?page=tag-groups-settings"><?php _e('Go to the settings.' , 'tag-groups') ?></a></p>
	<?php }	?>
	
	<?php
}


function tg_settings_page() {
/*
	Outputs the general settings page and handles the main actions: select taxonomy, theming options, WPML integration, reset all
*/

	$tag_group_labels = get_option( 'tag_group_labels', array());

	$tag_group_ids = get_option( 'tag_group_ids', array() );

	$max_tag_group_id = get_option( 'max_tag_group_id', 0 );
	
	$tag_group_theme = get_option( 'tag_group_theme', TAG_GROUPS_STANDARD_THEME );
	
	$tag_group_mouseover = get_option( 'tag_group_mouseover', '' );

	$tag_group_collapsible = get_option( 'tag_group_collapsible', '' );
	
	$tag_group_enqueue_jquery = get_option( 'tag_group_enqueue_jquery', true );
	
	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );

	$number_of_tag_groups = count($tag_group_labels) - 1;

	if ($max_tag_group_id < 0) $max_tag_group_id = 0;
	
	$default_themes = explode(',', TAG_GROUPS_BUILT_IN_THEMES);

	$label = '';
	?>
	
	<div class='wrap'>
	<h2>Tag Groups Settings</h2>
	
	<?php

	// performing actions
	
	if (isset($_REQUEST['action'])) $action = $_REQUEST['action']; else $action = '';

	if (isset($_GET['id'])) (int) $tag_groups_id = $_GET['id']; else $tag_groups_id = 0;
	
	if (isset($_POST['theme-name'])) $theme_name = stripslashes(sanitize_text_field($_POST['theme-name'])); else $theme_name = '';
	
	if (isset($_POST['theme'])) $theme = stripslashes(sanitize_text_field($_POST['theme'])); else $theme = '';
	
	if (isset($_POST['taxonomy'])) $taxonomy = stripslashes(sanitize_text_field($_POST['taxonomy'])); else $taxonomy = '';

	if (isset($_POST['ok'])) $ok = $_POST['ok']; else $ok = '';

	if (isset($_GET['active-tab'])) $active_tab = (int) $_GET['active-tab'];
		
	if ( $active_tab<0 || $active_tab>5) $active_tab = 0;	


	if (($action == 'reset') && ($ok != 'yes')) $action = '';
	
	
	$number_of_tag_groups = count($tag_group_labels) - 1;
	
	switch ($action) {
	
	case 'reset':

		if ( !isset($_POST['tag-groups-reset-nonce']) || ! wp_verify_nonce($_POST['tag-groups-reset-nonce'], 'tag-groups-reset') ) die("Security check");

 		unset($tag_group_labels);

 		unset($tag_group_ids);

 		$max_tag_group_id = 0;

 		update_option( 'tag_group_labels', $tag_group_labels );
	
		update_option( 'tag_group_ids', $tag_group_ids );
	
		update_option( 'max_tag_group_id', $max_tag_group_id );

		tg_unassign(0);
		
		?>
		<div class="updated fade"><p>
			<?php _e('All groups are deleted and assignments reset.', 'tag-groups'); ?>
		</p></div><br clear="all" />
		<input class='button-primary' type='button' name='ok' value='<?php _e('OK'); ?>' id='ok' onclick="location.href='edit.php?page=tag-groups-settings&active-tab=4'"/>
		<?php
	break;
	
	case 'wpml':

		for ($i = 1; $i <= $number_of_tag_groups; $i++) {

			tg_register_string_wpml( 'Group Label ID '.$i, $tag_group_labels[$i] );

		} ?>
		
		<div class="updated fade"><p>
			<?php _e('All labels were registered.', 'tag-groups' ); ?>
		</p></div><br clear="all" />
		<input class='button-primary' type='button' name='ok' value='<?php _e('OK'); ?>' id='ok' onclick="location.href='edit.php?page=tag-groups-settings&active-tab=2'"/>

	<?php break;

	case 'theme':

		if ($theme == 'own') $theme = $theme_name;

		if ( !isset($_POST['tag-groups-settings-nonce']) || ! wp_verify_nonce($_POST['tag-groups-settings-nonce'], 'tag-groups-settings') ) die("Security check");

		update_option( 'tag_group_theme', $theme );
		
		$mouseover = ($_POST['mouseover'] && $_POST['mouseover'] == '1') ? true : false;

		$collapsible = ($_POST['collapsible'] && $_POST['collapsible'] == '1') ? true : false;
		
		update_option( 'tag_group_mouseover', $mouseover );

		update_option( 'tag_group_collapsible', $collapsible );

		$tag_group_enqueue_jquery = ($_POST['enqueue-jquery'] && $_POST['enqueue-jquery'] == '1') ? true : false;
		
		update_option( 'tag_group_enqueue_jquery', $tag_group_enqueue_jquery );
		
		tg_clear_cache;

		?> <div class="updated fade"><p>
		<?php _e('Your tag cloud theme settings have been saved.', 'tag-groups' ); ?>
		</p></div><br clear="all" />
		<input class='button-primary' type='button' name='ok' value='<?php _e('OK'); ?>' id='ok' onclick="location.href='edit.php?page=tag-groups-settings&active-tab=1'"/>
		<?php
		
	break;

	case 'taxonomy':

		if ( !isset($_POST['tag-groups-taxonomy-nonce']) || !wp_verify_nonce($_POST['tag-groups-taxonomy-nonce'], 'tag-groups-taxonomy') ) die("Security check");

		$args=array(
			'public'   => true
		);
		
		$taxonomies=get_taxonomies( $args, 'names' );
		
		if ( !in_array( $taxonomy, $taxonomies ) ) die("Security check t");

		update_option( 'tag_group_taxonomy', $taxonomy );
				
		tg_clear_cache;

		?> <div class="updated fade"><p>
		<?php _e('Your tag cloud taxonomy settings have been saved.', 'tag-groups' ); ?>
		</p></div><br clear="all" />
		<input class='button-primary' type='button' name='ok' value='<?php _e('OK'); ?>' id='ok' onclick="location.href='edit.php?page=tag-groups-settings&active-tab=0'"/>
		<?php
		
	break;
	
	default:		
		?>
		<h2 class="nav-tab-wrapper">
			<a href="edit.php?page=tag-groups-settings&active-tab=0" class="nav-tab <?php if ( $active_tab == 0 ) echo 'nav-tab-active' ?>"><?php _e('Taxonomy', 'tag-groups') ?></a>
			<a href="edit.php?page=tag-groups-settings&active-tab=1" class="nav-tab <?php if ( $active_tab == 1 ) echo 'nav-tab-active' ?>"><?php _e('Theme', 'tag-groups') ?></a>
			<?php if (function_exists('icl_register_string')) :?>
				<a href="edit.php?page=tag-groups-settings&active-tab=2" class="nav-tab <?php if ( $active_tab == 2 ) echo 'nav-tab-active' ?>"><?php _e('WPML', 'tag-groups') ?></a>
			<?php endif; ?>
			<a href="edit.php?page=tag-groups-settings&active-tab=3" class="nav-tab <?php if ( $active_tab == 3 ) echo 'nav-tab-active' ?>"><?php _e('Tag Cloud', 'tag-groups') ?></a>
			<a href="edit.php?page=tag-groups-settings&active-tab=4" class="nav-tab <?php if ( $active_tab == 4 ) echo 'nav-tab-active' ?>"><?php _e('Delete Groups', 'tag-groups') ?></a>
			<a href="edit.php?page=tag-groups-settings&active-tab=5" class="nav-tab <?php if ( $active_tab == 5 ) echo 'nav-tab-active' ?>"><?php _e('About', 'tag-groups') ?></a>
		</h2>
		<p>&nbsp;</p>

		<?php if ( $active_tab == 0 ): ?>
			<form method="POST" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
			<input type="hidden" name="tag-groups-taxonomy-nonce" id="tag-groups-taxonomy-nonce" value="<?php echo wp_create_nonce('tag-groups-taxonomy') ?>" />
			<h3></h3>
			<p><?php _e('Choose the taxonomy for which you want to use tag groups. Default is <b>post_tag</b>. Please note that the tag cloud might not work with all taxonomies and that some taxonomies listed here may not be accessible in the admin backend. If you don\'t understand what is going on here, just leave the default.', 'tag-groups') ?></p>
			<?php
			$args=array(
				'public'   => true
			);
			
			$taxonomies=get_taxonomies( $args, 'names' );
			?>
			
			<ul>
		
				<?php foreach( $taxonomies as $taxonomy ) : ?>
		
					<li><input type="radio" name="taxonomy" value="<?php echo $taxonomy ?>" <?php if ($tag_group_taxonomy == $taxonomy) echo 'checked'; ?> />&nbsp;<?php echo $taxonomy ?></li>
		
				<?php endforeach; ?>
		
			</ul>
	
			<input type="hidden" id="action" name="action" value="taxonomy">
			<input class='button-primary' type='submit' name='Save' value='<?php _e('Save Taxonomy', 'tag-groups'); ?>' id='submitbutton' />
			</form>
		<?php endif; ?>

		<?php if ( $active_tab == 1 ): ?>
			<form method="POST" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
			<input type="hidden" name="tag-groups-settings-nonce" id="tag-groups-settings-nonce" value="<?php echo wp_create_nonce('tag-groups-settings') ?>" />
			<p><?php _e('Here you can choose a theme for the tag cloud. The path is relative to the <i>uploads</i> folder of your Wordpress installation. Leave empty if you don\'t use any.</p><p>New themes can be created with the <a href="http://jqueryui.com/themeroller/" target="_blank">jQuery UI ThemeRoller</a>. Make sure that before download you open the "Advanced Theme Settings" and enter as "CSS Scope" <b>.tag-groups-cloud-tabs</b> (including the dot) and as "Theme Folder Name" the name that you wish to enter below (for example "my-theme" - avoid spaces and exotic characters). Then you unpack the downloaded zip file and open the css folder. Inside it you will find a folder with the chosen Theme Folder Name - copy it to your <i>uploads</i> folder and enter its name below.', 'tag-groups') ?></p>
	
			<table>
			<tr>
			<td style="width:400px; padding-right:50px;">
			<ul>
		
				<?php foreach($default_themes as $theme) : ?>
		
					<li><input type="radio" name="theme" value="<?php echo $theme ?>" <?php if ($tag_group_theme == $theme) echo 'checked'; ?> />&nbsp;<?php echo $theme ?></li>
		
				<?php endforeach; ?>
		
				<li><input type="radio" name="theme" value="own" <?php if (!in_array($tag_group_theme, $default_themes)) echo 'checked' ?> />&nbsp;own: /wp-content/uploads/<input type="text" id="theme-name" name="theme-name" value="<?php if (!in_array($tag_group_theme, $default_themes)) echo $tag_group_theme ?>" /></li>
				<li><input type="checkbox" name="enqueue-jquery" value="1" <?php if ($tag_group_enqueue_jquery) echo 'checked' ?> />&nbsp;<?php _e('Use jQuery.  (Default is on. Other plugins might override this setting.)', 'tag-groups' ) ?></li>
			</ul>
			</td>
	
			<td>
			<h4>Further options</h4>
			<p><?php _e('These will not work if you change the parameter div_id for the cloud.', 'tag-groups') ?></p>
			<ul>
				<li><input type="checkbox" name="mouseover" value="1" <?php if ($tag_group_mouseover) echo 'checked'; ?> >&nbsp;<?php _e('Tabs triggered by hovering mouse pointer (without clicking).', 'tag-groups' ) ?></li>
				<li><input type="checkbox" name="collapsible" value="1" <?php if ($tag_group_collapsible) echo 'checked'; ?> >&nbsp;<?php _e('Collapsible tabs (toggle open/close).', 'tag-groups' ) ?></li>
			</ul>
			</td>
			</tr>
			</table>
	
			<input type="hidden" id="action" name="action" value="theme">
			<input class='button-primary' type='submit' name='Save' value='<?php _e('Save Theme Options', 'tag-groups'); ?>' id='submitbutton' />
			</form>
		<?php endif; ?>

		<?php if ( $active_tab == 2 ): ?>
			<?php if (function_exists('icl_register_string')) :?>
				<form method="POST" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
				<h3><?php _e('Register group labels with WPML', 'tag-groups') ?></h3>
				<p><?php _e('Use this button to register all existing group labels with WPML for string translation. This is only necessary if labels have existed before you installed WPML.', 'tag-groups') ?></p>
				<input type="hidden" id="action" name="action" value="wpml">
				<input class='button-primary' type='submit' name='register' value='<?php _e('Register Labels', 'tag-groups' ); ?>' id='submitbutton' />
				</form>
			<?php endif; ?>
		<?php endif; ?>

		
		<?php if ( $active_tab == 3 ): ?>
			<p><?php _e('You can use a shortcode to embed the tag cloud directly in a post, page or widget or you call the function in the PHP code of your theme.') ?></p>
			<h4>a) <?php _e('Shortcode') ?></h4>
			<p>[tag_groups_cloud]</p>
			<p><b><?php _e('Parameters', 'tag-groups') ?>:</b> (example: [tag_groups_cloud smallest=9 largest=30 include=1,2,10]
			<?php _e('<ul>
			<li><b>smallest=x</b> Font-size in pt of the smallest tags. Default: 12</li>
			<li><b>largest=x</b> Font-size in pt of the largest tags. Default: 22</li>
			<li><b>orderby=abc</b> Which field to use for sorting, e.g. count. Default: name</li>
			<li><b>order=ASC or =DESC</b> Whether to sort the tags in ascending or descending order. Default: ASC</li>
			<li><b>amount=x</b> Maximum amount of tags in one cloud. Default: 40</li>
			<li><b>hide_empty=1 or =0</b> Whether to hide or show also tags that are not assigned to any post. Default: 1 (hide empty)</li>
			<li><b>include=x,y,...</b> IDs of tag groups (left column in table above) that will be considered in the tag cloud. Empty or not used means that all tag groups will be used. Default: empty</li>
			<li><b>div_id=abc</b> Define an id for the enclosing '.htmlentities('<div>').' Default: tag-groups-cloud-tabs</li>
			<li><b>div_class=abc</b> Define a class for the enclosing '.htmlentities('<div>').'. Default: tag-groups-cloud-tabs</li>
			<li><b>ul_class=abc</b> Define a class for the '.htmlentities('<ul>').' that generates the tabs with the group labels. Default: empty</li>
			<li><b>show_tabs=1 or =0</b> Whether to show the tabs. Default: 1</li>
			</ul>', 'tag-groups') ?></p>
			<h4>b) PHP</h4>
			<p><?php _e('By default the function <b>tag_groups_cloud</b> returns the html for a tabbed tag cloud.', 'tag-groups') ?></p>
			<p><?php _e('Example: ', 'tag-groups'); echo htmlentities("<?php if ( function_exists( 'tag_groups_cloud' ) ) echo tag_groups_cloud( array( 'include' => '1,2,5,6' ) ); ?>") ?></p>
			<p><?php _e('If the optional second parameter is set to \'true\', the function will return a multidimensional array containing tag groups and tags. Example: ', 'tag-groups'); echo htmlentities("<?php if ( function_exists( 'tag_groups_cloud' ) ) print_r( tag_groups_cloud( array( 'orderby' => 'count', 'order' => 'DESC' ), true ) ); ?>") ?></p>
		<?php endif; ?>


		<?php if ( $active_tab == 4 ): ?>
			<form method="POST" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
			<input type="hidden" name="tag-groups-reset-nonce" id="tag-groups-reset-nonce" value="<?php echo wp_create_nonce('tag-groups-reset') ?>" />
			<p><?php _e('Use this button to delete all tag groups and assignments. Your tags will not be changed. Check the checkbox to confirm.', 'tag-groups') ?></p>
			<input type="checkbox" id="ok" name="ok" value="yes" />
			<label><?php _e('I know what I am doing.', 'tag-groups') ?></label>
			<input type="hidden" id="action" name="action" value="reset">
			<input class='button-primary' type='submit' name='delete' value='<?php _e('Delete Groups', 'tag-groups' ); ?>' id='submitbutton' />
			</form>
		<?php endif; ?>


		<?php if ( $active_tab == 5 ): ?>
			<h4>Tag Groups, Version: <?php echo TAG_GROUPS_VERSION ?></h4>
			<p>If you find a bug or have a question, please visit the official <a href="http://wordpress.org/support/plugin/tag-groups" target="_blank">support forum</a>. There is also a <a href="http://www.christoph-amthor.de/plugins/tag-groups/" target="_blank">dedicated page</a> with more examples and instructions for particular applications.</p>
			<h2>Donations</h2>
			<p>Support the author with a microdonation <a href="http://flattr.com/thing/721303/Tag-Groups-plugin" target="_blank">
	<img src="<?php echo plugins_url('images/flattr-badge-large.png', __FILE__) ?>" alt="Flattr this" title="Support through micro-donation" border="0" /></a>, or support his work by a nice link to <a href="http://www.burma-center.org" target="_blank">www.burma-center.org</a>, <a href="http://www.ecoburma.com" target="_blank">www.ecoburma.com</a>, or <a href="http://www.discounts-for-nonprofits.com" target="_blank">www.discounts-for-nonprofits.com</a>. Thanks!</p>
		<?php endif; ?>
	
	<?php }	?>

	</div>
	
<?php
}


function tag_groups_cloud( $atts = array(), $return_array = false ) {
/*
	Rendering the tag cloud, usually by a shortcode, or returning a multidimensional array
*/

	$tag_group_labels = get_option( 'tag_group_labels', array() );

	$tag_group_ids = get_option( 'tag_group_ids', array() );

	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );
	
	$number_of_tag_groups = count($tag_group_labels) - 1;
	
	extract( shortcode_atts( array(
		'smallest' => 12,
		'largest' => 22,
		'amount' => 40,
		'hide_empty' => true,
		'include' => '',
		'div_id' => 'tag-groups-cloud-tabs',
		'div_class' => 'tag-groups-cloud-tabs',
		'ul_class' => '',
		'show_tabs' => '1',
		'orderby' => 'name',
		'order' => 'ASC'
		), $atts ) );

	if ($smallest < 1) $smallest = 1;
	
	if ($largest < $smallest) $largest = $smallest;
	
	if ($amount < 1) $amount = 1;
	
	if ($include != '') {

		$include_groups = explode(',', $include);
	
	}

	$posttags = get_terms($tag_group_taxonomy, array('hide_empty' => $hide_empty, 'orderby' => $orderby, 'order' => $order));

	$div_id_output = ($div_id) ? ' id="'.$div_id.'"' : '';

	$div_class_output = ($div_class) ? ' class="'.$div_class.'"' : '';

	$ul_class_output = ($ul_class) ? ' class="'.$ul_class.'"' : '';


	if ($return_array) {
	
	// return as array
	
		$output = array ();
	
		for ($i = 1; $i <= $number_of_tag_groups; $i++) {

			if (($include == '') || (in_array($tag_group_ids[$i], $include_groups))) {
			
				$output[$i]['name'] = tg_translate_string_wpml('Group Label ID '.$tag_group_ids[$i], $tag_group_labels[$i]);

				$output[$i]['term_group'] = $tag_group_ids[$i];

				if ($posttags) {

					// find minimum and maximum of quantity of posts for each tag
					$count_amount = 0;
				
					$max = 0;
				
					$min = 9999999;
					
					foreach($posttags as $tag) {
				
						if ($count_amount >= $amount) break;
				
						if ($tag->term_group == $tag_group_ids[$i]) {
				
							if ($tag->count > $max) $max = $tag->count;
					 
							if ($tag->count < $min) $min = $tag->count;
							
							$count_amount++;
				
						}
				
					}

					$count_amount = 0;

					foreach($posttags as $tag) {

						if ($count_amount >= $amount) break;

						if ($tag->term_group == $tag_group_ids[$i]) {
							
							$output[$i]['tags'][$count_amount]['term_id'] = $tag->term_id;
							
							$output[$i]['tags'][$count_amount]['link'] = get_term_link($tag->slug, $tag_group_taxonomy);

							$output[$i]['tags'][$count_amount]['description'] = $tag->description;
							
							$output[$i]['tags'][$count_amount]['count'] = $tag->count;
							
							$output[$i]['tags'][$count_amount]['slug'] = $tag->slug;

							$output[$i]['tags'][$count_amount]['name'] = $tag->name;

							$output[$i]['tags'][$count_amount]['tg_font_size'] = tg_font_size($tag->count,$min,$max,$smallest,$largest);
															
							$count_amount++;
						
						}
					
					}
					
					$output[$i]['amount'] = $count_amount;

				}
				
			}
	
		}

	return $output;
	
	} else {

	// return as html
	
		$html = '<div'.$div_id_output.$div_class_output.'>';

		if ($show_tabs == '1') {
	
			$html .= '<ul'.$ul_class_output.'>';
		
			for ($i = 1; $i <= $number_of_tag_groups; $i++) {
		
				if (($include == '') || (in_array($tag_group_ids[$i],$include_groups))) {
		
					$html .= '<li><a href="#tabs-'.$i.'" >'.tg_translate_string_wpml('Group Label ID '.$tag_group_ids[$i], $tag_group_labels[$i]).'</a></li>';
		
				}
		
			}
		
			$html .= '</ul>';
	
		}
	
		for ($i = 1; $i <= $number_of_tag_groups; $i++) {
		
			if (($include == '') || (in_array($tag_group_ids[$i],$include_groups))) {
			
				$html .= '<div id="tabs-'.$i.'">';
	
					if ($posttags) {
	
						// find minimum and maximum of quantity of posts for each tag
						$count_amount = 0;
					
						$max = 0;
					
						$min = 9999999;
						
						foreach($posttags as $tag) {
					
							if ($count_amount > $amount) break;
					
							if ($tag->term_group == $tag_group_ids[$i]) {
					
								if ($tag->count > $max) $max = $tag->count;
						 
								if ($tag->count < $min) $min = $tag->count;
								
								$count_amount++;
					
							}
					
						}
					
						$count_amount = 0;
	
						foreach($posttags as $tag) {
	
							if ($count_amount >= $amount) break;
	
							if ($tag->term_group == $tag_group_ids[$i]) {
	
								$tag_link = get_term_link($tag->slug, $tag_group_taxonomy);
								
								$html .= '<a href="'.$tag_link.'" title="'.htmlentities($tag->description).' ('.$tag->count.')"  class="'.$tag->slug.'"><span style="font-size:'.tg_font_size($tag->count,$min,$max,$smallest,$largest).'px">'.$tag->name.'</span></a>&nbsp; ';
								
								$count_amount++;
							
							}
						
						}
					
					} 
				$html .= '</div>';
			}
		}
	
		$html .= '</div>';
		
		return $html;

	}
}


function tg_unassign($id) {
/*
	After deleting a tag group, this function removes its ID from the previously assigned tags.
*/

	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );

	$posttags = get_terms($tag_group_taxonomy, array('hide_empty' => false));
	
	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );
	
	foreach($posttags as $tag) {

		if (($tag->term_group == $id) || ($id == 0)) {

			$tag->term_group = 0;

			$ret = wp_update_term( $tag->term_id, $tag_group_taxonomy, array( 'term_group' => $tag->term_group ) );
		}
		
	}

}


function tg_number_assigned($id) {
/*
	Returns number of tags that are assigned to a given tag group. Needed for the table.
*/

	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );

	$posttags = get_terms($tag_group_taxonomy, array('hide_empty' => false));
	
	$number = 0;

	foreach($posttags as $tag) {

		if ($tag->term_group == $id) $number++;
	
	}
	
	return $number;

}


function tg_custom_js() {
/*
	jquery needs some script in the html for the tabs to work - opportunity to facilitate some options
*/

	if ( get_option( 'tag_group_mouseover', '' ) ) $mouseover = 'event: "mouseover"';

	if ( get_option( 'tag_group_collapsible', '' ) ) $collapsible = 'collapsible: true';

	if ( !$mouseover && !$collapsible ) {

		$options = '';

	} else {

		$options = $collapsible ? $mouseover . ",\n" . $collapsible : $mouseover;

		$options = $mouseover ? $options : $collapsible;

		$options = "{\n" . $options . "\n}";

	}

	// Not necessarily in HEAD section, but can't do no harm to have it there.
	echo '
	<!-- begin Tag Groups plugin -->
	<script type="text/javascript">
		jQuery(function() {
	
			jQuery( "#tag-groups-cloud-tabs" ).tabs(' . $options . ');

		});
	</script>
	<!-- end Tag Groups plugin -->
	';

}


function post_in_tag_group($post_id, $tag_group_id) {
/*
	Checks if the post with $post_id has a tag that is in the tag group with $tag_group_id.
*/

	$tag_group_taxonomy = get_option( 'tag_group_taxonomy', 'post_tag' );

	$tags = get_the_tags($post_id, $tag_group_taxonomy);
	
	if($tags) {

		foreach( $tags as $tag ) {

			if ($tag->term_group == $tag_group_id) return true;
		}
		
	} else {

		return false;
	
	}
	
	return false;
}


function tg_font_size($count, $min, $max, $smallest, $largest) {
/*
	Calculates the font size for the cloud tag for a particular tag ($min, $max and $size with same unit, e.g. pt.)
*/

	if ($max > $min) {

		$size = round(($count - $min) * ($largest - $smallest) / ($max - $min) + $smallest);
	
	} else {

		$size = round($smallest);
	
	}

	return $size;

}


function tg_register_string_wpml($name, $value) {
/*
	Makes sure that WPML knows about the tag group label that can have different language versions.
*/

	if (function_exists('icl_register_string')) icl_register_string('tag-groups', $name, $value);

}


function tg_unregister_string_wpml($name) {
/*
	Asks WPML to forget about $name.
*/

	if (function_exists('icl_unregister_string')) icl_unregister_string('tag-groups', $name);

}


function tg_translate_string_wpml($name, $string) {
/*
	If WPML is installed: return translation; otherwise return original
*/

	if (function_exists('icl_t')) return icl_t('tag-groups', $name, $string); else return $string;

}

 
function tg_swap(&$ary,$element1,$element2) {
/*
	swaps the position of two elements in an array - needed for changing the order of list items
*/

	$temp=$ary[$element1];

	$ary[$element1]=$ary[$element2];

	$ary[$element2]=$temp;

}


function tg_clear_cache()  {
/*
	Good idea to purge the cache after changing theme options - else your visitors won't see the change for a while. Currently implemented for W3T Total Cache and WP Super Cache.
*/

	if (function_exists('w3tc_pgcache_flush')) {

		$plugin_totalcacheadmin->flush_pgcache();
		
		$plugin_totalcacheadmin->flush_minify();

	} 

	if (function_exists('wp_cache_clear_cache')) {

		wp_cache_clear_cache();

	} 

}

/*
	guess what - the end
*/
?>