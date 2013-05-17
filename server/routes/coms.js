var mongo = require('mongodb');
var RouteBase = require('./route-base');
var _ = require('underscore');


var Coms = function(app, db, middleware) {
	RouteBase.call(this, app, db, middleware, this.modelName, this.backboneModelPath);
};


_.extend(Coms.prototype, RouteBase.prototype, {
	modelName: 'coms',
	backboneModelPath: 'models/com.js',
	attributesFindable: [
		{
			name: '_parentPlaceId',
			uniq: false
		}
	]
});


module.exports = Coms;