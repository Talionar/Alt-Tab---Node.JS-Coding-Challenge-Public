'use strict';
// Here and below we used one-line docco-style comments to generate docs in future

let express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      path = require('path');

// We store global config in separate json file to make config available from nested routes
let app = module.exports = express(),
      config = require('./config.json');
// All db models stored in /models
mongoose.connect(config.db);

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'app_client')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index');
});

// We use nested routes structure - every folder in /routes is app route
// Nested folders is nested routes - so you can see structure of api with easy
// (make new folders only if this route have nested routes, else just make .js file for it)

// Every path must have index.js entry point
// It's require main file and it contains functions to serve this path and mount nested paths
app.use('/api', require('./routes/api'));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});