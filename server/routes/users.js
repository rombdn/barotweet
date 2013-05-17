var mongo = require('mongodb');
var RouteBase = require('./route-base');
var _ = require('underscore');


var User = function(app, db, middleware) {
	RouteBase.call(this, app, db, middleware, this.modelName, this.backboneModelPath);
};



var login = function(req, res) {
	if(req.query.name) {
		this.db.collection('users', function(err, collection) {
			collection.findOne( {'name': req.query.name}, function(err, items) {
				if(err) {}
				else {
					if(items) {
						req.session.userId = items._id;
					}
					res.send(items);
				}
			});
		});
	}
	else {
		res.send(403);
	}/*
		this.db.collection('users', function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.send('.');
			});
		});
	}*/
};


var logout = function(req, res) {
	req.session.userId = undefined;
	res.send(200);
};



_.extend(User.prototype, RouteBase.prototype, {
	modelName: 'users',
	backboneModelPath: 'models/user.js',
	authorizedRoutes: ['add', 'findById', 'update'],

	additionalRoutes: [
		{
			url: '/users',
			method: 'get',
			callback: login
		},
		{
			url: '/logout',
			method: 'get',
			callback: logout
		}
	],

	//add redefined to add login
	add: function(req, res) {
		var user = req.body;

		this.db.collection('users', function(err, collection) {
			collection.insert( user, {safe: true}, function(err, result) {
				if(err) {}
				else {
					//login directly after user creation
					//not clean...
					req.session.userId = result[0]._id;
					res.send(result[0]);
				}
			});
		});

	}

});

module.exports = User;