'use strict';

let User   = require('./../../models/user');

let router = require('express').Router();

router.get('/', function(req, res) {
  res.json({hello: 'world' });
});

module.exports = router;