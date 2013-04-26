define([ 'jquery', 'underscore', 'backbone', 'models/place', 'collections/places', 'views/places/place', 'text!templates/place-list.html' ], 

	function( $ , _ , Backbone , Place, PlaceCollection, ElementView, Tpl){

	var ListView = Backbone.View.extend({

		tagName: "div",
		className: 'place-list',
		template: _.template( Tpl ),

		events: {
			'click #button-add-place': 'clickAdd'
		},

		initialize: function(options){
			this.views = [];
			this.callbacks = [];
			this._fetched = false;

			if(!this.model) {
				this.placeCollection = new PlaceCollection();
				this.placeCollection.fetch();
			}
			else {
				this.placeCollection = this.model;
			}

			this.listenTo(this.placeCollection, 'all', this.populateViews);
			this.listenTo(this.placeCollection, 'sync', this.doCallbacks);
		},

		getCollectionCoords: function(callback) {
			if(this._fetched) {
				this._getCollectionCoords();
			}
			else {
				this.callbacks.push([this._getCollectionCoords, callback]);
			}
		},

		_getCollectionCoords: function(callback) {
			var coords = this.placeCollection.models.map(function(model) {
				return [model.get('lat'), model.get('lon')];
			});

			callback(coords);
		},

		doCallbacks: function() {
			for(var i = 0; i<this.callbacks.length; i++) {
				var func = this.callbacks[i][0];
				var args = this.callbacks[i][1];

				func.call(this, args);
			}

			this.callbacks.length = 0;

			this._fetched = true;
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
			this.$el.html('');

			_.each(this.views, function(view){
				this.$el.append( view.el );
				view.render();
			}, this);

			this.$el.append(this.template());
		},

		clickAdd: function() {
			var place = new Place();
			this.placeCollection.add(place);

			Backbone.trigger('place-list:add', place);
		}

	});

	return ListView;
});