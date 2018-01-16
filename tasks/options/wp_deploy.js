module.exports = {
	// Deploys a git Repo to the WordPress SVN repo.
	wp_deploy: {
		deploy: {
			options: {
				plugin_slug: '<%= pkg.name %>',
				build_dir: 'release',
				assets_dir: 'wp-assets'
			}
		}
	}
};
