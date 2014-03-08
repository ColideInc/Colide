// web.js

var express = require("express");
var logfmt = require("logfmt");
var pg = require( 'pg' );
var app = express();

app.use( logfmt.requestLogger() );

app.get( '/' , function( req, res){
	res.send("Hello world.");
});

app.get( '/:id' , function( req, res){
	res.send("Valor do parametro: " + req.params.id);
});

app.get( '/test/:id' , function( req, res){
	pg.connect( process.env.DATABASE_URL, function( err, client, done){
		client.query('SELECT * FROM public."TESTE"', function( err, result){
			done();
			if(err) return console.error(err);
			res.send(result.rows);
		})
	})
})

var port = Number( process.env.PORT || 5000);
app.listen( port, function(){
	console.log("Listening on " + port );
});