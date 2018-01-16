module.exports = {
	irp: {
		files: {
			'assets/js/irp.min.js': [ 'assets/js/irp.js' ]
		},
		options: {
			mangle: {
				except: [ 'jQuery' ]
			}
		}
	}
};
