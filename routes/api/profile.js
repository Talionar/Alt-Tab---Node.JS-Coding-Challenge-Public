'use strict';

let router = require('express').Router();

let config = require('../../config.json'),
      User = require('../../models/user'),
      jwt = require('jsonwebtoken');

router.get('/', function(req, res) {

    let token = req.headers.authorization;

    if (token) {
      // Slice token here to remove 'Bearer '.
      // Maybe need revision and adding bearer to secret? Or using more powerfull auth scheme
        jwt.verify(token.slice(7), config.authSecret, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token'
                });
            } else {
                User.findOne(decoded._doc, function(err, user) {
                    res.json({
                        email: user.email,
                        name: user.name
                    });
                });
            }
        });

    } else {
        return res.status(401).send({
            success: false,
            message: 'No token provided'
        });

    }
});

module.exports = router;