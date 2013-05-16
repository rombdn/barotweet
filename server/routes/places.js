var mongo = require('mongodb');
var BackboneModel = require('models/place.js');


var Places = function(app, db, middleware) {
	this.db = db;
	this.backboneModel = new BackboneModel();

	this.findAll = this.findAll.bind(this);
	this.findById = this.findById.bind(this);
	this.add = this.add.bind(this);
	this.update = this.update.bind(this);
	this.remove = this.remove.bind(this);

	this.setRoutes(app, middleware);
};


Places.prototype.setRoutes = function(app, middleware) {
	var mw = middleware || function(req, res) {};

	app.get('/places', mw, this.findAll);
	app.get('/places/:id', mw, this.findById);
	app.post('/places', mw, this.add);
	app.put('/places/:id', mw, this.update);
	app.delete('/places/:id', mw, this.remove);
};


Places.prototype.findAll = function(req, res) {
	if(req.query.name) {
		console.log('GET /places?name=' + req.query.name);
		this.db.collection('places2', function(err, collection) {
			collection.findOne( {'name': req.query.name}, function(err, items) {
				res.send(items);
			});
		});
	}
	else {
		console.log('GET /places');

		this.db.collection('places2', function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.send(items);
			});
		});
	}
};


Places.prototype.findById = function(req, res) {
	var id = req.params.id;
	console.log('GET /places/' + id);

	this.db.collection('places2', function(err, collection) {
		collection.findOne( {'_id': mongo.BSONPure.ObjectID(id)}, function(err, items) {
			if(err) {
				console.log('!ERROR finding place id ' + id + ': ' + err);
			}
			else {
				res.send(items);				
			}
		});
	});
};


Places.prototype.add = function(req, res) {
	var place = req.body;
	console.log(req);

	console.log('POST /places');
	console.log(JSON.stringify(place));

	if(!this.validate(place)) return false;

	this.db.collection('places2', function(err, collection) {
		collection.insert( place, {safe: true}, function(err, result) {
			if(err) {
				console.log('!ERROR during insertion: ' + err);
			}
			else {
				console.log('Insert OK: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};


Places.prototype.update = function(req, res) {
	var id = req.params.id;
	var place = req.body;

	if(!this.validate(place)) return false;

	//backbone send _id as a string
	//so update ObjectID -> String fails
	delete(place._id);

	console.log('PUT /places/' + id);

	this.db.collection('places2', function(err, collection) {
		collection.update( {'_id': mongo.BSONPure.ObjectID(id)}, place, {safe: true}, function(err, result) {
			if(err) {
				console.log('!ERROR updating place: ' + err);
			}
			else {
				console.log('Update OK: ' + result);
				res.send(place);
			}
		});
	});
};


Places.prototype.remove = function(req, res) {
	var id = req.params.id;

	console.log('DELETE /places/' + id);

	this.db.collection('places2', function(err, collection) {
		collection.remove( {'_id': mongo.BSONPure.ObjectID(id)}, {safe: true}, function(err, result) {
			if(err) {
				console.log('!ERROR deleting place: ' + err);
			}
			else {
				console.log('Delete OK: ' + result);
				res.send(req.body);
			}
		});
	});
};



Places.prototype.validate = function(attr) {
	//validation with backbone model
	var validErrors = this.backboneModel.validate(attr);

	if( validErrors != false) {
		console.log('model not valid');
		res.send(400);

		return false;
	}

	return true;
};


module.exports = Places;