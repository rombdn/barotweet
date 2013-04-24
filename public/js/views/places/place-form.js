define(['jquery', 'underscore', 'backbone', 'views/utils/form', 'text!templates/place-form.html'],

	function( $ , _ , Backbone , FormView, placeFormTpl ){

		var PlaceFormView = FormView.extend({

			className: 'row-fluid form-place',
			template: _.template( placeFormTpl ),

			inputs: [ 'name', 'open', 'close', 'beerPrice', 'cocktailPrice' ],

			eventSaved: function() {
				Backbone.trigger('place:save', this.model, this.model.get('_id'));
			},

			eventCanceled: function() {
				Backbone.trigger('pevent:cancel', this.model, this.model.get('_id'));
			}
		});


		return PlaceFormView;
});