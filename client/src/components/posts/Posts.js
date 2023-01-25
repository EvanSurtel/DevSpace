import React from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import { useEffect } from 'react';
import PostForm from './PostForm';
import PostItem from './PostItem';
import { connect } from 'react-redux';

const Posts = ({ getPosts, post: { posts } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);
	return (
		<section className='container'>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user' />
				Welcome to the community
			</p>
			<PostForm />
			<div className='posts'>
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</section>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
