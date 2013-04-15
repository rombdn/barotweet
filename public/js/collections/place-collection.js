define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var LocalStorage = require('localstorage');
	var Place = require('models/place');

	var PlaceCollection = Backbone.Collection.extend( {
		model: Place,
		localStorage: new Backbone.LocalStorage("place-store")
	});


	return PlaceCollection;
});