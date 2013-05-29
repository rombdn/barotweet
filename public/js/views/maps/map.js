define(['jquery', 'underscore', 'backbone', 'leaflet', 'models/map', 'text!templates/map.html' ],

	function( $ , _ , Backbone , Leaflet, Map, Tpl){

		var MapView = Backbone.View.extend({

			className: 'row-fluid map-container',
			template: _.template(Tpl),


			initialize: function(options) {
				this.map = new Map();
				
				/*
				if(options) {
					if(options.position) this.position = options.position;
					if(options.address) this.address = options.address;
				}
				*/

				this.listenTo(Backbone, 'menu:locate', _.bind(this.map.locate, this.map));

				//map events
				//used to display infos
				this.listenTo(Backbone, 'map:loading', function() { console.log('***MAP:LOADING'); });
				this.listenTo(Backbone, 'map:loaded', function() { console.log('***MAP:LOADED'); });
				this.listenTo(Backbone, 'map:locating', function() { console.log('***MAP:LOCATING'); });
				this.listenTo(Backbone, 'map:located', function() { console.log('***MAP:LOCATED'); });
				this.listenTo(Backbone, 'map:locatefail', this.showErrorLoc);

				//_.bind(this.setMarkers, this);
			},


			/*
			setPosition: function(position) {
				this.position = position;
			},
			*/
/*
			locateUser: function() {
				this.map.locate();
			},
			*/
/*
			setMarkers: function(coords) {
				this.markers = coords;

				if(this.rendered) {
					this._setMarkers();
				}
			},

			_setMarkers: function() {
				if(this.markers) {
					for(var i = 0; i<this.markers.length; i++) {
						console.log(this.markers[i]);
						this.map.setMarker(this.markers[i].lat, this.markers[i].lon, 'user', this.markers[i].infos);
					}
				}
			},
*/
			render: function(){
				this.$el.html( this.template() );

				//leaflet map must have a rendered map div
				//to be initialized
				//so we do it in render...
				this.map.setLeafletMap('map');

				//render a position, an address or user location
				/*
				if(this.position) {
					this.map.gotoPosition(this.position);
				}
				else if(this.address){
					this.map.gotoAddress(this.address);
				}
				else {
					this.position = [48.85293755, 2.35005223818182];
					this.map.gotoPosition(this.position);
				}
				*/

				this.map.gotoPosition([48.85293755, 2.35005223818182]);

				//this._setMarkers();

				//this.rendered = true;

				return this;
			},

			showErrorLoc: function() {
				$('#map-info').hide();
				$('#map-info-text').html('<strong>Erreur :</strong> localisation impossible');
				$('#map-info').show();
			},

			hideInfo: function() {
				console.log('loaded');
				$('#map-info').hide();
			},

			remove: function() {
				//a DOM element is attached to 'this.map' 
				//so we need to manually remove it to avoid memory leaks
				this.map.removeMap();
				Backbone.View.prototype.remove.call(this);
			}
		});


		return MapView;
});