//Form base
//

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

				if( !this.inputs ) {
					throw 'FormView: no inputs set';
				}

				this.listenTo(this.model, 'invalid', this.showErrors);
			},

			render: function(){
				this.$el.html( this.template( this.model.toJSON() ));
				return this;
			},


			//called each time the form change
			//checkForm -> setValues -> isValid -> showErrors
			checkForm: function(e) {
				console.log('FormView: check form');

				this.$('.control-group').removeClass('error');

				this.setValues();

				//set alone doesnt fire invalid event
				//and {validate: true} cause save to pass in every case...
				//so we simply use isValid instead of {validate: true} in set
				this.model.isValid();
			},

			//called by checkForm
			//this.inputs is an array of values to be set
			setValues: function() {
				var data = {};

				_.each( this.inputs, function(input) {
					console.log(input+'='+$('#'+input).val());

					data[input] = $('#'+input).val();

				}, this);

				this.model.set(data);
			},

			showErrors: function() {
				console.log('FormView: showErrors, number of errors: ' + this.model.validationError.length);

				//add error class to each input where an error was found
				_.each(this.model.validationError, function(err) {
					console.log('FormView.showErrors: ' + err.name + ': ' + err.message);
					
					this.$('#control-group-' + err.name).addClass('error');
				}, this);
			},

			savePlace: function(e) {
				console.log('FormView: button save');

				if(e !== undefined) e.preventDefault();

				//just to be sure the values are set
				this.checkForm();

				//trigger event after save
				this.model.save({}, {
					success: _.bind(function(model, response) {
						console.log(model.attributes + ': save ok');
						this.trigger('eSaved');
					}, this),

					error: function() {
						console.log(model.attributes + ': save error');
					}
				});
			}

		});


		return FormView;
});