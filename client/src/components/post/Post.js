import React from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import PostItem from '../posts/PostItem';
import { useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const Post = ({ getPost, post: { post, loading } }) => {
	const { id } = useParams();

	useEffect(() => {
		getPost(id);
	}, [getPost, id]);
	console.log(post);

	if (loading || post === null) return <Spinner />;

	return (
		<section className='container'>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</section>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
