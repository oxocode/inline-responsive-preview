module.exports = function( grunt ) {

  'use strict';
  var loadConfig, config;
  // Show elapsed time
  require( 'time-grunt' )( grunt );

  // Require `load-grunt-tasks`, which loads all grunt tasks defined in package.json
  require( 'load-grunt-tasks' )( grunt );

  // Load tasks defined in the `/tasks` folder
  grunt.loadTasks( './tasks' );

  // Function to load the options for each grunt module
  loadConfig = function( path ) {
    var glob = require( 'glob' );
    var object = {};
    var key;

    glob.sync( '*', { cwd: path } ).forEach(
      function( option ) {
        key = option.replace( /\.js$/, '' );
        object[ key ] = require( path + option );
      }
    );

    return object;
  };

  config = {
    pkg: grunt.file.readJSON( 'package.json' ),
    env: process.env
  };

  grunt.util._.extend( config, loadConfig( './tasks/options/' ) );

  grunt.initConfig( config );

};
