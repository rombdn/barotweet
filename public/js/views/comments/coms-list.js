define([ 'jquery', 'underscore', 'backbone', 'collections/coms', 'views/comments/com', 'views/comments/com-form', 'models/com', 'text!templates/coms-list.html', 'utils/auth' ], 

	function( $ , _ , Backbone , ComsCollection , ComView, ComFormView, Com, ComListTpl, Auth ){

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
				data: { _parentPlaceId: this.place.get('_id') }
			});

			this.listenTo(this.comsCollection, 'sync', this.populateViews);
		},

		populateViews: function(model, resp, options){

			if(!this.populated) {
				this.removeAllViews();
			
				_.each(this.comsCollection.models, function(model){
					this.views.push( new ComView({model: model}) );
				}, this);
				
				this.populated = true;
			}

			this.render();
		},

		removeAllViews: function() {
			if(this.views.length > 0) {
				_.each(this.views, function(view){
					view.remove();
				}, this);

				//avoid memory leaks
				this.views.length = 0;
			}
		},

		render: function(){
			this.$el.empty();

			if(this.comFormView) { this.comFormView.remove(); }

			//this.populateViews();

			if(this.populated) {
				_.each(this.views, function(view){
					this.$el.append( view.el );
					view.render();
					view.delegateEvents(); //this.$el.empty() remove events
				}, this);
			}
			else {
				this.$el.append( 'Loading comments...' );
			}

			this.$el.append( this.template( { parentName: this.place.get('name') }) );
		},

		//create a new com and show form
		showComForm: function(e) {
			e.preventDefault();

			//create empty com
			this.newCom = new Com( { _parentPlaceId: this.place.get('_id'), _userId: Auth.getUserId()});
			this.comsCollection.add(this.newCom);

			//create the view for the new com
			//!!! CANCEL !!!
			this.views.push(new ComView({model: this.newCom}));

			this.comFormView = new ComFormView({model: this.newCom});
			this.$el.append( this.comFormView.el );
			this.comFormView.render();
		}
	});

	return ComsListView;
});