//registering users 
const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    TEST route
// @access  Public

router.get('/', (req, res) => res.send('User route'));//test route

module.exports = router;