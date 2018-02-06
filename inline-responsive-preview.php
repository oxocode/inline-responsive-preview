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

require_once( __DIR__ . '/constants.php' );
require_once( __DIR__ . '/inc/core.php' );

/**
 * Lock and load.
 */

setup();
