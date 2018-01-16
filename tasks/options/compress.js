module.exports = {
	irp: {
		options: {
			mode:    'zip',
			archive: './release/inline-responsive-preview.<%= pkg.version %>.zip'
		},
		expand:  true,
		cwd:     'release/<%= pkg.version %>/',
		src:     [ '**/*' ],
		dest:    'inline-responsive-preview/'
	}
};
