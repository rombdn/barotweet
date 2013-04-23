define(['jquery', 'underscore', 'backbone', 'models/pevent', 'collections/events', 'text!templates/event.html'],

	function( $ , _ , Backbone , PEvent, PEventCollection, eventTpl ){

		var EventView = Backbone.View.extend({

			tagname: 'div',
			id: 'profile-event',
			className: 'alert alert-info profile-event',
			template: _.template( eventTpl ),

			events: {
				'click': 'clickEvent'
			},

			initialize: function(options) {
				//if model is given
				/*
				if(this.model) {
					this.pevent = this.model;
				}
				//or if place is given
				else */if(options.place) {
					this.pevent = new PEvent( { _parentPlaceId: options.place.get('_id') });
					this.pevent.fetch();
				}
				else {
					throw 'ERROR Event view: no model given';
				}


				this.listenTo(this.pevent, 'all', this.render);
			},

			render: function(){
				if( this.pevent.isNew() ) {
					this.$el.html( 'no event 2nite -_-' );
				}
				else {
					this.$el.html( this.template(this.pevent.toJSON()) );
				}

				return this;
			},

			clickEvent: function() {
				Backbone.trigger('pevent:click', this.pevent);
			}

		});


		return EventView;
});