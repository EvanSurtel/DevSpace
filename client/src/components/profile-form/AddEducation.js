import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profile';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const AddEducation = ({ addEducation }) => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const { school, degree, fieldofstudy, from, to, current, description } =
		formData;

	console.log(formData);

	const navigate = useNavigate();

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		addEducation(formData, navigate);
	};

	return (
		<section className='container'>
			<h1 className='large text-primary'>Add Your Education</h1>
			<p className='lead'>
				<i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
				that you have attended
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* School or Bootcamp'
						name='school'
						value={school}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Degree or Certificate'
						name='degree'
						value={degree}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Field Of Study'
						name='fieldofstudy'
						value={fieldofstudy}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input type='date' name='from' value={from} onChange={onChange} />
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							checked={current}
							value={current}
							onChange={() => {
								setFormData({ ...formData, current: !current, to: '' });
							}}
						/>{' '}
						Current School or Bootcamp
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={onChange}
						disabled={current}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Program Description'
						value={description}
						onChange={onChange}
					></textarea>
				</div>
				<input type='submit' className='btn btn-primary my-1' value='Submit' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</section>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
