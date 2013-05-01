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
			this.zoom = 13;
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
			this.setMarkerUser(data.latlng.lat, data.latlng.lng);
			Backbone.trigger('map:located', data);
		},

		locError: function(data) {
			console.log(data);
			Backbone.trigger('map:locatefail', data);
		},

		gotoAddress: function(address) {
			//TODO: check if address already geocoded
			this.geoCode(address, _.bind(function(data) {
				this.setView(data[0].lat, data[0].lon, true);
			}, this));
		},

		gotoPosition: function(position) {
			this.setView(position[0], position[1], true);
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
			console.log('setView: ' + lat + ', ' + lon);
			this.leafletMap.setView([lat, lon], this.zoom);

			if(marker) {
				this.setMarker(lat, lon);
			}
		},

		setMarker: function(lat, lon, icon) {
			if(icon)
				L.marker( [lat, lon], {icon: Icons[icon]} ).addTo(this.leafletMap);
			else
				L.marker( [lat, lon] ).addTo(this.leafletMap);
		},

		setMarkerUser: function(lat, lon) {
			this.setMarker(lat, lon, 'user');
		},

		removeMap: function() {
			this.leafletMap.closePopup();
			this.leafletMap.removeLayer(this.layer);
			delete this.leafletMap;
		}

	});

	return Map;

});