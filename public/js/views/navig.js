define(['jquery', 'underscore', 'backbone', 'views/profile', 'views/place-form', 'views/event-form', 'views/com-form', 'views/wall', 'models/place'],

	function( $ , _ , Backbone , ProfileView, PlaceFormView, EventFormView, ComFormView, WallView, Place ){

		var NavigView = Backbone.View.extend({

			tagname: 'div',

			initialize: function(){
				this.currentView = null;
				this.setListeners();

				//var place = new Place({'_id': '517545675d5621d00a000001'});
				//console.log('********* ' + place.url());
				//place.fetch();

			},

			setListeners: function() {
				Backbone.on('pevent:save', this.eSavedEvent, this);
				Backbone.on('pevent:click', this.eClikedPEvent, this);
				Backbone.on('pevent:cancel', this.eClikedCancelPEvent, this);
				Backbone.on('pevent:delete', this.eClikedDeletePEvent, this);
				
				Backbone.on('coms:add', this.eClickedAddCom, this);
				Backbone.on('com:save', this.eSavedCom, this);
				
				Backbone.on('place:click', this.eClickedPlace, this);
				Backbone.on('place:save', this.eSavedPlace, this);
			},


			//events handlers
			eClikedPEvent: function(pevent) {
				this.render(new EventFormView({model: pevent}));
			},

			eClickedAddCom: function(com) {
				console.log('Navig: create com form view for place ' + com.get('_parentPlaceId'));
				this.render(new ComFormView({model: com}));
			},
/*
			eClickedCom: function(com) {
				console.log('destroy com ' + com.get('text'));
				var placeId = com.get('_parentPlaceId');
				com.destroy({wait: true});

				this.render(new ProfileView({_id: placeId}));
			},
*/
			eSavedEvent: function(pevent) {
				console.log('event saved, go to place ' + pevent.get('_parentPlaceId'));
				this.render(new ProfileView({_id: pevent.get('_parentPlaceId')}));
			},

			eClikedCancelPEvent: function(pevent) {
				this.render(new ProfileView({_id: pevent.get('_parentPlaceId')}));
			},

			eClikedDeletePEvent: function(pevent) {
				var placeId = pevent.get('_parentPlaceId');
				pevent.destroy({wait:true});

				this.render(new ProfileView({_id: placeId}));
			},

			eSavedCom: function(com) {
				this.render(new ProfileView({_id: com.get('_parentPlaceId')}));
			},

			eSavedPlace: function(place) {
				this.render(new ProfileView({place: place}));
			},

			eClickedPlace: function(place) {
				if(this.currentView instanceof WallView) {
					this.render(new ProfileView({place: place}));
				}
				else {
					this.render(new PlaceFormView({model: place}));
				}
			},


			render: function(view){			
				//default view if render() is called
				//without argument
				if(! (view instanceof Backbone.View)) {
					return this.render(new WallView());
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
				//this.setListeners();

				return this;
			}
		});


		return NavigView;
});