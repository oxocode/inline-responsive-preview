module.exports = {
	options: {
		map: {
			inline: false,
			annotation: 'assets/css/maps/'
		},
		processors: [
			require( 'autoprefixer' )({browsers: 'last 2 versions'}),
			require( 'cssnano' )({safe: true }),
		]
	},
	irp: {
		src: 'assets/css/irp.css',
		dest: 'assets/css/irp.min.css'
	}
};
