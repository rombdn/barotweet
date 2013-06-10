if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module){

	var _ = require('underscore');
	var Backbone = require('backbone');
	var LeafletLS = require('../../lib/leaflet.restoreview');
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
			this.leafletMap = LeafletLS.map(htmlelement);

			this.layer = LeafletLS.tileLayer(
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
/*
		isInViewbox: function(latLng) {
			return latLng.lng >= this.leafletMap.getBounds()._southWest.lng &&
					latLng.lng <= this.leafletMap.getBounds()._northEast.lng &&
					latLng.lat >= this.leafletMap.getBounds()._southWest.lat &&
					latLng.lat <= this.leafletMap.getBounds()._northEast.lat;
		},
*/
		locFound: function(data) {
			//if(data.latlng in lastviewboxstoredinlocalstorage) {
			//	getTilesFromlocalStorage
			//}
			//else {
				this.setView(data.latlng.lat, data.latlng.lng);
			//}
			this.setMarker({
				lat: data.latlng.lat, 
				lon: data.latlng.lng, 
				icon: 'user', 
				content: "It's you!"});
			Backbone.trigger('map:located', data);
		},

		locError: function(data) {
			console.log(data);
			this.gotoPosition([48.85293755, 2.35005223818182]);
			Backbone.trigger('map:locatefail', data);
		},

		gotoPosition: function(position) {
			this.leafletMap.setView(position[0], position[1], this.zoom);
		},

		setMarker: function(markerDef) {
			var marker = LeafletLS.marker( [markerDef.lat, markerDef.lon] );
			//var marker = LeafletLS.marker( [48.85293755, 2.35005223818182] );
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