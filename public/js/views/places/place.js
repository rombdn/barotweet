define(['jquery', 'underscore', 'backbone', 'text!templates/place.html', 'models/alert', 'views/utils/progress'],

	function( $ , _ , Backbone , placeTpl, Alert, ProgressView ){

		var PlaceView = Backbone.View.extend({

			tagname: 'div',
			className: 'row-fluid profile place',
			template: _.template( placeTpl ),

			initialize: function() {
				this.progressView = new ProgressView( {model: new Alert({id: 'place', status: 'progress', msg: 'Loading place...'}) } );
			},

			render: function(){
				if(this.progressView) {
					this.progressView.remove();
					delete this.progressView;
				}

				this.$el.html( this.template( this.model.toJSON() ));

				return this;
			}

		});


		return PlaceView;
});