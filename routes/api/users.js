//registering users 
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {check, validationResult} = require('express-validator');

const User = require('../../models/User')

// @route   POST api/users
// @desc    Rgister user
// @access  Public

router.post('/', [ // post route
    check('name', 'Name is required').not().isEmpty(),//all of this sets the validation
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min: 6})
],
async (req, res) => { //this handles the response to the validation
    const errors = validationResult(req);//errors is array of errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});//puts errors into an array
    }
    console.log(req.body);//object of data that will be sent to this route; we have to initialize the middleware for the body parser
    const{name, email, password} = req.body;// pulls name, email and password out of the; when we make a request and send data we can get it with req.body
    
    try {
        //make a query with mongoose
    
    
    //See if user exists. if user exists send back error
    let user = await User.findOne({email})//User.findOne is a promise

    if(user) { //if user email alerady exists
        return res.status(400).json({errors: [ {msg: 'User already exists'}]});
    }
    //Get users gravatar; based on their email; want this to be part of user being registered
    const avatar = gravatar.url(email, {
        s: '200',//default size of avatar
        r: 'pg',//ensures no explicit photos
        d: 'mm' //default image given to user if user doesnt have gravatar
    })

    user = new User({//create new instance of user;*doesnt save user; we have to call user.save to save
        name,
        email,
        avatar,
        password
    });
    // Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);//have to create a salt to do the hashing with; 10 rounds reccomended; more rounds = more secure but also slower

    user.password = await bcrypt.hash(password, salt);//takes in plaint text password then uses salt hash to encrypt passsword

    await user.save();//this saves user into the database
    //return ujasonwebtoken; when a user registers we want them to be logged in right away; in order to be logged in we need that token
    const payload = {// need to create payload; then sign jwt and pass in payload; then callback to send response to client with the token; then protect route with middleware that will verify token
        user: {
            id: user.id//when we saved user, the promise allows us to get the id. when user is saved in database there is an id created for it in the database
        }
    }

    jwt.sign(//sign token
        payload, 
        process.env.jwtSecret,
        {expiresIn:360000},//optional but recommended
        (err, token) => {//callback
            if(err) throw err;
            res.json({token});//if no error sends token to client
        }
        
        );
    
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    

});//test route

module.exports = router;