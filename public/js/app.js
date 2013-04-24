define( [ 'jquery', 'underscore', 'backbone', 'bootstrap', 'views/content'],
	function( $ , _ , Backbone , Bootstrap , ContentView){

		var App = Backbone.View.extend({

			el: $('body'),

			events: {
				'click #home': 'navigHome'
			},

			initialize: function() {
				this.contentView = new ContentView();
			},

			render: function(){
				$('#content').html(this.contentView.el);
				this.contentView.render();
			},

			navigHome: function() {
				this.contentView.navigWall();
			}
		});

		return App;
});