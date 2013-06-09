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
	],

    additionalRoutes: [
        {
            method: 'post',
            url: '/places/new',
            callback: function(req, res) {
                var processed = 0;
                var newlyCreated = [];

                console.log('Nombre a traiter: ' + req.body.placeList.length);
                req.body.placeList.forEach(function(place) {
                    this.db.collection('places', function(err, collection) {
                        collection.findOne( { 'place_id': place.place_id }, function(err, resultFind) { 
                            if(!resultFind) {
                                var model = {
                                    place_id: place.place_id,
                                    name: place.display_name.match(/[^,]*/)[0],
                                    lat: place.lat,
                                    lon: place.lon
                                };
                                console.log(model);
                                
                                collection.insert( model, {safe: true}, function(err, resultInsert) {
                                    if(err) { res.send(err, 500); }
                                    else { 
                                        processed += 1;
                                        newlyCreated.push(resultInsert[0]);
                                        console.log('processed: ' + processed);
                                        if(processed == req.body.placeList.length) {
                                            res.send(newlyCreated, 200);
                                        }
                                    }
                                });
                            }
                            else {
                                processed += 1;
                                if(processed == req.body.placeList.length) {
                                    res.send(newlyCreated, 200);
                                }
                            }
                        });
                    });
                }, this);
            }
        }
    ]
});


module.exports = Place;