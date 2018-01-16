module.exports = {
	options: {
		jshintrc: '.jshintrc'
	},
	irp: [
		'assets/js/src/*.js',
		'assets/js/test/*.js',
		'!assets/js/**/*.min.js'
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
