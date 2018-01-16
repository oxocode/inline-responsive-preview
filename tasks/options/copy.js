module.exports = {

	// Copy the plugin to a versioned release directory.
	irp: {
		src: [
			'**',
			'assets/css/*.css',
			'assets/js/*.js',
			'assets/img/*.png',
			'!assets/css/src/**',
			'!assets/js/src/**',
			'!assets/img/src/**',
			'!bin/**',
			'!node_modules/**',
			'!release/**',
			'!tasks/**',
			'!tests/**',
			'!vendor/**',
			'!.git/**',
			'!.idea/**',
			'!.sass-cache/**',
			'!Gruntfile.js',
			'!composer.json',
			'!composer.lock',
			'!Makefile',
			'!package.json',
			'!package-lock.json',
			'!.gitignore',
			'!.gitmodules',
			'!.travis.yml',
			'!yarn.lock'
		],
		dest: 'release/<%= pkg.version %>/',
		expand: true,
		dot: true
	}
};
