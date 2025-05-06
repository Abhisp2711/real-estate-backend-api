const cloudinary = require('../config/cloudinary');
const Property = require('../models/propertyModel');
const fs = require('fs');

// Create property with image upload
const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, type } = req.body;

    // Upload images to Cloudinary
    const imagePromises = req.files.map(async(file) =>{
      const result = await cloudinary.uploader.upload(file.path, {
         folder: 'real-estate' ,
      });
      // Delete temp file after upload
      try {
        fs.unlinkSync(file.path);
      } catch (error) {
        console.error(`Failed to delete ${file.path}`,error);
      }
      return result.secure_url;
  });

    // Get image URLs from Cloudinary response
    const imageUrls = await Promise.all(imagePromises);

    // Create new property in database
    const newProperty = new Property({
      title,
      description,
      price,
      location,
      type,
      images: imageUrls,
      // user: req.user._id,  // Assuming user is authenticated and set
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating property' });
  }
};
// Get images
const getImages = async (req, res) => {
  try {
    const properties = await Property.find(); 
    const images = properties
      .map(property => property.images)  
      .flat() 
      .filter(image => image);  

    res.json(images); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all Properties
const getAllProperties = async (req,res) =>{
  try {
    const properties = await Property.find();
    res.status(200).json({properties});
  } catch (error) {
    res.status(500).json({message: `Error fetching properties`});
  }
};

// GET /api/properties?location=Delhi&type=house&minPrice=5000&maxPrice=20000
const getFilteredProperties = async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice } = req.query;

    const filter = {};

    if (location) filter.location = location;
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter);
    res.status(200).json({ properties });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error filtering properties' });
  }
};


module.exports = { 
  createProperty ,
  getAllProperties,
  getFilteredProperties,
  getImages,
};
