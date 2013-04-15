define(['jquery', 'underscore', 'backbone', 'models/place', 'collections/place-collection', 'views/profile', 'views/place-form'],

	function( $ , _ , Backbone , Place, PlaceCollection, ProfileView, PlaceFormView ){

		var NavigView = Backbone.View.extend({

			tagname: 'div',

			initialize: function(){
				console.log("creating Navig View");

				//this.place = new Place();
				this.placeCollection = new PlaceCollection();
				this.placeCollection.fetch();

				//debug - default value
				this.place = this.placeCollection.at(0);

				//new place creation
				/*
				this.place = new Place();
				this.placeCollection.add(this.place);
				*/

				this.placeCollection.forEach(function(model) {
					console.log(model.id);
				});
			},

			setListeners: function(view) {
				this.listenTo(this.currentView, 'eSaved', this.showProfile);
				this.listenTo(this.currentView, 'eEditPlace', this.editPlace);
			},


			render: function(view){
				console.log('rendering');

				if(!view) {
					return this.render(new ProfileView({place: this.place}));
				}

				if(this.currentView) {
					this.currentView.remove();
					delete this.currentView;
				}

				this.currentView = view;
				this.$el.append( view.el );
				view.render();

				this.setListeners();

				return this;
			},


			editPlace: function() {
				console.log('EDIT!');
				this.render(new PlaceFormView({model: this.place}));
			},

			showProfile: function() {
				console.log('SHOW!');
				this.render(new ProfileView({place: this.place}));
			}
		});


		return NavigView;
});