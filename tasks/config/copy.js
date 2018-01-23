/**
 * `copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders from your `assets/` directory into
 * the web root (`.tmp/public`) so they can be served via HTTP,
 * and also for further pre-processing by other Grunt tasks.
 *
 * #### Normal usage (`sails lift`)
 * Copies all directories and files (except CoffeeScript and LESS)
 * from the `assets/` folder into the web root -- conventionally a
 * hidden directory located `.tmp/public`.
 *
 * #### Via the `build` tasklist (`sails www`)
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-copy
 *
 */
module.exports = function(grunt) {

  grunt.config.set('copy', {
    dev: {
      files: [{
        expand: true,
        cwd: './assets',
        src: ['**/*.!(coffee|less)'],
        dest: '.tmp/public'
      },
      //Copy JQuery
      {
        expand: true,
        cwd: './node_modules/jquery/dist/',
        src: ['jquery.min.js'],
        dest: './assets/vendor/jquery'
      },
      //Copy jsrender
      {
        expand: true,
        cwd: './node_modules/jsrender/',
        src: ['jsrender.js'],
        dest: './assets/vendor/jsrender'
      },
      // copy semantic-ui css and js files
      {
        expand: true,
        cwd: './node_modules/semantic-ui-css/',
        src: ['semantic.css', 'semantic.js'],
        dest: './assets/vendor/semantic-ui'
      },
      //copy semantic-ui icon fonts
      {
        expand: true,
        cwd: './node_modules/semantic-ui-css/themes',
        src: ["*.*", "**/*.*"],
        dest: './assets/vendor/semantic-ui/themes'
      }]
    },
    build: {
      files: [{
        expand: true,
        cwd: '.tmp/public',
        src: ['**/*'],
        dest: 'www'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
