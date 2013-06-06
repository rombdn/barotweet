define([ 'jquery', 'underscore', 'backbone', 
	'collections/coms', 'views/comments/com', 'views/comments/com-form', 'models/com', 'text!templates/com-button.html', 'models/alert', 'views/utils/progress', 'text!templates/com-list.html'], 

	function( $ , _ , Backbone , ComsCollection , ComView, ComFormView, Com, AddBtnTpl, Alert, ProgressView, ComListTpl ){

	var ComsListView = Backbone.View.extend({

		tagName: "div",

		events: {
			'click #more': 'fetchMore'
		},

		initialize: function(options) {
			this.views = [];
			this.place = options.place;
			this.comsCollection = new ComsCollection();
			this.comPage = 0;
			this.progressView = new ProgressView( {model: new Alert({id: 'places', status: 'progress', msg: 'Loading comments...'}) } );

			this.comsCollection.fetch({ 
				data: { 
					'page': this.comPage,
					'place._id': this.place.get('_id') 
				},
				success: function() { this.progressView.$el.hide(); this.$el.children('#fetch').show(); this.fetched = true; this.render();}.bind(this)
			});

			this.listenTo(this.comsCollection, 'add', this.addCom);
		},

		fetchMore: function() {
			this.progressView.$el.show();
			this.comPage += 1;
			this.comsCollection.fetch({
				data: {
					'page': this.comPage,
					'place._id': this.place.get('_id')
				},
				success: function() { this.progressView.$el.hide(); }.bind(this)
			});
		},

		addCom: function(com) {
			var newView = new ComView({model: com});
			this.views.push( newView );
			this.$el.children('.com-list').append( newView.el );
			newView.render();
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
				this.comsCollection.add(newCom);
				this.newForm();
			});
		},

		render: function(){
			if(!this.fetched) {
				this.$el.append( '<div id="fetch" style="margin-bottom: 5px; text-align: center;"><button type="button" class="btn btn-mini" id="more">Fetch more</button></div>' );				
				this.$el.children('#fetch').hide();
				this.$el.append( this.progressView.el );
				this.progressView.render();
				//this.$el.append( '<div style="max-height:100px; overflow: auto;" class="com-list"></div>' );
				this.$el.append( '<div class="com-list"></div>' );
			}
			else {
				this.newForm();
			}
		},

		remove: function() {
			if(this.views.length > 0) {
				_.each(this.views, function(view){
					view.remove();
				}, this);

				this.views.length = 0;
			}

			Backbone.View.prototype.remove.call(this);
		}

	});

	return ComsListView;
});