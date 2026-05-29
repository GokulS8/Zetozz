const express = require('express');
const router = express.Router();
const { createBanner, getBanners, deleteBanner } = require('../controller/bannerController');
const upload = require('../middleware/multer');

router.post('/add', upload.single('image'), createBanner);
router.get('/get', getBanners);
router.delete('/delete/:id', deleteBanner);

module.exports = router;
