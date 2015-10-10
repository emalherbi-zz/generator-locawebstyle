module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // properties: grunt.file.readJSON('properties.json'),

    mochaTest: {
      unit: {
        src: ['test/**/*Spec.js']
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js']
    }

  });

  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  // tasks
  grunt.registerTask('test', [
    //'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('default', [
    'test'
  ]);
};
