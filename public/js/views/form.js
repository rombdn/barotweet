define(['jquery', 'underscore', 'backbone'],

	function( $ , _ , Backbone ){

		var FormView = Backbone.View.extend({

			events: {
				'change': 'checkForm',
				'click #save': 'savePlace'
			},

			tagname: 'div',

			initialize: function(){
				console.log('initializing FormView model ' + this.model.get('name'));
				this.listenTo(this.model, 'invalid', this.showErrors);
			},

			checkForm: function(e) {
				console.log('FormView: check form');

				this.$('.control-group').removeClass('error');

				//!MUST BE DEFINED
				this.setValues();
				console.log('values setted, ' + this.model.get('beerPrice'));

				//set alone doesnt fire invalid event
				//and {validate: true} cause save to pass in every case...
				//so we simply use isValid instead of {validate: true} in set
				this.model.isValid();
			},

			savePlace: function(e) {
				console.log('FormView: button save');
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
				console.log('FormView: showErrors');
				_.each(this.model.validationError, function(err) {
					console.log('FormView.showErrors: ' + err.name + ': ' + err.message);
					this.$('#control-group-' + err.name).addClass('error');
				}, this);
			}

		});


		return FormView;
});