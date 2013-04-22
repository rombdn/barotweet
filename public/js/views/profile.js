define(['jquery', 'underscore', 'backbone', 'views/place', 'models/pevent', 'collections/events', 'views/event', 'collections/coms', 'views/coms-list'],

	function( $ , _ , Backbone , PlaceView, PEvent, EventCollection, EventView, ComsCollection, ComsListView){

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
				this.pevent = new PEvent({ _parentPlaceId: this.place.id });
				this.eventCollection = new EventCollection([this.pevent]);
				this.eventView = new EventView({model: this.pevent});
				this.pevent.fetch({ 
					data: { _parentPlaceId: this.place.id }
				});


				this.listenTo(this.place, 'sync', this.render());

				//coms
				/*
				this.comsCollection = new ComsCollection();
				this.comsListView = new ComsListView({model: this.comsCollection});
				this.comsCollection.fetch({ data: {place: this.place.id} } );
				*/
			},

			render: function(){
				console.log('      * rendering profile');

				this.$el.append(this.placeView.el);
				this.$el.append( this.eventView.el );
				//this.$el.append( this.comsListView.el );

				this.placeView.render();
				this.eventView.render();
				//this.comsListView.render();				

				return this;
			},

			//events
			events: {
				"click #place": 'editPlace',
				"click #profile-event": 'editEvent',
				"click #comment-add": 'addComment'
			},

			editPlace: function() {
				Backbone.trigger('profile:clickPlace', this.place);
			},

			editEvent: function() {
				//disable click until the event is fetched
				if( this.pevent.get('_fetched')) {
					this.trigger('eEditEvent', this.pevent);
				}
			},

			addComment: function() {
				/*
				var comment = new Com();
				this.comsCollection.add(comment);
				this.trigger('eAddComment', comment, this.place);
				*/
			},

			remove: function() {
				this.placeView.remove();
				this.eventView.remove();
				//this.comsListView.remove();

				Backbone.View.prototype.remove.call(this);
			}

		});


		return ProfileView;
});