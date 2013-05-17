var mongo = require('mongodb');
var RouteBase = require('./route-base');
var _ = require('underscore');


var Event = function(app, db, middleware) {
	RouteBase.call(this, app, db, middleware, this.modelName, this.backboneModelPath);
};


var vote = function(req, res) {
		var id = req.params.id;

		this.db.collection(this.modelName, function(err, collection) {

			collection.findOne( {'_id': mongo.BSONPure.ObjectID(id)}, function(err, items) {

				if(err) { res.send('Event ' + id + 'not found', 400); }
				
				else {
					if(items.hearts.users.indexOf(req.session.userId) != -1) {
						res.send('Warning: user already voted, event:' + id + ', user: ' + req.session.userId, 400);
					}

					else {
						items.hearts.number += 1;
						items.hearts.users.push(req.session.userId);
						
						collection.update( {
							'_id': mongo.BSONPure.ObjectID(id)},
							{$set: {hearts: {number: items.hearts.number, users: items.hearts.users}}}, 
							{safe: true}, 
							function(err, result) {
								if(err) {}
								else {
									res.send(items);
								}
						});
					}
				}
			});
		});
	};


_.extend(Event.prototype, RouteBase.prototype, {

	modelName: 'events',
	backboneModelPath: 'models/pevent.js',
	attributesFindable: [
		{
			name: '_parentPlaceId',
			uniq: true
		}
	],

	additionalRoutes: [
		{
			url: '/events/vote/:id',
			method: 'get',
			callback: vote
		}
	]
});


module.exports = Event;