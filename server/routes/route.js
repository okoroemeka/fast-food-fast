import express from 'express';
import order from '../controller/order';

// Express subrouter
const router = express.Router();

// Routing
router.get('/orders', order.getAllOrder);
router.get('/orders/:orderId', order.getSpecificOrder);
router.post('/orders', order.createOrder);
router.put('/orders/:orderId', order.updateOrderStatus);
export default router;
