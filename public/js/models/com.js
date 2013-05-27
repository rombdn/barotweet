if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var User = require('models/user');
	//var UserCollection = require('collections/users');

	var Com = Backbone.Model.extend({

		idAttribute: '_id',

		defaults: {
			_userId: -1,
			_parentPlaceId: -1,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
		},

		validate: function(attr) {
			var errors = [];

			if(attr.text.length < 1 || attr.text.length > 142) {
				errors.push({name: 'text', message: 'Comments must be between 1 and 142 characters'});
			}

			return errors.length > 0 ? errors : false;
		}

	});

	return Com;

});