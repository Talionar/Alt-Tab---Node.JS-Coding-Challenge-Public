'use strict';

let express = require('express'),
       mongoose    = require('mongoose'),
       bodyParser  = require('body-parser'),
       path = require('path');

let app = module.exports = express();

mongoose.connect('mongodb://localhost/alttabtestcase');

app.set('authSecret', 'alttabtestcasesupersecret');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index');
});

app.use('/api', require('./routes/api'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

