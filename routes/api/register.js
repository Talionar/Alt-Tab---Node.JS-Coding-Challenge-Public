'use strict';

let router = require('express').Router();

let config = require('../../config.json'),
    User = require('./../../models/user'),
    jwt = require('jsonwebtoken');

router.post('/', function(req, res) {

    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            let user = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            });
            // save the sample user
            user.save(function(err) {
                if (err) throw err;

                let token = jwt.sign(user, config.authSecret, {
                    expiresIn: "1h"
                });

                console.log('User created successfully');
                res.status(201).json({
                    success: true,
                    token: token
                });
            });
        } else {
          res.status(400).json({
              success: false,
              message: 'User with such email already exists'
          });

        }

    });
});

module.exports = router;