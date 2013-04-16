require.config({

	baseUrl: 'js',

	paths: {
		backbone: '../lib/backbone',
		//backbonefull: '../lib/backbone',
		underscore: '../lib/underscore-min',
		jquery: '../lib/jquery-min',
		text: '../lib/text',
		handlebars: '../lib/handlebars',
		localstorage: '../lib/backbone.localStorage-min',
		bootstrap: '../lib/bootstrap/js/bootstrap.min',
		marionette: '../lib/backbone.marionette'
	},

	shim: {
		backbone: {
			deps: [ 'underscore' , 'jquery' ],
			exports: 'Backbone'
		},
/*
		backbonefull: {
			deps: [ 'underscore' , 'jquery' ],
			exports: 'BackboneFull'
		},
*/
		underscore: { exports: '_' },

		handlebars: { exports: 'Handlebars' },

		bootstrap: {
			deps: [ 'jquery' ],
			exports: 'Bootstrap'
		},

		marionette: {
			deps: [ 'jquery', 'underscore', 'backbone' ],
			exports: [ 'Marionette']
		}
	}

});



require( [ 'app' ], function( App ){

	window.app = new App();
	window.app.start();
	console.log('App started');

});