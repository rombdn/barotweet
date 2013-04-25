define(['jquery', 'underscore', 'backbone', 'leaflet', 'models/map', 'text!templates/map.html' ],

	function( $ , _ , Backbone , Leaflet, Map, Tpl){

		var MapView = Backbone.View.extend({

			className: 'row-fluid',
			template: _.template(Tpl),

			events: {
				'click': 'clickMap'
			},

			initialize: function(options) {
				this.map = new Map();
				
				if(options) {
					if(options.position) this.position = options.position;
					if(options.address) this.address = options.address;
				}

				this.listenTo(Backbone, 'menu:locate', this.locate);
			},

			setPosition: function(position) {
				this.position = position;
			},

			clickMap: function() {
				console.log('map clicked');
			},


			locate: function() {
				this.map.locate();
			},

			render: function(){
				console.log('render map');
				this.$el.html( this.template() );
				this.leafletMap = L.map('map');

				this.map.setLeafletMap(this.leafletMap);

				if(this.position) {
					this.map.gotoPosition(this.position);
				}
				else if(this.address){
					this.map.gotoAddress(this.address);
				}

				return this;
			},

			remove: function() {
				this.map.removeMap();
				Backbone.View.prototype.remove.call(this);
			}
/*
			hideMap: function() {
				console.log('hide map');
				this.$el.children('#map').hide();
				this.$el.append('<div id="map-load">Loading...</div>');
			},

			showMap: function() {
				console.log('show map');
				this.$el.children('#map-load').remove();
				this.$el.children('#map').show();
				this.leafletMap.invalidateSize();
			}
*/
		});


		return MapView;
});