module.exports = function( grunt ) {
	grunt.registerTask( 'deploy', [ 'build', 'wp_deploy', 'compress', 'clean' ] );
};
