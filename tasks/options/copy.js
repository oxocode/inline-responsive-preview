module.exports = {

	// Copy the plugin to a versioned release directory
	irp: {
		src:  [
			'**',
			'!node_modules/**',
			'!release/**',
			'!.git/**',
			'!.sass-cache/**',
			'!assets/css/src/**',
			'!assets/js/src/**',
			'!assets/img/src/**',
			'!Gruntfile.js',
			'!package.json',
			'!.gitignore',
			'!.gitmodules'
		],
		dest: 'release/<%= pkg.version %>/'
	}
};
