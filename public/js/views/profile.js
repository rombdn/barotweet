define(['jquery', 'underscore', 'backbone', 'views/place', 'models/pevent', 'collections/events', 'views/event', 'collections/coms', 'views/coms-list', 'models/place'],

	function( $ , _ , Backbone , PlaceView, PEvent, EventCollection, EventView, ComsCollection, ComsListView, Place){

		var ProfileView = Backbone.View.extend({

			tagname: 'div',
			className: 'profile-all',
			//template: _.template( profileAllTpl ),

			initialize: function(options){
				//map

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


				//event
				/*if(options.pevent) {
					this.eventView = new EventView({model: options.pevent});
				}
				else {*/
					this.eventView = new EventView({place: this.place});
				//}


				//this.listenTo(this.place, 'sync', this.render());

				//coms
				this.comsListView = new ComsListView({place: this.place});
				/*
				this.comsCollection = new ComsCollection();
				this.comsListView = new ComsListView({model: this.comsCollection});
				this.comsCollection.fetch({ data: {place: this.place.id} } );
				*/

				this.setListeners();
			},

			render: function(){
				this.$el.append(this.placeView.el);
				this.$el.append( this.eventView.el );
				this.$el.append( this.comsListView.el );

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


			setListeners: function() {
				this.listenTo(Backbone, 'com:click', this.eClickedCom);
			},

			eClickedCom: function(com) {
				com.destroy({wait: true});
			}

		});


		return ProfileView;
});