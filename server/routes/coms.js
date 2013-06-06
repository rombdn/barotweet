var mongo = require('mongodb');
var RouteBase = require('./route-base');
var _ = require('underscore');


var Coms = function(app, db, middleware) {
	RouteBase.call(this, app, db, middleware, this.modelName, this.backboneModelPath);
};


_.extend(Coms.prototype, RouteBase.prototype, {
	modelName: 'coms',
	backboneModelPath: 'models/com.js',
    timestamp: true,
	attributesFindable: [
		{
			name: 'place._id',
			uniq: false
		}
	],

    additionalRoutes: [
        {
            method: 'get',
            url: '/coms',
            callback: function(req, res, next) {
                console.log(req.query);
                if(req.query.page && req.query['place._id']) {
                    var placeId = req.query['place._id'];
                    var page = parseInt(req.query.page, 10);
                    var numberPerPages = 3;

                    var pageStart = page * numberPerPages;
                    var pageEnd = pageStart + numberPerPages;
                  
                    this.db.collection('coms', function(err, collection) {
                        collection.find( { 'place._id': placeId } ).sort( { _id: -1 } ).toArray(function(err, items) { 
                            var result = items.slice(pageStart, pageEnd);
                            res.send(result);
                        });
                    });
                }
                else {
                    next();
                }
            }
        }
    ]
});


module.exports = Coms;