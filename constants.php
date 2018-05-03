<?php
/**
 * Inline Responsive Preview - Constants.
 *
 * @package IRP
 */

namespace IRP;

/**
 * Define constants.
 */
function define_constants() {

	// IRP Folder URL.
	if ( ! defined( 'IRP_PLUGIN_URL' ) ) {
		define( 'IRP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	}

	// IRP Version.
	if ( ! defined( 'IRP_VERSION' ) ) {
		define( 'IRP_VERSION', '0.1.0' );
	}

	// Minimum WP Version.
	if ( ! defined( 'WP_MIN_VERSION' ) ) {
		define( 'WP_MIN_VERSION', '4.6' );
	}
}
