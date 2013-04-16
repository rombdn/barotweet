define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var LocalStorage = require('localstorage');
	var PEvent = require('models/pevent');

	var EventCollection = Backbone.Collection.extend( {
		model: PEvent,
		localStorage: new Backbone.LocalStorage("event-store-2")
	});


	return EventCollection;
});