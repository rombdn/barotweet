define(['jquery', 'underscore', 'backbone', 'views/form', 'text!templates/place-form.html'],

	function( $ , _ , Backbone , FormView, placeFormTpl ){

		var PlaceFormView = FormView.extend({

			className: 'row-fluid form-place',
			template: _.template( placeFormTpl ),

			render: function(){
				this.$el.html( this.template( this.model.toJSON() ));
				return this;
			},

			setValues: function(e) {
				this.model.set({
					name: this.$('#name').val(),
					open: this.$('#open option:selected').val(),
					close: this.$('#close option:selected').val(),
					beerPrice: this.$('#beer').val(),
					cocktailPrice: this.$('#cocktail').val()
				});
			}
		});


		return PlaceFormView;
});