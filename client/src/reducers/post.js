import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../actions/types';

const initialSate = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

function postReducer(state = initialSate, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};

		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: true,
			};
		case UPDATE_LIKES:
			return {};
		default:
			return state;
	}
}

export default postReducer;
