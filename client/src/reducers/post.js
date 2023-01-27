import {
	GET_POSTS,
	GET_POST,
	DELETE_POST,
	POST_ERROR,
	UPDATE_LIKES,
	UPDATE_COMMENTS,
} from '../actions/types';

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

		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false,
			};

		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.id ? { ...post, likes: payload.likes } : post
				),
				loading: false,
			};
		case UPDATE_COMMENTS:
			return {
				...state,
				post: { ...state.post, comments: payload },
				loading: false,
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload),
			};
		default:
			return state;
	}
}

export default postReducer;
