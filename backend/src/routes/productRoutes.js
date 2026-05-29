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
} = require('../controller/productController');
const upload = require('../middleware/multer');

router.post('/create', upload.single('image'), createProduct);
router.get('/all', getProducts);
router.post('/:productId/variant', upload.single('image'), addVariant);
router.put('/:productId', updateProduct);
router.put('/:productId/variant/:variantId', upload.single('image'), updateVariant);
router.delete('/:productId', deleteProduct);
router.delete('/:productId/variant/:variantId', deleteVariant);
router.get('/:productId', getSingleProduct);
module.exports = router;
