const express = require('express');
const router = express.Router();
const { registerUser, loginUser, allUser } = require('../controllers/authController');

// Route to register user
router.post('/register', registerUser);

// Route to login user
router.post('/login', loginUser);


module.exports = router;
