define(['jquery', 'underscore', 'backbone', 'models/place', 'collections/places', 'views/profile', 'views/place-form', 'views/event-form', 'views/com-form', 'views/form', 'views/wall'],

	function( $ , _ , Backbone , Place, PlaceCollection, ProfileView, PlaceFormView, EventFormView, ComFormView, FormView, WallView ){

		var NavigView = Backbone.View.extend({

			tagname: 'div',

			initialize: function(){
				console.log("creating Navig View");
/*
				//temp
				//don't create view until place is fetched
				this.placeFetched = false;

				this.place = new Place({_id: '517563469a3ff90815000001'});
				this.placeCollection = new PlaceCollection([this.place]);
				//this.profileView = new ProfileView({place: this.place});
				//this.place.save();

				this.place.fetch({
					success: _.bind(function() {
						this.placeFetched = true;
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

				this.currentView = new WallView();
			},

			setListeners: function(view) {
				this.listenTo(this.currentView, 'eSaved', this.showProfile);
				Backbone.on('profile:clickPlace', this.editPlace, this);
				this.listenTo(this.currentView, 'eEditEvent', this.editEvent);
				this.listenTo(this.currentView, 'eAddComment', this.addComment);
				Backbone.on('wall:clickPlace', this.showProfile, this);
			},


			render: function(view){
				console.log('          rendering');
				console.log(view instanceof Backbone.Model);
/*
				if(!this.placeFetched) {
					console.log('************ fetch non termine');
					return;
				}
				
				//default view if render() is called
				//without argument
				if(! (view instanceof Backbone.View)) {
					console.log('************ view non definie');
					return this.render(new WallView());
				}

				//remove the view currently displayed
				if(this.currentView) {
					//remove from DOM & unbind events
					this.currentView.remove();
					delete this.currentView;
				}

				//show the new view
				this.currentView = view;*/
				this.$el.append( this.currentView.el );
				this.currentView.render();

				//rebind events
				this.setListeners();

				return this;
			},


			editPlace: function(place) {
				console.log('NavigView: edit place');
				if(place) {
					this.render(new PlaceFormView({model: place}));
				}
				else {
					console.log('Error: NavigView.editPlace: place undefined');
				}
			},

			editEvent: function(pevent) {
				console.log('NavigView: edit event');
				this.render(new EventFormView({model: pevent}));
			},

			addComment: function(com, place) {
				console.log('NavigView: add comment');
				this.render(new ComFormView({model: com, place: place}));
			},

			showProfile: function(place) {
				console.log('NavigView: show profile');
				this.render(new ProfileView({place: place}));
			},

			wall: function() {
				console.log('NavigView: show wall');
				this.render(new WallView());
			}
		});


		return NavigView;
});