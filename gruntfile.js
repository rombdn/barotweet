module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.initConfig({
		requirejs: {
			foo: {
				options: {
					appDir: 'public/',
					baseUrl: 'js',
					mainConfigFile: 'public/js/main.js',
					dir: 'build',
					modules: [{ name: 'main' }],
					removeCombined: true
				}
			}
		}
	});

	grunt.registerTask('default', 'requirejs');
};