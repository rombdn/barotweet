define([ 'jquery', 'underscore', 'backbone', 'collections/coms', 'views/com' ], function( $ , _ , Backbone , Books , BookView ){

	var ComsListView = Backbone.View.extend({

		initialize: function(){		
			this.views = [];
			this.populateViews();
		},

		populateViews: function(){

			//attaached views allready present
			if(this.views.length > 0) {
				_.each(this.views, function(view){
					view.remove();
				}, this);

				//avoid memory leaks
				this.views.length = 0;
			}

			_.each(this.model.models, function(model){
				this.views.push( new ComView({model: model}) );
			}, this);

		},

		render: function(){

			_.each(this.views, function(view){
				this.$el.append( view.el );
				view.render();
			}, this);

		}

	});

	return ComsListView;
});