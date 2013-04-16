define(['jquery', 'underscore', 'backbone', 'views/form', 'models/com', 'text!templates/com-form.html'],

	function( $ , _ , Backbone , FormView, Com, Tpl ){

		var ComFormView = FormView.extend({

			className: 'row-fluid form-event',
			template: _.template( Tpl ),


			initialize: function(options){
				this.place = options.place;

				console.log('creating com-form for place ' + this.place.get('name'));

				//initialize() redeclaration overrided this from FormView
				this.listenTo(this.model, 'invalid', this.showErrors);
			},

			render: function(){
				this.$el.html( this.template( { parentName: this.place.get('name') } ) );

				return this;
			},

			setValues: function(e) {
				this.model.set({
					text: this.$('#text').val(),
					parentPlaceId: this.place.get('id')
				});
			}
		});


		return ComFormView;
});