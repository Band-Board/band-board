module.exports = function(grunt) {

  grunt.initConfig({

    //linting
    jshint: {
      options: {
        eqeqeq: true,
        node: true
      },
      all: [
        'Gruntfile.js',
        '**/*.{js,json}',
        // Excludes
        "!**/node_modules/**",
        "!**/bower_components/**",
        "!**/test/lib/**",
        "!**/*.min.js",
        "!1/04-linting/src/foo.js"
      ]
    },

    jsDir: 'public/javascripts/',
    jsDistDir: 'build/javascripts/',
    cssDir: 'public/stylesheets/',
    cssDistDir: 'build/stylesheets/',
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: ['<%=jsDir%>*.js'],
        dest: '<%=jsDistDir%><%= pkg.name %>.js'
      },
      css: {
        src: ['<%=cssDir%>*.css'],
        dest: '<%=cssDistDir%><%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          './build/javascripts/jquery.min.js': './bower_components/jquery/dist/jquery.min.js',
          './public/stylesheets/materialize.css' : './bower_components/Materialize/dist/js/materialize.min.js',
          '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    sass: {
        options: {
            sourceMap: false
        },
        dist: {
            files: {
                './public/stylesheets/materialize.css' : './bower_components/Materialize/sass/materialize.scss',
                './public/stylesheets/style.css': './public/stylesheets/style.scss'
            }
        }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          './build/stylesheets/style.min.css': ['<%= concat.css.dest %>']
        }
      }
    },

    watch: {
    files: ['<%=jsDir%>*.js', '<%=cssDir%>*.css', 'app.js'],
    tasks: ['concat', 'uglify', 'cssmin', 'jshint'],
    options: {
          livereload: true
        }
    },

    // configure nodemon
    nodemon: {
      dev: {
        script: './bin/www'
      }
    }

  });

  // load nodemon  https://scotch.io/tutorials/using-gruntjs-in-a-mean-stack-application
  grunt.loadNpmTasks('grunt-nodemon');

  //build https://www.digitalocean.com/community/tutorials/how-to-setup-task-automation-with-grunt-and-node-js-on-a-vps
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //JSHINT
  grunt.loadNpmTasks('grunt-contrib-jshint');

  //Sass
  grunt.loadNpmTasks('grunt-sass');

  //autoprefixer
  grunt.loadNpmTasks('grunt-autoprefixer');

  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['sass', 'nodemon', 'jshint']);

  //build
    grunt.registerTask('build', [
    'sass',
    'concat',
    'uglify',
    'cssmin',
    'watch'
  ]);

};
