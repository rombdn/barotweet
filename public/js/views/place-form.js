define(['jquery', 'underscore', 'backbone', 'text!templates/place-form.html'],

	function( $ , _ , Backbone , placeFormTpl ){

		var PlaceFormView = Backbone.View.extend({

			initialize: function(){
				this.listenTo(this.model, 'invalid', this.showErrors);
			},

			events: {
				'change': 'checkForm',
				'click #save': 'savePlace'
			},

			tagname: 'div',
			className: 'row-fluid form-place',
			template: _.template( placeFormTpl ),

			render: function(){
				this.$el.html( this.template( this.model.toJSON() ));
				return this;
			},

			checkForm: function(e) {
				console.log('check form');
				this.$('.control-group').removeClass('error');

				this.model.set({
					name: this.$('#name').val(),
					open: this.$('#open option:selected').val(),
					close: this.$('#close option:selected').val(),
					beerPrice: this.$('#beer').val(),
					cocktailPrice: this.$('#cocktail').val()
				});

				//set alone doesnt fire invalid event
				//and {validate: true} cause save to pass in every case...
				//so we simply use isValid instead of {validate: true} in set
				this.model.isValid();
			},

			savePlace: function(e) {
				console.log('button save');
				if(e !== undefined) e.preventDefault();

				this.checkForm();
				this.model.save({}, {
					success: _.bind(function(model, response) {
						console.log(model.attributes.name + ': save ok');
						this.trigger('eSaved');
					}, this),

					error: function() {
						console.log(model.attributes.name + ': save error');
					}
				});
			},


			showErrors: function() {
				_.each(this.model.validationError, function(err) {
					console.log('PlaceFormView.showErrors: ' + err.name + ': ' + err.message);
					this.$('#control-group-' + err.name).addClass('error');
				}, this);
			}

		});


		return PlaceFormView;
});