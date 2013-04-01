define(['jquery', 'underscore', 'backbone', 'text!templates/booktemplate.html'],

	function( $ , _ , Backbone , bookTemplate ){

		var BookView = Backbone.View.extend({

			tagname: 'div',
			className: 'bookContainer',
			template: _.template( bookTemplate ),

			render: function(){

				this.$el.html( this.template( this.model.toJSON() ));

				return this;
			}

		});


		return BookView;
});