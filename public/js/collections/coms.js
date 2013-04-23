define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var Com = require('models/com');

	var ComsCollection = Backbone.Collection.extend( {
		model: Com,
		url: '/coms'
	});


	return ComsCollection;
});