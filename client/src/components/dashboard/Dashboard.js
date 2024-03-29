import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);
	return (
		<section className='container'>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome {user && user.name}
			</p>

			{profile !== null ? (
				<>
					<DashboardActions user_id={user._id} />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />

					<div className='my2'>
						<button className='btn btn-danger' onClick={() => deleteAccount()}>
							<i className='fas fa-user-minus'> Delete Account</i>
						</button>
					</div>
				</>
			) : (
				<>
					<p>You have not yet setup a profile, please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
					<div className='my2'>
						<button className='btn btn-danger' onClick={() => deleteAccount()}>
							<i className='fas fa-user-minus'> Delete Account</i>
						</button>
					</div>
				</>
			)}
		</section>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
