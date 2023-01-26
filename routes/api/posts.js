const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { restart } = require('nodemon');

// @route   POST api/posts
// @desc    Create a post
// @access  Private ; private because you have to be logged in to create a post

router.post(
	'/',
	[auth, [check('text', 'Text is required').not().isEmpty()]], //do not need to check for user name and avatar because we will request for that using the user id that we get from the token
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();

			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route   Get api/posts
// @desc    Get all posts
// @access  Private ;
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   Get api/posts/:id
// @desc    Get post by id
// @access  Private ;
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   Delete api/posts
// @desc    Delete a post
// @access  Private ;
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		if (post.user.toString() != req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' }); //401 status means not authorized
		}

		await post.remove();

		res.json({ msg: 'Post deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   PUT api/posts/likes
// @desc    Like a post
// @access  Private ;
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//see if post has already been liked by the user
		if (post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: 'User already liked' });
		}

		post.likes.unshift({ user: req.user.id });

		await post.save();

		return res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   DELETE api/posts/likes
// @desc    Remove users like from a post
// @access  Private ;
router.delete('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//see if the post has already been liked by the user
		// if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
		//   return res.status(400).json({ msg: 'User hasnt liked this post' });
		// }
		post.likes = post.likes.filter(
			(like) => like.user.toString() !== req.user.id
		);

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   PUT api/posts/comments
// @desc    Comment on a post
// @access  Private ;
router.put(
	'/comment/:id',
	[auth, [check('text', 'Text is required').notEmpty()]],
	async (req, res) => {
		errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select('-password');
			const post = await Post.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);

			await post.save();

			res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route   DELETE api/posts/comments
// @desc    Delete a Comment on a post
// @access  Private ;
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);
		if (!comment) return res.json({ msg: 'Comment does not exist' });

		if (comment.user.toString() !== req.user.id)
			return res.json({ msg: 'User not authorized' });

		post.comments = post.comments.filter(
			(comment) => comment.id !== req.params.comment_id
		);

		await post.save();
		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
