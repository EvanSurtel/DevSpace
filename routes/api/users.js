//registering users 
const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    TEST route
// @access  Public

router.get('/', (req, res) => {
    console.log(req.body);//object of data that will be sent to this route; we have to initialize the middleware for the body parser
    res.send('User route')

});//test route

module.exports = router;