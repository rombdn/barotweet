define([ 'jquery', 'underscore', 'backbone', 'views/place' ], 

	function( $ , _ , Backbone , ElementView){

	var ListView = Backbone.View.extend({

		tagName: "div",

		initialize: function(options){		
			this.views = [];
			this.listenTo(this.model, 'sync', this.populateViews);
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

			_.each(this.model.models, function(model){
				console.log(model);
				this.views.push( new ElementView({model: model}) );
			}, this);

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