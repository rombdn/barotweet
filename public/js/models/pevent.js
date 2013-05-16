if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');

	var PEvent = Backbone.Model.extend({

		idAttribute: '_id',

		urlRoot: function() {
			if(this.isNew()) {
				if( this.get('_id')) {
					return '/events/' + this.get('_id');
				}
				else if( this.get('_parentPlaceId')) {
					return '/events?_parentPlaceId=' + this.get('_parentPlaceId');
				}
			}
			else {
				return '/events';
			}
		},

		initialize: function() {
		},

		defaults: {
			name: "Unnamed event",
			price: '15',
			label: 'rock',
			hearts: {number: 0, users: []},
			_parentPlaceId: -1
		},

		vote: function() {
			this.fetch({
				url: '/events/vote/' + this.get('_id')
			});
			/*
			$.ajax({
				type: 'POST',
				url: '/events/vote/' + this.get('_id'),
				success: function(data, status, jqXHR) { console.log('Vote for event = SUCCESS'); },
				error: function(jqXHR, status, error) { console.log('Vote for event = FAIL'); }
			});
			*/
		},


		//fetch augmentation
		//setting this.fetched = true after fetch
		/*
		fetch: function(options) {
			args = _.extend(options, { 
				success: _.bind(this.postFetch, this),
				error: _.bind(this.postFetch, this)
			});

			Backbone.Model.prototype.fetch.call(this, args);
		},

		postFetch: function() {
			console.log('           FETCH OK, model :' + this.get('name'));
			this.set({_fetched: true});
		},
		*/


		validate: function(attr) {
			var errors = [];
/*
			//=== PIC ===

			if( !(/(jpg|png|gif)$/.test(attr.pic)) ) {
				errors.push({name: 'pic', message: "image must end with jpg/png/gif"});
			}

			//=== NAME ===

			if( !(/\S/.test(attr.name)) ) {
				errors.push({name: 'name', message: "name cannot be blank"});
			}

			if( attr.name.length > 15 ) {
				errors.push({name: 'name', message: "name must be less than 15 characters"});
			}


			//=== HOURS ===
			// 16h <= open <= 23h ou open = 0h
			if( !(/\S/.test(attr.open)) ) {
				errors.push({name: 'open', message: "open cannot be blank"});
			}

			else if((attr.open !== 0 && attr.open < 16) || attr.open >= 24) {
				errors.push({name: 'open', message: "place can't open before 16h or after 00h"});
			}


			// 1h <= close <= 10h
			if( !(/\S/.test(attr.close)) ) {
				errors.push({name: 'close', message: "close cannot be blank"});
			}

			else if(attr.close < 1 || attr.close > 10) {
				errors.push({name: 'close', message: "place can't close before 1 a.m or after 10 a.m"});
			}

			// integers
			if(attr.open % 1 !== 0) {
				console.log(attr.open);
				errors.push({name: 'open', message: "hours must be integers"});
			}
			if(attr.close % 1 !== 0) {
				console.log(attr.close);
				errors.push({name: 'close', message: "hours must be integers"});
			}


			//=== PRICES ===
			if(attr.beerPrice <= 0.5 || attr.beerPrice > 20) {
				errors.push({name: 'beer', message: "beer price must be a number between 0.5 and 20"});
			}

			if(attr.cocktailPrice <= 0.5 || attr.cocktailPrice > 20) {
				errors.push({name: 'cocktail', message: "cocktail price must be a number between 0.5 and 20"});
			}
			*/

			return errors.length > 0 ? errors : false;
		}

	});

	return PEvent;

});