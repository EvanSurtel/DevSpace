import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, removeLike } from '../../actions/post';
import formatDate from '../../utils/formatDate';
import { deletePost } from '../../actions/post';

const PostItem = ({
	post: { _id, user, text, name, avatar, likes, comments, date },
	auth,
	addLike,
	removeLike,
	showActions,
	deletePost,
}) => (
	<div className='post bg-white p-1 my-1'>
		<div>
			<Link to={`/profile/${user}`}>
				<img className='round-img' src={avatar} alt='' />
				<h4>{name}</h4>
			</Link>
		</div>
		<div>
			<p className='my-1'>{text}</p>
			<p className='post-date'>Posted on {formatDate(date)}</p>

			<Fragment>
				<button
					onClick={() => addLike(_id)}
					type='button'
					className='btn btn-light'
				>
					<i className='fas fa-thumbs-up' />{' '}
					<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
				</button>
				<button className='btn btn-light' onClick={() => removeLike(_id)}>
					<i className='fas fa-thumbs-down' />
				</button>
				{showActions && (
					<Link to={`/post/${_id}`} className='btn btn-primary'>
						Discussion {comments.length > 0 && <span>{comments.length}</span>}
					</Link>
				)}
				{!auth.loading && user === auth.user._id && (
					<button
						onClick={() => deletePost(_id)}
						type='button'
						className='btn btn-danger'
					>
						<i className='fas fa-times' />
					</button>
				)}
			</Fragment>
		</div>
	</div>
);

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

PostItem.defaultProps = {
	showActions: true,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
);
