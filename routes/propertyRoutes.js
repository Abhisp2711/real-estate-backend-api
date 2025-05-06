const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const { createProperty ,getAllProperties, getFilteredProperties, getImages} = require('../controllers/propertyController');

// Route to create a new property with images
router.post('/', upload.array('images', 5), createProperty);

// get all propeties
router.get('/all',getAllProperties);

//get filter properties
router.get('/',getFilteredProperties);

//get images 
router.get('/images',getImages);

module.exports = router;
