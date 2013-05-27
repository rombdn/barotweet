define(['jquery', 'underscore', 'backbone', 'views/places/places-list', 'views/maps/map'],

	function( $ , _ , Backbone , PlaceListView, MapView ){

		var View = Backbone.View.extend({

			tagname: 'div',
			className: 'wall',


			initialize: function(){
				this.mapView = new MapView();

				//getting the places coords to create map markers
				//todo: neighborhood filter
				//todo: remplacer place list par placecollection
				this.placeListView = new PlaceListView();
				
				this.placeListView.getCollectionCoords(
					_.bind(this.mapView.setMarkers, this.mapView)
				);

				this.setEventListeners();
			},

			render: function(view){
				
				//render map only once
				if( !this._mapRendered) {
					this.$el.append( this.mapView.el );
					this.mapView.render();
					this.mapView.locateUser();
					this._mapRendered = true;
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