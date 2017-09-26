var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	// res.type('text/plain');
	// res.send('Meadowlark Travel');
	res.render("home");
});

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't konw.",
	"You will have a pleaseant surprise.",
	"Whenever possible, keep it simple."
];

app.get('/about', function(req, res){
	// res.type('text/plain');
	// res.send('About Meadowlark Travel');
	// res.render("about");

	var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render('about', { fortune: randomFortune});

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