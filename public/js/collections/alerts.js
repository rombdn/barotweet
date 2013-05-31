define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var Alert = require('models/alert');

	var Collection = Backbone.Collection.extend( {
		model: Alert
	});


	return Collection;
});