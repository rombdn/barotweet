define(['jquery', 'underscore', 'backbone', 'text!templates/place.html'],

	function( $ , _ , Backbone , placeTpl ){

		var PlaceView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid profile place',
			template: _.template( placeTpl ),

			render: function(){

				this.$el.html( this.template( this.model.toJSON() ));

				return this;
			}

		});


		return PlaceView;
});