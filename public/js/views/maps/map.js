define(['jquery', 'underscore', 'backbone', 'leaflet', 'models/map', 'text!templates/map.html', 'collections/places', 'models/alert' ],

	function( $ , _ , Backbone , Leaflet, Map, Tpl, PlaceCollection, Alert){

		var MapView = Backbone.View.extend({

			className: 'row-fluid map-container',
			template: _.template(Tpl),
			//alertTpl : _.template(AlertTpl),


			initialize: function(options) {
				this.map = new Map();

				this.setListeners();
			},

			setListeners: function() {
				this.listenTo(Backbone, 'menu:locate', _.bind(this.map.locate, this.map));

				//map events
				//used to display infos
				this.listenTo(Backbone, 'map:loading', function() { console.log('***MAP:LOADING'); });
				this.listenTo(Backbone, 'map:loaded', function() { console.log('***MAP:LOADED'); });
				this.listenTo(Backbone, 'map:locating', function() { Backbone.trigger('alert-top', new Alert({ id: 'maploc', status: 'progress', msg: 'Locating...'}) );/*this.alertView.showInfo('Locating...', 'info');*/ });
				this.listenTo(Backbone, 'map:located', function() { Backbone.trigger('alert-top', new Alert({ id: 'maploc', status: 'remove' })); });
				this.listenTo(Backbone, 'map:locatefail', function() { Backbone.trigger('alert-top', new Alert({ id: 'maploc', status: 'error', msg: 'Location failed'}) ); /*this.alertView.showInfo('Locating failed', 'error');*/ });

			},

			render: function(){
				this.$el.append( this.template() );
				this.map.setLeafletMap('map');
				return this;
			},

			//get places coords to create map markers
			displayMarkers: function(placeCollection) {
				placeCollection.models.forEach(function(model) {
					
					var placeProfileLink = $('<a href="#" class="map-popup-link" data-place-id="' + model.get('_id') + '">' + model.get('name') + '</a>').click(function(e){
						Backbone.trigger('map:popup-click', $(e.target).data('placeId'));
					})[0];

					var markerDef = {
						lat: model.get('lat'),
						lon: model.get('lon'),
						icon: null,
						content: placeProfileLink
					};

					this.map.setMarker(markerDef);

				}, this);
			},

			remove: function() {
				//DOM element attached to 'this.map' needs be to manually removed to avoid memory leaks
				this.map.removeMap();
				Backbone.View.prototype.remove.call(this);
			}
		});


		return MapView;
});