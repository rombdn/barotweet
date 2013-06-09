if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var Leaflet = require('leaflet');
	var Icons = require('utils/map-markers');
	var Alert = require('models/alert');

	var Map = Backbone.Model.extend({

		idAttribute: '_id',

		defaults: {
		},


		initialize: function() {
			this.zoom = 14;
		},

		setLeafletMap: function(htmlelement) {
			this.leafletMap = L.map(htmlelement);

			this.layer = L.tileLayer(
				'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
				//'http://a.tile.openstreetmap.org/$%7Bz%7D/$%7Bx%7D/$%7By%7D.png',
				//'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
				{
					attribution: '&copy; OpenStreetMap'
				}
			);

			this.leafletMap.addLayer(this.layer);

			//events
			this.leafletMap.on('locationfound', this.locFound, this);
			this.leafletMap.on('locationerror', this.locError, this);
			this.leafletMap.on('zoomend', this.getNewPlaces, this);
			this.layer.on('loading', function() { Backbone.trigger('map:loading'); });
			this.layer.on('load', function() { Backbone.trigger('map:loaded'); });
		},

		locate: function() {
			this.leafletMap.locate({setView: false, maxZoom: this.zoom, timeout: 2000});
			Backbone.trigger('map:locating');
		},

		locFound: function(data) {
			this.setView(data.latlng.lat, data.latlng.lng);
			this.setMarker({
				lat: data.latlng.lat, 
				lon: data.latlng.lng, 
				icon: 'user', 
				content: "It's you!"});
			Backbone.trigger('map:located', data);
			//this.getNewPlaces();
		},

		locError: function(data) {
			console.log(data);
			this.gotoPosition([48.85293755, 2.35005223818182]);
			Backbone.trigger('map:locatefail', data);
		},

		gotoAddress: function(address) {
			//TODO: check if address already geocoded
			this.geoCode(address, _.bind(function(data) {
				this.setView(data[0].lat, data[0].lon, false);
			}, this));
		},

		gotoPosition: function(position) {
			this.setView(position[0], position[1], false);
		},

		geoCode: function(address, callback) {
			var country = 'fr',
				street = address,
				city = 'Paris';

			$.getJSON("http://nominatim.openstreetmap.org/search?format=json&country=" + country + "&street="+ street+"&city="+ city,
				callback
			);
		},

		setView: function(lat, lon, marker) {
			this.leafletMap.setView([lat, lon], this.zoom);

			if(marker) {
				this.setMarker(lat, lon);
			}
		},

		setMarker: function(markerDef) {
			var marker = L.marker( [markerDef.lat, markerDef.lon] );
			//var marker = L.marker( [48.85293755, 2.35005223818182] );
			marker.addTo(this.leafletMap);
			
			marker.bindPopup(
				markerDef.content,
				{
					closeButton: false
				}
			);

			if(markerDef.icon) {
				marker.setIcon(Icons[markerDef.icon]);
			}
		},

		removeMap: function() {
			this.leafletMap.closePopup();
			this.leafletMap.removeLayer(this.layer);
			delete this.leafletMap;
		},

		getNewPlaces: function() {
			Backbone.trigger('alert-top', new Alert({ id: 'mapnewmarkers', status: 'progress', msg: 'Getting new Places...'}));
			var setMarker = this.setMarker.bind(this);
			var query = 'bar+pub';
			var limit = 10;
			var viewbox = this.leafletMap.getBounds()._southWest.lng + ',' +
							this.leafletMap.getBounds()._southWest.lat + ',' +
							this.leafletMap.getBounds()._northEast.lng + ',' +
							this.leafletMap.getBounds()._northEast.lat + ',';

			$.getJSON('http://nominatim.openstreetmap.org/search?q='+query+
						'&bounded=1&format=json&limit='+limit+'&viewbox='+viewbox, function(result) {
				$.ajax({
					type: 'POST',
					url: '/places/new',
					data: {
						placeList: result
					},
					success: function(data, status, jqXHR) { 
						data.forEach(function(place) {
							console.log(place);
							var placeProfileLink = $('<a href="#" class="map-popup-link" data-place-id="' + place._id + '">' + place.name + '</a>').click(function(e){
								Backbone.trigger('map:popup-click', $(e.target).data('placeId'));
							})[0];

							setMarker({lat: place.lat, lon: place.lon, content: placeProfileLink});
						});
						Backbone.trigger('map:newplaces', data);
						Backbone.trigger('alert-top', new Alert({ id: 'mapnewmarkers', status: 'remove' }));
					},
					error: function(jqXHR, status, error) { console.log('ko'); }
				});
			});

		}

	});

	return Map;

});