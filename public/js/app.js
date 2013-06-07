define( [ 'jquery', 'underscore', 'backbone', 'bootstrap', 'views/structure/menu', 'views/structure/content'],
	function( $ , _ , Backbone , Bootstrap , MenuView, ContentView){

		var App = Backbone.View.extend({

			el: $('body'),

			initialize: function() {
				this.menuView = new MenuView();
				this.contentView = new ContentView();
			},

			render: function(){
				this.$el.html('');

				this.$el.append(this.menuView.el);
				this.$el.append(this.contentView.el);

				this.menuView.render();
				this.contentView.render();
			}
		});

		return App;
});