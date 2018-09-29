import express from 'express';
import userController from '../controller/dbController/users';
import validation from '../utils/validation';
// Express subrouter
const router = express.Router();

// Routing
router.post('/auth/signup', validation.signupValidation, userController.signUp);
router.post('/auth/signin', validation.signInValidation, userController.signIn);
// router.post('/auth/signin', users.signIn);
// router.get('/orders', order.getAllOrder);
// router.get('/orders/:orderId', order.getSpecificOrder);
// router.post('/orders', order.createOrder);
// router.put('/orders/:orderId', order.updateOrderStatus);
// router.get('/', order.getHomePage);
// router.all('*', order.catchEveryOtherRoute);

export default router;
