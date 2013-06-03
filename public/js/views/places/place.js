define(['jquery', 'underscore', 'backbone', 'text!templates/place.html', 'models/alert', 'views/utils/progress'],

	function( $ , _ , Backbone , placeTpl, Alert, ProgressView ){

		var PlaceView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid profile place',
			template: _.template( placeTpl ),

			initialize: function() {
				this.progressView = new ProgressView( {model: new Alert({id: 'place', status: 'progress', msg: 'Loading place...'}) } );

				this.listenTo(this.model, 'sync', function() { 
					this.fetched = true;
					this.render(); 
				});
			},

			render: function(){
				if(this.fetched) { //this.isNew doesn't fit cause id is set
					if(this.progressView) {
						this.progressView.remove();
						delete this.progressView;
					}

					this.$el.html( this.template( this.model.toJSON() ));
				}
				else {
					this.$el.html( this.progressView.el );
					this.progressView.render();
				}

				return this;
			}

		});


		return PlaceView;
});