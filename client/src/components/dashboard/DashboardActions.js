import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { parseTwoDigitYear } from 'moment';
import { connect } from 'react-redux';
const DashboardActions = ({ user_id }) => {
	return (
		<div className='dash-buttons'>
			<Link to={`/profile/${user_id}`} className='btn btn-primary'>
				View Profile
			</Link>
			<Link to='/edit-profile' className='btn btn-light'>
				<i className='fas fa-user-circle text-primary'></i> Edit Profile
			</Link>
			<Link to='/add-experience' className='btn btn-light'>
				<i className='fab fa-black-tie text-primary'></i> Add Experience
			</Link>
			<Link to='/add-education' className='btn btn-light'>
				<i className='fas fa-graduation-cap text-primary'></i> Add Education
			</Link>
		</div>
	);
};

DashboardActions.propTypes = {
	user_id: PropTypes.string.isRequired,
};

export default DashboardActions;
