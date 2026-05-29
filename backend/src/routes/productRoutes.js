const express = require('express');
const router = express.Router();
const {
    createProduct,
    addVariant,
    updateProduct,
    updateVariant,
    deleteProduct,
    deleteVariant,
    getProducts,
    getSingleProduct
} = require('../controllers/productController');

router.post('/create', createProduct);
router.post('/:productId/variant', addVariant);
router.put('/:productId', updateProduct);
router.put('/:productId/variant/:variantId', updateVariant);    
router.delete('/:productId', deleteProduct);
router.delete('/:productId/variant/:variantId', deleteVariant);
router.get('/all', getProducts);
router.get('/:productId', getSingleProduct);
module.exports = router;