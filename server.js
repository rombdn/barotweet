var express = require('express');
var app = express();
/*
app.get('/wines', function(req, res) {
	res.send([
		{id: 1, name: "wine1", grapes: "rouge", country: "FR", region: "bourgogne", year: 2008, desc: "nice"},
		{id: 2, name: "wine2", grapes: "rouge", country: "FR", region: "bordeaux", year: 2010, desc: "petillant"}
	]);
});

app.get('/wines/:id', function(req, res) {
	res.send([{id: req.params.id, name: "wine3", grapes: "blanc", country: "FR", region: "anjou", year: 2011, desc: "hot and spicy"}]);
});
*/
app.use('/', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/test', express.static(__dirname + '/public'));
app.use('/test', express.static(__dirname + '/tests/'));

app.listen(process.env.PORT);
console.log("listening on port " + process.env.PORT);