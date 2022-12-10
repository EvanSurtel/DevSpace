import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { HashRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
	return (
		<Router>
			<Navbar />
			{/* <Landing /> */}

			<Routes>
				<Route path='/' element={<Landing />} />

				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</Router>
	);
};

export default App;
