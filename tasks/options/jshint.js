module.exports = {

	/// Using explicit .jshint rules inline.
	// Specifying `jshintrc:true` or config location did not execute properly.
	options: {
		curly: true,
		eqeqeq: true,
		immed: true,
		latedef: true,
		newcap: true,
		noarg: true,
		sub: true,
		undef: true,
		boss: true,
		eqnull: true,
		jquery: true,
		expr: true,
		quotmark: 'single',
		trailing: true,

		// Leave unused off, as it generates warnings for some useful parameters, like (e) for events
		// unused: true,
		browser: true,
		globals: {
			exports: true,
			module: true,
			console: true,
			document: true,
			window: true,
			ajaxurl: true,
			wp: true,
			require: true
		}
	},
	irp: [
		'assets/js/src/*.js',
		'assets/js/test/*.js'
	],
	grunt: {
		src: [
			'Gruntfile.js'
		],
		options: {
			jshintrc: '.gruntjshintrc'
		}
	}
};
