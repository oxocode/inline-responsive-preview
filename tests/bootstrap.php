<?php
/**
 * IRP Unit Tests - Bootstrap.
 *
 * @package irp
 */

$_tests_dir = getenv( 'WP_TESTS_DIR' );
if ( ! $_tests_dir ) {
	$_tests_dir = '/tmp/wordpress-tests-lib';
}

require_once $_tests_dir . '/inc/functions.php';

/**
 * Manually load plugin for tests.
 */
function _manually_load_plugin() {
	require dirname( __FILE__ ) . '/../inline-responsive-preview.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

require $_tests_dir . '/inc/bootstrap.php';

require dirname( __FILE__ ) . '/irp-testcase.php';
