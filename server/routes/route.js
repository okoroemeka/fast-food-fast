import express from 'express';
import user from '../controller/dbController/users';
import menu from '../controller/dbController/menu';
import order from '../controller/dbController/order';
import authentication from '../utils/auth';
import validation from '../utils/validation';

// Express subrouter
const router = express.Router();

// Routing
router.post('/auth/signup', validation.signupValidation, user.signUp);
router.post('/auth/signin', validation.signInValidation, user.signIn);
router.put('/updateuser/:userId', user.updateUserStatus);
router.post('/menu', validation.createMenuValidation, authentication, menu.createMenuItem);
router.get('/menu', authentication, menu.getMenu);
router.get('/orders', authentication, order.getAllOrder);
router.get('/orders/:orderId', authentication, order.getSpecificOrder);
router.post('/orders', validation.createOrderValidation, authentication, order.createOrder);
router.put('/orders/:orderId', authentication, order.updateOrderStatus);
router.get('/users/:userId/orders', authentication, order.getOrderHistory);


export default router;
