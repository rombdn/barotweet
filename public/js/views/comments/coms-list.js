define([ 'jquery', 'underscore', 'backbone', 'collections/coms', 'views/comments/com', 'views/comments/com-form', 'models/com', 'text!templates/coms-list.html', 'models/alert', 'views/utils/progress'], 

	function( $ , _ , Backbone , ComsCollection , ComView, ComFormView, Com, ComListTpl, Alert, ProgressView ){

	var ComsListView = Backbone.View.extend({

		tagName: "div",
		template: _.template(ComListTpl),

		events: {
			'click #comment-add': 'showComForm'
		},

		initialize: function(options) {
			this.views = [];
			this.place = options.place;
			this.comsCollection = new ComsCollection();

			this.comsCollection.fetch({ 
				data: { 'place._id': this.place.get('_id') },
				success: function(collec) { this.collectionFetched = true; this.render(); }.bind(this)
			});

			this.progressView = new ProgressView( {model: new Alert({id: 'place', status: 'progress', msg: 'Loading comment...'}) } );

			this.listenTo(this.comsCollection, 'add', this.addComView);
			this.listenTo(this.comsCollection, 'remove', this.removeComView);
		},

		//called as soon as the user click 'add comment'
		//in case of form cancelation removeComView is called
		//to do the cleanup
		addComView: function(model, resp, opts) {
			this.views.push( new ComView({model: model}));
			this.render();
		},

		//called when a com is deleted OR when form is canceled
		//because form cancelation cause the new com to be deleted
		removeComView: function(model, resp, opts) {
			this.views = this.views.filter(function(view) {
				if(view.model.get('_id') == model.get('_id')) {
					return false;
				}

				return true;
			});
		},

		//append the form
		showComForm: function(e) {
			e.preventDefault();

			//if(this.comFormView) { return; }

			this.newCom = new Com( { 
				place: {
					_id: this.place.get('_id'),
					name: this.place.get('name')
				}
			});

			console.log(this.newCom);

			this.comsCollection.add(this.newCom);

			this.comFormView = new ComFormView({model: this.newCom});
			this.$el.append( this.comFormView.el );
			this.comFormView.render();
		},

		render: function(){
			this.$el.empty();
/*
			if(this.comFormView) { 
				this.comFormView.remove();
				delete this.comFormView;
			}
*/
			if(this.collectionFetched) {
				_.each(this.views, function(view){
					this.$el.append( view.el );
					view.render();
					view.delegateEvents(); //this.$el.empty() remove events
				}, this);
			}
			else {
				this.$el.html( this.progressView.el );
				this.progressView.render();
			}

			this.$el.append( this.template( { parentName: this.place.get('name') }) );
		},

		remove: function() {
			if(this.views.length > 0) {
				_.each(this.views, function(view){
					view.remove();
				}, this);

				//avoid memory leaks
				this.views.length = 0;
			}

			Backbone.View.prototype.remove.call(this);
		}

	});

	return ComsListView;
});