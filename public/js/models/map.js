if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var Leaflet = require('leaflet');
	var Icons = require('utils/map-markers');

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
				'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
				{
					attribution: '&copy; OpenStreetMap'
				}
			);

			this.leafletMap.addLayer(this.layer);

			//events
			this.leafletMap.on('locationfound', this.locFound, this);
			this.leafletMap.on('locationerror', this.locError, this);
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
				content: "it's me!"});
			Backbone.trigger('map:located', data);
		},

		locError: function(data) {
			console.log(data);
			//this.gotoPosition([48.85293755, 2.35005223818182]);
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
			var marker = L.marker( /*[markerDef.lat, markerDef.lon]*/ [48.85293755, 2.35005223818182] );

			if(markerDef.icon) marker.setIcon(Icons[markerDef.icon]);

			if(markerDef.content) {
				marker.bindPopup(markerDef.content, {
					closeButton: false,
					zoomAnimation: false
				});
			}

			marker.addTo(this.leafletMap);
		},

		removeMap: function() {
			this.leafletMap.closePopup();
			this.leafletMap.removeLayer(this.layer);
			delete this.leafletMap;
		}

	});

	return Map;

});