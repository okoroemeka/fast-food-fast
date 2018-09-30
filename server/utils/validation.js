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
  createMenuValidation: (req, res, next) => {
    const { food, foodImage } = req.body;
    const price = parseInt(req.body.price, 10);
    if (food === undefined || food.trim().length < 1 || typeof food !== 'string') {
      return res.status(400).json({
        status: 'fail',
        message: 'food name is required',
      });
    }
    if (price === undefined || req.body.price.trim().length < 1 || isNaN(price)) {
      return res.status(400).json({
        status: 'fail',
        message: 'price is needed and must be an integer',
      });
    }
    if (foodImage === undefined || foodImage.trim().length < 1 || typeof foodImage !== 'string') {
      return res.status(400).json({
        status: 'fail',
        message: 'food Image is required',
      });
    }
    return next();
  },
  createOrderValidation: (req, res, next) => {
    const {
      food, street, city, telephone, price, quantity,
    } = req.body;
    if (food === undefined || food.trim().length < 1 || typeof food !== 'string') {
      return res.status(400).json({
        status: 'fail',
        message: 'food name is required',
      });
    }
    if (street === undefined || street.trim().length < 1 || typeof street !== 'string') {
      return res.status(400).json({
        status: 'fail',
        message: 'street address is required',
      });
    }
    if (city === undefined || city.trim().length < 1 || typeof city !== 'string') {
      return res.status(400).json({
        status: 'fail',
        message: 'city name is required',
      });
    }
    if (telephone === undefined || telephone.trim().length < 1
    || !Number.isInteger(parseInt(telephone, 10))) {
      return res.status(400).json({
        status: 'fail',
        message: 'telephone number is required',
      });
    }
    if ((quantity === undefined || req.body.quantity.trim().length === 0
    || !Number.isInteger(parseInt(quantity, 10)))) {
      return res.status(400).json({
        status: 'fail',
        message: 'quantiy is required and must be an integer',
      });
    }
    if (price === undefined || req.body.price.trim().length < 1 || !Number.isInteger(parseInt(quantity, 10))) {
      return res.status(400).json({
        status: 'fail',
        message: 'price is needed and must be an integer',
      });
    }
    return next();
  },
};
export default validation;
