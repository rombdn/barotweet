define([ 'jquery', 'underscore', 'backbone', 'collections/places', 'views/places/place' ], 

	function( $ , _ , Backbone , PlaceCollection, ElementView){

	var ListView = Backbone.View.extend({

		tagName: "div",
		className: 'place-list',

		initialize: function(options){
			this.views = [];

			this.placeCollection = new PlaceCollection();
			this.placeCollection.fetch();

			this.listenTo(this.placeCollection, 'all', this.populateViews);
		},

		populateViews: function(){

			//attached views allready present
			if(this.views.length > 0) {
				_.each(this.views, function(view){
					view.remove();
				}, this);

				//avoid memory leaks
				this.views.length = 0;
			}

			_.each(this.placeCollection.models, function(model){
				this.views.push( new ElementView({model: model}) );
			}, this);

			this.render();
		},

		render: function(){
			_.each(this.views, function(view){
				this.$el.append( view.el );
				view.render();
			}, this);

		}

	});

	return ListView;
});