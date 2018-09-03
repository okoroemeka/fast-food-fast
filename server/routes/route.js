import express from 'express';
import order from '../controller/order';

// Express subrouter
const router = express.Router();

router.get('/order', order.getAllOrder);
router.get('/order/:orderId', order.getSpecificOrder);
export default router;
