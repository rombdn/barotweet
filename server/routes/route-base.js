var mongo = require('mongodb');


var Model = function(app, db, middleware, modelName, backboneModelPath) {
	this.db = db;

	this.modelName = modelName;

	if(backboneModelPath) {
		var BackboneModel = require(backboneModelPath);
		this.backboneModel = new BackboneModel();
	}

	this.findAll = this.findAll.bind(this);
	this.findById = this.findById.bind(this);
	this.add = this.add.bind(this);
	this.update = this.update.bind(this);
	this.remove = this.remove.bind(this);

	this.setRoutes(app, middleware);
};


Model.prototype.setRoutes = function(app, middleware) {
	var mw = middleware || function(req, res) {};

	console.log('setting routes for ' + this.modelName);

	//optional routes
	if(this.additionalRoutes) {

		this.additionalRoutes.forEach(function(route) {
			console.log(route);
			//route.callback.call(this);

			if(route.method === 'post') {
				app.post(route.url, mw, route.callback.bind(this));
			}
			else if(route.method === 'get') {
				app.get(route.url, mw, route.callback.bind(this));
			}

		}, this);
	}


	if(this.authorizedRoutes) {
		this.authorizedRoutes.forEach(function(routeName) {
			if(routeName === 'findAll') { app.get('/' + this.modelName, mw, this.findAll); }
			if(routeName === 'findById'){ app.get('/' + this.modelName + '/:id', mw, this.findById); }
			if(routeName === 'add') 	{ app.post('/' + this.modelName, mw, this.add); }
			if(routeName === 'update') 	{ app.put('/' + this.modelName + '/:id', mw, this.update); }
			if(routeName === 'remove') 	{ app.delete('/' + this.modelName + '/:id', mw, this.remove); }
		}, this);
	}
	else {
		app.get('/' + this.modelName, mw, this.findAll);
		app.get('/' + this.modelName + '/:id', mw, this.findById);
		app.post('/' + this.modelName, mw, this.add);
		app.put('/' + this.modelName + '/:id', mw, this.update);
		app.delete('/' + this.modelName + '/:id', mw, this.remove);
	}
};



Model.prototype.findAll = function(req, res) {

	if(Object.keys(req.query).length > 0) {

		if(this.attributesFindable && this.attributesFindable.length > 0) {

			console.log('attributesFindable: true');

			this.attributesFindable.forEach(function(attr) {

				console.log('attr: ' + attr.name);
				if(req.query[attr.name]) {

					this.db.collection(this.modelName, function(err, collection) {

						var mongoQuery = {};
						mongoQuery[attr.name] = req.query[attr.name];

						if(!attr.uniq) {
							collection.find( mongoQuery ).toArray(function(err, items) {
								res.send(items);
							});
						}
						else {
							collection.findOne( mongoQuery, function(err, items) {
								res.send(items);
							});							
						}

					});
				}

			}, this);
		}
		else {
			res.send(404);
		}
	}
	else {
		console.log('find all ' + this.modelName);
		this.db.collection(this.modelName, function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.send(items);
			});
		});
	}
};


Model.prototype.findById = function(req, res) {
	var id = req.params.id;

	this.db.collection(this.modelName, function(err, collection) {
		collection.findOne( {'_id': mongo.BSONPure.ObjectID(id)}, function(err, items) {
			if(err) {}
			else { res.send(items); }
		});
	});
};


Model.prototype.add = function(req, res) {
	var model = req.body;

	if(!this.validate(model)) return false;

	if(this.timestamp) {
		model.timestamp = new Date();
	}

	this.db.collection(this.modelName, function(err, collection) {
		collection.insert( model, {safe: true}, function(err, result) {
			if(err) {}
			else { res.send(result[0]); }
		});
	});
};


Model.prototype.update = function(req, res) {
	var id = req.params.id;
	var model = req.body;

	if(!this.validate(model)) return false;

	//backbone send _id as a string
	//so update ObjectID -> String fails
	delete(model._id);


	this.db.collection(this.modelName, function(err, collection) {
		collection.update( {'_id': mongo.BSONPure.ObjectID(id)}, model, {safe: true}, function(err, result) {
			if(err) { console.log('!ERROR updating model: ' + err); }
			else { res.send(model); }
		});
	});
};


Model.prototype.remove = function(req, res) {
	var id = req.params.id;

	this.db.collection(this.modelName, function(err, collection) {
		collection.remove( {'_id': mongo.BSONPure.ObjectID(id)}, {safe: true}, function(err, result) {
			if(err) {
				console.log('!ERROR deleting model: ' + err);
			}
			else {
				console.log('Delete OK: ' + result);
				res.send(req.body);
			}
		});
	});
};



Model.prototype.validate = function(attr) {
	//validation with backbone model

	if(!this.backboneModel) {
		console.log('model doesn t exists');
		return true;
	}

	var validErrors = this.backboneModel.validate(attr);

	if( validErrors !== false) {
		res.send(400);
		return false;
	}

	return true;
};


module.exports = Model;