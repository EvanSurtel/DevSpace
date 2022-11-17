//get json wbtoken for authentication
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const User = require('../../models/User');
// @route   GET api/auth
// @desc    TEST route
// @access  Public

router.get('/', auth, async (req, res) => {//protected route
    try{//do not want password 
        const user = await User.findById(req.user.id).select('-password');//since this is protected route and we used token that has the id and middleware we set req.user to user in the token, we can pass in req.user. we can access req.user anywhere in a protected route.
        res.json(user);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});//test route

module.exports = router;