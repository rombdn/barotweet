define( [ 'jquery', 'underscore', 'backbone', 'models/book', 'views/booksview', 'views/bookview' ],
	function( $ , _ , Backbone , Book, BooksView, BookView ){

		function App() {

			this.booksView = new BooksView();

		}

		App.prototype = {
			start: function(){

				$('#content').append( this.booksView.el );
				this.booksView.render();

			}
		};

		return App;

});