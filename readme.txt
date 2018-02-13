=== Inline Responsive Preview ===
Contributors:      couturefreak
Donate link:
Tags:              preview, responsive, inline, post
Requires at least: 4.6
Tested up to:      4.8
Stable tag:        0.1.0
License:           GPLv2 or later
License URI:       http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

Allows users to preview the current post at common responsive breakpoints within the existing post edit screen.

== Installation ==

= Automatic Installation =

1. Visit `Plugins > Add New`
2. Search for 'Inline Responsive Preview'
3. Activate 'Inline Responsive Preview' from your Plugins page.
4. Go to 'After Activation' below.

= Manual Installation =

1. Upload the entire `/inline-responsive-preview` directory to the `/wp-content/plugins/` directory.
2. Activate Inline Responsive Preview through the 'Plugins' menu in WordPress.

= After activation =

1. When you click 'Preview Changes' in the dashboard 'Add / Edit Post' screen, a new frame will appear with the current post
you're adding/editing.

== Frequently Asked Questions ==

+ How Do I Add a Custom Post Type?
	```php
	add_post_type_support( '{custom-post-type}', 'inline-responsive-preview' );
	```

== Screenshots ==


== Changelog ==

= 0.1.0 =
* First release

== Upgrade Notice ==

= 0.1.0 =
First Release
