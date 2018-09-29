import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// ENVIRONMENT SECRET KEY
const secretKey = process.env.SECRET_KEY;
/**
 *@returns{object} verifyToken
 *@param{*}request
 *@param{*}response
 *@param{*}next
 */
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.headers.auth;
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 'fail',
          message: 'You do not have the permission to use this resources,please log in',
        });
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    return res.status(401).send({
      status: 'fail',
      message: 'Please login or signup',
    });
  }
};

export default verifyToken;
