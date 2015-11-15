module.exports = function(grunt) {
  grunt.initConfig({
    bundle_name: 'app',
    js_target_dir: './build/js',
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      assets: { expand: true, cwd: 'assets/', src: ['css/**','fonts/**','img/**'], dest: 'build/'},
      html: { expand: true, cwd: 'assets/html/', src: ['**'], dest: 'build/'},
      misc: { expand: true, cwd: 'assets/misc/', src: ['**'], dest: 'build/'},
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['jsdeps/vendor/jquery-1.8.2.min.js','jsdeps/vendor/modernizr-2.6.2.min.js','jsdeps/*.js','src/**/*.js'],
        // the location of the resulting JS file
        dest: '<%= js_target_dir %>/<%= bundle_name %>.js'
      }
    },
    s3: {
      options: {
        region: 'eu-west-1',
        access: 'public-read',
        debug: false
      },
      staging: {
        options: {
          key: 'AKIAJYCHO2DB6N5PGX2A',
          secret: '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',
          bucket: 'cnvrt-site-staging'
        },
        sync: [
          {
            src: 'build/**/*.*',
            dest: '/',
            rel: 'build',
            options: {
              verify: true
            }
          }
        ]
      },
      production: {
        options: {
          key: process.env.awsk,
          secret: process.env.awss,
          bucket: 'getconvert.com'
        },
        sync: [
          {
            src: 'build/**/*.*',
            dest: '/',
            rel: 'build',
            options: {
              verify: true
            }
          }
        ]
      }
    },
    less: {
      build: {
        options: {
          compress: true,
          //paths: ["./less"],
          //yuicompress: true
        },
        files: {
          "./build/css/main.css": "./less/main.less",
          "./build/css/studies.css": "./less/studies.less"
        }
      }
    },

    uglify:{
      options: {
        mangle: true,
        compress: true,
        //report: 'gzip',
        banner: [
        '/* --------------------------------- *',
        '* --- CNVRT-Website ---------------- *',
        '* --- Copyright Matchchat Ltd 2013 - *',
        '* --- @author Nabil Freeman -------- *',
        '* --- @version <%= pkg.version %> --------------- *',
        '* --- @created <%= grunt.template.today("yyyy-mm-dd HH:MM") %> ---- *',
        '* ---------------------------------- */',
        '\n'].join('\n'),
      },
      in_place: {
        files: {
          '<%= js_target_dir %>/<%= bundle_name %>.js': ['<%= js_target_dir %>/<%= bundle_name %>.js']
        }
      }
    },

    jshint: {
      options: {
        force:true
      },
      all: ['Gruntfile.js', 'src/**/*.js',]
    },



    watch: {
      files: [ "./src/**/*.js", "./less/**/*.less"],
      tasks: [ 'all' ]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('all', 'Run main build process', function() {
    grunt.task.run(['jshint','less','copy','concat']);
  });
  grunt.registerTask('release', 'Run relase build process', function() {
    grunt.task.run(['all','uglify']);
  });

  grunt.registerTask('deploy', 'deployment task', function(target) {
    grunt.log.ok("running target:"+target);
    if(target == "production"){
      grunt.log.writeln("production must be called as follows...");
      grunt.log.writeln("awss=<yoursecret> awsk=<yourkey> grunt deploy:production");
      if(process.env.awsk === undefined){
        grunt.fail.warn('awsk env var not set');
      }
      if(process.env.awss === undefined){
        grunt.fail.warn('awss env var not set');
      } 
    }
    grunt.task.run(['release','s3:'+target]);  
  });

};