module.exports = {
	// Shell actions.
	shell: {
		options: {
			stdout: true,
			stderr: true
		},
		phpunit: {
			command: 'vagrant ssh -c "cd <%= vvv.plugin %> && phpunit"'
		},
		phpunit_c: {
			command: 'vagrant ssh -c "cd <%= vvv.plugin %> && phpunit --coverage-html <%= vvv.coverage %>"'
		}
	},
};
