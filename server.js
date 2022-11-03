const express = require('express'); //get express server up and running

const app = express();// initialize app using express

app.get('/', (req, res) => res.send('API running'));//create single endpoint to test; callback with request response, re.send will send data to browser

const PORT = process.env.PORT || 5001; //initialize port; look for environment variable called PORT; when we employ to heroku that is where it will ge PORT number; if there is no env variable set will automatically go to port 5001

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));//app listens through port; callback when it connects will console log