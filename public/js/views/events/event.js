define(['jquery', 'underscore', 'backbone', 'models/pevent', 'collections/events', 'text!templates/event.html', 'utils/auth'],

	function( $ , _ , Backbone , PEvent, PEventCollection, eventTpl, Auth ){

		var EventView = Backbone.View.extend({

			tagname: 'div',
			id: 'profile-event',
			className: 'alert alert-info profile-event',
			template: _.template( eventTpl ),

			events: {
				'click #btn-add-event': 'clickEvent',
				'click #btn-edit-event': 'clickEvent',
				'click #btn-vote-event': 'voteEvent'
			},

			initialize: function(options) {
				if(options.place) {
					this.pevent = new PEvent( { _parentPlaceId: options.place.get('_id') });
					this.pevent.fetch();
				}
				else {
					throw 'ERROR Event view: no model given';
				}


				this.listenTo(this.pevent, 'all', this.render);
			},

			render: function(){
				if( this.pevent.isNew() ) {
					this.$el.html( 'no event 2nite -_- <a href="#" id="btn-add-event" class="btn btn-link btn-mini">Add</a>' );
				}
				else {
					this.$el.html( this.template(this.pevent.toJSON()) );
					/*
					$('#btn-vote-event').popover({
						html: true,
						content: '<a href="#" id="vote-1"><i class="icon-heart"></i></a>'
					});*/
				}

				return this;
			},

			clickEvent: function() {
				Backbone.trigger('pevent:click', this.pevent);
			},

			voteEvent: function() {
				/*
				var hearts = this.pevent.get('hearts').number;
				var users = this.pevent.get('hearts').users;
				
				hearts += 1;
				users.push(Auth.getUserId());

				console.log(hearts);
				console.log(users);

				this.pevent.set('hearts', {number: hearts, users: users});
				this.pevent.save();
				console.log(this.pevent.get('hearts'));
				*/
				this.pevent.vote();
			}
		});


		return EventView;
});