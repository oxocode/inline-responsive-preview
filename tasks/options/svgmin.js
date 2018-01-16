module.exports = {
	options: {
		plugins: [
			{ removeViewBox: false },
			{ removeUselessStrokeAndFill: false }
		]
	},
	irp: {
		expand: true,
		cwd: 'assets/img/src/raw',
		src: ['*.svg'],
		dest: 'assets/img',
		ext: '.svg'
	}
};
