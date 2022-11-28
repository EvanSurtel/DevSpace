const jwt = require('jsonwebtoken');
require('dotenv').config();

//export middleware funstion
module.exports = function (req, res, next) {
  // middleware function; function that has access to request and response objects; next is callback that have to run once done so that it moves on to next piece of middleware
  // Get token from header; when we send request to a protected route we have to send the token in a header
  const token = req.header('x-auth-token'); //gets header property from token

  //check if thress no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }); //if no token and route is protected as well as using middleware then will send denied message
  }

  //verify token
  try {
    // if valid will decode token
    const decoded = jwt.verify(token, process.env.jwtSecret); //decode token

    req.user = decoded.user;
    next();
  } catch (err) {
    // if there is token but it is not valid
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
