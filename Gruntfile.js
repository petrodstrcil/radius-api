module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    
        copy: {
            main: {
                expand: true,
                src: ['**/*.js', 'package.json', 'swagger.yml',
                     '!node_modules/**', '!test/**', '!txt/**'
                    ],
                //exclude: [ 'node_modules/**', 'test/**', 'txt/**' ],     
                //dest: '//172.24.68.162/anonymous'
                dest: 'dest/'
              },
        },


        jslint: { 
            main: {
                src: [ 
                    /*'db/*.js',
                    'routes/*.js',
                    'test/*.js',
                    '*.js',8*/
                    'server.js'
                    ],
                directives: { // example directives
                    node: true,
                    todo: true
                },
                options: {
                    edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
                    //junit: 'out/main-junit.xml', // write the output to a JUnit XML
                    //log: 'out/main-lint.log',
                    //jslintXml: 'out/main-jslint.xml',
                    errorsOnly: true, // only display errors
                    failOnError: false, // defaults to true
                    //checkstyle: 'out/main-checkstyle.xml' // write a checkstyle-XML
                }
            }
        },


        eslint: {
            options: {
                //configFile: '.eslintrc.yml',
                //rulePaths: ['conf/rules']
            },
            target: ['**/*.js', '!node_modules/**']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-eslint'); // load the task

    grunt.registerTask('test', ['eslint']);
    //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('default', ['copy']);

  };