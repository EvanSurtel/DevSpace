const express = require('express'); //get express server up and running
const connectDB = require('./config/db');
require('dotenv').config();
const path = require('path');

const app = express(); // initialize app using express

connectDB(); //connect to database

//Initialize middleware
app.use(express.json({ extended: false })); //allowing to get data in req.body

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5001; //initialize port; look for environment variable called PORT; when we employ to heroku that is where it will ge PORT number; if there is no env variable set will automatically go to port 5001

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); //app listens through port; callback when it connects will console log
