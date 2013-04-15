require( [ 'models/book', 'views/booksview', 'views/bookview' ], function(Book, BooksView, BookView) {
	suite('App', function() {
		test('Should be present', function() {
			assert.ok(window.app);
		});
	});
});