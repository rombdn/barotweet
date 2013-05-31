if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');

	var Model = Backbone.Model.extend({

		idAttribute: '_id',

		defaults: {
			id: 'default',
			msg: 'Warning',
			status: '',
			view: null
		},

		sync: function() {}
	});

	return Model;

});