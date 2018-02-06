<?php
/**
 * Inline Reponsive Preview - Core Functions.
 *
 * @package IRP
 */

/**
 * Setup IRP Core functions.
 */
function setup() {
	$errors = [];

	check_wp_version();

	add_action( 'admin_init', __NAMESPACE__ . '\\admin_irp_init' );

	if ( $errors ) {
		return add_action( 'admin_notices', [ __NAMESPACE__ . '\\admin_notices' ] );
	}

	add_post_type_support( 'post', 'inline-responsive-preview' );
	add_post_type_support( 'page', 'inline-responsive-preview' );
}

/**
 * Errors to display in admin notice.
*/
function error( $message ) {
	$errors[] = $message;
}

/**
 * Display admin notice for errors.
 */
function admin_notices() {
	foreach ( $errors as $error ) {
		echo '<div class="error"><p>' . $error . '</p></div>';
	}
}

/**
 * Check WP Core Version based on WP_MIN_VERSION constant.
 */
function check_wp_version() {
	include ABSPATH . WPINC . '/version.php';

	$wp_version = str_replace( '-src', '', $wp_version );

	if ( version_compare( $wp_version, WP_MIN_VERSION, '<' ) ) {
		$error( sprintf(
			/* translators: 1: This plugin 2: WordPress version */
			__( '%1$s requires WordPress version %2$s.', 'inline-responsive-preview' ),
			'<strong>' . __( 'Inline Responsive Preview', 'inline-responsive-preview' ) . '</strong>',
			WP_MIN_VERSION
		) );
	}
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
 */
function supports_irp( $id = null ) {
	$post = get_post( $id );

	if ( ! $post ) {
		return false;
	}

	$post_type_object = get_post_type_object( $post->post_type );

	if (
		$post->ID !== (int) get_option( 'page_for_posts' ) &&
		post_type_supports( $post->post_type, 'inline-responsive-preview' ) &&
		current_user_can( 'edit_post', $post->ID )
	) {
		return apply_filters( 'supports_irp', true, $post );
	}

	return false;
}

/**
 * Returns response for IRP post type support.
 */
function has_irp() {
	return __NAMESPACE__ . supports_fee();
}
