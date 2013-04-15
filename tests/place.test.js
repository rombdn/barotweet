require( [ 'models/place' ], function(Place) {

	var getErrorMsg = function(validationError) {
		return _.map(validationError, function(msg){
			console.log('getErrorMsg:'+ msg.message);
			return msg.message;
		}, this);
	};

	describe('Place model', function() {
		var place;

		beforeEach(function(){
			place = new Place();
		});

		describe('Default values', function() {
			it("should have a name, an image, hours and prices", function() {
				expect(place.get('name')).to.not.be.empty;
				expect(place.get('pic')).to.match(/(jpg|png|gif)$/);
				expect(place.get('open')).to.not.be.empty;
				expect(place.get('close')).to.not.be.empty;
				expect(place.get('beerPrice')).to.not.be.empty;
				expect(place.get('cocktailPrice')).to.not.be.empty;
			});
		});

		describe('Name validation', function() {
			it("should not be blank or > 15 chars", function(){
				place.save({name: ''}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("name cannot be blank");

				place.save({name: '  '}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("name cannot be blank");

				place.save({name: 'jkldmijsrqmjklgioidsr'}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("name must be less than 15 characters");
			});
		});


		describe('Image validation', function() {
			it("url should end with jpg|png|gif", function(){
				place.save({pic: 'lorem ipsum'}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("image must end with jpg/png/gif");

				place.save({name: '  '}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("name cannot be blank");

				place.save({name: 'jkldmijsrqmjklgioidsr'}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("name must be less than 15 characters");
			});
		});

		describe('Hours validation', function() {
			it("open should not be blank", function(){
				place.save({open: '   '}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("open cannot be blank");
			});

			it("should not open before 0, before 20 or after 24", function(){
				place.save({open: 25}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("place can't open before 16h or after 00h");

				place.save({open: 15}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("place can't open before 16h or after 00h");

				place.save({open: -1}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("place can't open before 16h or after 00h");
			});

			it("close should not be blank", function(){
				place.save({close: '   '}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("close cannot be blank");
			});

			it("should not close before 1 or after 10", function(){
				place.save({close: 0}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("place can't close before 1 a.m or after 10 a.m");

				place.save({close: 11}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("place can't close before 1 a.m or after 10 a.m");
			});

			it("open and close should be integers", function(){
				place.save({open: 21.5}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("hours must be integers");
				place.save({close: 3.5}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("hours must be integers");
			});
		});

		describe('Prices validation', function() {
			it("should be numbers between 0.5 and 20", function(){
				place.save({beerPrice: 0}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("beer price must be a number between 0.5 and 20");

				place.save({beerPrice: 21}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("beer price must be a number between 0.5 and 20");

				place.save({cocktailPrice: 0}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("cocktail price must be a number between 0.5 and 20");

				place.save({cocktailPrice: 21}, {validate: true});
				expect(getErrorMsg(place.validationError)).to.include("cocktail price must be a number between 0.5 and 20");

			});
		});
	});
});