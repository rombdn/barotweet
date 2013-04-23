define(['jquery', 'underscore', 'backbone', 'views/form', 'models/com', 'text!templates/com-form.html'],

	function( $ , _ , Backbone , FormView, Com, Tpl ){

		var ComFormView = FormView.extend({

			className: 'row-fluid form-event',
			template: _.template( Tpl ),


			inputs: [ 'text', '_parentPlaceId' ],

			eventSaved: function() {
				Backbone.trigger('com:save', this.model);
			}
		});


		return ComFormView;
});