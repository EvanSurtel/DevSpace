import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';
import { HashRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		store.dispatch(loadUser());
		window.addEventListener('storage', () => {
			if (!localStorage.token) store.dispatch({ type: LOGOUT });
		});
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Navbar />

				<Alert />
				<Routes>
					<Route path='/' element={<Landing />} />

					<Route path='register' element={<Register />} />
					<Route path='login' element={<Login />} />
					<Route
						path='dashboard'
						element={<PrivateRoute component={Dashboard} />}
					/>
					<Route
						path='create-profile'
						element={<PrivateRoute component={CreateProfile} />}
					/>
				</Routes>
			</Router>
		</Provider>
	);
};
//change

export default App;
