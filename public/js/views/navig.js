define(['jquery', 'underscore', 'backbone', 'models/place', 'collections/places', 'views/profile', 'views/place-form', 'views/event-form', 'views/com-form'],

	function( $ , _ , Backbone , Place, PlaceCollection, ProfileView, PlaceFormView, EventFormView, ComFormView ){

		var NavigView = Backbone.View.extend({

			tagname: 'div',

			initialize: function(){
				console.log("creating Navig View");

				this.fetched = false;

				this.place = new Place({id: 1});
				this.placeCollection = new PlaceCollection([this.place]);
				//this.profileView = new ProfileView({place: this.place});

				this.place.fetch({
					success: _.bind(function() {
						this.fetched = true;
					}, this)
				});

				this.listenTo(this.place, 'sync', this.render);

				//debug - default value
				

				//new place creation
				/*
				this.place = new Place();
				this.placeCollection.add(this.place);
				*/

				//debug

			},

			setListeners: function(view) {
				this.listenTo(this.currentView, 'eSaved', this.showProfile);
				this.listenTo(this.currentView, 'eEditPlace', this.editPlace);
				this.listenTo(this.currentView, 'eEditEvent', this.editEvent);
				this.listenTo(this.currentView, 'eAddComment', this.addComment);
			},


			render: function(view){
				console.log('          rendering');
				console.log(view instanceof Backbone.Model);

				if(!this.fetched) {
					console.log('************ fetch non termine');
					return;
				}
					
				//default view if render() is called
				//without argument
				if(! (view instanceof Backbone.View)) {
					console.log('************ view non definie');
					return this.render(new ProfileView({place: this.place}));
				}

				//remove the view currently displayed
				if(this.currentView) {
					//remove from DOM & unbind events
					this.currentView.remove();
					delete this.currentView;
				}

				//show the new view
				this.currentView = view;
				this.$el.append( this.currentView.el );
				this.currentView.render();

				//rebind events
				this.setListeners();

				return this;
			},


			editPlace: function() {
				console.log('NavigView: edit place');
				this.render(new PlaceFormView({model: this.place}));
			},

			editEvent: function(pevent) {
				console.log('NavigView: edit event');
				this.render(new EventFormView({model: pevent}));
			},

			addComment: function(com, place) {
				console.log('NavigView: add comment');
				this.render(new ComFormView({model: com, place: place}));
			},

			showProfile: function() {
				console.log('NavigView: show profile');
				this.render(new ProfileView({place: this.place}));
			}
		});


		return NavigView;
});