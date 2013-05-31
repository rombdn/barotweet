define(['jquery', 'underscore', 'backbone', 'text!templates/place.html'],

	function( $ , _ , Backbone , placeTpl, DrinkFormView ){

		var PlaceView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid profile place',
			template: _.template( placeTpl ),

			initialize: function() {
				this.listenTo(this.model, 'sync', function() { this.fetched = true; this.render(); });
			},

			render: function(){
				if(this.fetched) //this.isNew doesn't fit cause id is set
					this.$el.html( this.template( this.model.toJSON() ));
				else
					this.$el.html( 'loading place...' );

				return this;
			}

		});


		return PlaceView;
});