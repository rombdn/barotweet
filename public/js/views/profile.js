define(['jquery', 'underscore', 'backbone', 'models/place', 'views/place', 'models/pevent', 'collections/events', 'views/event', 'models/com', 'collections/coms', 'views/coms-list'],

	function( $ , _ , Backbone , Place, PlaceView, PEvent, EventCollection, EventView, Com, ComsCollection, ComsListView){

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

				this.place.findEvent(_.bind(function(eventFound) {
					if(eventFound) {
						this.event = eventFound;
						this.eventView = new EventView({model: this.event});
					}
					else {
						this.event = new PEvent();
						this.eventCollection.add(this.event);						
					}
				}, this));


				//coms
				this.place.findComs(_.bind( function(comsFound) {

				}, this));

				
				this.comsCollection = new ComsCollection();
				this.comsListView = undefined;

				//find the event associated with the place
				if(!options.place.isNew()) {
					this.comsCollection.fetch({
						
						data: {parentPlaceId: options.place.id},
						success: _.bind(function(){
							this.comsListView = new ComsListView({model: this.comsCollection, place: this.place});
						}, this)
					});
				}

				this.setListeners();
			},

			render: function(){

				//place view
				this.$el.append(this.placeView.el);
				this.placeView.render();

				//event view
				//this.eventView is defined by fetch success
				//!!!!!!!!!!! THIS TEST SHOULD BE IN THE VIEW !!!!!!!!!!!
				//!!!!!!!!! REFRESH PROBLEM !!!!!!!!!!!!
				if(this.eventView) {
					this.$el.append( this.eventView.el );
					this.eventView.render();
				}
				else {
					this.$el.append( 'loading event' );
				}

				//coms view
				if(this.comsListView) {
					this.$el.append( this.comsListView.el );
					this.comsListView.render();
				}
				else {
					this.$el.append( 'loading comments' );
				}

				return this;
			},

			//events
			events: {
				"click #place": 'editPlace',
				"click #profile-event": 'editEvent',
				"click #comment-add": 'addComment'
			},

			editPlace: function() {
				this.trigger('eEditPlace');
			},

			editEvent: function() {
				this.trigger('eEditEvent', this.event, this.place);
			},

			addComment: function() {
				var comment = new Com();
				this.comsCollection.add(comment);
				this.trigger('eAddComment', comment, this.place);
			}

		});


		return ProfileView;
});