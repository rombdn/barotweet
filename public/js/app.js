define( [ 'jquery', 'underscore', 'backbone', 'bootstrap', 'views/structure/menu', 'views/structure/content', 'utils/auth'],
	function( $ , _ , Backbone , Bootstrap , MenuView, ContentView, Auth){

		var App = Backbone.View.extend({

			el: $('body'),

			events: {
				'click #home': 'navigHome',
				'click #locate': 'clickLocate'
			},

			initialize: function() {
				this.menuView = new MenuView();
				this.contentView = new ContentView();

				if(Auth.isLogged()) { Auth.logout(); }
			},

			render: function(){
				this.$el.html('');

				this.$el.append(this.menuView.el);
				this.$el.append(this.contentView.el);
				//$('#content').html(this.contentView.el);
				this.menuView.render();
				this.contentView.render();
			},

			navigHome: function() {
				this.contentView.navigWall();
			},

			clickLocate: function() {
				Backbone.trigger('menu:locate');
			}
		});

		return App;
});