define(['jquery', 'underscore', 'backbone', 'collections/events.js', 'text!templates/event.html'],

	function( $ , _ , Backbone , EventsList, eventTpl ){

		var PlaceView = Backbone.View.extend({

			tagname: 'div',
			id: 'profile-event',
			className: 'alert alert-info profile-event',
			template: _.template( eventTpl ),

			initialize: function(options) {
				//recherche dans la collection
				//si !isNew(options.place)
					//this.event = collection.findWhere({parentPlaceId: options.place.id})
				//si pas dans la collection -> this.event = undefined
			},

			render: function(){

				//si this.event defini
					this.$el.html( this.template( this.model.toJSON() ));

				//sinon templace pas d'event

				return this;
			}

		});


		return EventView;
});