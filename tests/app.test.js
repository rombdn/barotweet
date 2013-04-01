require( [ 'models/book', 'views/booksview', 'views/bookview' ], function(Book, BooksView, BookView) {
	suite('App', function() {
		test('Should be present', function() {
			assert.ok(window.app);
		});
	});

	suite('Book default', function() {
		test('Default release date', function() {
			var book = new Book({title:"JS the good parts", author:"John Doe", releaseDate:"2012", keywords:""});
			var bookView = new BookView({model: book});

			bookView.render();
			expect(bookView.$el.html()).to.contain('img');
			//bookView.$el.html().should.contain('img');
		});
	});

	describe('Book Model', function(){
		var book;

		beforeEach(function(){
			book = new Book();
		});

		describe('Default values', function() {
			it("default date should be 2012", function(){
				book.get('releaseDate').should.equal('2012');
			});

			it("default author should be John Doe", function(){
				book.get('author').should.equal('John Doe');
			});
		});
	});
});