define([ 'jquery', 'underscore', 'backbone', 'collections/coms', 'views/comments/com', 'models/com', 'text!templates/coms-list.html' ], 

	function( $ , _ , Backbone , ComsCollection , ComView, Com, ComListTpl ){

	var ComsListView = Backbone.View.extend({

		tagName: "div",
		template: _.template(ComListTpl),

		events: {
			'click #comment-add': 'clickAdd'
		},

		initialize: function(options) {
			this.views = [];
			
			this.place = options.place;

			this.comsCollection = new ComsCollection();
			this.comsCollection.fetch({ data: { _parentPlaceId: this.place.get('_id') } });

			this.listenTo(this.comsCollection, 'sync', this.populateViews);
			this.listenTo(this.comsCollection, 'add', this.populateViews);
			this.listenTo(this.comsCollection, 'remove', this.populateViews);
		},

		populateViews: function(e){
			//attached views allready present
			if(this.views.length > 0) {
				_.each(this.views, function(view){
					view.remove();
				}, this);

				//avoid memory leaks
				this.views.length = 0;
			}

			_.each(this.comsCollection.models, function(model){
				this.views.push( new ComView({model: model}) );
			}, this);

			this.render();

		},

		render: function(){

			this.$el.html( this.template( { parentName: this.place.get('name') }) );

			_.each(this.views, function(view){
				this.$el.append( view.el );
				view.render();
			}, this);

		},

		clickAdd: function() {
			var com = new Com( { _parentPlaceId: this.place.get('_id') });
			this.comsCollection.add(com);

			Backbone.trigger('coms:add', com);
		}

	});

	return ComsListView;
});