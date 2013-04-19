var Places = function(app, db, middleware) {
	this.db = db;

	this.findAll = this.findAll.bind(this);
	this.setRoutes(app, middleware);
};


Places.prototype.setRoutes = function(app, middleware) {
	console.log('GET /places');

	var mw = middleware || function(req, res) {};

	app.get('/places', mw, this.findAll);
	app.get('/places/:id', mw, this.findById);
};


Places.prototype.findAll = function(req, res) {
	this.db.collection('places', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};


Places.prototype.findById = function(req, res) {
	var id = req.params.id;

	console.log('GET /places/' + id);

	this.db.collection('places', function(err, collection) {
		collection.findOne( {'_id': new BSON.ObjectID(id)} ).toArray(function(err, items) {
			res.send(items);
		});
	});
};


module.exports = Places;