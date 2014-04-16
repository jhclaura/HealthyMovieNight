
var express = require('express');

//handlebars
var expressHbs = require('express3-handlebars');
var handlebars = expressHbs.create({
    defaultLayout: 'main'
});

var tutorialData = require('./tutorialDataFile');
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//dynamic route
app.get('/tutorial/:tutorialName', function(req, res){
  var tutorialName = req.params.tutorialName;
  var data = tutorialData[tutorialName];

  res.render('tutorial', data);
});


// var person = require('./defaultValues.js');

// app.get('/', function(req, res){
//   // res.send('Hello World');
//   // res.sendfile('./public/index.html');
//   // res.send('Your name is: ' +
//   //           person.myName);

//   //handlebars render the temple of index
//   //variable into templete
//   var data = { planet: 'Earth'};
//   var planetNames = [
//     'Mars',
//     'Venus',
//     'Mercury'
//   ];
//   data.planetNames = planetNames;
//   res.render('index', data);

// });


// app.get('/about', function(req, res){
//   res.send('The About Page');
// });

//the middle where
//add it as a filter
//look it into 'public'
app.use('/public',
        express.static('public'));

app.listen(5000);