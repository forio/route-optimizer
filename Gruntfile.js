'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var ejs = require('ejsify');
    var UglifyJS = require("uglify-js");

    grunt.initConfig({
        watch: {
            compass: {
                files: ['src/styles/**/*.scss'],
                tasks: ['compass:dev']
            },
            js: {
                files: [ 'src/scripts/**/*.js', 'src/scripts/**/*.ejs'],
                tasks: 'browserify2:dev'
            },
            index: {
                files: [ 'src/index.html'],
                tasks: 'copy:index'
            },
            assets: {
                files: [ 'src/styles/assets/**/*.*'],
                tasks: 'copy:assets'
            },
            data: {
                files: [ 'src/data/*.*'],
                tasks: 'copy:data'
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
            },
            data: {
                files: [{
                    src: ['**/*.*'],
                    expand: true,
                    cwd: 'src/data/',
                    dest: 'public/data/'
                }]
            },
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
                            cwd: 'src/scripts/services/',
                            src: ['**/*.js'],
                            dest: 'services/'
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
                },
                entry: './src/scripts/app.js',
                compile: './public/scripts/app.js',
                beforeHook: function (bundle) {
                    return bundle.transform(ejs);
                }
            },
            dev: {
                options: {
                    debug: true
                }
            },
            production: {
                options: {
                    debug: false
                },
                afterHook: function(src) {
                    var result = UglifyJS.minify(src, {fromString: true});
                    return result.code;
                }
            }
        },


        compass: {
            options: {
                sassDir: 'src/styles',
                cssDir: 'public/styles',
                imagesDir: 'public/styles/assets/images',
                javascriptsDir: 'public/scripts',
                fontsDir: 'public/styles/assets/fonts',
                relativeAssets: true
            },
            dev: {
                options: {
                    environment: 'development',
                    outputStyle: 'expanded',
                }
            },
            production: {
                options: {
                    force: true,
                    outputStyle: 'compressed',
                    environment: 'production'
                }
            }
        },

        uglify: {
            options: {
                compress: false,
                sourceMap: false,
                sourceMapIncludeSources: false
            },
            dev: {
                files: []
            },
            production: {
                options: {
                    compress: true,
                    sourceMap: false
                },
                files: []
            }
        }
    });

    grunt.registerTask('init', ['compass:dev', 'browserify2:dev']);

    grunt.registerTask('production', ['compass:production', 'browserify2:production']);
    grunt.registerTask('server', ['copy', 'init', 'connect:livereload', 'open', 'watch']);


    grunt.registerTask('default', ['watch']);
};
