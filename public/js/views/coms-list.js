define([ 'jquery', 'underscore', 'backbone', 'collections/coms', 'views/com', 'text!templates/coms-list.html' ], 

	function( $ , _ , Backbone , ComsCollection , ComView, ComListTpl ){

	var ComsListView = Backbone.View.extend({

		tagName: "div",
		template: _.template(ComListTpl),

		initialize: function(options){		
			this.views = [];
			this.populateViews();
			this.place = options.place;
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
				this.views.push( new ComView({model: model}) );
			}, this);

		},

		render: function(){

		this.$el.append( this.template( { parentName: this.place.get('name') }) );

		_.each(this.views, function(view){
			this.$el.append( view.el );
			view.render();
		}, this);

		}

	});

	return ComsListView;
});