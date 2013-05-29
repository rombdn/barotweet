//require.paths.push('./public/js');

var express = require('express');
var app = express();
var mongo = require('mongodb');
//var Places = require('./server/models/places');
//var Place = require('./public/js/models/place.js');


app.use(express.cookieParser());
app.use(express.session({secret: 'mickay'}));

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use('/', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/test', express.static(__dirname + '/public'));
app.use('/test', express.static(__dirname + '/tests/'));

app.enable('trust proxy');



//database
var server = new mongo.Server('127.0.0.1', 27017, {auto_reconnect: true});
var db = new mongo.Db('nitedb', server);

var Places = require('./server/routes/places');
var places = new Places(app, db, auth);

var Events = require('./server/routes/events');
var events = new Events(app, db, auth);

var Coms = require('./server/routes/coms');
var coms = new Coms(app, db, auth);

var Users = require('./server/routes/users');
var users = new Users(app, db, delay);

db.open(function(err, db) {
	if(!err) {
		console.log('connected to nitedb database');
	}
});


app.post('/login', function(req, res) {
	console.log(req.body.name);
	if(req.body.name !== 'foo')
		res.send('unknown user', 401);
	else
		res.send('welcome');
});
/*
var auth = function(req, res, next) {
	if(req.)
};
*/


app.get('/sessionlogout', function(req, res) {
	req.session.logged = false;
	res.send('logged out');
});


//network simulation
function delay(req, res, next) {
	setTimeout(next, 500);
}


function auth(req, res, next) {
	//var ip_addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	console.log('user: ' + req.session.userId);
	console.log('ip: ' + req.ip);

	if(!req.session.userId) {
		res.send('unauth', 401);
	}
	else {
		setTimeout(next, 500);
	}
}


app.listen(3000);
console.log("listening on port 3000");