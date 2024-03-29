import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ addComment, postId }) => {
	const [text, setText] = useState();

	return (
		<div className='container'>
			<div className='bg-primary p'>
				<h3>Leave a Comment</h3>
			</div>
			<form
				className='form my-1 '
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postId, { text });
					setText('');
				}}
			>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Comment on the post'
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				/>
				<input type='submit' value='Submit' className='btn btn-dark my-1' />
			</form>
		</div>
	);
};

CommentForm.propTypes = { addComment: PropTypes.func.isRequired };

export default connect(null, { addComment })(CommentForm);
