module.exports = function( grunt ) {
	grunt.registerTask( 'css', [ 'stylelint', 'sass', 'postcss' ] );
};
