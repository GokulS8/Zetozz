const express = require('express');
const router = express.Router();
const {
    checkout,
    getUserOrders,
    getSingleOrder,
    updateOrderStatus,
    cancelOrder,
    getAllOrders
} = require('../controllers/orderController');


router.post('/checkout', checkout);
router.get('/user/:userId', getUserOrders);
router.get('/:orderId', getSingleOrder);
router.put('/:orderId/status', updateOrderStatus);
router.delete('/:orderId/cancel', cancelOrder);
router.get('/all', getAllOrders);

module.exports = router;