if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var Leaflet = require('leaflet');
	//var UserCollection = require('collections/users');

	var Map = Backbone.Model.extend({

		idAttribute: '_id',
		
		defaults: {
		},


		initialize: function() {

		},

		setLeafletMap: function(leafletMap) {
			this.leafletMap = leafletMap;

			this.layer = L.tileLayer(
				'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
				{
					attribution: '&copy; OpenStreetMap'
				}
			);

			this.leafletMap.addLayer(this.layer);
		},

		locate: function() {
			this.leafletMap.locate({setView: true, maxZoom: 14});
		},

		gotoAddress: function(address) {
			//TODO: check if address already geocoded
			if(true) {
				this.setView(48.8371922, 2.3915462);
			}
			else {
				this.geoCode(address, _.bind(function(data) {
					this.setView(data[0].lat, data[0].lon);
				}, this));
			}
		},

		gotoPosition: function(position) {
			this.setView(position[0], position[1]);
		},

		geoCode: function(address, callback) {
			var country = 'fr',
				street = address,
				city = 'Paris';

			$.getJSON("http://nominatim.openstreetmap.org/search?format=json&country=" + country + "&street="+ street+"&city="+ city, 
				callback
			);
		},

		setView: function(lat, lon) {
			this.leafletMap.setView([lat, lon], 15);
			L.marker( [lat, lon] ).addTo(this.leafletMap);
		},

		removeMap: function() {
			this.leafletMap.closePopup();
			this.leafletMap.removeLayer(this.layer);
			delete this.leafletMap;
		}

	});

	return Map;

});