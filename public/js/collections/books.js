define([ 'underscore', 'backbone', 'models/book' ], function( _ , Backbone , Book ){

	var Books = Backbone.Collection.extend({
		model: Book
	});

	return Books;
});