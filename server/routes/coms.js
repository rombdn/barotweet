var mongo = require('mongodb');


var Coms = function(app, db, middleware) {
	this.db = db;

	this.findAll = this.findAll.bind(this);
	this.findById = this.findById.bind(this);
	this.add = this.add.bind(this);
	this.update = this.update.bind(this);
	this.remove = this.remove.bind(this);

	this.setRoutes(app, middleware);
};


Coms.prototype.setRoutes = function(app, middleware) {
	var mw = middleware || function(req, res) {};

	app.get('/coms', mw, this.findAll);
	app.get('/coms/:id', mw, this.findById);
	app.post('/coms', mw, this.add);
	app.put('/coms/:id', mw, this.update);
	app.delete('/coms/:id', mw, this.remove);
};


Coms.prototype.findAll = function(req, res) {
	if(req.query._parentPlaceId) {
		console.log('GET /coms?_parentPlaceId=' + req.query._parentPlaceId);
		this.db.collection('coms2', function(err, collection) {
			collection.find( {'_parentPlaceId': req.query._parentPlaceId}).toArray(function(err, items) {
				res.send(items);
			});
		});
	}
	else {
		console.log('GET /coms');

		this.db.collection('coms2', function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.send(items);
			});
		});
	}
};


Coms.prototype.findById = function(req, res) {
	var id = req.params.id;
	console.log('GET /coms/' + id);

	this.db.collection('coms2', function(err, collection) {
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


Coms.prototype.add = function(req, res) {
	var place = req.body;
	console.log(req);

	console.log('POST /coms');
	console.log(JSON.stringify(place));

	this.db.collection('coms2', function(err, collection) {
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


Coms.prototype.update = function(req, res) {
	var id = req.params.id;
	var place = req.body;

	//backbone send _id as a string
	//so update ObjectID -> String fails
	delete(place._id);

	console.log('PUT /coms/' + id);

	this.db.collection('coms2', function(err, collection) {
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


Coms.prototype.remove = function(req, res) {
	var id = req.params.id;

	console.log('DELETE /coms/' + id);

	this.db.collection('coms2', function(err, collection) {
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


module.exports = Coms;