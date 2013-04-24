define(['jquery', 'underscore', 'backbone', 'views/places/places-list'],

	function( $ , _ , Backbone , PlaceListView ){

		var WallView = Backbone.View.extend({

			tagname: 'div',
			className: 'wall',


			initialize: function(){
				console.log("creating Wall View");

				this.placeListView = new PlaceListView();
			},

			render: function(view){

				this.$el.append( this.placeListView.el );
				this.placeListView.render();

				return this;
			}
		});


		return WallView;
});