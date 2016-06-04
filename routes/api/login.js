'use strict';

let router = require('express').Router();

let config = require('../../config.json'),
      User = require('../../models/user'),
      jwt = require('jsonwebtoken');

router.post('/', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.status(401).send('Authentication failed. User not found.');
        } else if (user) {

            if (user.password != req.body.password) {
                res.status(401).send('Authentication failed. Wrong password.');
            } else {

                let token = jwt.sign(user, config.authSecret, {
                    expiresIn: "1h"
                });

                res.status(200).json({
                    success: true,
                    token: token
                });
            }
        }

    });
});

module.exports = router;