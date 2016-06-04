'use strict';

let router = require('express').Router();

// Here we have not tests and also session implementation not requerid in this test case.
// So just redirecting to home page here
router.post('/', function(req, res) {
    res.redirect('/');
});

module.exports = router;