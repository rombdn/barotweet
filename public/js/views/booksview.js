define([ 'jquery', 'underscore', 'backbone', 'collections/books', 'views/bookview' ], function( $ , _ , Backbone , Books , BookView ){

	var BooksView = Backbone.View.extend({
		
		id: 'books',
		//el: $('#books'),

		initialize: function(){
			this.books = [
				{title:"JS the good parts", author:"John Doe", releaseDate:"2012", keywords:""},
				{title:"CS the better parts", author:"John Doe", releaseDate:"2012", keywords:"CoffeeScript"},
				{title:"Scala for the impatient", author:"John Doe", releaseDate:"2012", keywords:"Scala"},
				{title:"American Psyco", author:"Bret Easton Ellis", releaseDate:"2012", keywords:"Novel"},
				{title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2012", keywords:"JavaScript"}];
		
			this.collection = new Books(this.books);

			this.bookViews = [];

			this.populateViews();
		},

		populateViews: function(){

			_.each(this.bookViews, function(bookView){
				bookView.remove();
			}, this);

			this.bookViews.length = 0;

			_.each(this.collection.models, function(book){
				this.bookViews.push( new BookView({model: book}) );
			}, this);

		},

		render: function(){

			_.each(this.bookViews, function(bookView){

				this.$el.append( bookView.el );
				bookView.render();
			
			}, this);

		}


	});

	return BooksView;
});