define( [ 'jquery', 'underscore', 'backbone', 'bootstrap', 'views/navig' ],
	function( $ , _ , Backbone , Bootstrap , NavigView){

		function App() {

			this.navigView = new NavigView();
			//this.booksView = new BooksView();

/*
			this.navRegion = new Backbone.Marionette.Region({
				el: "#nav"
			});

			this.contentRegion = new Backbone.Marionette.Region({
				el: "#content"
			});*/

		}

		App.prototype = {
			start: function(){
				//this.contentRegion.show(this.profileView);

				$('.container').append(this.navigView.el);
				this.navigView.render();
			}
		};

		return App;

});