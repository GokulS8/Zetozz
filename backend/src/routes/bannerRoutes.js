const express = require('express');
const router = express.Router();
const { createBanner, getBanners, deleteBanner } = require('../controllers/bannerController');

router.post('/add', createBanner);
router.get('/get', getBanners);
router.delete('/delete/:id', deleteBanner);

module.exports = router;