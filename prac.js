const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	bio: {
		type: String,
		default: '',
	},
	completed: {
		type: Number,
	},
	location: {
		type: String,
	},
	userType: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
	reviews: [
		{
			rating: {
				type: Number,
				min: 0,
				max: 5,
				required: true,
			},
			review: {
				type: String,
				default: '',
			},
			reviewer: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		},
	],
	contact: {
		phone: {
			type: String,
			default: '',
		},
		email: {
			type: String,
			default: '',
		},
	},
});

module.exports = mongoose.model('profile', ProfileSchema);
