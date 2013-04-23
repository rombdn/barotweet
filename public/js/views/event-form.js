define(['jquery', 'underscore', 'backbone', 'views/form', 'models/pevent', 'text!templates/event-form.html'],

	function( $ , _ , Backbone , FormView, PEvent, eventFormTpl ){

		var EventFormView = FormView.extend({

			className: 'row-fluid form-event',
			template: _.template( eventFormTpl ),
			
			inputs: [ 'name', 'label', 'price', '_parentPlaceId' ],

			eventSaved: function() {
				Backbone.trigger('pevent:save', this.model);
			},

			clickCancel: function() {
				Backbone.trigger('pevent:cancel', this.model);
			},

			clickDelete: function() {
				Backbone.trigger('pevent:delete', this.model);
			}

		});


		return EventFormView;
});