import express from 'express';
import order from '../controller/order';
// import menuItem from '../controller/menu';

// Express subrouter
const router = express.Router();

// Routing
router.get('/orders', order.getAllOrder);
router.get('/orders/:orderId', order.getSpecificOrder);
router.post('/orders', order.createOrder);
router.put('/orders/:orderId', order.updateOrderStatus);
// router.post('/menuItems', menuItem.createMenuItem);
// router.put('/menuItems/:itemId', menuItem.upadeMenuItem);
// router.delete('/menuItems/:itemId', menuItem.deleteMenuItem);
export default router;
