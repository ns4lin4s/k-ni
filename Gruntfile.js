module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      js: ['./public/**/*.js'],
      html: ['./public/**/*.html']
    },
    browserify: {
      options: {
           transform: [['babelify', {presets: ['es2015']}]]
        }, 
      './public/client/index.js': ['./src/client/index.js']
    },
    uglify: {
      all_src : {
        options : {
          sourceMap : true,
          sourceMapName : 'sourceMap.map'
        },
        src : 'public/client/index.js',
        dest : 'public/client/index.js'
      }
    },
    targethtml: {
      dist: {
        files: {
          './public/client/index.html': 'src/client/index.html',
          './public/client/vendors/phaser.min.js': 'src/client/vendors/phaser.min.js'
        }
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,          
          port: 9001,
          base: '.'
        }
      }
    },
    watch: {
      files: [ 'Gruntfile.js', 'src/**/*.*'],
      tasks: [ 'browserify' ]
    }
  })

   grunt.loadNpmTasks('grunt-contrib-clean')
   grunt.loadNpmTasks('grunt-browserify')
   grunt.loadNpmTasks('grunt-contrib-uglify')
   grunt.loadNpmTasks('grunt-targethtml');
   grunt.loadNpmTasks('grunt-contrib-connect')
   grunt.loadNpmTasks('grunt-contrib-watch')

   grunt.registerTask('delete', ['clean'])
   grunt.registerTask('compile', ['browserify', 'uglify','targethtml'])
   grunt.registerTask('serve', ['delete', 'compile', 'connect', 'watch'])
}