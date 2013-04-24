define(['jquery', 'underscore', 'backbone', 'views/utils/form', 'models/pevent', 'text!templates/event-form.html'],

	function( $ , _ , Backbone , FormView, PEvent, eventFormTpl ){

		var EventFormView = FormView.extend({

			className: 'row-fluid form-event',
			template: _.template( eventFormTpl ),
			
			inputs: [ 'name', 'label', 'price', '_parentPlaceId' ],

			eventSaved: function() {
				Backbone.trigger('pevent:save', this.model, this.model.get('_parentPlaceId'));
			},

			eventCanceled: function() {
				Backbone.trigger('pevent:cancel', this.model, this.model.get('_parentPlaceId'));
			},

			eventDeleted: function() {
				var placeId = this.model.get('_parentPlaceId');
				this.model.destroy();

				Backbone.trigger('pevent:delete', undefined, placeId);
			}

		});


		return EventFormView;
});