define(['jquery', 'underscore', 'backbone', 'text!templates/place.html'],

	function( $ , _ , Backbone , placeTpl ){

		var PlaceView = Backbone.View.extend({

			tagname: 'div',
			id: 'place',
			className: 'row-fluid profile',
			template: _.template( placeTpl ),

			render: function(){

				this.$el.html( this.template( this.model.toJSON() ));

				return this;
			}

		});


		return PlaceView;
});