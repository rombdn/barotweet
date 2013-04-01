require.config({

	baseUrl: 'js',

	paths: {
		backbone: '../lib/backbone-min',
		underscore: '../lib/underscore-min',
		jquery: '../lib/jquery-min',
		text: '../lib/text'
	},

	shim: {
		backbone: {
			deps: [ 'underscore' , 'jquery' ],
			exports: 'Backbone'
		},

		underscore: { exports: '_' }
	}

});



require( [ 'app' ], function( App ){

	window.app = new App();
	window.app.start();

});