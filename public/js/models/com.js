if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	//var UserCollection = require('collections/users');

	var Com = Backbone.Model.extend({

		defaults: {
			userId: -1,
			parentPlaceId: -1,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
		},

		findUser: function() {
			//usercollection.find(this.userId)
			return {name: 'foo', pic: 'img/placeholder.png'};
		},

		validate: function(attr) {
			var errors = [];

			return errors.length > 0 ? errors : false;
		}

	});

	return Com;

});