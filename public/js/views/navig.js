define(['jquery', 'underscore', 'backbone', 'models/place', 'collections/places', 'views/profile', 'views/place-form', 'views/event-form'],

	function( $ , _ , Backbone , Place, PlaceCollection, ProfileView, PlaceFormView, EventFormView ){

		var NavigView = Backbone.View.extend({

			tagname: 'div',

			initialize: function(){
				console.log("creating Navig View");

				this.placeCollection = new PlaceCollection();
				this.placeCollection.fetch();

				//debug - default value
				this.place = this.placeCollection.at(0);

				//new place creation
				/*
				this.place = new Place();
				this.placeCollection.add(this.place);
				*/

				//debug
				this.placeCollection.forEach(function(model) {
					console.log(model.id);
				});
			},

			setListeners: function(view) {
				this.listenTo(this.currentView, 'eSaved', this.showProfile);
				this.listenTo(this.currentView, 'eEditPlace', this.editPlace);
				this.listenTo(this.currentView, 'eEditEvent', this.editEvent);
			},


			render: function(view){
				console.log('rendering');

				//default view if render() is called
				//without argument
				if(!view) {
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
				this.$el.append( view.el );
				view.render();

				//rebind events
				this.setListeners();

				return this;
			},


			editPlace: function() {
				console.log('EDIT!');
				this.render(new PlaceFormView({model: this.place}));
			},

			editEvent: function(event, place) {
				console.log('EDIT EVENT!');
				this.render(new EventFormView({model: event, place: place}));
			},

			showProfile: function() {
				console.log('SHOW!');
				this.render(new ProfileView({place: this.place}));
			}
		});


		return NavigView;
});