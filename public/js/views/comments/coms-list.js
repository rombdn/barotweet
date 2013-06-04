define([ 'jquery', 'underscore', 'backbone', 
	'collections/coms', 'views/comments/com', 'views/comments/com-form', 'models/com', 'text!templates/com-button.html', 'models/alert', 'views/utils/progress', 'text!templates/com-list.html'], 

	function( $ , _ , Backbone , ComsCollection , ComView, ComFormView, Com, AddBtnTpl, Alert, ProgressView, ComListTpl ){

	var ComsListView = Backbone.View.extend({

		tagName: "div",
		comListTpl: _.template(ComListTpl),
		addBtnTpl: _.template(AddBtnTpl),


		events: {
			'click #comment-add': 'showComForm'
		},

		initialize: function(options) {
			this.views = [];
			this.place = options.place;
			this.comsCollection = new ComsCollection();
			this.progressView = new ProgressView( {model: new Alert({id: 'place', status: 'progress', msg: 'Loading comment...'}) } );


			this.comsCollection.fetch({ 
				data: { 'place._id': this.place.get('_id') },
				success: function(collec) {
					collec.models.forEach(function(com) {
						this.views.push( new ComView({model: com}));
					}, this);
					this.collectionFetched = true;
					this.render();
				}.bind(this)
			});
		},

		showComForm: function(e) {
			e.preventDefault();

			if(this.comFormView) { return; }

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
				this.comsCollection.add(newCom);
				this.views.push( new ComView({model: newCom}));
				this.render();
			});

			this.listenTo(this.comFormView, 'form:save form:cancel', function() {
				this.comFormView.remove();
				delete this.comFormView;
			});
		},

		render: function(){
			this.$el.empty();

			if(this.collectionFetched) {
				_.each(this.views, function(view){
					this.$el.append( view.el );
					view.render();
					view.delegateEvents(); //this.$el.empty() remove events
				}, this);

				this.$el.append( this.comListTpl( /*{ parentName: this.place.get('name') }*/) );
			}
			else {
				this.$el.html( this.progressView.el );
				this.progressView.render();
			}
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