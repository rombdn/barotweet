define(['jquery', 'underscore', 'backbone', 'collections/places', 'views/maps/map', 'models/place', 'views/contents/place-profile', 'views/utils/alerts'],

	function( $ , _ , Backbone , PlaceCollection, MapView, Place, PlaceProfileView, AlertHandler ){

		var View = Backbone.View.extend({

			tagname: 'div',
			className: 'container',


			initialize: function(){
				this.alertHandler = new AlertHandler({eventListened: 'alert-top'});
				this.mapView = new MapView();
				this.setEventListeners();
			},

			setEventListeners: function() {
				this.listenTo(Backbone, 'map:popup-click', this.loadPlaceProfile);
			},

			loadPlaceProfile: function(placeId) {
				if(!placeId) throw "placeId not defined: unable to create profile view";

				if(this.placeProfileView) {
					this.placeProfileView.remove();
				}

				this.place = new Place(({_id: placeId}));
				this.placeProfileView = new PlaceProfileView({model: this.place});
				this.place.fetch();

				this.$el.append( this.placeProfileView.el );
				this.placeProfileView.render();
			},

			render: function(){
				this.$el.append( this.alertHandler.el );
				this.alertHandler.render();
				
				this.$el.append( this.mapView.el );
				this.mapView.render();
					
				this.mapView.map.locate();

				return this;
			}
		});


		return View;
});