define(['jquery', 'underscore', 'backbone', 'views/place'],

	function( $ , _ , Backbone , PlaceView ){

		var ProfileView = Backbone.View.extend({

			tagname: 'div',
			className: 'profile-all',
			//template: _.template( profileAllTpl ),

			events: {
				"click #place": 'editPlace'
			},

			initialize: function(options){
				console.log("creating ProfileView with place: " + options.place.get("name"));

				var tplace = options.place;
				//var tevent = new Event({place: tplace});
				//var tcoms = new ComCollection({place: tplace});
				//var tmap = new Map({place: tplace});

				this.placeView = new PlaceView({model: tplace});
				//this.eventView = new EventView({place: tplace});
				//this.comsView = new ComsView({place: tplace});
				//this.mapView = new MapView({place: tplace});
			},

			render: function(){
				//this.mapView.render();
				this.placeView.render();
				//this.eventView.render();
				//this.mapView.render();

				this.$el.append(this.placeView.el);

				return this;
			},


			editPlace: function() {
				//console.log('Triggering eEditPlace');
				this.trigger('eEditPlace');
			}


		});


		return ProfileView;
});