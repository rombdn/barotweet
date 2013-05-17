var mongo = require('mongodb');
var RouteBase = require('./route-base');
var _ = require('underscore');


var Place = function(app, db, middleware) {
	RouteBase.call(this, app, db, middleware, this.modelName, this.backboneModelPath);
};


_.extend(Place.prototype, RouteBase.prototype, {
	modelName: 'places',
	backboneModelPath: 'models/place.js',
	attributesFindable: [ 
		{
			name: 'name',
			uniq: false
		}
	]
});


module.exports = Place;