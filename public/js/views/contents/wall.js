define(['jquery', 'underscore', 'backbone', 'collections/places', 'views/maps/map', 'models/place', 'views/contents/place-profile', 'views/utils/alerts'],

	function( $ , _ , Backbone , PlaceCollection, MapView, Place, PlaceProfileView, AlertHandler ){

		var View = Backbone.View.extend({

			tagname: 'div',
			className: 'wall',


			initialize: function(){
				this.mapView = new MapView();
				this.placeCollection = new PlaceCollection();
				this.setEventListeners();
				this.placeCollection.fetch();

				this.alertHandler = new AlertHandler();
			},

			setEventListeners: function() {
				this.listenTo(Backbone, 'map:popup-click', this.loadPlaceProfile);
				this.listenTo(this.placeCollection, 'sync', this.displayMarkers);
			},

			loadPlaceProfile: function(placeId) {
				if(!placeId) throw "placeId not defined: unable to create profile view";

				this.place = new Place(({_id: placeId}));
				this.placeProfileView = new PlaceProfileView({model: this.place});
				this.place.fetch();

				this.render();
			},

			//get places coords to create map markers
			//todo: neighborhood filter
			displayMarkers: function() {
				this.placeCollection.models.forEach(function(model) {
					
					var placeProfileLink = $('<a href="#" class="map-popup-link" data-place-id="' + model.get('_id') + '">' + model.get('name') + '</a>').click(function(e){
						Backbone.trigger('map:popup-click', $(e.target).data('placeId'));
					})[0];

					var markerDef = {
						lat: model.get('lat'),
						lon: model.get('lon'),
						icon: null,
						content: placeProfileLink
					};

					this.mapView.map.setMarker(markerDef);

				}, this);
			},

			render: function(view){

				this.$el.append( this.alertHandler.el );
				this.alertHandler.render();
				
				//render map only once
				if( !this._mapRendered) {
					this.$el.append( this.mapView.el );
					this.mapView.render();
					
					this.mapView.map.locate();
					this._mapRendered = true;
				}

				if(this.placeProfileView) {
					this.$el.append( this.placeProfileView.el );
					this.placeProfileView.render();
				}

				return this;
			}

		});


		return View;
});