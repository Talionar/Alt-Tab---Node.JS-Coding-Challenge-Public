'use strict';

let router = require('express').Router();

// Here we have not test or session implementation requerid in test case - so just redirect to home page

router.post('/', function(req, res) {
    res.redirect('/');
});


module.exports = router;