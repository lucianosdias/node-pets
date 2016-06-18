
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var cats = require('./pets')(app);

var server = app.listen(3002, function () {
    console.log('Server rodando na porta 3002');
});