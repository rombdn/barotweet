define(['jquery', 'underscore', 'backbone', 'models/place', 'collections/places', 'views/profile', 'views/place-form', 'views/event-form', 'views/com-form', 'views/form', 'views/places-list'],

	function( $ , _ , Backbone , Place, PlaceCollection, ProfileView, PlaceFormView, EventFormView, ComFormView, FormView, PlaceListView ){

		var WallView = Backbone.View.extend({

			tagname: 'div',

			events: {
				'click .place': 'clickPlace'
			},


			initialize: function(){
				console.log("creating Wall View");

				this.placeCollection = new PlaceCollection();
				this.placeListView = new PlaceListView({model: this.placeCollection});

				this.placeCollection.fetch( { success: function() { console.log('!!!!!!!!!! WALL OK');}});

				this.listenTo(this.placeCollection, 'sync', this.render);
			},

			render: function(view){
				console.log('!!!!!!!!!!!!!!!! WALL RENDER !!!!!!!!!!!!');

				this.$el.append( this.placeListView.el );
				this.placeListView.render();

				return this;
			},

			clickPlace: function() {
				console.log('Place clicked');
			}
		});


		return WallView;
});