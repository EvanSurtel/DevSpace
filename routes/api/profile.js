//adding, fetching, updating profiles
const express = require('express');
const router = express.Router();

// @route   GET api/profile
// @desc    TEST route
// @access  Public

router.get('/', (req, res) => res.send('Profile route'));//test route

module.exports = router;