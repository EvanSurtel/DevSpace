//adding, fetching, updating profiles
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator');
const Profile = require('../../models/Profile')
const User = require('../../models/User');



// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private

router.get('/me', auth,  async (req, res) => {//whatever routes we want to protect route we add auth as a second parameter
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);//user pertains to the user field in Profile model, which is of type objectid;//name and avatar are in the User model not in Profile model so we can add those feilds to profile temporarily

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'})
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});//whatever routes we want to protect we add auth as a second parameter

// @route   POST api/profile
// @desc    create or update user profile
// @access  Private

router.post('/', [auth, [
    check('status', 'Satus is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]
],
async (req, res) =>{
    const errors = validationResult(req);//checks for body errors
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const {//pulling everythingn out from body
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};//initialize empty object
    profileFields.user = req.user.id;
    //check to see if we are recieving this info to actually set it
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    

    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

    

    try{
        let profile = await Profile.findOne({user: req.user.id});//look for profile

        if(profile) {// if profile exists we just update it
            //update profile
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})//update profilefields
            return res.json(profile);
        }

        //if profile doesnt exist we need to create one
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/profile
// @desc    Get all user profiles
// @access  Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500). send('Server Error');
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile from user ID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({ msg: 'Profile not found'});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        console.error(err.message);
        if(err.kind == 'ObjectId') return res.status(401).json({ msg: 'Profile not found'});
        
        res.status(500). send('Server Error');
    }
})

module.exports = router;