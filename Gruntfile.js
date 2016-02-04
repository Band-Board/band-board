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
          '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
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

  //autoprefixer
  grunt.loadNpmTasks('grunt-autoprefixer');

  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['nodemon', 'jshint']);

  //build
    grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin',
    'watch'
  ]);

};
