import express from 'express';
import multer from 'multer';
import user from '../controller/dbController/users';
import menu from '../controller/dbController/menu';
import order from '../controller/dbController/order';
import authentication from '../utils/auth';
import validation from '../utils/validation';
import reUsable from '../utils/reusables';

// Express subrouter
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './server/images/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routing
router.post('/auth/signup', validation.signupValidation, user.signUp);
router.post('/auth/signin', validation.signInValidation, user.signIn);
router.put('/user/:userId', user.updateUserStatus);
router.post('/menu', upload.single('foodImage'), validation.createMenuValidation, authentication, menu.createMenuItem);
router.get('/menu', menu.getMenu);
router.put('/menu/:menuId', upload.single('foodImage'), reUsable.imageUpload, authentication, menu.editMenuItem);
router.delete('/menu/:menuId', authentication, menu.deleteMenuItem);
router.get('/orders', authentication, order.getAllOrder);
router.get('/orders/:orderId', authentication, order.getSpecificOrder);
router.post('/orders', validation.createOrderValidation, authentication, order.createOrder);
router.put('/orders/:orderId', validation.validateStatus, authentication, order.updateOrderStatus);
router.get('/users/orders', authentication, order.getOrderHistory);
router.delete('/orders/:orderId', authentication, order.deleteOrder);


export default router;
