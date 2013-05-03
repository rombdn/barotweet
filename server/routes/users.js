var mongo = require('mongodb');


var Users = function(app, db, middleware) {
	this.db = db;

	this.findAll = this.findAll.bind(this);
	this.findById = this.findById.bind(this);
	this.add = this.add.bind(this);
	this.update = this.update.bind(this);
	this.remove = this.remove.bind(this);

	this.setRoutes(app, middleware);
};


Users.prototype.setRoutes = function(app, middleware) {
	var mw = middleware || function(req, res) {};

	app.get('/users', mw, this.findAll);
	app.get('/users/:id', mw, this.findById);
	app.post('/users', mw, this.add);
	app.put('/users/:id', mw, this.update);
	app.delete('/users/:id', mw, this.remove);
};


Users.prototype.findAll = function(req, res) {
	if(req.query.name) {
		console.log('GET /users?name=' + req.query.name);
		this.db.collection('users', function(err, collection) {
			collection.findOne( {'name': req.query.name}, function(err, items) {
				res.send(items);
			});
		});
	}
	else {
		console.log('GET /users');

		this.db.collection('users', function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.send(items);
			});
		});
	}
};


Users.prototype.findById = function(req, res) {
	var id = req.params.id;
	console.log('GET /users/' + id);

	this.db.collection('users', function(err, collection) {
		collection.findOne( {'_id': mongo.BSONPure.ObjectID(id)}, function(err, items) {
			if(err) {
				console.log('!ERROR finding user id ' + id + ': ' + err);
			}
			else {
				res.send(items);				
			}
		});
	});
};


Users.prototype.add = function(req, res) {
	var user = req.body;
	//console.log(req);

	console.log('POST /users');
	console.log(JSON.stringify(user));

	this.db.collection('users', function(err, collection) {
		collection.insert( user, {safe: true}, function(err, result) {
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


Users.prototype.update = function(req, res) {
	var id = req.params.id;
	var user = req.body;

	//backbone send _id as a string
	//so update ObjectID -> String fails
	delete(user._id);

	console.log('PUT /users/' + id);

	this.db.collection('users', function(err, collection) {
		collection.update( {'_id': mongo.BSONPure.ObjectID(id)}, user, {safe: true}, function(err, result) {
			if(err) {
				console.log('!ERROR updating user: ' + err);
			}
			else {
				console.log('Update OK: ' + result);
				res.send(user);
			}
		});
	});
};


Users.prototype.remove = function(req, res) {
	var id = req.params.id;

	console.log('DELETE /users/' + id);

	this.db.collection('users', function(err, collection) {
		collection.remove( {'_id': mongo.BSONPure.ObjectID(id)}, {safe: true}, function(err, result) {
			if(err) {
				console.log('!ERROR deleting user: ' + err);
			}
			else {
				console.log('Delete OK: ' + result);
				res.send(req.body);
			}
		});
	});
};


module.exports = Users;