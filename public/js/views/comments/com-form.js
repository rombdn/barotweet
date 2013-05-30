define(['jquery', 'underscore', 'backbone', 'views/utils/form', 'models/com', 'text!templates/com-form.html'],

	function( $ , _ , Backbone , FormView, Com, Tpl ){

		var ComFormView = FormView.extend({

			className: 'row-fluid form-event',
			template: _.template( Tpl ),


			inputs: [ 'text', '_parentPlaceId', '_userId' ],

			customEvents: {
				save: 'form:com-save',
				remove: 'form:com-remove',
				cancel: 'form:com-cancel'
			}
/*

			eventSaved: function() {
				Backbone.trigger('com:save', this.model, this.model.get('_parentPlaceId'));
			},

			eventCanceled: function() {
				Backbone.trigger('com:cancel', this.model, this.model.get('_parentPlaceId'));
			}
*/
		});


		return ComFormView;
});