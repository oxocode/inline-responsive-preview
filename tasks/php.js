module.exports = function( grunt ) {
	grunt.registerTask( 'php', [ 'phplint', 'phpcs' ] );
};
