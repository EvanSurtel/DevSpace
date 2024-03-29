import React from 'react';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/post';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const CommentItem = ({
	comment: { _id, avatar, text, name, user, date },
	postId,
	auth,
	deleteComment,
}) => (
	<div className='post bg-white p-1 my-1'>
		<div>
			<Link to={`/profile/${user}`}>
				<img src={avatar} className='round-img' alt='' />
				<h4>{name}</h4>
			</Link>
		</div>
		<div>
			<p className='my-1'>{text}</p>
			<p className='post-date'>Posted on{formatDate(date)}</p>
			{!auth.loading && user === auth.user._id && (
				<button
					onClick={() => deleteComment(postId, _id)}
					type='button'
					className='btn btn-danger'
				>
					<i className='fas fa-times' />
				</button>
			)}
		</div>
	</div>
);

CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
