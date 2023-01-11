import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
}) => (!isAuthenticated && !loading ? <Navigate to='/login' /> : <Component />);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapSateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapSateToProps)(PrivateRoute);
