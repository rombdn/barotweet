define([ 'jquery', 'underscore', 'backbone', 
	'collections/coms', 'views/comments/com', 'views/comments/com-form', 'models/com', 'models/alert', 'views/utils/progress', 'text!templates/com-list.html', 'views/comments/button-fetch'], 

	function( $ , _ , Backbone , ComsCollection , ComView, ComFormView, Com, Alert, ProgressView, Tpl, ButtonFetchView ){

	var ComsListView = Backbone.View.extend({

		className: "comment-list",
		template: _.template(Tpl),

		initialize: function(options) {
			this.views = [];
			this.place = options.place;
			this.comsCollection = new ComsCollection();
			this.comPage = 0;
			
			this.progressView = new ProgressView( {model: new Alert({id: 'places', status: 'progress', msg: 'Loading comments...'}) } );
			this.buttonFetchView = new ButtonFetchView();

			this.comsCollection.fetch({ 
				data: { 
					'page': this.comPage,
					'place._id': this.place.get('_id') 
				},
				success: function() { 
					this.render("commentsFetched"); 
				}.bind(this)
			});

			this.listenTo(this.comsCollection, 'add', this.addCom);
			this.listenTo(this.comsCollection, 'reset', this.addAllCom);
			this.listenTo(this.buttonFetchView, 'click-button-fetch', this.fetchMore);
		},

		fetchMore: function() {
			this.buttonFetchView.loadingState();
			this.comPage += 1;
			this.comsCollection.fetch({
				data: {
					'page': this.comPage,
					'place._id': this.place.get('_id')
				},
				success: function() { this.buttonFetchView.resetState(); }.bind(this)
			});
		},

		addCom: function(com) {
			var newView = new ComView({model: com});
			this.views.push( newView );
			this.$el.children('.list').append( newView.el );
			newView.render();
		},

		addAllCom: function(collection) {
			collection.models.forEach( this.addCom, this );
		},

		newForm: function() {
			if(this.comFormView) {
				this.stopListening(this.comFormView);
				this.comFormView.remove();
			}

			var newCom = new Com( { 
				place: {
					_id: this.place.get('_id'),
					name: this.place.get('name')
				}
			});

			this.comFormView = new ComFormView({model: newCom});
			this.$el.append( this.comFormView.el );
			this.comFormView.render();

			this.listenTo(this.comFormView, 'form:save', function() {
				this.removeViews();
				this.progressView.$el.show();
				this.comsCollection.fetch({
					data: {
						'page': 0,
						'place._id': this.place.get('_id')
					},
					reset: true,
					success: function() { this.progressView.$el.hide(); }.bind(this)
				});
				this.newForm();
			});
		},

		render: function(action){
			if(!action) {
				this.$el.append( this.progressView.el );
				this.progressView.render();
				
				this.$el.append( this.template() );
				
				this.$el.append( this.buttonFetchView.el );				
				this.buttonFetchView.render();
				this.buttonFetchView.$el.hide();
			}
			else {
				this.progressView.$el.hide(); 
				this.buttonFetchView.$el.show(); 
				this.newForm();
			}
		},

		removeViews: function() {
			if(this.views.length > 0) {
				_.each(this.views, function(view){
					view.remove();
				}, this);

				this.views.length = 0;
			}
		},

		remove: function() {
			this.removeViews();

			Backbone.View.prototype.remove.call(this);
		}

	});

	return ComsListView;
});