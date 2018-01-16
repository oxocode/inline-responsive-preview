module.exports = {
	irp: {
		src: [
			'*.php'
		]
	},
	options: {
		verbose: true,
		bin: './vendor/bin/phpcs --runtime-set ignore_errors_on_exit 1 --standard="phpcs.xml.dist"'
	}
};
