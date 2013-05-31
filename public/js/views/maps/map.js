define(['jquery', 'underscore', 'backbone', 'leaflet', 'models/map', 'text!templates/map.html', 'models/alert' ],

	function( $ , _ , Backbone , Leaflet, Map, Tpl, Alert){

		var MapView = Backbone.View.extend({

			className: 'row-fluid map-container',
			template: _.template(Tpl),
			//alertTpl : _.template(AlertTpl),


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
				this.listenTo(Backbone, 'map:locating', function() { Backbone.trigger('alert', new Alert({ id: 'maploc', status: 'info', msg: 'Locating...'}) );/*this.alertView.showInfo('Locating...', 'info');*/ });
				this.listenTo(Backbone, 'map:located', function() { Backbone.trigger('alert', new Alert({ id: 'maploc', status: 'remove' })); });
				this.listenTo(Backbone, 'map:locatefail', function() { Backbone.trigger('alert', new Alert({ id: 'maploc', status: 'error', msg: 'Location failed'}) ); /*this.alertView.showInfo('Locating failed', 'error');*/ });

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
				this.$el.append( this.template() );

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

			remove: function() {
				//a DOM element is attached to 'this.map' 
				//so we need to manually remove it to avoid memory leaks
				this.map.removeMap();
				Backbone.View.prototype.remove.call(this);
			}
		});


		return MapView;
});