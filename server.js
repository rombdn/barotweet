var express = require('express');
var app = express();
var mongo = require('mongodb');
//var Places = require('./server/models/places');

//database
var server = new mongo.Server('127.0.0.1', 27017, {auto_reconnect: true});
var db = new mongo.Db('nitedb', server);
var Places = require('./server/routes/places');

var places = new Places(app, db, delay);


db.open(function(err, db) {
	if(!err) {
		console.log('connected to nitedb database');
	}
});


app.get('/places/:id', delay, function(req, res) {
	console.log('GET /places/' + req.params.id);
	res.send({name: "in and out", open: 22, close: 4, beerPrice: 4, cocktailPrice: 6.5});
	//res.send(null);
});


app.get('/events', delay, function(req, res) {
	if(req.query.parentPlaceId) {
		console.log('GET /events?parentPlaceId=' + req.query.parentPlaceId);
		res.send({id: 1, name: "bumba", price: 4, label: "rock"});
		//res.send(null);
	}
	else {
		console.log('GET /events');
		res.send([
			{id: 1, name: "phatty", price: 8, label: "club" },
			{id: 2, name: "phatty", price: 15, label: "rock" }
		]);
	}
});

app.get('/events/:id', delay, function(req, res) {
	console.log('GET /events/' + req.params.id);
	res.send({name: "phatty", price: 15, label: "club"});
	//res.send(null);
});


app.use('/', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/test', express.static(__dirname + '/public'));
app.use('/test', express.static(__dirname + '/tests/'));


//network simulation
function delay(req, res, next) {
	setTimeout(next, 1000);
}


app.listen(3000);
console.log("listening on port 3000");