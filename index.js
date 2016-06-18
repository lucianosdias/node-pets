//#1
// var http = require('http');

// http.createServer(function (req, res) {
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     res.end('Primeiro teste');
// }).listen(3000, 'localhost');

// console.log('Server bla bla bla');

//#2
var express = require('express');
var app = express();
//#5
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var cats = require('./cats')(app);

// app.get('/', function (req, res) {
//     // res.send('Hello world');
//     // res.json({ message: 'Hello World' });
//     console.log(req.body);
// });

var server = app.listen(3000, function () {
    console.log('Server rodando na porta 3000');
});