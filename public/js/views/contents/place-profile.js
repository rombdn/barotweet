define(['jquery', 'underscore', 'backbone', 
	'views/maps/map',
	'models/place', 'views/places/place', 
	'views/comments/coms-list'],

	function( $ , _ , Backbone , MapView, Place, PlaceView, ComsListView){


		var ProfileView = Backbone.View.extend({

			constructorName: 'ProfileView',
			tagname: 'div',
			className: '',

			initialize: function(){
				if(!this.model) throw "No place for profile";
				
				this.placeView = new PlaceView({model: this.model});
				this.comsListView = new ComsListView({place: this.model});
			},

			render: function(){
				this.$el.append(this.placeView.el);
				this.$el.append( this.comsListView.el );

				this.placeView.render();
				this.comsListView.render();

				return this;
			},


			remove: function() {
				this.placeView.remove();
				this.comsListView.remove();

				Backbone.View.prototype.remove.call(this);
			}
		});

		return ProfileView;
});