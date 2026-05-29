const express = require('express');
const router = express.Router();
const {
    checkout,
    getUserOrders,
    getSingleOrder,
    updateOrderStatus,
    cancelOrder,
    getAllOrders
} = require('../controller/orderController');


router.post('/checkout', checkout);
router.get('/all', getAllOrders);
router.get('/user/:userId', getUserOrders);
router.get('/:orderId', getSingleOrder);
router.put('/:orderId/status', updateOrderStatus);
router.delete('/:orderId/cancel', cancelOrder);

module.exports = router;
