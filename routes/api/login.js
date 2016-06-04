'use strict';

let router = require('express').Router();

let  config =  require('../../config.json'),
       User   = require('../../models/user'),
       jwt     = require('jsonwebtoken');

router.post('/', function(req, res) {

  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;
    if (!user) {
      res.status(401).send('Authentication failed. User not found.');
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.status(401).send('Authentication failed. Wrong password.');
      } else {

        // if user is found and password is right
        // create a token
        let token = jwt.sign(user, config.authSecret, {
          expiresIn: "1h"
        });

        // return the information including token as JSON
        res.status(200).json({
          success: true,
          token: token
        });
      }

    }

  });
});

module.exports = router;