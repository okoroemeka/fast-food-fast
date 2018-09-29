/* got this from
https://www.codementor.io
/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-postgresql-db-and-jwt-3-mke10c5c5
?utm_content=posts&utm_source=
sendgrid&utm_medium=email&utm_term=
post-mke10c5c5&utm_campaign=newsletter20180905 */
import passwordValidation from './passwordValidatio';

const validation = {
  signupValidation: (req, res, next) => {
    const {
      fullname, email, password, confirmPassword,
    } = req.body;
    if (email === undefined || email.trim().length < 1 || !(/\S+@\S+\.\S+/.test(email))) {
      return res.status(400).json({
        status: 'fail',
        message: 'please an email is required, make sure it follows this format[example@whatever.com]',
      });
    }
    if (fullname === undefined || fullname.trim().length < 1 || typeof fullname !== 'string') {
      return res.status(400).json({
        status: 'fail',
        message: 'full name is needed and must be a string',
      });
    }
    if (password === undefined || password.trim().length < 6
    || typeof password !== 'string' || passwordValidation(password) !== 100) {
      return res.status(400).json({
        status: 'fail',
        message: 'password length must greater than 6 and should contain uppercase,lowercase, number and any of this character[$@#&!]',
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'the passwords do not match',
      });
    }
    return next();
  },
  signInValidation: (req, res, next) => {
    const {
      email, password,
    } = req.body;
    if (email === undefined || email.trim().length < 1 || !(/\S+@\S+\.\S+/.test(email))) {
      return res.status(400).json({
        status: 'fail',
        message: 'please an email is required, make sure it follows this format[example@whatever.com]',
      });
    }
    return next();
  },
};
export default validation;
