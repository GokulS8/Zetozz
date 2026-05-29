const express = require('express');
const router = express.Router();
const { 
    createCategory, getCategories, updateCategory, deleteCategory
} = require('../controller/categoryController');
const upload = require('../middleware/multer');

router.post('/add', upload.single('image'), createCategory);
router.get('/get', getCategories);
router.put('/update/:id', upload.single('image'), updateCategory);
router.delete('/delete/:id', deleteCategory);

module.exports = router;
