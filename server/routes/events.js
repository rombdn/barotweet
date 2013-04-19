
module.exports = {

	init: function(db) {
		this.db = db;
	},

	findAll: function(req, res) {
		console.log('GET /places');
		db.collection('events', function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.send(items);
			});
		});
		/*
		res.send([
			{id: 1, name: "schon place", open: 21, close: 3, beerPrice: 5, cocktailPrice: 3.4},
			{id: 2, name: "foo", open: 19, close: 1, beerPrice: 3, cocktailPrice: 5}
		]);*/
	}
};
/*
app.get('/places/:id', delay, function(req, res) {
	console.log('GET /places/' + req.params.id);
	res.send({name: "in and out", open: 22, close: 4, beerPrice: 4, cocktailPrice: 6.5});
	//res.send(null);
});

*/