define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var LocalStorage = require('localstorage');
	var Place = require('models/com');

	var ComsCollection = Backbone.Collection.extend( {
		model: Place,
		localStorage: new Backbone.LocalStorage("coms-store")
	});


	return ComsCollection;
});