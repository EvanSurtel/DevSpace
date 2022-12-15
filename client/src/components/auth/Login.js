import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		console.log('Success');
		// const newUser = {
		// 	name,
		// 	email,
		// 	password,
		// };

		// try {
		// 	const config = { headers: { 'Content-Type': 'application/json' } };

		// 	const body = JSON.stringify(newUser);

		// 	const res = await axios.post('/api/users', body, config);
		// 	console.log(res.data);
		// } catch (err) {
		// 	console.error(err.respons.data);
		// }

		//Register({ name, email, password });
	};

	return (
		<section className='container'>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign Into Your Account
			</p>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						value={password}
						onChange={onChange}
						required
					/>
				</div>

				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</section>
	);
};

export default Login;
