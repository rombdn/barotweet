define(['underscore', 'backbone'], function( _ , Backbone ){

	var Book = Backbone.Model.extend({

		defaults: {
			coverImage: "img/placeholder.png",
			title: "Some title",
			author: "John Doe",
			releaseDate: "2012",
			keywords: "Javascript Programming"
		}

	});

	return Book;

});