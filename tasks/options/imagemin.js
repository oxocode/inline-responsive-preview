module.exports = {
	options: {
		optimizationLevel: 3,
		svgoPlugins: [ { removeViewBox: false } ]
	},
	irp: {
		files: [ {
			expand: true,
			cwd: 'assets/img/src/',
			src: [ '*.png' ],
			dest: 'assets/img/'
		} ]
	}
};
