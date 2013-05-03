define(['jquery', 'underscore', 'backbone', 'views/places/places-list', 'views/maps/map'],

	function( $ , _ , Backbone , PlaceListView, MapView ){

		var WallView = Backbone.View.extend({

			tagname: 'div',
			className: 'wall',


			initialize: function(){
				console.log("creating Wall View");

				this.mapView = new MapView();
				this.mapView.setPosition([48.85293755, 2.35005223818182]);

				this.placeListView = new PlaceListView();

				this.placeListView.getCollectionCoords(
					_.bind(this.mapView.setMarkers, this.mapView)
				);
			},

			render: function(view){

				this.$el.append( this.mapView.el );
				this.$el.append( this.placeListView.el );

				this.mapView.render();
				this.mapView.locateUser();

				this.placeListView.render();

				return this;
			}
		});


		return WallView;
});