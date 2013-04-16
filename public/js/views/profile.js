define(['jquery', 'underscore', 'backbone', 'models/place', 'views/place', 'models/pevent', 'collections/events', 'views/event'],

	function( $ , _ , Backbone , Place, PlaceView, PEvent, EventCollection, EventView){

		var ProfileView = Backbone.View.extend({

			tagname: 'div',
			className: 'profile-all',
			//template: _.template( profileAllTpl ),

			initialize: function(options){
				console.log("creating ProfileView with place: " + options.place.get("name"));

				//map

				//place
				this.place = options.place;
				this.placeView = new PlaceView({model: this.place});

				//event
				this.event = undefined;
				this.eventCollection = new EventCollection();
				this.eventView = undefined;

				//find the event associated with the place
				if(!options.place.isNew()) {
					
					this.eventCollection.fetch({
						
						//where clause
						data: {parentPlaceId: options.place.id},
						
						success: _.bind(function(collection, response) {
							
							console.log('Events found: ' + collection.length);

							_.each(collection.models, function(model) {
								console.log(model);
							}, this);
							

							if(collection.length > 0) {
								//0 cause duplicate events shouldn't exist
								this.event = collection.models[0];
							}
							else {
								this.event = new PEvent();
								this.eventCollection.add(this.event);
							}

							this.eventView = new EventView({model: this.event});
							
							//debug
							console.log(this.event);
						
						}, this)
					});

				}
			},

			render: function(){

				//place view
				this.$el.append(this.placeView.el);
				this.placeView.render();

				//event view
				//this.eventView is defined by fetch success
				if(this.eventView) {
					this.$el.append( this.eventView.el );
					this.eventView.render();
				}
				else {
					this.$el.append( 'loading event' );
				}

				return this;
			},

			//events
			events: {
				"click #place": 'editPlace',
				"click #profile-event": 'editEvent'
			},

			editPlace: function() {
				this.trigger('eEditPlace');
			},

			editEvent: function() {
				this.trigger('eEditEvent', this.event, this.place);
			}


		});


		return ProfileView;
});