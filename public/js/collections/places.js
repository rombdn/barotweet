define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var Place = require('models/place');

	var PlaceCollection = Backbone.Collection.extend( {
		model: Place,
		url: '/places'
	});


	return PlaceCollection;
});