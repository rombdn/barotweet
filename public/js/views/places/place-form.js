define(['jquery', 'underscore', 'backbone', 'views/utils/form', 'text!templates/place-form.html', 'models/map'],

	function( $ , _ , Backbone , FormView, placeFormTpl, Map){

		var PlaceFormView = FormView.extend({

			className: 'row-fluid form-place',
			template: _.template( placeFormTpl ),

			inputs: [ 'name', 'open', 'close', 'beerPrice', 'cocktailPrice', 'address', 'lat', 'lon'],

			events: _.extend(FormView.prototype.events, {
				'click #locate-user': 'useUserLocation',
				'change #address': 'geoCode'
			}),


			initialize: function() {
				this.map = new Map();
				FormView.prototype.initialize.call(this);
			},

			checkForm: function(e) {
				if(e) {
					if(e.target.id !== "address")
						FormView.prototype.checkForm.call(this);
				}
				else
					FormView.prototype.checkForm.call(this);
			},

			useUserLocation: function() {
				navigator.geolocation.getCurrentPosition(
					_.bind(this.positionFound, this),
					_.bind(this.positionFail, this),
					{ timeout: 2000 }
				);
			},

			positionFound: function(position) {
				console.log('position found');
				$('#lat').val(position.coords.latitude);
				$('#lon').val(position.coords.longitude);
				$('#control-group-position').addClass('success');
				console.log(position);
			},

			positionFail: function(error) {
				console.log('position fail');
				console.log(error);
				$('#control-group-position').addClass('warning');
			},

			geoCode: function() {
				this.map.geoCode($('#address').val(),
					_.bind(function(data) {
						$('#lat').val(data[0].lat);
						$('#lon').val(data[0].lon);
						$('#control-group-position').addClass('success');
					}, this),
					function() { console.log('Error: geocode failed'); }
				);
			},

			eventSaved: function() {
				Backbone.trigger('place:save', this.model, this.model.get('_id'));
			},

			eventCanceled: function() {
				Backbone.trigger('place:cancel', this.model, this.model.get('_id'));
			}
		});


		return PlaceFormView;
});