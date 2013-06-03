if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');

	var Model = Backbone.Model.extend({

		idAttribute: '_id',

		urlRoot: '/users',
		
		defaults: {
			id: -1,
			name: ''
		},

		validate: function(attr) {
			var errors = [];

			if(attr.name.length < 1 || attr.name.length > 50) {
				errors.push({name: 'name', message: 'Name must be between 1 and 50 characters'});
			}
			

			return errors.length > 0 ? errors : false;
		}
	});

	return Model;

});