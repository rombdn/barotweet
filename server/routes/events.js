var mongo = require('mongodb');


var events = function(app, db, middleware) {
	this.db = db;

	this.findAll = this.findAll.bind(this);
	this.findById = this.findById.bind(this);
	this.add = this.add.bind(this);
	this.update = this.update.bind(this);
	this.remove = this.remove.bind(this);

	this.setRoutes(app, middleware);
};


events.prototype.setRoutes = function(app, middleware) {
	var mw = middleware || function(req, res) {};

	app.get('/events', mw, this.findAll);
	app.get('/events/:id', mw, this.findById);
	app.post('/events', mw, this.add);
	app.put('/events/:id', mw, this.update);
	app.delete('/events/:id', mw, this.remove);
};


events.prototype.findAll = function(req, res) {
	if(req.query._parentPlaceId) {
		console.log('GET /events?_parentPlaceId=' + req.query._parentPlaceId);
		this.db.collection('events2', function(err, collection) {
			collection.findOne( {'_parentPlaceId': req.query._parentPlaceId}, function(err, items) {
				res.send(items);
			});
		});
	}
	else {
		console.log('GET /events');
		this.db.collection('events2', function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.send(items);
			});
		});
	}
};


events.prototype.findById = function(req, res) {
	var id = req.params.id;

	console.log('GET /events/' + id);

	this.db.collection('events2', function(err, collection) {
		collection.findOne( {'_id': mongo.BSONPure.ObjectID(id)}, function(err, items) {
			if(err) {
				console.log('!ERROR finding event id ' + id + ': ' + err);
			}
			else {
				res.send(items);				
			}
		});
	});
};


events.prototype.add = function(req, res) {
	var event = req.body;
	console.log(req);

	console.log('POST /events');
	console.log(JSON.stringify(event));

	this.db.collection('events2', function(err, collection) {
		collection.insert( event, {safe: true}, function(err, result) {
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


events.prototype.update = function(req, res) {
	var id = req.params.id;
	var event = req.body;

	//backbone send _id as a string
	//so update ObjectID -> String fails
	delete(event._id);

	console.log('PUT /events/' + id);

	this.db.collection('events2', function(err, collection) {
		collection.update( {'_id': mongo.BSONPure.ObjectID(id)}, event, {safe: true}, function(err, result) {
			if(err) {
				console.log('!ERROR updating event: ' + err);
			}
			else {
				console.log('Update OK: ' + result);
				res.send(event);
			}
		});
	});
};


events.prototype.remove = function(req, res) {
	var id = req.params.id;

	console.log('DELETE /events/' + id);

	this.db.collection('events2', function(err, collection) {
		collection.remove( {'_id': mongo.BSONPure.ObjectID(id)}, {safe: true}, function(err, result) {
			if(err) {
				console.log('!ERROR deleting event: ' + err);
			}
			else {
				console.log('Delete OK: ' + result);
				res.send(req.body);
			}
		});
	});
};


module.exports = events;