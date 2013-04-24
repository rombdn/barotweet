if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	//var UserCollection = require('collections/users');

	var Map = Backbone.Model.extend({

		idAttribute: '_id',
		
		defaults: {
		},

		validate: function(attr) {
			var errors = [];

			return errors.length > 0 ? errors : false;
		}

	});

	return Map;

});