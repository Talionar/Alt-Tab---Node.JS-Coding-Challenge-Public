'use strict';

let router = require('express').Router();

// Api does not have default route - so here only nested ones
router.use('/register',  require('./register.js'));
router.use('/login',  require('./login.js'));
router.use('/profile',  require('./profile.js'));
router.use('/logout',  require('./logout.js'));

module.exports = router;