var fortune = require('./lib/fortune.js');


var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

//app.get('/', function(req, res){
	// res.type('text/plain');
	// res.send('Meadowlark Travel');
	//res.render("home");
//});


app.use(function(req, res, next){
	res.locals.showTest = app.get('env') !== 'production' && req.query.test === '1';
	next();
});


app.get('/about', function(req, res){
	// res.type('text/plain');
	// res.send('About Meadowlark Travel');
	// res.render("about");

	
	res.render('about', { fortune: fortune.getFortune()});

});

app.use(function(req, res){
	// res.type('text/plain');
	res.status(404);
	// res.send('404 - Not Found');
	res.render('404');
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	// res.send('500 - Server Error');
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port')) + '; press Ctrl + C to terminate.';
})