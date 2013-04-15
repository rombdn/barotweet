require( [ '../utils', 'models/place', 'views/place-form' ], function(Util, Place, PlaceFormView) {

	describe('Place Form View', function() {
		var place;
		var placeFormView;

		beforeEach(function(){
			place = new Place();
			placeFormView = new PlaceFormView({model: place});
			placeFormView.render();
		});


		describe('View init', function() {
			it("should be rendered", function() {
				expect(placeFormView.$el.html()).to.not.be.empty;
			}),

			it("should contain default values", function() {
				expect(placeFormView.$el.html()).to.contain('Unnamed place');
			});
		});
	});
});