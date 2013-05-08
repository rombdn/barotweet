define(['jquery', 'underscore', 'backbone', 'views/utils/form', 'text!templates/place-drink-form.html'],

	function( $ , _ , Backbone , FormView, Tpl){

		var PlaceFormView = FormView.extend({

			className: 'row-fluid',
			template: _.template( Tpl ),

			inputs: [ 'beerPrice', 'cocktailPrice' ],

			eventSaved: function() {
				Backbone.trigger('place:drinksave');
			}
		});


		return PlaceFormView;
});