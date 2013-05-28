define(['jquery', 'underscore', 'backbone', 'collections/places', 'views/maps/map', 'models/place'],

	function( $ , _ , Backbone , PlaceCollection, MapView, Place ){

		var View = Backbone.View.extend({

			tagname: 'div',
			className: 'wall',


			initialize: function(){
				this.mapView = new MapView();

				//getting the places coords to create map markers
				//todo: neighborhood filter
				//todo: remplacer place list par placecollection
				//this.placeListView = new PlaceListView();
				
				this.placeCollection = new PlaceCollection();

				/*
				this.placeListView.getCollectionCoords(
					_.bind(this.mapView.setMarkers, this.mapView)
				);
				*/

				this.setEventListeners();
			},

			displayMarkers: function() {
				this.placeCollection.fetch({
					success: this.setMapMarkers
				});
			},

			setMapMarkers: function(collection, response, options) {

				collection.models.each(function(model) {
					
					this.mapView.map.setMarker({
						lat: model.get('lat'),
						lon: model.get('lon'),
						icon: 'place',
						content: '<a href="#" class="map-popup-link" data-place-id="' + model.get('_id') + '">' + model.get('name') + '</a>'
					});

				}, this);
			},

			render: function(view){
				
				//render map only once
				if( !this._mapRendered) {
					this.$el.append( this.mapView.el );
					this.mapView.render();
					
					this.mapView.locateUser();
					this._mapRendered = true;
					
					this.displayMarkers();
				}

				if(this.placeProfileView) {
					this.$el.append( this.placeProfileView.el );
					this.placeProfileView.render();
				}

				return this;
			},

			setEventListeners: function() {
				this.listenTo(Backbone, 'map:popup-click', this.loadPlaceProfile);
			},

			loadPlaceProfile: function(placeId) {
				if(!placeId) throw "placeId not defined: unable to create profile view";

				this.placeProfileView = new PlaceProfileView({modelId: placeId});
				this.render();
			}
		});


		return View;
});