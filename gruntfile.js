/**
 * Grunt Module
 */
module.exports = function(grunt) {
	/**
	 * Load Grunt plugins
	 */
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	/**
	 * Configuration
	 */
	grunt.initConfig({
		/**
		 * Get package meta data
		 */
		pkg: grunt.file.readJSON('package.json'),
		/**
		* Bower Copy
		*https://www.npmjs.com/package/grunt-bowercopy
		*/
		bowercopy: {
			options: {
				srcPrefix: 'bower_components',
				clean: true
			},
			scss: {
				options: {
					destPrefix: 'assets/scss/vendor'
				},
				files: {
					'bourbon': 'bourbon/app/assets/stylesheets',
					'neat': 'neat/app/assets/stylesheets',
				}
			}
		},
		/**
		 * Sass
		 *https://github.com/gruntjs/grunt-contrib-sass/
		 */
		sass: {
			dist: {
				options: {
					style: 'expanded',
					lineNumbers: false,
					debugInfo: false,
					compass: false,
					'sourcemap=none': true
				},
				files: {
					'style.css' : 'assets/scss/style.scss'
				}
			}
		},
		/**
		 * makepot
		 *https://github/blazerssix/grunt-wp-i18n/
		 */
		makepot: {
			theme: {
				options: {
				domainPath: '/languages',
				type: 'wp-theme',
				exclude: [
					'dist/.*'
					]
				}
			}
		},

		/**
		*Addtextdomain
		*https://github.com/blazersix/grunt-wp-i18n/
		*/
		addtextdomain: {
			options: {
					textdomain: 'mediation'
			},
			update_all_domains: {
				options: {
						updateDomains: true
				}
			}
		},


		/** Po to Mo
		* https://github.com/axisthemes/grunt-potomo
		*/
		potomo: {
				dist: {
						files: [
							{
									expand: true,
									cwd: 'languages',
									src: ['*.po'],
									dest: 'languages',
									ext: '.mo',
									nonull: true
							}
						]
				}
		},

		/**
		 * CSSJanus
		 */
		cssjanus: {
			theme: {
				options: {
					swapLtrRtlInUrl: true
				},
				files: [
					{
						src: 'style.css',
						dest: 'style-rtl.css'
					}
				]
			}
		},
		/**
		 * Watch
		 *https://github.com/gruntjs/grunt-contrib-watch
		 */
		watch: {
			sass: {
				files: [
					'assets/scss/*.scss'
				],
				tasks: [
					'sass',
				]
			},
			cssjanus: {
				files: [
				'style.css'
				],
				tasks: [
				'cssjanus'
				]
			}
		}

		/**
		*Compile Sass to CSS
		*https://github.com/gruntjs/grunt-contrib-sass
		*/
	
	});

	/**
	 * Default task
	 * Run `grunt` on the command line
	 */
	grunt.registerTask('default', [
		'bowercopy',
		'sass',
		'cssjanus',
		'watch'
	]);
};