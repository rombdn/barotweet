define(['jquery', 'underscore', 'backbone', 'models/pevent', 'text!templates/event-form.html'],

	function( $ , _ , Backbone , PEvent, eventFormTpl ){

		var EventFormView = Backbone.View.extend({

			initialize: function(options){
				if(!this.model) {
					this.model = new PEvent();
				}

				this.listenTo(this.model, 'invalid', this.showErrors);

				this.place = options.place;

				console.log('creating event-form for ' + this.model.get('id') + ' for place ' + this.place.get('id'));
			},

			events: {
				'change': 'checkForm',
				'click #save': 'savePlace'
			},

			tagname: 'div',
			className: 'row-fluid form-event',
			template: _.template( eventFormTpl ),

			render: function(){
				if(this.model)
					this.$el.html( this.template( _.extend(this.model.toJSON(), {parentName: this.place.get('name')} )));
				else
					this.$el.html( this.template() );
				return this;
			},

			checkForm: function(e) {
				console.log('check form');
				this.$('.control-group').removeClass('error');

				this.model.set({
					name: this.$('#name').val(),
					label: this.$('#label option:selected').val(),
					price: this.$('#price').val(),
					parentPlaceId: this.place.get('id')
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
					console.log('EventFormView.showErrors: ' + err.name + ': ' + err.message);
					this.$('#control-group-' + err.name).addClass('error');
				}, this);
			}

		});


		return EventFormView;
});