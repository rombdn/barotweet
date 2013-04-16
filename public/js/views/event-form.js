define(['jquery', 'underscore', 'backbone', 'views/form', 'models/pevent', 'text!templates/event-form.html'],

	function( $ , _ , Backbone , FormView, PEvent, eventFormTpl ){

		var EventFormView = FormView.extend({

			className: 'row-fluid form-event',
			template: _.template( eventFormTpl ),


			initialize: function(options){
				if(!this.model) {
					this.model = new PEvent();
				}

				this.place = options.place;

				console.log('creating event-form for ' + this.model.get('id') + ' for place ' + this.place.get('id'));

				//initialize() redeclaration overrided this from FormView
				this.listenTo(this.model, 'invalid', this.showErrors);
			},

			render: function(){
				if(this.model)
					this.$el.html( this.template( _.extend(this.model.toJSON(), {parentName: this.place.get('name')} )));
				else
					this.$el.html( this.template() );
				return this;
			},

			setValues: function(e) {
				this.model.set({
					name: this.$('#name').val(),
					label: this.$('#label option:selected').val(),
					price: this.$('#price').val(),
					parentPlaceId: this.place.get('id')
				});
			}
		});


		return EventFormView;
});