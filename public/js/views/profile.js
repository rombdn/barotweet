define(['jquery', 'underscore', 'backbone', 
	'views/maps/map',
	'models/place', 'views/places/place', 
	'views/events/event', 
	'views/comments/coms-list'],

	function( $ , _ , Backbone , MapView, Place, PlaceView, EventView, ComsListView){


		var ProfileView = Backbone.View.extend({

			constructorName: 'ProfileView',
			tagname: 'div',
			className: 'profile-all',
			//template: _.template( profileAllTpl ),

			initialize: function(options){
				//map
				this.mapView = new MapView();

				//place
				//if only id is given
				if(options._id) {
					this.place = new Place({'_id': options._id});
					this.place.fetch();
				}
				//or if whole model is given
				else if (options.place) {
					this.place = options.place;
				}
				else {
					throw 'ERROR Profile: no place specified';
				}

				this.placeView = new PlaceView({model: this.place});

				//events
				this.eventView = new EventView({place: this.place});


				//coms
				this.comsListView = new ComsListView({place: this.place});


				//events
				this.listenTo(Backbone, 'com:click', this.destroyCom);
				//Backbone.on('com:click', this.destroyCom, this);
			},

			render: function(){
				this.$el.append(this.mapView.el);
				this.$el.append(this.placeView.el);
				this.$el.append( this.eventView.el );
				this.$el.append( this.comsListView.el );

				this.mapView.render();
				this.placeView.render();
				this.eventView.render();
				this.comsListView.render();				

				return this;
			},


			remove: function() {
				this.placeView.remove();
				this.eventView.remove();
				this.comsListView.remove();

				Backbone.View.prototype.remove.call(this);
			},


			destroyCom: function(com) {
				com.destroy({wait: true});
			}

		});

		return ProfileView;
});