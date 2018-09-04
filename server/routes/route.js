import express from 'express';
import order from '../controller/order';

// Express subrouter
const router = express.Router();

// Routing
router.get('/order', order.getAllOrder);
router.get('/order/:orderId', order.getSpecificOrder);
router.post('/order', order.createOrder);
export default router;
