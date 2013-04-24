define(['jquery', 'underscore', 'backbone', 'leaflet', 'models/map', 'text!templates/map.html' ],

	function( $ , _ , Backbone , Leaflet, Map, Tpl){

		var MapView = Backbone.View.extend({

			className: 'row-fluid',
			template: _.template(Tpl),

			events: {
				'click': 'setView'
			},

			initialize: function(options) {
			},

			setView: function() {
				this.map.setView([48.837, 2.396], 13);
			},

			render: function(){
				this.$el.html( this.template() );

				this.map = L.map('map').setView([52, -0.09], 13);

				this.layer = L.tileLayer(
					'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
					{
						attribution: '&copy; OpenStreetMap'
					}
				);

				this.map.addLayer(this.layer);

				return this;
			}
		});


		return MapView;
});