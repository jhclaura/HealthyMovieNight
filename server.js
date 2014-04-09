
var express = require('express');

var app = express();

app.get('/', function(req, res){
  // res.send('Hello World');
  res.sendfile('./index.html');
});

app.get('/about', function(req, res){
  res.send('The About Page');
});

app.listen(5000);