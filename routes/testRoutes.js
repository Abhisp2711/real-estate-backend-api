const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');

router.get('/test-cloudinary', async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload('https://img.freepik.com/free-psd/close-up-office-supply-pen-item_23-2151834445.jpg?semt=ais_hybrid&w=740', {
      folder: 'test-folder'
    });
    res.json({
      message: 'Cloudinary is working ✅',
      url: result.secure_url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Cloudinary test failed ❌' });
  }
});

module.exports = router;
