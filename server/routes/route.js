import express from 'express';
import order from '../controller/order';

// Express subrouter
const router = express.Router();

router.get('/order', order.getAllOrder);
export default router;
