<?php
/**
 * Inline Responsive Preview - Core Functions.
 *
 * @package IRP
 */

namespace IRP;

/**
 * Setup IRP Core functions.
 */
function setup() {
	check_wp_version();

	add_action( 'admin_init', __NAMESPACE__ . '\\admin_irp_init' );

	add_post_type_support( 'post', 'inline-responsive-preview' );
	add_post_type_support( 'page', 'inline-responsive-preview' );
}

/**
 * Check WP Core Version based on WP_MIN_VERSION constant.
 */
function check_wp_version() {
	$wp_version = get_bloginfo( 'version' );

	if ( version_compare( $wp_version, WP_MIN_VERSION, '<=' ) ) {
		return add_action( 'admin_notices', __NAMESPACE__ . '\\wp_min_version_error' );
	}
}

/**
 * Returns admin notice for WP minimum version error.
 */
function wp_min_version_error() {
	$class   = 'notice notice-error';
	$message = sprintf(
		'Inline Responsive Preview requires a WordPress version >= %1$s.',
		WP_MIN_VERSION
	);

	printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
}

/**
 * Setup scripts, hooks and processes, admin-facing
 */
function admin_irp_init() {
	if ( ! is_admin() ) {
		return;
	}
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\enqueue_admin_scripts' );
}

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
		IRP_PLUGIN_URL . 'assets/js/irp.js',
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

	$closelabel = __( 'Close', 'inline-responsive-preview' );

	$js_strings = [
		'close_label' => $closelabel,
	];

	wp_localize_script(
		'inline-responsive-preview-js',
		'InlineResponsivePreview',
		$js_strings
	);

	// If logged-in to admin dashboard & user can edit posts, enqueue irp scripts.
	if (
		is_admin() &&
		supports_irp()
	) {
		wp_enqueue_script( 'inline-responsive-preview-js' );
		wp_enqueue_style( 'inline-responsive-preview-css' );
	}
}

/**
 * Check post type support for IRP.
 *
 * @param int $id Post ID.
 *
 * @return bool
 */
function supports_irp( $id = null ) {
	$post = get_post( $id );

	if ( ! $post ) {
		return false;
	}

	$post_type_object = get_post_type_object( $post->post_type );

	if (
		(int) get_option( 'page_for_posts' ) !== $post->ID &&
		post_type_supports( $post->post_type, 'inline-responsive-preview' ) &&
		current_user_can( 'edit_post', $post->ID )
	) {
		return apply_filters( 'supports_irp', true, $post );
	}

	return false;
}
