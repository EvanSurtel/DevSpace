//registering users 
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

// @route   POST api/users
// @desc    Rgister user
// @access  Public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email','Please include email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min: 6})
],
(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body);//object of data that will be sent to this route; we have to initialize the middleware for the body parser
    res.send('User route')

});//test route

module.exports = router;