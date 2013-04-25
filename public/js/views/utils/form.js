//Form base
//

define(['jquery', 'underscore', 'backbone'],

	function( $ , _ , Backbone ){

		var FormView = Backbone.View.extend({

			events: {
				'change': 'checkForm',
				'click #save': 'clickSave',
				'click #cancel': 'clickCancel',
				'click #delete': 'clickDelete'
			},

			tagname: 'div',

			initialize: function(){
				console.log('initializing FormView model ' + this.model.get('_id'));

				if( !this.inputs ) {
					this.inputs = _.reject( Object.keys(this.model.attributes), function(attr) { return attr[0] === '_'; }, this );
					
					throw 'ERROR: FormView: no inputs set';
				}

				this.listenTo(this.model, 'invalid', this.showErrors);
			},

			render: function(){
				console.log('rendering form');
				this.$el.html( this.template( this.model.toJSON() ));
				return this;
			},


			//called each time the form change
			//checkForm -> setValues -> isValid -> showErrors
			checkForm: function(e) {
				console.log('FormView: check form');

				this.$('.control-group').removeClass('error');
				this.$('.control-group').removeClass('warning');
				this.$('.control-group').removeClass('success');
				this.$('.control-group').removeClass('info');

				this.setValues();

				//set alone doesnt fire invalid event
				//and {validate: true} cause save to pass in every case...
				//so we simply use isValid instead of {validate: true} in set
				this.model.isValid();
			},

			//called by checkForm
			//this.inputs is an array of values to be set
			setValues: function() {
				this.data = {};
				var fields = _.reject(this.inputs, function(input) { return input[0] === '_'; } );

				_.each( this.inputs, function(input) {
					
					if(input[0] !== '_') {
						console.log(input+'='+$('#'+input).val());
						this.data[input] = $('#'+input).val();
					}
					else {
						this.data[input] = this.model.get(input);
					}

				}, this);

				this.model.set(this.data);
				/*
				console.log(this.model);
				console.log(this.data);
				*/
			},

			showErrors: function() {
				console.log('FormView: showErrors, number of errors: ' + this.model.validationError.length);

				//add error class to each input where an error was found
				_.each(this.model.validationError, function(err) {
					console.log('FormView.showErrors: ' + err.name + ': ' + err.message);
					
					this.$('#control-group-' + err.name).addClass('error');
				}, this);
			},

			clickSave: function(e) {
				if(e !== undefined) e.preventDefault();

				//just to be sure the values are set
				this.checkForm();

				this.model.save(this.data, {
					success: _.bind(function(model, response) {
						console.log('FORM: save ok: ' + model.toJSON());

						this.eventSaved();

					}, this),

					error: function() {
						console.log('FORM: save ko: ' + model.toJSON());
					}
				});

			},

			clickCancel: function() { 
				this.eventCanceled(); 
			},
			clickDelete: function() { 
				this.eventDeleted();
			}

		});


		return FormView;
});