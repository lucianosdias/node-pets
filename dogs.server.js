var express = require('express');
var app = express();
//#5
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var dogs = require('./dogs')(app);


var server = app.listen(3001, function () {
    console.log('Server rodando na porta 3001');
});