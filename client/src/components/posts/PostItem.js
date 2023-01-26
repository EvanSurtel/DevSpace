import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike } from '../../actions/post';
import formatDate from '../../utils/formatDate';

const PostItem = ({
	post: { _id, user, text, name, avatar, likes, comments, date },
	auth,
	showActions,
	addLike,
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

			{showActions && (
				<Fragment>
					<button
						onClick={() => addLike(_id)}
						type='button'
						className='btn btn-light'
					>
						<i className='fas fa-thumbs-up' />{' '}
						<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
					</button>
				</Fragment>
			)}
		</div>
	</div>
);

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

PostItem.defaultProps = {
	showActions: true,
};

export default connect(mapStateToProps, { addLike })(PostItem);
