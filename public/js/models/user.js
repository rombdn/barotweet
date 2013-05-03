if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');

	var Model = Backbone.Model.extend({

		idAttribute: '_id',

		urlRoot: '/users',
		
		defaults: {
			name: ''
		},

		validate: function(attr) {
			var errors = [];

			return errors.length > 0 ? errors : false;
		}/*,

		url: function() {
			if(this.isNew() && this.get('name').length > 0) {
				var url = this.urlRoot + '?name=' + this.get('name');
				console.log(url);
				return url;
			}
			
			return this.urlRoot;
		}*/

	});

	return Model;

});