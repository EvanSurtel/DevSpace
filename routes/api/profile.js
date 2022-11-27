//adding, fetching, updating profiles
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  //whatever routes we want to protect route we add auth as a second parameter
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    ); //user pertains to the user field in Profile model, which is of type objectid;//name and avatar are in the User model not in Profile model so we can add those feilds to profile temporarily

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}); //whatever routes we want to protect we add auth as a second parameter

// @route   POST api/profile
// @desc    create or update user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Satus is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req); //checks for body errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      //pulling everythingn out from body
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
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {}; //initialize empty object
    profileFields.user = req.user.id;
    //check to see if we are recieving this info to actually set it
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id }); //look for profile

      if (profile) {
        // if profile exists we just update it
        //update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ); //update profilefields
        return res.json(profile);
      }

      //if profile doesnt exist we need to create one
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/profile
// @desc    Get all user profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile from user ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]); //find user using user id parameter;populate adds name and avatar field to user in response
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(401).json({ msg: "Profile not found" });

    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile
// @desc    DELETE profile, user, and post
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id }); //remove user profile

    await User.findOneAndRemove({ _id: req.user.id }); //Remove user
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile
// @desc    PUT profile experience ;experiences and education are seperate resources, they are in the same collection but are seperate resources
// @access  Private
//put request is used to update data
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "Date started is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      //create object with data that user submits
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id }); //we get req.user.id from token

      profile.experience.unshift(newExp); //profile.experience is an array;unshift same as push but it pushes to the beginning rather than the end. we want most recent will be first

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route   PUT api/profile/experience/:experience_id
//@desc    Update user experience
//@access  Private
router.put(
  "/experience/:experience_id",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, company, location, from, to, current, description } =
      req.body;

    const exp = { title, company, from }; //create object to hold updated info
    if (location) exp.location = location;
    if (to) exp.to = to;
    if (current) exp.current = current;
    if (description) exp.description = description;

    try {
      //find experience with user id and experience id; once found update
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id, "experience._id": req.params.experience_id },
        { $set: { "experience.$": { _id: req.params.experience_id, ...exp } } },
        { new: true }
      );

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
