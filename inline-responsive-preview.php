<?php
/**
 * Plugin Name: Inline Responsive Preview
 * Plugin URI:  http://oxocode.com
 * Description: Allows inline responsive previewing of posts from the admin edit screen.
 * Version:     0.1.0
 * Author:      Courtney Ivey
 * Author URI:  http://oxocode.com
 * License:     MIT
 *
 * @package IRP
 */

namespace IRP;

// IRP Folder URL.
if ( ! defined( 'IRP_PLUGIN_URL' ) ) {
	define( 'IRP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

// IRP Version.
if ( ! defined( 'IRP_VERSION' ) ) {
	define( 'IRP_VERSION', '0.1.0' );
}

/**
 * Setup scripts, hooks and processes, admin-facing
 */
function admin_core_init() {
	if ( ! is_admin() ) {
		return;
	}
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\enqueue_admin_scripts' );
}
add_action( 'admin_init', __NAMESPACE__ . '\\admin_core_init' );

/**
 * Enqueue inline responsive post preview js.
 *
 * @param string $hook The add/edit post admin page.
 */
function enqueue_admin_scripts( $hook ) {

	if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
		return;
	}

	if ( 'post-new.php' !== $hook && 'post.php' !== $hook ) {
		return;
	}

	wp_register_script(
		'inline-responsive-preview-js',
		IRP_PLUGIN_URL . 'assets/js/irp.min.js',
		[
			'jquery',
			'jquery-ui-resizable',
		],
		IRP_VERSION,
		true
	);

	wp_register_style(
		'inline-responsive-preview-css',
		IRP_PLUGIN_URL . 'assets/css/irp.min.css',
		[],
		IRP_VERSION
	);

	$js_strings = [
		'close_label' => __( 'Close', 'inline-responsive-preview' ),
	];

	wp_localize_script(
		'inline-responsive-preview-js',
		'InlineResponsivePreview',
		$js_strings
	);

	// If logged-in to admin dashboard & user can edit posts, enqueue irp scripts.
	if ( is_admin() && current_user_can( 'edit_posts' ) ) {
		wp_enqueue_script( 'inline-responsive-preview-js' );
		wp_enqueue_style( 'inline-responsive-preview-css' );
	}
}
