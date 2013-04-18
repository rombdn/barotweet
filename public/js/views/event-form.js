define(['jquery', 'underscore', 'backbone', 'views/form', 'models/pevent', 'text!templates/event-form.html'],

	function( $ , _ , Backbone , FormView, PEvent, eventFormTpl ){

		var EventFormView = FormView.extend({

			className: 'row-fluid form-event',
			template: _.template( eventFormTpl ),
			
			inputs: [ 'name', 'label', 'price' ]

		});


		return EventFormView;
});