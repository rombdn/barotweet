define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var PEvent = require('models/pevent');

	var EventCollection = Backbone.Collection.extend( {
		model: PEvent,
		url: '/events'
	});


	return EventCollection;
});