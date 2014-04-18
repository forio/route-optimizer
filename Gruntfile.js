'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var ejs = require('ejsify');

    grunt.initConfig({
        watch: {
            compass: {
                files: ['src/styles/**/*.scss'],
                tasks: ['compass']
            },
            js: {
                files: [ 'src/scripts/**/*.js'],
                tasks: 'browserify2'
            },
            index: {
                files: [ 'src/index.html'],
                tasks: 'copy:index'
            },
            assets: {
                files: [ 'src/styles/assets/*.*'],
                tasks: 'copy:assets'
            },
            options: {
                nospawn: true,
                livereload: {
                    port: LIVERELOAD_PORT
                }
            }
        },
        copy: {
            index: {
                src: 'src/index.html',
                dest: 'public/index.html'
            },
            assets: {
                files: [{
                    src: ['**/*.*'],
                    expand: true,
                    cwd: 'src/styles/assets/',
                    dest: 'public/styles/assets/'
                }]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                directory: './public'

            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, './public')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        browserify2: {
            dev: {
                entry: './src/scripts/app.js',
                compile: './public/scripts/app.js',
                debug: true,
                options: {
                    expose: {
                        files: [
                            {
                                cwd: 'src/scripts/',
                                src: ['**/*.ejs'],
                                dest: 'templates/'
                            },
                            {
                                cwd: 'src/scripts/views/',
                                src: ['**/*.js'],
                                dest: 'views/'
                            },
                            {
                                cwd: 'src/scripts/models/',
                                src: ['**/*.js'],
                                dest: 'models/'
                            },
                            {
                                cwd: 'src/scripts/collections/',
                                src: ['**/*.js'],
                                dest: 'collections/'
                            }
                        ]
                    }
                },
                beforeHook: function (bundle) {
                    return bundle.transform(ejs);
                }
            }
        },


        compass: {
            dev: {
                options: {
                    sassDir: 'src/styles',
                    cssDir: 'public/styles',
                    imagesDir: 'public/styles/assets/images',
                    javascriptsDir: 'public/scripts',
                    fontsDir: 'public/styles/assets/fonts',
                    environment: 'dev',
                    outputStyle: 'expanded',
                    relativeAssets: true
                }
            }
        }
    });

    grunt.registerTask('init', ['compass:dev', 'browserify2']);
    grunt.registerTask('server', ['copy', 'init', 'connect:livereload', 'open', 'watch']);


    grunt.registerTask('default', ['watch']);
};
