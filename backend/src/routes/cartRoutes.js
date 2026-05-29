const express = require('express');
const router = express.Router();
const {
    addToCart,removecart,viewCart
} = require('../controller/cartController');

router.post('/add', addToCart);
router.delete('/remove', removecart);
router.get('/view/:userId', viewCart);

module.exports = router;

// In cartController.js