module.exports = {
	livereload: {
		files: [
			'assets/**/{*.css,*.js,*.php}'
		],
		options: {
			livereload: true
		}
	},
	css: {
		files: [
			'assets/css/sass/**/*.scss'
		],

		tasks: ['css'],
		options: {
			debounceDelay: 500
		}
	},
	svg: {
		files: [
			'assets/img/**/*.{svg}'
		],
		tasks: ['svgmin'],
		options: {
			debounceDelay: 500
		}
	},
	js: {
		files: [
			'assets/js/src/**/*.js'
		],
		tasks: ['js'],
		options: {
			debounceDelay: 500
		}
	},
	php: {
		files: [
			'*.php'
		],
		tasks: ['php'],
		options: {
			debounceDelay: 500
		}
	}
};
