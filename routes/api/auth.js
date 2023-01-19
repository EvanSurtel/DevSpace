//get json wbtoken for authentication
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// @route  Get api/auth
// @desc    Get user by token
// @access  Private
router.get('/', auth, async (req, res) => {
	//protected route
	try {
		//do not want password
		const user = await User.findById(req.user.id).select('-password'); //since this is protected route and we used token that has the id and middleware we set req.user to user in the token, we can pass in req.user. we can access req.user anywhere in a protected route.
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
// @route   Post api/auth
// @desc    Authenticate user and get token; login user
// @access  Public
router.post(
	'/',
	[
		check('email', 'Valid email is required').isEmail(),
		check('password', 'Password is required ').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email }); //since this returns promise, if user exists then the credentials will mbe stores in user
			if (!user) {
				//if there is no user with that email
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			const isMatch = await bcrypt.compare(password, user.password); //since above let user = await User.findOne({email}); returns promise, we can access user.password which is encypted

			if (!isMatch) {
				//if password is incorrect
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				process.env.jwtSecret,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
