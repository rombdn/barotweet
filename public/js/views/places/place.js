define(['jquery', 'underscore', 'backbone', 'text!templates/place.html'],

	function( $ , _ , Backbone , placeTpl ){

		var PlaceView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid profile place',
			template: _.template( placeTpl ),

			events: {
				'click .place-info': 'clickPlace',
				'click #btn-edit-place': 'editPlace'
			},

			initialize: function() {
				this.listenTo(this.model, 'all', this.render);
			},

			clickPlace: function() {
				Backbone.trigger('place:click', this.model, this.model.get('_id'));
			},


			editPlace: function() {
				Backbone.trigger('place:edit', this.model, this.model.get('_id'));
			},

			render: function(){
				this.$el.html( this.template( this.model.toJSON() ));
				return this;
			}

		});


		return PlaceView;
});