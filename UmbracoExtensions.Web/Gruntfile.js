/// <binding ProjectOpened='watch, watch:theme' />

/* 
  {
    "name": "Uddannelsesforbundet",
    "version": "0.0.1",
    "description": "",
    "author": "Datagraf",
    "license": "ISC",
    "devDependencies": {
      "grunt": "^0.4.5",
      "grunt-contrib-less": "^1.1.0",
      "less-plugin-autoprefix": "^1.5.1",
      "grunt-contrib-watch": "^0.6.1",
      "grunt-real-favicon": "^0.1.6"
    }
  }
*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            prod: {
                options: {
                    sourceMap: true,
                    sourceMapURL: 'main.css.map',
                    sourceMapFilename: 'css/main.css.map',
                    plugins: [
                        new (require('less-plugin-autoprefix'))({ browsers: ["last 2 versions", "> 5%"] })
                    ]
                },
                files: {
                    "content/css/main.css": "content/less/main.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['content/less/**/*.less'],
                tasks: ['less:prod']
            }
        },
        realFavicon: {
            favicons: {
                src: 'content/favicon/master.png',
                dest: 'content/favicon/',
                options: {
                    iconsPath: '/content/favicon/',
                    html: ['content/favicon/markup.html'],
                    design: {
                        ios: {
                            pictureAspect: 'backgroundAndMargin',
                            backgroundColor: '#f0f0f0',
                            margin: '32%'
                        },
                        desktopBrowser: {},
                        windows: {
                            pictureAspect: 'noChange',
                            backgroundColor: '#f0f0f0',
                            onConflict: 'override'
                        },
                        androidChrome: {
                            pictureAspect: 'noChange',
                            themeColor: '#ffffff',
                            manifest: {
                                name: 'Client',
                                display: 'browser',
                                orientation: 'notSet',
                                onConflict: 'override',
                                declared: true
                            }
                        },
                        safariPinnedTab: {
                            pictureAspect: 'silhouette',
                            themeColor: '#5bbad5'
                        }
                    },
                    settings: {
                        scalingAlgorithm: 'Mitchell',
                        errorOnImageTooSmall: false
                    }
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-real-favicon');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
};